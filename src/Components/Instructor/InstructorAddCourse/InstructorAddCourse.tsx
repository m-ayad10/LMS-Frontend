import { FaBook } from "react-icons/fa6";
import "./style.css";
import "./responsive.css";
import { createContext, useState } from "react";
import AddCourseForm from "../AddCourseForm/AddCourseForm";
import {  AppProviders } from "../AddCourseForm/CourseProvider";

type ActiveTab = "basic" | "pricing" | "media" | "curiculum" | "finish";

type ActiveTabContextType = {
  activeTab: ActiveTab;
  setActiveTab: React.Dispatch<React.SetStateAction<ActiveTab>>;
};

  export const activeTabContext = createContext<ActiveTabContextType>({ activeTab:'basic', setActiveTab:()=>{} });


function InstructorAddCourse() {
      const [activeTab, setActiveTab] = useState<ActiveTab>("basic");
    //   const {activeTab,setActiveTab}=useContext(ActiveTabContext)

  return (
    <>
      <div className="instructor-add-course-section">
        <div className="insctructor-add-course-header">
          <div className="insctructor-add-course-title">
            <FaBook className="insctructor-add-course-icon" />
            Add new Course
          </div>
        </div>
        <div className="instructor-add-course-tab">
          <button
            onClick={() => setActiveTab("basic")}
            className={`add-course-tab-btn ${
              activeTab === "basic" && "active-add-course-tab-btn"
            } `}
          >
            Basic
          </button>
          <button
            onClick={() => setActiveTab("pricing")}
            className={`add-course-tab-btn ${
              activeTab === "pricing" && "active-add-course-tab-btn"
            } `}
          >
            Pricing
          </button>
          <button
            onClick={() => setActiveTab("media")}
            className={`add-course-tab-btn ${
              activeTab === "media" && "active-add-course-tab-btn"
            } `}
          >
            Media
          </button>
          <button
            onClick={() => setActiveTab("curiculum")}
            className={`add-course-tab-btn ${
              activeTab === "curiculum" && "active-add-course-tab-btn"
            } `}
          >
            Curiculum
          </button>
        </div>
        <AppProviders>
        <activeTabContext.Provider value={{ activeTab, setActiveTab }}>
          <AddCourseForm  />
        </activeTabContext.Provider>
        </AppProviders>
      </div>
    </>
  );
}

export default InstructorAddCourse;
