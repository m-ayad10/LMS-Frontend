import { FaBook } from "react-icons/fa6";
import "./style.css";
import "./responsive.css";
import { useSelector } from "react-redux";
import type { RootState } from "../../../Redux/store";
import React, { useEffect, useState, useTransition } from "react";
import type { Course } from "../../../Redux/Slices/Course/CourseType";
import InstructorCourseCard from "../../Instructor/InstructorCourseCard/InstructorCourseCard";

function AdminCourses() {
  const courses = useSelector(
    (state: RootState) => state.courses
  );
  const [isPending, startTransition] = useTransition();
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState<Course[]>([]);
  const [sort, setSort] = useState<"latest" | "oldest">("latest");

  useEffect(() => {
  if (!courses?.courses) return;

  startTransition(() => {
    let updated = [...courses.courses];

    if (search.trim()) {
      const lowerSearch = search.toLowerCase();
      updated = updated.filter((c) =>
        c.title.toLowerCase().includes(lowerSearch)
      );
    }

    updated.sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return sort === "latest" ? dateB - dateA : dateA - dateB;
    });

    setFiltered(updated);
  });
}, [courses?.courses, search, sort]);

const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setSearch(e.target.value);
};

const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  setSort(e.target.value as "latest" | "oldest");
};

  return (
    <>
      <div className="course-manage-section">
        <div className="courses-manage-header">
          <div className="courses-manage-header-left">
            <FaBook className="courses-manage-header-icon" />
            <h3 className="courses-manage-title">Courses</h3>
          </div>
          {/* <Link to={"/instructor/addcourse"}>
            <button className="courses-manage-add-btn">+ Add new course</button>
          </Link> */}
        </div>
        <div className="courses-manage-filter-bar">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={handleSearchChange}
            className="courses-manage-search-input"
          />
          <div className="courses-manage-sort-cont">
            <p className="courses-manage-sort-label">Sort by:</p>
            <select
              name=""
              className="courses-manage-sort-dropdown"
              value={sort}
              onChange={handleSortChange}
              id=""
            >
              <option value="latest">Latest</option>
              <option value="oldest">Oldest</option>
            </select>
          </div>
        </div>
        <hr className="w-full mt-2" />
      </div>
      {isPending ? (
        <div className="flex justify-center items-center py-7">
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 border-4 border-t-transparent border-indigo-500 rounded-full animate-spin"></div>
            <p className="text-gray-600 font-medium">Loading courses...</p>
          </div>
        </div>
      ) : (
        <InstructorCourseCard courses={filtered} />
      )}
    </>
  );
}

export default AdminCourses;
