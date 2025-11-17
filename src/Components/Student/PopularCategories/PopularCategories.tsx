// import img from "../../../assets/html logo.webp";
import "./style.css";
import "./responsive.css";
import Aos from "aos";
import "aos/dist/aos.css";
import { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../../Redux/store";

function PopularCategories() {
  const categories = useSelector((state: RootState) => state.category);
  useEffect(() => {
    Aos.init({ once: true, duration: 800 });
  }, []);
  return (
    <>
      <div className="categories-section">
        <h2 className="categories-section-title">Popular categories</h2>
        {categories.status === "loading" ? (
          <p className="text-center text-gray-400 mt-10 text-lg font-medium">
            Loading categories...
          </p>
        ) : categories.category.length === 0 ? (
          <p className="text-gray-500 text-lg font-medium">
            No courses found in wishlist.
          </p>
        ) : null}
        <div className="categories-list">
          {categories.category.map((category) => {
            return (
              <Fragment key={category._id} >
                <div
                  
                  className="categories-item"
                  data-aos="zoom-in"
                  data-aos-easing="ease-in-out"
                >
                  <img
                    src={category.url}
                    alt=""
                    className="categories-item-img"
                  />
                  <div className="content-center">
                    <h3 className="categories-item-name">{category.name}</h3>
                    {/* <p className="categories-item-count">3 courses</p> */}
                  </div>
                </div>
              </Fragment>
            );
          })}
          {/* <div
            className="categories-item"
            data-aos="zoom-in"
            data-aos-easing="ease-in-out"
          >
            <img src={img} alt="" className="categories-item-img" />
            <div className="content-center">
              <h3 className="categories-item-name">HTML & CSS</h3>
              <p className="categories-item-count">3 courses</p>
            </div>
          </div>
          <div
            className="categories-item"
            data-aos="zoom-in"
            data-aos-easing="ease-in-out"
          >
            <img src={img} alt="" className="categories-item-img" />
            <div className="content-center">
              <h3 className="categories-item-name">HTML & CSS</h3>
              <p className="categories-item-count">3 courses</p>
            </div>
          </div>
          <div
            className="categories-item"
            data-aos="zoom-in"
            data-aos-easing="ease-in-out"
          >
            <img src={img} alt="" className="categories-item-img" />
            <div className="content-center">
              <h3 className="categories-item-name">HTML & CSS</h3>
              <p className="categories-item-count">3 courses</p>
            </div>
          </div>
          <div
            className="categories-item"
            data-aos="zoom-in"
            data-aos-easing="ease-in-out"
          >
            <img src={img} alt="" className="categories-item-img" />
            <div className="content-center">
              <h3 className="categories-item-name">HTML & CSS</h3>
              <p className="categories-item-count">3 courses</p>
            </div>
          </div>
          <div
            className="categories-item"
            data-aos="zoom-in"
            data-aos-easing="ease-in-out"
          >
            <img src={img} alt="" className="categories-item-img" />
            <div className="content-center">
              <h3 className="categories-item-name">HTML & CSS</h3>
              <p className="categories-item-count">3 courses</p>
            </div>
          </div> */}
          {/* <div
            className="categories-item"
            data-aos="zoom-in"
            data-aos-easing="ease-in-out"
          >
            <img src={img} alt="" className="categories-item-img" />
            <div className="content-center">
              <h3 className="categories-item-name">HTML & CSS</h3>
              <p className="categories-item-count">3 courses</p>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
}
export default PopularCategories;
