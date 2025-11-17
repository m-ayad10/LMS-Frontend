import type { Cart } from "../Cart/CartType";
import type { Course } from "../Course/CourseType";


export interface Enrolled{
    _id:string,
    studentId:string,
    courseId:Course,
    completedLesson:number[],
    progress:number,
    createdAt:Date,
    [key:string]:any
}

export interface EnrolledSliceState{
    error:string|null,
    enrolled:Enrolled[]|[],
    status:'idle'|'failed'|'succeeded'|'loading'
}

export interface EnrolledReturn{
    data:Enrolled[],
    message?:string,
    success:boolean,
    cart?:Cart,
    [key:string]:any
}

