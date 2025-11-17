import { CgNotes } from "react-icons/cg";
import { GrGroup } from "react-icons/gr";
import { MdCurrencyRupee } from "react-icons/md";
import profile from "../../../assets/banner-man-1.png";

import { FaHeart } from "react-icons/fa6";
import StarDisplay from "../Star/StarDisplay";
import Aos from "aos";
import "aos/dist/aos.css";
import React, { memo, useEffect } from "react";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../Redux/store";
import { toggleWishlist } from "../../../Redux/Slices/Wishlist/WishlistThunk";
import { addToCart } from "../../../Redux/Slices/Cart/CartThunk";
import { useNavigate } from "react-router-dom";

function CourseSection() {
  return (
    <>
      <div className="course-section">
        <h3 className="wishlist-heading">Wishlist</h3>
        <CourseList />
      </div>
    </>
  );
}

function CourseList() {
  const wishlist = useSelector((state: RootState) => state.wishlist);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    Aos.init({ once: true, duration: 800 });
  }, []);

  const handdleToggle = (
    e: React.MouseEvent<HTMLDivElement>,
    courseId: string
  ) => {
    e.stopPropagation();
    dispatch(toggleWishlist(courseId));
  };
  const handleAddToCart = (
    e: React.MouseEvent<HTMLButtonElement>,
    courseId: string
  ) => {
    dispatch(addToCart(courseId));
  };
  return (
    <>
      {wishlist.status === "loading" ? (
        <div className="course-lists mt-2">
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
          
        </div>
      ) : wishlist.wishlist.length === 0 ? (
        <div className="flex justify-center items-center h-30 text-gray-400 font-normal">
          No courses found in wishlist.
        </div>
      ) : (
        <div className="course-lists mt-2">
          {wishlist.wishlist.map((item) => (
            <div
              key={item.courseId._id} // Always provide a key when mapping
              className="course-card"
              onClick={() => navigate(`/detail/${item.courseId._id}`)}
              data-aos="zoom-in"
              data-aos-easing="ease-in-out"
            >
              <div className="course-item-thumbnail-cont">
                <img
                  src={item?.courseId?.thumbnail || ""}
                  className="course-thumbnail-img"
                  alt="course-thumbnail"
                />
                <div
                  className="course-wishlist-buttn"
                  onClick={(e) => handdleToggle(e, item.courseId._id)}
                >
                  <FaHeart className="wishlist-selected-icon" />
                </div>
                <div className="flex justify-end">
                  <p className="course-price">
                    Price: <MdCurrencyRupee className="course-currency-icon" />{" "}
                    {item?.courseId?.price || ""}
                  </p>
                </div>
              </div>

              <h4 className="course-title">{item?.courseId?.title || ""}</h4>

              <div className="course-meta">
                <p className="course-lessons">
                  <CgNotes className="icon-lessons" />{" "}
                  {item?.courseId?.totalLessons || 0} Lessons
                </p>
                <p className="course-students">
                  <GrGroup className="icons-students" />{" "}
                  {item?.courseId?.totalStudents || 0}+ students
                </p>
              </div>

              <div className="flex justify-between my-1">
                <div className="flex text-[#777777] text-[14px] items-center">
                  <StarDisplay
                    value={
                      +(
                        item?.courseId?.totalRatings /
                        item?.courseId.totalNoOfRating
                      ).toFixed(1) || 0
                    }
                  />
                  ({item?.courseId?.totalNoOfRating || 0})
                </div>
                <button
                  className="wishlist-addToCart"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToCart(e, item.courseId._id);
                  }}
                >
                  Add to cart
                </button>
              </div>

              <hr className="course-card-hr" />

              <div className="course-instructor-box">
                <img src={profile} className="course-instructor-img" alt="" />
                <h4 className="course-intructor-name">
                  {item?.courseId?.instructorId?.firstName +
                    " " +
                    item?.courseId?.instructorId?.lastName || ""}
                </h4>
              </div>
            </div>
          ))}
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
              <div className="flex justify-between my-1">
                <div className="flex text-[#777777] text-[14px] items-center ">
                  <StarDisplay value={4} />
                  (4)
                </div>
                <button className="wishlist-addToCart">Add to cart</button>
              </div>
              <hr className="course-card-hr" />
              <div className="course-instructor-box">
                <img src={profile} className="course-instructor-img" alt="" />
                <h4 className="course-intructor-name">Andrew Tate</h4>
              </div>
            </div> */}
        </div>
      )}
    </>
  );
}

function WishlistComponent() {
  return (
    <>
      <CourseSection />
    </>
  );
}

const Wishlist = memo(WishlistComponent);

export default Wishlist;
