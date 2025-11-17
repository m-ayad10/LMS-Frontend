// AddCourseForm.tsx
import React, { useContext } from "react";
;
import AddCourseBasic from "../AddCourseBasic/AddCourseBasics";
import AddCoursePricing from "../AddCoursePricing/AddCoursePricing";
import AddCourseMedia from "../AddCourseMedia/AddCourseMedia";
import AddCuriculum from "../AddCuriculum/AddCuriculum";
import { activeTabContext } from "../InstructorAddCourse/InstructorAddCourse";


function AddCourseForm() {
  const { activeTab } = useContext(activeTabContext);

  return (
    <div className="add-course-form-cont">
      <form action="">
        {activeTab === "basic" && <AddCourseBasic />}
        {activeTab === "pricing" && <AddCoursePricing />}
        {activeTab === "media" && <AddCourseMedia />}
        {activeTab === "curiculum" && <AddCuriculum />}
      </form>
    </div>
  );
}

export default React.memo(AddCourseForm);
