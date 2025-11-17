import { createSlice } from "@reduxjs/toolkit";
import { addToCart } from "../Cart/CartThunk";
import type { WishlistSliceState } from "./WishlistType";
import { fetchWishlist, toggleWishlist } from "./WishlistThunk";
import toast from "react-hot-toast";



const initialState:WishlistSliceState={
        wishlist:[],
        error:null,
        status:'idle'
    }
const WishlistSlice=createSlice({
    name:'wishlist',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        //fetch wishlist
        .addCase(fetchWishlist.pending,(state)=>{
            state.status='loading'
        })
        .addCase(fetchWishlist.rejected,(state,action)=>{
            state.status='failed';
            toast.error(action.payload||"Error fetching wishlist");
            state.error=action.payload||null;
        })
        .addCase(fetchWishlist.fulfilled,(state,action)=>{
            state.status='succeeded';
            state.wishlist=action.payload.data||[]
        })
    
        // toggle wishlist
        .addCase(toggleWishlist.pending,(state)=>{
            state.status='loading';
        })
        .addCase(toggleWishlist.rejected,(state,action)=>{
            toast.error(action.payload||"Something went wrong");
            state.error=action.payload||null;
        })
        .addCase(toggleWishlist.fulfilled,(state,action)=>{
            state.status='succeeded';
            state.wishlist=action.payload.data||[];
        })

        .addCase(addToCart.fulfilled,(state,action)=>{
            state.status='succeeded';
            state.wishlist=action.payload.wishlist;
        })
    }
})

export default WishlistSlice.reducer