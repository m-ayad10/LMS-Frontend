// AddCourseBasic.tsx
import  { useCallback, useContext } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import "./style.css";
import "./responsive.css";
import { useSelector } from "react-redux";
import type { RootState } from "../../../Redux/store";
import {  CourseContext } from "../AddCourseForm/CourseProvider";
import { activeTabContext } from "../InstructorAddCourse/InstructorAddCourse";

export default function AddCourseBasic() {
  const { setActiveTab } = useContext(activeTabContext);
  const { course, setCourse } = useContext(CourseContext);
  const category = useSelector((state: RootState) => state.category.category);

  const updateField = useCallback(
    (key: keyof typeof course, value: any) => {
      setCourse((c) => ({ ...c, [key]: value }));
    },
    [setCourse]
  );

  return (
    <>
      <label className="add-course-label">Title</label>
      <input
        className="add-course-input"
        placeholder="Title"
        value={course.title}
        onChange={(e) => updateField("title", e.target.value)}
      />

      <label className="add-course-label">Description</label>
      <textarea
        className="add-course-textarea"
        rows={4}
        placeholder="Description"
        value={course.description}
        onChange={(e) => updateField("description", e.target.value)}
      />
      <div className="add-course-select-group-cont">
        <div className="add-course-select-group">
          <label className="add-course-label" htmlFor="">
            Category
          </label>{" "}
          <br />
          <select
            className="add-course-select"
            value={course.category || ""}
            onChange={(e) => updateField("category", e.target.value)}
          >
            <option value="" disabled>
              Select category
            </option>
            {category.map((value) => (
              <option key={value._id} value={value.name}>
                {value.name}
              </option>
            ))}
          </select>
        </div>

        <div className="add-course-select-group">
          <label className="add-course-label" htmlFor="">
            Level
          </label>{" "}
          <br />
          <select
            className="add-course-select"
            value={course.level}
            onChange={(e) => updateField("level", e.target.value as any)}
          >
            <option value="">Select level</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>
      </div>
      <div className="add-course-navigation justify-end" style={{ marginTop: 16 }}>
        <button
          className="add-course-nav-btn"
          onClick={(e) => {
            e.preventDefault();
            setActiveTab("pricing");
          }}
        >
          Next <FaArrowRightLong className="add-course-nav-btn-icon" />
        </button>
      </div>
    </>
  );
}
