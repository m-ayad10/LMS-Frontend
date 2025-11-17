import { CgNotes } from "react-icons/cg";
import { FiHeart } from "react-icons/fi";
import { GrGroup } from "react-icons/gr";
import { MdCurrencyRupee } from "react-icons/md";
import profile from "../../../assets/banner-man-1.png";
import "./style.css";
import "./responsive.css";
import './shimmer.css'
import { FaHeart } from "react-icons/fa6";
import StarDisplay from "../Star/StarDisplay";
import Aos from "aos";
import "aos/dist/aos.css";
import React, { Fragment, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../Redux/store";
import { toggleWishlist } from "../../../Redux/Slices/Wishlist/WishlistThunk";

function Courses() {
  const navigate = useNavigate();
  const courses = useSelector((state: RootState) => state.courses);
  const wishlist=useSelector((state:RootState)=>state.wishlist)
  const dispatch=useDispatch<AppDispatch>()
  useEffect(() => {
    Aos.init({ once: true, duration: 800 });
  }, []);

  const handdleToggle=(e:React.MouseEvent<HTMLDivElement>,courseId:string)=>{
    e.stopPropagation()
    dispatch(toggleWishlist(courseId))
  }

  return (
    <>
      <div className="course-section">
        <h3 className="course-section-heading">Top courses</h3>
        <div className="course-lists mt-2">
          {courses.status === "loading" ? (
            <>
              {[...Array(4)].map((_, index) => (
                <div key={index} className="course-card">
                  <div className="course-item-thumbnail-cont">
                    <div className="shimmer-thumbnail"></div>
                    <div className="course-wishlist-buttn shimmer-wishlist"></div>
                    <div className="flex justify-end">
                      <div className="course-price shimmer-price"></div>
                    </div>
                  </div>
                  <div className="shimmer-title"></div>
                  <div className="course-meta">
                    <div className="shimmer-meta"></div>
                    <div className="shimmer-meta"></div>
                  </div>
                  <div className="shimmer-rating"></div>
                  <hr className="course-card-hr" />
                  <div className="course-instructor-box">
                    <div className="shimmer-instructor-img"></div>
                    <div className="shimmer-instructor-name"></div>
                  </div>
                </div>
              ))}
            </>
          ) : courses.status === "succeeded" && courses.courses.length > 0 ? (
            // Actual content
            <>
              {courses.courses.slice(0, 4).map((course) => {
                return (
                  <Fragment key={course._id}>
                    <div
                      className="course-card"
                      data-aos="zoom-in"
                      data-aos-easing="ease-in-out"
                      onClick={() => navigate(`/detail/${course._id}`)}
                    >
                      <div className="course-item-thumbnail-cont">
                        <img
                          src={course.thumbnail}
                          className="course-thumbnail-img"
                          alt="course-thumbnail"
                        />
                        <div className="course-wishlist-buttn" onClick={(e) => handdleToggle(e, course._id)}>
                          {wishlist.wishlist.some((value) => value.courseId._id === course._id) ?
                            <FaHeart className="wishlist-selected-icon" /> :
                            <FiHeart className="wishlist-unselected-icon" />
                          }
                        </div>
                        <div className="flex justify-end ">
                          <p className="course-price">
                            Price:{" "}
                            <MdCurrencyRupee className="course-currency-icon" />{" "}
                            {course.price}
                          </p>
                        </div>
                      </div>
                      <h4 className="course-title">
                        {course.title}
                      </h4>
                      <div className="course-meta">
                        <p className="course-lessons">
                          <CgNotes className="icon-lessons" /> {course.totalLessons} Lessons
                        </p>
                        <p className="course-students">
                          <GrGroup className="icons-students" /> {course.totalStudents} students
                        </p>
                      </div>
                      <div className="flex text-[#777777] text-[14px] items-center">
                        <StarDisplay value={+(course.totalRatings / course.totalNoOfRating).toFixed(1) || 0} />
                        ({course.totalNoOfRating || 0})
                      </div>
                      <hr className="course-card-hr" />
                      <div className="course-instructor-box">
                        <img
                          src={course?.instructorId?.profile || profile}
                          className="course-instructor-img"
                          alt=""
                        />
                        <h4 className="course-intructor-name">{course?.instructorId?.firstName || '' + " " + course?.instructorId?.lastName || ''}</h4>
                      </div>
                    </div>
                  </Fragment>
                );
              })}
            </>
          ) : (
            // No courses found
            <>
              <p className="text-center text-gray-500 mt-10 text-lg font-medium">
                No courses found
              </p>
            </>
          )}
        </div>
      </div>
    </>
  );
}
export default Courses;
