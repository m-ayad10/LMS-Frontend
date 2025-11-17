import React, { useEffect, useState } from 'react';
import CourseWatch from '../../Components/Student/CourseEnrolledView/CourseEnrolledView';
import { useParams } from 'react-router-dom';
// import { server_url } from '../../Hooks/customHook';
// import toast from 'react-hot-toast';
// import type { Course } from '../../Redux/Slices/Course/CourseType';
import type { Enrolled } from '../../Redux/Slices/Enrolled/EnrolledType';
import { useSelector } from 'react-redux';
import type { RootState } from '../../Redux/store';

// interface EnrolledReturn{
//     data:Enrolled,
//     message:string,
//     success:boolean,
// }

const DummyCourseDetail: React.FC = () => {
  const [courseData, setCourseData] = useState<Enrolled|null>(null);
  const {id}=useParams()
  const Enrolled=useSelector((state:RootState)=>state.enrolled)

 useEffect(() => {
    if (!id) return;
    console.log(id)
    if(Enrolled.status==='succeeded')
    {
         const course=Enrolled.enrolled.find((value)=>value.courseId._id===id)
         setCourseData(course||null)
    }
  }, [id,Enrolled.status]);

  return (
    <CourseWatch
      courseData={courseData}
    />
  );
};

export default DummyCourseDetail;