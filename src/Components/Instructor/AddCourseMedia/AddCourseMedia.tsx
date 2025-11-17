// AddCourseMedia.tsx
import React, { useCallback, useContext, useState } from "react";
import { BiSolidImageAdd } from "react-icons/bi";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { RiVideoAddFill } from "react-icons/ri";
import "./style.css";
import "./responsive.css";
import { activeTabContext } from "../InstructorAddCourse/InstructorAddCourse";
import { CourseContext } from "../AddCourseForm/CourseProvider";

function AddCourseMedia() {
  const { setActiveTab } = useContext(activeTabContext);
  const {  setCourse } = useContext(CourseContext);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0] ?? null;
      if (!file) return;
      if (file.type.includes("image")) {
        setCourse((c) => ({ ...c, thumbnail: file }));
        setImagePreview(URL.createObjectURL(file));
      } else if (file.type.includes("video")) {
        setCourse((c) => ({ ...c, previewVideo: file }));
        setVideoPreview(URL.createObjectURL(file));
      }
    },
    [setCourse]
  );

  return (
    <>
      <div className="add-course-thumbnail-section">
        <label className="add-course-label" htmlFor="thumbnail">
          Thumbnail
        </label>
        <br />
        <input
          type="file"
          id="add-thumbnail"
          onChange={handleFileChange}
          hidden
          accept="image/*"
          className="add-course-file-input"
        />
        <label htmlFor="add-thumbnail">
          {imagePreview ? (
            <img src={imagePreview} className="add-course-thumbnail-preview" alt="" />
          ) : (
            <BiSolidImageAdd className="add-course-media-icon" />
          )}
        </label>
      </div>
      <div className="add-course-video-section">
        <label className="add-course-label" htmlFor="thumbnail">
          Preview video
        </label>
        <br />
        <input
          type="file"
          id="add-preview"
          hidden
          accept="video/*"
          onChange={handleFileChange}
          className="add-course-file-input"
        />
        <label htmlFor="add-preview">
          {videoPreview ? (
            <video src={videoPreview} controls className="add-course-preview-vedio"></video>
          ) : (
            <RiVideoAddFill className="add-course-media-icon" />
          )}
        </label>
      </div>
      <div className=" mt-4 add-course-navigation  justify-between">
        <button
          className="add-course-nav-btn"
          onClick={() => setActiveTab("pricing")}
        >
          <FaArrowLeftLong className="add-course-nav-btn-icon" /> Prev
        </button>
        <button
          className="add-course-nav-btn"
          onClick={() => setActiveTab("curiculum")}
        >
          Next <FaArrowRightLong className="add-course-nav-btn-icon" />
        </button>
      </div>
    </>
  );
}

export default React.memo(AddCourseMedia);
