import { Fragment, useContext, useEffect, useState } from "react";
import { IoIosLock } from "react-icons/io";
import "./style.css";
import "./responsive.css";
import image from "../../../assets/banner-man-2.png";
import { CourseDetailContext } from "../CourseDetail/CourseDetail";
import { server_url } from "../../../Hooks/customHook";
import { useParams } from "react-router-dom";
import type { User } from "../../../Redux/Slices/Auth/AuthType";
import StarDisplay from "../Star/StarDisplay";
import { format } from 'date-fns';


function Overview() {
  const { course } = useContext(CourseDetailContext);
  return (
    <>
      <div className="course-detail-overview-section">
        <h2 className="course-detail-overview-title">Course description</h2>
        <p className="course-deatil-overview-description">
          {" "}
          {course?.description ||
            " Learn how to confidently develop custom & profitable Responsive WordPress Themes and Websites with no prior experience."}
        </p>
      </div>
    </>
  );
}
function Curiculum() {
  const { course } = useContext(CourseDetailContext);
  return (
    <>
      <div className="course-detail-curriculum-section">
        {course?.curiculum?.map((value) => {
          return (
            <Fragment key={value.url}>
              <p className="course-curriculum-item">
                <IoIosLock className="course-curriculum-item-icon" />
                {value.sectionName}
              </p>
              <hr className="course-curriculum-divider" />
            </Fragment>
          );
        })}
        {/* <p className="course-curriculum-item">
          <IoIosLock className="course-curriculum-item-icon" />
          Introduction to WordPress
        </p>
        <hr className="course-curriculum-divider" /> */}
      </div>
    </>
  );
}

function Instructor() {
  const { course } = useContext(CourseDetailContext);
  return (
    <>
      <div className="course-deatil-instructor-section">
        <div className="course-detail-instructor-details">
          <img
            src={course?.instructorId?.profile}
            className="course-detail-instructor-image"
            alt="profile"
          />
          <p className="course-detail-inctructor-name">
            {course?.instructorId
              ? course.instructorId?.firstName +
                " " +
                course?.instructorId.lastName
              : "Instructor not found"}
          </p>
        </div>
      </div>
    </>
  );
}



interface Review {
  _id: string;
  courseId: string;
  studentId: User;
  star: number;
  message: string;
  createdAt?: string;
}

function Reviews() {
  const { id } = useParams();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [sortBy, setSortBy] = useState<string>('latest');
    useEffect(() => {
    if (!id) return;
    
    async function fetchReviews() {
      try {
        const response = await fetch(`${server_url}/review/${id}`, {
          credentials: "include",
        });
        const data = await response.json();
        if (!data.success) {
          return;
        }
        setReviews(data?.data || []);
      } catch (error) {
        console.log(error);
      }
    }
    fetchReviews();
  }, [id]);


  const sortedReviews = [...reviews].sort((a, b) => {
    switch (sortBy) {
      case 'highest-rated':
        return b.star - a.star;
      case 'lowest-rated':
        return a.star - b.star;
      case 'latest':
        return new Date(b.createdAt || '').getTime() - new Date(a.createdAt || '').getTime();
      case 'oldest':
        return new Date(a.createdAt || '').getTime() - new Date(b.createdAt || '').getTime();
      default:
        return 0;
    }
  });

  const getTimeAgo = (createdAt?: string) => {
    return format(new Date(createdAt||''), 'yyyy-MM-dd');
  };

  // Handle sort change
  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(event.target.value);
  };

  return (
    <>
      <div className="course-detail-reviews-section">
        <div className="course-detail-review-header">
          <p className="course-detail-review-title">Reviews</p>
          <div className="course-detail-review-sort">
            <span className="course-detail-review-label">Sort by: </span>
           <select 
              name="" 
              className="course-detail-sort-select" 
              id=""
              value={sortBy}
              onChange={handleSortChange}
            >
              <option value="highest-rated">Highest Rated</option>
              <option value="lowest-rated">Lowest Rated</option>
              <option value="latest">Latest</option>
              <option value="oldest">Oldest</option>
            </select>
          </div>
        </div>
        <hr className="course-deatil-review-divider" />

         { sortedReviews.map((review, index) => (
            <div key={review._id}>
              <div className="course-detail-review-item ">
                <div className="course-deatil-reviewer-info flex justify-between">
                  <div className="flex gap-3">
                  <img 
                    src={review.studentId?.profile || image} 
                    className="course-deatil-reviewer-avater" 
                    alt="Reviewer avatar" 
                  />
                  <div className="course-detail-reviewer-meta">
                    <p className="course-detail-reviewer-name">
                      {review.studentId?(review.studentId?.firstName + " " + review.studentId?.lastName) :"Anonymous User"}
                    </p>
                    <StarDisplay value={review.star||0}/>
                  </div>
                </div> 
                 <p className="course-detail-reviewer-time">
                      {getTimeAgo(review.createdAt)}
                    </p>
                </div>
                <p className="course-review-text">
                  {review.message}
                </p>
              </div>
              {index < reviews.length - 1 && (
                <hr className="course-deatil-review-divider" />
              )}
            </div>
          ))
        }
      </div>
    </>
  );
}

type tab = "instructor" | "overview" | "curriculum" | "reviews";

function CourseContentTabs() {
  const [activeTab, setActiveTab] = useState<tab>("overview");
  return (
    <>
      <div className="course-detail-tabs">
        <p
          onClick={() => setActiveTab("overview")}
          className={`course-detail-tab-item ${
            activeTab === "overview" && "active-tab-item"
          }`}
        >
          {" "}
          Overview
        </p>
        <p
          onClick={() => setActiveTab("curriculum")}
          className={`course-detail-tab-item ${
            activeTab === "curriculum" && "active-tab-item"
          }`}
        >
          {" "}
          Curiculum
        </p>
        <p
          onClick={() => setActiveTab("instructor")}
          className={`course-detail-tab-item ${
            activeTab === "instructor" && "active-tab-item"
          }`}
        >
          {" "}
          Instructor
        </p>
        <p
          onClick={() => setActiveTab("reviews")}
          className={`course-detail-tab-item ${
            activeTab === "reviews" && "active-tab-item"
          }`}
        >
          {" "}
          Reviews
        </p>
      </div>
      <hr className="course-detail-tabs-divider" />
      {activeTab == "overview" && <Overview />}
      {activeTab == "curriculum" && <Curiculum />}
      {activeTab == "instructor" && <Instructor />}
      {activeTab == "reviews" && <Reviews />}
    </>
  );
}

export default CourseContentTabs;
