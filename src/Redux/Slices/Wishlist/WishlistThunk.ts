import { createAsyncThunk } from "@reduxjs/toolkit"
import type { WishlistReturn } from "./WishlistType"


const server_url=import.meta.env.VITE_API_URL+'/wishlist'

export const fetchWishlist=createAsyncThunk<WishlistReturn,void,{rejectValue:string}>('wishlist/fetch',async(_,{rejectWithValue})=>{
    try {
        const response=await fetch(`${server_url}`,{credentials:"include"})
        const data=await response.json()
        if(!response.ok)
        {
            return rejectWithValue(data.message||"Something thing went wrong")
        }
        return data
    } catch (error) {
        rejectWithValue("Internal server error")
    }
})

export const toggleWishlist=createAsyncThunk<WishlistReturn,string,{rejectValue:string}>('wishlist/toggleWishlist',async(courseId,{rejectWithValue})=>{
    try {
         let body={courseId}
        const response=await fetch(`${server_url}`,{
           method:"POST",
           body:JSON.stringify(body),
           headers:{"Content-Type":"application/json"},
           credentials:"include"
        })
         const data=await response.json()
        if(!response.ok)
        {
            return rejectWithValue(data.message||"Something thing went wrong")
        }
        return data
    } catch (error) {
        rejectWithValue("Internal s3egver error")
    }
})