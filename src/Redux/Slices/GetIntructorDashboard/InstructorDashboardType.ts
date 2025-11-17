import type { Course } from "../Course/CourseType";
import type { Enrolled } from "../Enrolled/EnrolledType";

export interface InstructorDashboardState {
  error: string | null;
  courses: Course[]; // Replace `any` with your Course type if you have one
  totalStudents: number;
  enrolled:Enrolled[],
  status: "idle" | "loading" | "succeeded" | "failed";
}


export interface InstructorDashboardReturn{
    message:string,
    courses:Course[],
    totalStudents:number,
    success:boolean,
    enrolled:Enrolled[]
    [key:string]:any
}