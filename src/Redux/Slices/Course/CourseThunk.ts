import { createAsyncThunk } from "@reduxjs/toolkit"
import type { Course, CourseReturn } from "./CourseType"

const server_url=import.meta.env.VITE_API_URL


export const fetchCourses=createAsyncThunk<CourseReturn,void,{rejectValue:string}>('courses/fetchCourses',async(_,{rejectWithValue})=>{
    try {
        const response=await fetch(`${server_url}/course`,{credentials:'include'})
        const data=await response.json()
        if(!response.ok)
        {
           return rejectWithValue(data.message||"Failed to fetch courses")
        }
        return data
    } catch (error:any) {
       return rejectWithValue("Network server error")
    }
})

interface PostCourseReturn{
    data:Course,
    message:string,
    success:boolean,
    [key:string]:any
}

export const postCourses=createAsyncThunk<PostCourseReturn,FormData,{rejectValue:string}>('courses/postCourse',async(formData,{rejectWithValue})=>{
    try {
        const response=await fetch(`${server_url}/course`,{
        body:formData,
        method:"POST",
        credentials:'include'
       })
       const data:PostCourseReturn=await response.json()
       if(!response.ok)
       {
          return rejectWithValue(data.message||"Failed to post course")
       }
       return data
    } catch (error:any) {
       return rejectWithValue("Internal server error")
    }
})

export const toggleCourseArchieve=createAsyncThunk<CourseReturn,string,{rejectValue:string}>('courses/toggleArchieve',async(courseId,{rejectWithValue})=>{
    try {
        const response =await fetch(`${server_url}/course/toggleArchieve/${courseId}`,{
           method:"PATCH",
           credentials:'include',
        })
        const data:CourseReturn=await response.json()
        if(!response.ok)
        {
            return rejectWithValue(data.message||"Failed to post course")
        }
        console.log(data)
        return data
    } catch (error:any) {
       return rejectWithValue("Internal server error")
    }
})

export const deleteCourse=createAsyncThunk<{data:Course[]},string,{rejectValue:string}>('/course/delete',async(courseId,{rejectWithValue})=>{
    try {
    const response =await fetch(`${server_url}/course/delete/${courseId}`,{
        method:"PATCH",
        credentials:'include',
    })
    if(!response.ok)
    {
        throw new Error("Failed to delete course")
    }
    return await response.json()
    } catch ( error :any) {
       return rejectWithValue(error.message)
    }
})
