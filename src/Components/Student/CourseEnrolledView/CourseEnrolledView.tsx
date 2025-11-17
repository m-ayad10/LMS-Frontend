import { useState, useRef, useLayoutEffect, useEffect } from "react";
import {
  FaCheck,
  FaPlay,
  FaStar,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import "./style.css";
import "./responsive.css";
import type { Enrolled } from "../../../Redux/Slices/Enrolled/EnrolledType";
import toast from "react-hot-toast";
import { server_url } from "../../../Hooks/customHook";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../../Redux/store";
import { useNavigate } from "react-router-dom";
import { editEnrolled } from "../../../Redux/Slices/Enrolled/EnrolledSlice";
import type { User } from "../../../Redux/Slices/Auth/AuthType";
import { editCourse } from "../../../Redux/Slices/Course/CourseSlice";

interface Review {
  _id: string;
  courseId: string;
  studentId: User;
  star: number;
  message: string;
}

interface CourseWatchProps {
  courseData: Enrolled | null;
}

function CourseWatch({ courseData }: CourseWatchProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReview, setNewReview] = useState({ rating: 0, text: "" });
  const [showMobileContent, setShowMobileContent] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentVideo, setCurrentVideo] = useState<number>(0);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    if (!courseData) return;
    const index = courseData?.courseId.curiculum.findIndex((value, index) => {
      return !courseData.completedLesson.includes(index);
    });
    console.log(index, courseData.completedLesson);
    setCurrentVideo(index >= 0 ? index : 0);
  }, [courseData]);

  const handleVideoEnd = async function (index: number, id: string) {
    try {
      const response = await fetch(`${server_url}/enrollment/complete-lesson`, {
        method: "PATCH",
        body: JSON.stringify({ index, id }),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const data = await response.json();
      if (!data.success) {
        setCurrentVideo((prev) => prev + 1);
        return;
      }
      dispatch(editEnrolled({ data: data.data }));
      if (data.data.progress === 100) {
        toast.success("🎉 Congratulations! Course completed successfully!");
        navigate("/mycourses");
        return;
      }
      if(courseData?.courseId?.curiculum.length||0-1===currentVideo)
      {
        return
      }
      setCurrentVideo((prev) => prev + 1);
    } catch (error: any) {
      toast.error(error?.message || error || "Something went wrong");
    }
  };

  const handleStarClick = function (rating: number) {
    setNewReview((prev) => ({ ...prev, rating }));
  };

  useEffect(()=>{
    if(!courseData?._id) return
    async function fetchReviews(){
      try {
        const response=await fetch(`${server_url}/review/${courseData?.courseId._id}`,{
          credentials:"include"
        })
        const data=await response.json()
        if(!data.success)
        {
          return
        }
        setReviews(data?.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchReviews()
  },[courseData?._id])
  const handleSubmitReview = async function () {
    // No functionality
    try {
      const response = await fetch(`${server_url}/review`, {
        method: "POST",
        credentials: "include",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({
          message: newReview.text,
          star: newReview.rating,
          courseId: courseData?.courseId._id,
        }),
      });
      const data = await response.json();
      if (!data.success) {
        toast.error(data.message);
        return;
      }
      toast.success(data.message);
      setReviews(data.reviews);
      dispatch(editCourse({ course: data.course }));
    } catch (error: any) {
      toast.error(error.message || error || "Something went wrong");
    }
  };

  return (
    <div className="course-watch-container">
      <div className="course-main-title ">{courseData?.courseId?.title}</div>
      <div className="course-main-layout">
        <div className="course-video-section">
          <div className="course-video-container">
            <video
              ref={videoRef}
              className="course-video-player"
              controls
              onEnded={() =>
                handleVideoEnd(currentVideo, courseData?._id || "")
              }
              key={courseData?.courseId?.curiculum[currentVideo].url}
            >
              <source
                src={courseData?.courseId?.curiculum[currentVideo].url}
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </div>
          <div className="flex justify-end px-1">
            {(courseData?.courseId?.totalLessons || 0) - 1 !== currentVideo && (
              <button
                className="course-next-button"
                onClick={() =>
                  handleVideoEnd(currentVideo, courseData?._id || "")
                }
              >
                Next Lesson
              </button>
            )}
          </div>

          <h1 className="course-video-title">
            {courseData?.courseId?.curiculum[currentVideo].sectionName}
          </h1>

          <div
            className="mobile-content-toggle md:hidden"
            onClick={function () {
              setShowMobileContent(!showMobileContent);
            }}
          >
            <h3>Course Content</h3>
            {showMobileContent ? <FaChevronUp /> : <FaChevronDown />}
          </div>
        </div>

        <div
          className={`course-content-sidebar ${
            !showMobileContent ? "mobile-content-hidden" : ""
          }`}
        >
          <h2 className="course-content-header">Course Content</h2>
          {courseData?.courseId?.curiculum?.map(function (lesson, index) {
            return (
              <div
                key={lesson.public_id}
                className={`lesson-item ${
                  lesson.url ===
                  courseData?.courseId?.curiculum[currentVideo].url
                    ? "lesson-item-current"
                    : ""
                } 
                
                `}
                onClick={() => setCurrentVideo(index)}
              >
                <div className="lesson-check">
                  {courseData.completedLesson.includes(index) ? (
                    <FaCheck />
                  ) : (
                    <FaPlay />
                  )}
                </div>
                <span className="lesson-number">{index + 1}.</span>
                <span className="lesson-title">{lesson.sectionName}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="course-reviews-section">
        <h2 className="reviews-header">Course Reviews</h2>

        <div className="review-form">
          <h3 className="review-form-title">Add Your Review</h3>
          <div className="rating-stars">
            {[1, 2, 3, 4, 5].map(function (star) {
              return (
                <span
                  key={star}
                  className={`star ${star <= newReview.rating ? "active" : ""}`}
                  onClick={function () {
                    handleStarClick(star);
                  }}
                >
                  <FaStar />
                </span>
              );
            })}
          </div>
          <textarea
            className="review-textarea"
            placeholder="Share your experience with this course..."
            value={newReview.text}
            onChange={function (e) {
              setNewReview((prev) => ({ ...prev, text: e.target.value }));
            }}
          />
          <button className="submit-review-btn" onClick={handleSubmitReview}>
            Submit Review
          </button>
        </div>

        {/* Reviews List */}
        <div className="reviews-list">
          {reviews.map(function (review) {
            return (
              <div key={review._id} className="review-card">
                <div className="review-header">
                  <img src={review?.studentId?.profile} alt="image" />
                  <div>
                  <span className="reviewer-name">
                    {review?.studentId?.firstName +
                      " " +
                      review?.studentId?.lastName}
                  </span>
                  <div className="review-rating">
                    {Array.from({ length: 5 }, function (_, i) {
                      return (
                        <FaStar
                          key={i}
                          className={i < review.star ? "active" : ""}
                        />
                      );
                    })}
                  </div>
                  </div>
                </div>
                <p className="review-text">{review.message}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default CourseWatch;
