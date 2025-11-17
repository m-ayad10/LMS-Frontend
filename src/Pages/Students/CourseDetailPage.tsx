import { useEffect, useState } from "react";
import CourseDetail from "../../Components/Student/CourseDetail/CourseDetail";
import Footer from "../../Components/Student/Footer/Footer";
import Navbar from "../../Components/Student/Navbar/Navbar";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../../Redux/store";
import type { Enrolled } from "../../Redux/Slices/Enrolled/EnrolledType";
import CourseWatch from "../../Components/Student/CourseEnrolledView/CourseEnrolledView";

function CourseDetailPage() {
  const enrolled = useSelector((state: RootState) => state.enrolled);
  const { id } = useParams();
  const [courseData, setCourseData] = useState<Enrolled>();

  useEffect(() => {
    if (enrolled.status === "succeeded") {
      const find = enrolled.enrolled.find((value) => value.courseId._id === id);
      setCourseData(find);
    }
  }, [enrolled.status]);

  useEffect(() => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  return (
    <>
      <Navbar />
      {courseData ? <CourseWatch courseData={courseData} /> : <CourseDetail />}
      <Footer />
    </>
  );
}

export default CourseDetailPage;
