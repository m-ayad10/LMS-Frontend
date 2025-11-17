import { createAsyncThunk } from "@reduxjs/toolkit";
import { server_url } from "../../../Hooks/customHook";
import type { AdminDashboardReturn } from "./AdminDashboardTypes";


export const fetchAdminDsahboard=createAsyncThunk<AdminDashboardReturn,void,{rejectValue:string}>('AdminDashboard/fetch',async(_,{rejectWithValue})=>{
    try {
        const response =await fetch(`${server_url}/admin/dashboard`,{credentials:"include"})
        const data:AdminDashboardReturn=await response.json()
        if(!data.success)
        {
            return rejectWithValue(data.message||"Something went wrong")
        }
        console.log(data)
        return data
    } catch (error:any) {
        return rejectWithValue(error.message||error||"Interrnal server error")
    }
})



