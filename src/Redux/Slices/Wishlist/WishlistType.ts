import type { Course } from "../Course/CourseType";

export interface Wishlist{
    studentId:string,
    courseId:Course
}

export interface WishlistSliceState{
    error:null|string,
    wishlist:Wishlist[],
    status:'idle'|'failed'|'succeeded'|'loading'
}

export interface WishlistReturn{
    data?:Wishlist[],
    success?:boolean
    message?:string
}