// AddCuriculum.tsx
import React, { useCallback, useContext, useState } from "react";
import { RiVideoAddFill } from "react-icons/ri";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { v4 as uuidv4 } from "uuid";
import "./style.css";
import { activeTabContext } from "../InstructorAddCourse/InstructorAddCourse";
import { CourseContext, type Lesson } from "../AddCourseForm/CourseProvider";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../../Redux/store";
import { postCourses } from "../../../Redux/Slices/Course/CourseThunk";
import { useNavigate } from "react-router-dom";

function AddCuriculum() {
  const { setActiveTab } = useContext(activeTabContext);
  const { course, setCourse } = useContext(CourseContext);
  const [loading,setLoading]=useState<boolean>(false)
  const dispatch=useDispatch<AppDispatch>()
  const navigate=useNavigate()

  const addLesson = useCallback(() => {
    const newLesson: Lesson = { id: uuidv4(), name: "", file: undefined };
    setCourse((prev) => ({ ...prev, lessons: [...prev.lessons, newLesson] }));
  }, [setCourse]);

  const updateLessonName = useCallback(
    (id: string, value: string) => {
      setCourse((prev) => ({
        ...prev,
        lessons: prev.lessons.map((l) =>
          l.id === id ? { ...l, name: value } : l
        ),
      }));
    },
    [setCourse]
  );

  const handleFileChange = useCallback(
    (id: string, file?: File | null) => {
      setCourse((prev) => ({
        ...prev,
        lessons: prev.lessons.map((l) =>
          l.id === id ? { ...l, file: file ?? null } : l
        ),
      }));
    },
    [setCourse]
  );

  const deleteLesson = useCallback(
    (id: string) => {
      setCourse((prev) => ({
        ...prev,
        lessons: prev.lessons.filter((l) => l.id !== id),
      }));
    },
    [setCourse]
  );

  const handleSubmit = useCallback(
    async(e?: React.MouseEvent) => {
      e?.preventDefault();

      const errors: string[] = [];

      if (!course.title.trim()) errors.push("Title is required.");
      if (!course.description.trim()) errors.push("Description is required.");
      if (!course.category.trim()) errors.push("Category is required.");
      if (!course.level.trim()) errors.push("Level is required.");
      if (!course.thumbnail) errors.push("Thumbnail is required.");
      if (!course.previewVideo) errors.push("Preview video is required.");

      if (course.isPaid && (course.price === null || course.price <= 0)) {
        errors.push("Valid price is required for paid courses.");
      }

      if (course.lessons.length === 0) {
        errors.push("At least one lesson is required.");
      } else {
        course.lessons.forEach((lesson, index) => {
          if (!lesson.name.trim())
            errors.push(`Lesson ${index + 1} name is required.`);
          if (!lesson.file)
            errors.push(`Lesson ${index + 1} video is required.`);
        });
      }

      if (errors.length > 0) {
        toast.error("Fill all fields");
        return;
      }
      setLoading(true)
      const formData = new FormData();
      formData.append("title", course.title);
      formData.append("description", course.description);
      formData.append("category", course.category);
      formData.append("level", course.level);
      formData.append("isPaid", String(course.isPaid));
      formData.append("price", String(course.price ?? ""));
      if (course.thumbnail) formData.append("thumbnail", course.thumbnail);
      if (course.previewVideo)
        formData.append("previewVideo", course.previewVideo);

      course.lessons.forEach((lesson) => {
        if (lesson.file) formData.append("lesson", lesson.file);
        formData.append("name", lesson.name);
      });

      await toast.promise(
      dispatch(postCourses(formData)).unwrap(),
       {
        loading: "Uploading course...",
        success: (response) => {
          setLoading(false)
          navigate('/instructor/managecourse')
          return response?.message || "Course uploaded successfully 🎉";
        },
        error: (err) => err || "Failed to upload course",
      },
      {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      }
    );
    },
    [course]
  );

  return (
    <>
     {course.lessons.map((lesson) => {
  return (
    <React.Fragment key={lesson.id}>
      <div className="add-course-video-section">
        <label className="add-course-label" htmlFor="title">
          Lesson Name
        </label>
        <input
          type="text"
          placeholder="Name"
          value={lesson.name}
          onChange={(e) => updateLessonName(lesson.id, e.target.value)}
          className="add-course-input"
        />
        
        <label className="add-course-label" htmlFor="thumbnail">
          Preview video
        </label>
        
        <input
          type="file"
          id={`add-preview-${lesson.id}`}
          hidden
          accept="video/*"
          onChange={(e) =>
            handleFileChange(lesson.id, e.target.files?.[0] ?? null)
          }
          className="add-course-file-input"
        />
        
        <label htmlFor={`add-preview-${lesson.id}`} className="add-course-media-upload">
          {lesson.file ? (
            <video
              src={URL.createObjectURL(lesson.file)}
              controls
              className="add-course-preview-vedio"
            ></video>
          ) : (
            <>
              <RiVideoAddFill className="add-course-media-icon" />
              <span className="add-course-media-label">Click to upload lesson video</span>
            </>
          )}
        </label>
      </div>
      
      <button
        className="add-lesson-delete-btn"
        onClick={(e) => {
          e.preventDefault();
          deleteLesson(lesson.id);
        }}
      >
        Delete Lesson
      </button>
    </React.Fragment>
  );
})}

<div className="flex justify-center">
  <button
    onClick={(e) => {
      e.preventDefault();
      addLesson();
    }}
    className="add-lesson-btn"
  >
    + Add Lesson
  </button>
</div>

<div className="add-course-navigation justify-between">
  <button
    className="add-course-nav-btn prev"
    onClick={() => setActiveTab("media")}
  >
    <FaArrowLeftLong className="add-course-nav-btn-icon" /> Prev
  </button>
  
  {
    loading?<button
    className="add-course-nav-btn add-course-submit-btn"
    onClick={handleSubmit}
    disabled
  >
    Submiting... <FaArrowRightLong className="add-course-nav-btn-icon" />
  </button>:<button
    className="add-course-nav-btn add-course-submit-btn"
    onClick={handleSubmit}
  >
    Submit <FaArrowRightLong className="add-course-nav-btn-icon" />
  </button>
  }
</div>
    </>
  );
}

export default React.memo(AddCuriculum);
