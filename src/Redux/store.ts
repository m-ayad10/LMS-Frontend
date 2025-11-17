import { configureStore } from "@reduxjs/toolkit"
import AuthSlice from "./Slices/Auth/AuthSlice"
import CartSlice from "./Slices/Cart/CartSlice"
import CategorySlice from "./Slices/Category/CategorySlice"
import CourseSlice from "./Slices/Course/CourseSlice"
import WishlistSlice from "./Slices/Wishlist/WishlistSlice"
import EnrolledSlice from "./Slices/Enrolled/EnrolledSlice"
import InstructorDashboardSlice from "./Slices/GetIntructorDashboard/IntructorDashboardSlice"
import AdminDashboardSlice from "./Slices/AdminDashboard/AdminDashboardSlice"


const store=configureStore({
    reducer:{
        courses:CourseSlice,
        cart:CartSlice,
        wishlist:WishlistSlice,
        category:CategorySlice,
        user:AuthSlice,
        enrolled:EnrolledSlice,
        instructorDashboard:InstructorDashboardSlice,
        adminDashboard:AdminDashboardSlice
    }
})

export default store

export type RootState=ReturnType<typeof store.getState>
export type AppDispatch=typeof store.dispatch