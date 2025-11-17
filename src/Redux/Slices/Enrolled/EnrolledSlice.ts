import { createSlice } from "@reduxjs/toolkit";
import { enrollFromCart, fetchEnrollded } from "./EnrolledThunk";
import type { EnrolledSliceState } from "./EnrolledType";
import toast from "react-hot-toast";


const initialState:EnrolledSliceState={
        status:'idle',
        enrolled:[],
        error:null
}

const EnrolledSlice=createSlice({
    name:'enrolled',
    initialState,
    reducers:{
        editEnrolled:(state,action)=>{
            const data=action.payload.data
            const index=state.enrolled.findIndex((value)=>value._id===data._id)
            if(index!==-1)
            {
                state.enrolled[index]=data
            }
        }
    },
    extraReducers:(builder)=>{
        builder
        //fetch erollment
        .addCase(fetchEnrollded.pending,(state)=>{
            state.status='loading';
        })
        .addCase(fetchEnrollded.rejected,(state,action)=>{
            state.status='failed';
            state.error=action.payload||null;
        })
        .addCase(fetchEnrollded.fulfilled,(state,action)=>{
            state.status='succeeded';
            state.enrolled=action.payload.data;
        })

        // .addCase(enrollFromCart.pending,(state)=>{
            
        // })
        //  .addCase(enrollFromCart.rejected,(state,action)=>{
            
        // })
         .addCase(enrollFromCart.fulfilled,(state,action)=>{
            state.status='succeeded';
            toast.success(action.payload.message||"Course Enrolled");
            state.enrolled=action.payload.data;
        })
    }
})

export const {editEnrolled}=EnrolledSlice.actions

export default EnrolledSlice.reducer