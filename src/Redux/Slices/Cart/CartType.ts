import type { Course } from "../Course/CourseType"
import type { Wishlist } from "../Wishlist/WishlistType";


export interface cartCourse{
    courseId:Course
}
export interface Cart{
    _id:string,
    studentId?:string,
    courses?:cartCourse[],
    totalPrice?:number
}

export interface CartSliceState{
    error:string|null,
    cart:Cart|null,
    status:'idle'|'failed'|'succeeded'|'loading'
}

export interface CartReturn{
    message?:string;
    success?:boolean,
    data:Cart,
    [key:string]:any
}

// interface addToCartData{
//     cart:Cart,
//     wishlist:Wishlist[]
// }
export interface AddToCartReturn{
    message?:string,
    success?:boolean,
    cart:Cart,
    wishlist:Wishlist[],
    [key:string]:any
}