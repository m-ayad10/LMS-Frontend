import { AiOutlineSearch } from "react-icons/ai";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import "./style.css";
import "./responsive.css";
import React, { useEffect, useState, useTransition } from "react";
import CourseCard from "../CourseCard/CourseCard";
import SearchModal from "../Modal/Modal";
import { useSelector } from "react-redux";
import type { RootState } from "../../../Redux/store";
import type { Course } from "../../../Redux/Slices/Course/CourseType";
import { useLocation, useNavigate } from "react-router-dom";

type CourseFilterLevel = "All" | "Beginner" | "Intermediate" | "Advanced";

function SearchCourses() {
  const [open, setOpen] = useState<boolean>(false);
  const courses = useSelector((state: RootState) => state.courses);
  const [filteredCourses, setFilterCourses] = useState<Course[]>([]);
  const [search, setSearch] = useState<string>("");
  const [isPending, startTransition] = useTransition();
  const location=useLocation()
  const navigate=useNavigate()
  const [sort, setSort] = useState<"price" | "date">("price");
    const [selectedCategories,setSelectedCategories]=useState<string[]>([])
    const [level, setLevel] = useState<
      "All" | "Beginner" | "Intermediate" | "Advanced"
    >("All");

  useEffect(() => {  
    if (courses.status === "succeeded") {
      let sorted = [...courses.courses];
      setFilterCourses(sorted.sort((a, b) => a.price - b.price));
      setSearch(location?.state?.search||'')
navigate(location.pathname, { replace: true, state: {} });    }
  }, [courses.status]);

  // const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   let query = e.target.value;
  //   setSearch(query);
  //   startTransition(() => {
  //     if (courses.status === "succeeded") {
  //       let filter = courses.courses.filter((value) => {
  //         return value.title.toLowerCase().includes(query.toLowerCase());
  //       });
  //       setFilterCourses((prev) => {
  //         return [...filter];
  //       });
  //     }
  //   });
  // };
  // const handleClearSearch = () => {
  //   if (search.length === 0) {
  //     return;
  //   }
  //   setSearch("");
  //   if (courses.status === "succeeded") {
  //     startTransition(() => {
  //       setFilterCourses(courses.courses);
  //     });
  //   }
  // };

  useEffect(() => {
    if (courses.status !== "succeeded") return;

    startTransition(() => {
      let filtered = [...courses.courses];

      if (search.trim().length > 0) {
        filtered = filtered.filter((course) =>
          course.title.toLowerCase().includes(search.toLowerCase())
        );
      }

      if (level !== "All") {
        filtered = filtered.filter((course) => course.level === level);
      }

      if (selectedCategories.length > 0) {
        filtered = filtered.filter((course) =>
          selectedCategories.includes(course.category)
        );
      }

      setFilterCourses(filtered);
    });
  }, [courses.courses, search, level, selectedCategories, sort]);

  // Handlers
  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleClearSearch = () => {
    if (search.length > 0) {
      setSearch("");
    }
  };


  const handleApplyFilter = (level: CourseFilterLevel, category: string[]) => {
    setLevel(level);
    setSelectedCategories(category);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  // const handleClose = () => {
  //   setOpen(false);
  // };

  const handleSort = (type: "price" | "date") => {
    setSort(type);

    const sortedCourses = [...filteredCourses]; // clone array before sorting
    startTransition(() => {
      if (type === "price") {
        sortedCourses.sort((a, b) => a.price - b.price);
      } else {
        sortedCourses.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      }
    });

    setFilterCourses(sortedCourses);
  };

  return (
    <>
      <div className="search-section">
        <div className="search-bar">
          <div className="search-input-wrapper">
            <AiOutlineSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search..."
              className="search-page-input-field"
              value={search}
              onChange={handleQueryChange}
            />
          </div>
          <button className="search-clear-buttn" onClick={handleClearSearch}>
            Clear{" "}
          </button>
          <button className="search-page-search-buttn">Search </button>
        </div>
        <div className="search-page-filters">
          <div className="filter-options">
            <button
              className={`filter-option ${
                sort === "date" ? "active-filter-option" : ""
              }`}
              onClick={() => handleSort("date")}
            >
              Sort by date
            </button>

            <button
              className={`filter-option ${
                sort === "price" ? "active-filter-option" : ""
              }`}
              onClick={() => handleSort("price")}
            >
              Sort by price
            </button>
          </div>

          <div className="more-filters" onClick={handleOpen}>
            <HiOutlineAdjustmentsHorizontal className="filter-icon" />
            More filters
          </div>
        </div>
      </div>
      <SearchModal open={open}  handleApplyFilter={handleApplyFilter}  setOpen={setOpen} />
      {isPending ? (
        <>
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
        </>
      ) : (
        <>
          {courses.status === "loading" ? (
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
          ) : courses.courses.length === 0 ||filteredCourses.length === 0? (
            <div className="text-center text-gray-500 py-10">
              No courses found.
            </div>
          ) : (
            <CourseCard courses={filteredCourses} />
          )}
        </>
      )}
    </>
  );
}
 

export default SearchCourses;
