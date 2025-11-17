import { createAsyncThunk } from "@reduxjs/toolkit"
import type { Category, CategoryReturn } from "./CategoryType"

const server_url=import.meta.env.VITE_API_URL+'/category'

export const fetchCategory=createAsyncThunk<CategoryReturn,void,{rejectValue:string}>('category/fetch',
    async(_,{rejectWithValue})=>{
    try {
        const response=await fetch(`${server_url}`)
        const data=await response.json()
        if(!response.ok)
        {
            return rejectWithValue(data.message||"Something went wrong")
        }
        return data
    } catch (error) {
        return rejectWithValue("Internal server error")
    }
})

export interface AddCategoryReturn{
    data:Category,
    success:boolean,
    message:string,
    [key:string]:any
}
export const addCategory=createAsyncThunk<AddCategoryReturn,FormData,{rejectValue:string}>('category/addCategory',async(formData,{rejectWithValue})=>{
    try {
        const response=await fetch(`${server_url}`,{
           method:"POST",
            body:formData,
            credentials:'include'
        })
        const data=await response.json()
        if(!response.ok)
        {
            return rejectWithValue(data.message||"Something went wrong")
        }
        return data
    } catch (error) {
        return rejectWithValue("Internal server error")
    }
})

export const updateCategory=createAsyncThunk<AddCategoryReturn,FormData,{rejectValue:string}>('category/updateCategory',async(formData,{rejectWithValue})=>{
    try{
    const response=await fetch(`${server_url}`,{
        method:"PATCH",
        body:formData,
        credentials:'include'
    })
    const data=await response.json()
        if(!response.ok)
        {
            return rejectWithValue(data.message||"Something went wrong")
        }
        console.log(data.data)
        return data
    } catch (error) {
        return rejectWithValue("Internal server error")
    }
})
export const deleteCategory = createAsyncThunk<
  { success: boolean; message: string; id: string },
  string,
  { rejectValue: string }
>(
  'category/deleteCategory',
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`${server_url}/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        return rejectWithValue(data.message || 'Something went wrong');
      }

      return { ...data, id };
    } catch (error) {
      return rejectWithValue('Internal server error');
    }
  }
);
