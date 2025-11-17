import { createSlice } from "@reduxjs/toolkit";
import type { CartSliceState ,} from "./CartType";
import { addToCart, fetchCart, removeFromCart } from "./CartThunk";
import { enrollFromCart } from "../Enrolled/EnrolledThunk";
import toast from "react-hot-toast";



const initialState:CartSliceState={
    cart:null,
    error:null,
    status:'idle'
}

const CartSlice=createSlice({
    name:'cart',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        //fetch cart
        .addCase(fetchCart.pending,(state)=>{
            state.status='loading';
        })
        .addCase(fetchCart.rejected,(state,action)=>{
            state.status='failed';
            toast.error(action.payload||"Something went wrong");
            state.error=action.payload||null;
        })
         .addCase(fetchCart.fulfilled,(state,action)=>{
            state.status='succeeded';
            state.cart=action.payload.data;
        })

        //add to cart
        .addCase(addToCart.pending,(state)=>{
        })
        .addCase(addToCart.rejected,(state,action)=>{
            toast.error(action.payload||"Something went wrong");
            state.error=action.payload||null;
        })
        .addCase(addToCart.fulfilled,(state,action)=>{
            state.status='succeeded';
            toast.success(action.payload.message||"Added to cart");
            state.cart=action.payload.cart
        })

         //remove from cart
        .addCase(removeFromCart.pending,(state)=>{

        })
        .addCase(removeFromCart.rejected,(state,action)=>{
            toast.error(action.payload||"Something went wrong");
        })
        .addCase(removeFromCart.fulfilled,(state,action)=>{
            state.status='succeeded';
            toast.success(action.payload.message||"Removed from cart")
            state.cart=action.payload.data;
        })

        // empty cart when enrolled
        .addCase(enrollFromCart.fulfilled,(state,action)=>{
            state.status='succeeded';
            state.cart=action.payload.cart||null;
        })
    }

})

export default CartSlice.reducer