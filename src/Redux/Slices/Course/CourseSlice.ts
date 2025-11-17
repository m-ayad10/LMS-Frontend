import { createSlice } from "@reduxjs/toolkit";
import { deleteCourse, fetchCourses, postCourses, toggleCourseArchieve } from "./CourseThunk";
import type { CourseSliceState } from "./CourseType";
import toast from "react-hot-toast";


const initialState:CourseSliceState={
    courses:[],
    status:'idle',
    error:null
}
const CourseSlice=createSlice({
    name:'courses',
    initialState,
    reducers:{
        editCourse:(state,action)=>{
            const data=action.payload.course
            const index=state.courses.findIndex((value)=>value._id=data._id)
            state.courses[index]=data
        }
    },
    extraReducers:(builder)=>{
        builder
        //fetch course
        .addCase(fetchCourses.pending,(state)=>{
            state.status="loading";
        })
        .addCase(fetchCourses.rejected,(state,action)=>{
            state.status='failed';
            state.error=action.payload as string;
        })
        .addCase(fetchCourses.fulfilled,(state,action)=>{
            state.status='succeeded';
            state.courses=action.payload.data||[];
        })

        //post courses
        .addCase(postCourses.pending,(state)=>{
            
        })
        .addCase(postCourses.rejected,(state,action)=>{
            toast.error(action.payload||"Failed to post Course")
        })
        .addCase(postCourses.fulfilled,(state,action)=>{
            state.status='succeeded'
            state.courses.push(action.payload.data);
        })

        //toogle archive post 
        .addCase(toggleCourseArchieve.pending,(state)=>{
            
        })
        .addCase(toggleCourseArchieve.rejected,(state,action)=>{
            toast.error(action.payload||"Something went wrong");
        })
        .addCase(toggleCourseArchieve.fulfilled,(state,action)=>{
            state.status='succeeded';
            state.courses=action.payload.data||[];
        })

        // delete course
        .addCase(deleteCourse.pending,(state)=>{

        })
        .addCase(deleteCourse.rejected,(state,action)=>{
            
        })
        .addCase(deleteCourse.fulfilled,(state,action)=>{
            state.status='succeeded';
            state.courses=action.payload.data
        })
    }

})

export const {editCourse}=CourseSlice.actions

export default CourseSlice.reducer