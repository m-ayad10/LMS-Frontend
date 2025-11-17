import { createSlice } from "@reduxjs/toolkit";
import { fetchInstructorDsahboard } from "./InstructorDashboardThunk";
import type { InstructorDashboardState } from "./InstructorDashboardType";
import { postCourses, toggleCourseArchieve } from "../Course/CourseThunk";

const initialState:InstructorDashboardState={
    error:null,
    courses:[],
    enrolled:[],
    totalStudents:0,
    status:'idle'
}
const InstructorDashboardSlice=createSlice({
    name:"instructorDashboard",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(fetchInstructorDsahboard.pending,(state)=>{
            state.status='loading'
        })
        .addCase(fetchInstructorDsahboard.rejected,(state,action)=>{
            state.status='failed';
            state.error=action.payload||null
        })
        .addCase(fetchInstructorDsahboard.fulfilled,(state,action)=>{
            state.status='succeeded';
            state.courses.push(...action.payload.courses);
            state.totalStudents=action.payload.totalStudents;
            state.enrolled=action.payload.enrolled
        })

        .addCase(postCourses.fulfilled,(state,action)=>{
            state.status='succeeded';
            state.courses.push(action.payload.data)
        })
        .addCase(toggleCourseArchieve.fulfilled,(state,action)=>{
            state.courses=action.payload.data||[]
        })
    }
})


export default InstructorDashboardSlice.reducer