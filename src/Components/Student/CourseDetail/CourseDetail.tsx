import { MdCurrencyRupee, MdGroups } from "react-icons/md";
import StarDisplay from "../Star/StarDisplay";
import { FiHeart } from "react-icons/fi";
import { FaBook, FaHeart } from "react-icons/fa6";
import { IoIosArrowForward, IoMdHome } from "react-icons/io";
// import image from "../../../assets/banner-man-3.png";
// import video from "../../../assets/Screen Recording 2025-10-18 143231.mp4";

import "./style.css";
import "./responsive.css";
import { ImBooks } from "react-icons/im";
import { BsGraphUpArrow } from "react-icons/bs";
import CourseContentTabs from "../CourseContentTabs/CourseContentTabs";
import { useNavigate, useParams } from "react-router-dom";
import { createContext, useContext, useEffect, useState } from "react";
import type { Course } from "../../../Redux/Slices/Course/CourseType";
import { server_url } from "../../../Hooks/customHook";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../Redux/store";
import { toggleWishlist } from "../../../Redux/Slices/Wishlist/WishlistThunk";
import { addToCart } from "../../../Redux/Slices/Cart/CartThunk";

export interface CourseDetailContextType {
  course: undefined | Course;
  setCourse: React.Dispatch<React.SetStateAction<Course | undefined>>;
}

export const CourseDetailContext = createContext<CourseDetailContextType>({
  course: undefined,
  setCourse: () => {},
});


function CourseDetail() {
  const [course, setCourse] = useState<Course>();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;
    async function fetchCourse() {
      try {
        const response = await fetch(`${server_url}/course/${id}`, {
          credentials: "include",
        });
        const data = await response.json();
        if (!data.success) {
          toast.error(data.message);
        }
        setCourse(data.data);
      } catch (error: any) {
        toast.error(error.message || error || "Something went wrong");
        navigate(-1);
      }
    }
    fetchCourse();
  }, [id]);
  return (
    <>
      <CourseDetailContext.Provider value={{ course, setCourse }}>
        <CourseDetailComponent />
        <CourseContentTabs />
      </CourseDetailContext.Provider>
    </>
  );
}

export default CourseDetail;

function CourseDetailComponent() {
  return (
    <>
      <div className="course-detail-section">
        <CourseDetailStart />

        <CourseDetailEnd />
      </div>
    </>
  );
}

function CourseDetailStart() {
  const { course } = useContext(CourseDetailContext);
  return (
    <>
      <div className="course-detail-start">
        <div className="course-detail-breadcrumb">
          <IoMdHome className="course-breadcrumb-icon" /> Home
          <IoIosArrowForward className="course-detail-breadcrumb-separator" />{" "}
          Courses
          <IoIosArrowForward className="course-detail-breadcrumb-separator" />{" "}
          Detail
        </div>
        <h2 className="course-detail-title">{course?.title}</h2>
        <p className="course-detail-description">{course?.description}</p>
        <div className="course-detail-meta">
          <div className="course-detail-instructor">
            <img
              src={course?.instructorId?.profile}
              className="course-detail-instructor-avatar"
              alt=""
            />
            <p className="course-deatil-instructer-name">
              {course?.instructorId
                ? course.instructorId.firstName +
                  " " +
                  course?.instructorId?.lastName
                : "Intructor not found"}
            </p>
          </div>
          <div className="course-deatil-students">
            <MdGroups className="course-detail-students-icon" />
            <p className="course-detail-student-count">
              {course?.totalStudents} students
            </p>
          </div>
        </div>
        <div className="course-deatil-course-rating">
           <StarDisplay value={+(course?.totalRatings||0/(course?.totalNoOfRating||0)).toFixed(1)||0} />
          <span className="course-deatil-rating-count">({course?.totalNoOfRating||0} Reviews)</span>
        </div>
      </div>
    </>
  );
}

function CourseDetailEnd() {
  const { course } = useContext(CourseDetailContext);

  const wishlist = useSelector((state: RootState) => state.wishlist);
  const dispatch = useDispatch<AppDispatch>();

  const handleWishlist = (courseId: string) => {
    dispatch(toggleWishlist(courseId));
  };

  const handleAddToCart = (courseId: string) => {
    dispatch(addToCart(courseId));
  };
  return (
    <>
      <div className="course-deatil-end">
        <div className="course-preview-wrapper">
          <video
            src={course?.previewVideo}
            className="course-deatil-video"
            controls
          ></video>
          <div
            className="course-wishlist-buttn"
            onClick={() => handleWishlist(course?._id || "")}
          >
            {wishlist?.wishlist.some(
              (value) => value.courseId._id === course?._id
            ) ? (
              <FaHeart className="wishlist-selected-icon" />
            ) : (
              <FiHeart className="wishlist-unselected-icon" />
            )}
          </div>
        </div>
        <p className="course-detail-course-price">
          <MdCurrencyRupee className="course-deatil-price-icon" />{" "}
          {course?.price}
        </p>
        <div className="course-end-info-row">
          <div className="course-end-info-label">
            <FaBook className="course-end-info-icon" />
            Lessons
          </div>
          <p className="course-end-info-value">{course?.totalLessons}</p>
        </div>
        <hr className="course-end-ruller" />
        <div className="course-end-info-row">
          <div className="course-end-info-label">
            <ImBooks className="course-end-info-icon" />
            Category
          </div>
          <p className="course-end-info-value">{course?.category}</p>
        </div>
        <hr className="course-end-ruller" />
        <div className="course-end-info-row">
          <div className="course-end-info-label">
            <BsGraphUpArrow className="course-end-info-icon" />
            Level
          </div>
          <p className="course-end-info-value">{course?.level}</p>
        </div>
        <hr className="course-end-ruller" />
        <button
          className="course-end-addToCart-btn"
          onClick={() => handleAddToCart(course?._id || "")}
        >
          + Add to cart
        </button>
      </div>
    </>
  );
}
