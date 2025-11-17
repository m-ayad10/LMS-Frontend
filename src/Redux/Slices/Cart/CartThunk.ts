import { createAsyncThunk } from "@reduxjs/toolkit"
import type { AddToCartReturn, CartReturn } from "./CartType"

const server_url=import.meta.env.VITE_API_URL+'/cart' as string

export const fetchCart=createAsyncThunk<CartReturn,void,{rejectValue:string}>('cart/fetch',async(_,{rejectWithValue})=>{
    try {
        const response=await fetch(`${server_url}`,{credentials:'include'})
        const data=await response.json()
        if(!response.ok)
        {
           return  rejectWithValue(data.message||"Something went wrong")
        }
        return data
    } catch (error:any) {
        return rejectWithValue("Internal server error")
    }
})

export const addToCart=createAsyncThunk<AddToCartReturn,string,{rejectValue:string}>('cart/addToCart',async(courseId,{rejectWithValue})=>{
    try {
        const obj={courseId}
        const response=await fetch(`${server_url}/addToCart`,{
            method:"PATCH",
            body:JSON.stringify(obj),
            headers:{"Content-Type":"application/json"},
            credentials:'include'
        })
        const data=await response.json()
       if(!response.ok)
        {
           return  rejectWithValue(data.message||"Something went wrong")
        }
        return data
    } catch (error:any) {
        return rejectWithValue("Internal server error")
    }
})

export const removeFromCart=createAsyncThunk<CartReturn,string,{rejectValue:string}>('cart/removeFromCart',async(courseId,{rejectWithValue})=>{
    try {
    const obj={courseId}
    const response=await fetch(`${server_url}/removeFromCart`,{
        method:"PATCH",
        body:JSON.stringify(obj),
        headers:{"Content-Type":"application/json"},
        credentials:'include'
    })       
     const data=await response.json()
    if(!response.ok)
    {
        return  rejectWithValue(data.message||"Something went wrong")
    }
    return data
    } catch (error:any) {
        return rejectWithValue("Internal server error")
    }
})
