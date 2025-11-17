import { createSlice } from "@reduxjs/toolkit";
import type { AdminDashboardState } from "./AdminDashboardTypes";
import { fetchAdminDsahboard } from "./AdminDashboardThunk";


const initialState:AdminDashboardState={
    error:null,
    enrolled:[],
    students:[],
    instructors:[],
    status:'idle'
}
const AdminDashboardSlice=createSlice({
    name:"AdminDashboard",
    initialState,
    reducers:{
        editStudent:(state,action)=>{
            const newUser=action.payload.data
            const index=state.students.findIndex((val)=>val._id===newUser._id)
            if(index!==-1)
            {
                state.students[index]=newUser
            }
        },
        editInstructor:(state,action)=>{
            const newUser=action.payload.data
            const index=state.instructors.findIndex((val)=>val._id===newUser._id)
            if(index!==-1)
            {
                state.instructors[index]=newUser
            }
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchAdminDsahboard.pending,(state)=>{
            state.status='loading'
        })
        .addCase(fetchAdminDsahboard.rejected,(state,action)=>{
            state.status='failed';
            state.error=action.payload||null
        })
        .addCase(fetchAdminDsahboard.fulfilled,(state,action)=>{
            state.status='succeeded';
            state.instructors=action.payload.instructors;
            state.students=action.payload.students;
            state.enrolled=action.payload.enrolled;
        })

        // .addCase(postCourses.fulfilled,(state,action)=>{
        //     state.status='succeeded';
        //     state.courses.push(action.payload.data)
        // })
        // .addCase(toggleCourseArchieve.fulfilled,(state,action)=>{
        //     state.courses=action.payload.data||[]
        // })
    }
})

export const {editInstructor,editStudent}=AdminDashboardSlice.actions


export default AdminDashboardSlice.reducer