import type { User } from "../Auth/AuthType"


export interface Lesson{
    sectionName:string,
    url:string,
    public_id?:string
}

export interface Course{
    _id:string,
    instructorId:User,
    title:string,
    description:string,
    category:string,
    level:string,
    isPaid:boolean,
    price:number,
    thumbnail:string,
    previewVideo:string,
    totalLessons?:number,
    totalStudents?:number,
    totalNoOfRating: number,
    totalRatings: number,
    revenue?:number,
    status:'active'|'archieved'|'deleted',
    curiculum:Lesson[],
    createdAt:Date
}
export interface CourseSliceState{
    courses:Course[],
    error:string|null,
    status:'idle'|'failed'|'succeeded'|'loading'
}

export interface CourseReturn{
    message?:string,
    data?:Course[]|[],
    success:boolean,
    [key:string]:any
}
