import { createAsyncThunk } from "@reduxjs/toolkit";
import { server_url } from "../../../Hooks/customHook";
import type { InstructorDashboardReturn } from "./InstructorDashboardType";


export const fetchInstructorDsahboard=createAsyncThunk<InstructorDashboardReturn,void,{rejectValue:string}>('instructorDashboard/fetch',async(_,{rejectWithValue})=>{
    try {
        const response =await fetch(`${server_url}/instructor/dashboard`,{credentials:"include"})
        const data:InstructorDashboardReturn=await response.json()
        if(!data.success)
        {
            return rejectWithValue(data.message||"Something went wrong")
        }
        return data
    } catch (error:any) {
        return rejectWithValue(error.message||error||"Interrnal server error")
    }
})

