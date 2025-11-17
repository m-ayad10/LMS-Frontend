import { CgNotes } from "react-icons/cg";
import { GrGroup } from "react-icons/gr";
import { MdCurrencyRupee } from "react-icons/md";
// import thumbnail from "../../../assets/course_thumbnail_default-new_121741669230.jpg";
import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import StarDisplay from "../../Student/Star/StarDisplay";
import { FaBoxOpen, FaPen } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { FaArchive } from "react-icons/fa";
import "./style.css";
import type { Course } from "../../../Redux/Slices/Course/CourseType";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../../Redux/store";
import { toggleCourseArchieve } from "../../../Redux/Slices/Course/CourseThunk";

function InstructorCourseCard({ courses }: { courses: Course[] }) {
    const dispatch=useDispatch<AppDispatch>()
  useEffect(() => {
    Aos.init({
      once: true,
      duration: 400,
    });
  }, []);
  return (
    <>
      <div className="course-section">
        {courses.length === 0 && (
          <div className="text-center text-gray-500 py-8">No courses found</div>
        )}
        <div className="course-lists">
          {courses.map((course) => {
            return (
              <div
                className="course-card"
                data-aos="zoom-in"
                data-aos-easing="ease-in-out"
              >
                <div className="course-item-thumbnail-cont">
                  <img
                    src={course?.thumbnail}
                    className="course-thumbnail-img"
                    alt="course-thumbnail"
                  />
                  <div className="flex justify-end ">
                    <p className="course-price">
                      Price:{" "}
                      <MdCurrencyRupee className="course-currency-icon" />
                      {course?.price}
                    </p>
                  </div>
                </div>
                <h4 className="course-title">{course?.title}</h4>
                <div className="course-meta">
                  <p className="course-lessons">
                    <CgNotes className="icon-lessons" /> {course?.totalLessons}{" "}
                    Lessons
                  </p>
                  <p className="course-students">
                    <GrGroup className="icons-students" />{" "}
                    {course?.totalStudents}+ students
                  </p>
                </div>
                <div className="flex text-[#777777] text-[14px] items-center">
                  <StarDisplay value={4} />
                  (4)
                </div>
                <hr className="course-card-hr" />
                <div className="course-action-buttons">
                  <Link to={""}>
                    <button className="course-action-butn">
                      <FaPen className="course-action-icon" /> Edit
                    </button>
                  </Link>
                  {course.status === "active" ? (
                      <button className="course-action-butn" onClick={()=>dispatch(toggleCourseArchieve(course._id))} >
                        <FaArchive className="course-action-icon" /> Archieve
                      </button>
                  ) : (
                      <button className="course-action-butn"onClick={()=>dispatch(toggleCourseArchieve(course._id))}>
                        <FaBoxOpen className="course-action-icon" /> UnArchieve
                      </button>
                  )}
                </div>
              </div>
            );
          })}
          {/* <div
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
            <div className="course-action-buttons">
              <Link to={""}>
                <button className="course-action-butn">
                  <FaPen className="course-action-icon" /> Edit
                </button>
              </Link>
              <Link to={""}>
                <button className="course-action-butn">
                  <FaArchive className="course-action-icon" /> Archieve
                </button>
              </Link>
              <Link to={''}>
                       <button className="course-action-butn"><FaBoxOpen className="course-action-icon"/> UnArchieve</button>
                    </Link>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
}

export default InstructorCourseCard;
