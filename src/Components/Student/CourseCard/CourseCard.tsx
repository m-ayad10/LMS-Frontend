import { CgNotes } from "react-icons/cg";
import { FiHeart } from "react-icons/fi";
import { GrGroup } from "react-icons/gr";
import { MdCurrencyRupee } from "react-icons/md";
import profile from "../../../assets/banner-man-1.png";
import { FaHeart } from "react-icons/fa6";
import StarDisplay from "../Star/StarDisplay";
import Aos from "aos";
import "aos/dist/aos.css";
import React, { useEffect } from "react";
// import { useSelector } from "react-redux";
// import type { RootState } from "../../../Redux/store";
import type { Course } from "../../../Redux/Slices/Course/CourseType";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../Redux/store";
import { toggleWishlist } from "../../../Redux/Slices/Wishlist/WishlistThunk";
import { useNavigate } from "react-router-dom";
interface CourseCardProps {
  courses: Course[];
}
function CourseCard({ courses }: CourseCardProps) {
  //   const courses = useSelector((state: RootState) => state.courses);
  const wishlist = useSelector((state: RootState) => state.wishlist);
  const navigate=useNavigate()
  const dispatch=useDispatch<AppDispatch>()
  useEffect(() => {
    Aos.init({
      once: true,
      duration: 400,
    });
  }, []);
  const handleWishlist=(e:React.MouseEvent<HTMLDivElement>,courseId:string)=>{
    e.stopPropagation()
    dispatch(toggleWishlist(courseId))
  }
  return (
    <>
      <div className="course-section">
        <div className="course-lists">
          {courses.map((course) => {
            return (
              <div
                key={course._id}
                className="course-card"
                data-aos="zoom-in"
                onClick={()=>navigate(`/detail/${course._id}`)}
                data-aos-easing="ease-in-out"
              >
                <div className="course-item-thumbnail-cont">
                  <img
                    src={course?.thumbnail}
                    className="course-thumbnail-img"
                    alt="course-thumbnail"
                  />
                  <div className="course-wishlist-buttn" onClick={(e)=>handleWishlist(e,course._id)}>
                    {wishlist.wishlist.some((value) => {
                     return value.courseId._id.toString() === course._id.toString();
                    }) ? (
                      <FaHeart className="wishlist-selected-icon" />
                    ) : (
                      <FiHeart className="wishlist-unselected-icon" />
                    )}
                  </div>
                  <div className="flex justify-end ">
                    <p className="course-price">
                      Price:{" "}
                      <MdCurrencyRupee className="course-currency-icon" />{" "}
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
                   <StarDisplay value={+(course?.totalRatings/course.totalNoOfRating).toFixed(1)||0} />
                ({course?.totalNoOfRating||0})
                </div>
                <hr className="course-card-hr" />
                <div className="course-instructor-box">
                  <img src={profile} className="course-instructor-img" alt="" />
                  <h4 className="course-intructor-name">
                    {course.instructorId
                      ? course?.instructorId?.firstName +
                        " " +
                        course?.instructorId?.lastName
                      : "Intructor not found"}
                  </h4>
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
              <div className="course-wishlist-buttn">
                <FiHeart className="wishlist-unselected-icon" />
                <FaHeart className="wishlist-selected-icon"/>
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
          </div> */}

        </div>
      </div>
    </>
  );
}

export default CourseCard;
