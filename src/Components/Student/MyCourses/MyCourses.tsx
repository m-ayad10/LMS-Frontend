import { CgNotes } from "react-icons/cg";
// import { FiHeart } from "react-icons/fi";
import { GrGroup } from "react-icons/gr";
import { MdCurrencyRupee } from "react-icons/md";
// import thumbnail from "../../../assets/course_thumbnail_default-new_121741669230.jpg";
// import profile from "../../../assets/banner-man-1.png";

// import { FaHeart } from "react-icons/fa6";
import StarDisplay from "../Star/StarDisplay";
import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
import "./style.css";
import "./responsive.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../../../Redux/store";

function MyCourseInProgress() {
  const courseInProgress = useSelector(
    (state: RootState) => state.enrolled.enrolled
  ).filter((value) => value?.progress !== 100);
  const navigate = useNavigate();
  return (
    <>
      {courseInProgress.length === 0 && (
        <div className="text-center text-gray-500 py-6 ">
          <p className="text-lg font-medium">No courses in progress</p>
          <p className="text-sm text-gray-400 mt-1">
            Start learning something new today!
          </p>
        </div>
      )}

      <div className="course-lists mt-2">
        {courseInProgress.map((value) => {
          return (
            <div
              className="course-card"
              data-aos="zoom-in"
              data-aos-easing="ease-in-out"
              onClick={()=>navigate(`/detail/${value.courseId._id}`)}
            >
              <div className="course-item-thumbnail-cont">
                <img
                  src={value?.courseId?.thumbnail}
                  className="course-thumbnail-img"
                  alt="course-thumbnail"
                />
                <div className="flex justify-end ">
                  <p className="course-price">
                    Price: <MdCurrencyRupee className="course-currency-icon" />{" "}
                    {value?.courseId?.price}
                  </p>
                </div>
              </div>
              <h4 className="course-title">{value?.courseId?.title}</h4>
              <div className="course-meta">
                <p className="course-lessons">
                  <CgNotes className="icon-lessons" />{" "}
                  {value?.courseId?.totalLessons} Lessons
                </p>
                <p className="course-students">
                  <GrGroup className="icons-students" />{" "}
                  {value?.courseId?.totalStudents}+ students
                </p>
              </div>
              <div className="flex text-[#777777] text-[14px] items-center">
                <StarDisplay value={+(value?.courseId?.totalRatings/value?.courseId.totalNoOfRating).toFixed(1)} />
                ({value?.courseId?.totalNoOfRating})
              </div>
              <div className="course-progress-percentage">
                <span className="progress-label">Progress</span>
                <input
                  className="progress-slider accent-blue-500"
                  readOnly
                  type="range"
                  value={value?.progress}
                  min={0}
                  max={100}
                />
                <span className="progress-value">{value?.progress}%</span>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

function MyCourseCompeleted() {
  const courseCompleted = useSelector(
    (state: RootState) => state.enrolled.enrolled
  ).filter((value)=>value.progress===100)
  const navigate = useNavigate();
  return (
    <>
      {courseCompleted.length === 0 && (
        <div className="text-center text-gray-500 py-6 ">
          <p className="text-lg font-medium">No completed courses yet</p>
          
        </div>
      )}

      <div className="course-lists mt-2">
        {courseCompleted.map((value) => {
          return (
            <div
              className="course-card"
              data-aos="zoom-in"
              data-aos-easing="ease-in-out"
              onClick={()=>navigate(`/detail/${value.courseId._id}`)}
            >
              <div className="course-item-thumbnail-cont">
                <img
                  src={value?.courseId?.thumbnail}
                  className="course-thumbnail-img"
                  alt="course-thumbnail"
                />
                <div className="flex justify-end ">
                  <p className="course-price">
                    Price: <MdCurrencyRupee className="course-currency-icon" />{" "}
                    {value?.courseId?.price}
                  </p>
                </div>
              </div>
              <h4 className="course-title">{value?.courseId?.title}</h4>
              <div className="course-meta">
                <p className="course-lessons">
                  <CgNotes className="icon-lessons" />{" "}
                  {value?.courseId?.totalLessons} Lessons
                </p>
                <p className="course-students">
                  <GrGroup className="icons-students" />{" "}
                  {value?.courseId?.totalStudents}+ students
                </p>
              </div>
              <div className="flex text-[#777777] text-[14px] items-center">
                 <StarDisplay value={+(value?.courseId?.totalRatings/value?.courseId.totalNoOfRating).toFixed(1)||0} />
                ({value?.courseId?.totalNoOfRating||0})
              </div>
              <div className="course-progress-percentage">
                <span className="progress-label">Progress</span>
                <input
                  className="progress-slider accent-blue-500"
                  readOnly
                  type="range"
                  value={value?.progress}
                  min={0}
                  max={100}
                />
                <span className="progress-value">{value?.progress}%</span>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

function MyCourses() {
  const [active, setActive] = useState<"inProgress" | "completed">(
    "inProgress"
  );
  const enrolled = useSelector((state: RootState) => state.enrolled);
  useEffect(() => {
    Aos.init({
      once: true,
      duration: 700,
    });
  }, []);
  return (
    <>
      <div className="course-section">
        <div className="course-progress-toggle">
          <button
            className={`course-progress-btn ${
              active === "inProgress" && "progress-btn-active"
            }`}
            onClick={() => setActive("inProgress")}
          >
            In Progress
          </button>
          <button
            className={`course-progress-btn ${
              active === "completed" && "progress-btn-active"
            }`}
            onClick={() => setActive("completed")}
          >
            Completed
          </button>
        </div>
        {
          enrolled.status=='loading'?<p className="text-center text-gray-400 mt-10  font-normal">
            Loading...
          </p>:active=='completed'?<MyCourseCompeleted/>:<MyCourseInProgress/>
        }

        {/* <div className="course-lists mt-2">
          <div
            className="course-card"
            data-aos="zoom-in"
            data-aos-easing="ease-in-out"
          >
            <div className="course-item-thumbnail-cont">
              <img
                src={thumbnail}
                className="course-thumbnail-img"
                alt="course-thumbnail"
              />
              <div className="course-wishlist-buttn">
                <FiHeart className="wishlist-unselected-icon"/>
                <FaHeart className="wishlist-selected-icon" />
              </div>
              <div className="flex justify-end ">
                <p className="course-price">
                  Price: <MdCurrencyRupee className="course-currency-icon" />{" "}
                  3000
                </p>
              </div>
            </div>
            <h4 className="course-title">WordPress Theme Development</h4>
            <div className="course-meta">
              <p className="course-lessons">
                <CgNotes className="icon-lessons" /> 30 Lessons
              </p>
              <p className="course-students">
                <GrGroup className="icons-students" /> 130+ students
              </p>
            </div>
            <StarDisplay value={4} />
            <hr className="course-card-hr" />
            <div className="course-instructor-box">
              <img src={profile} className="course-instructor-img" alt="" />
              <h4 className="course-intructor-name">Andrew Tate</h4>
            </div>
          </div>
        </div> */}
      </div>
    </>
  );
}

export default MyCourses;
