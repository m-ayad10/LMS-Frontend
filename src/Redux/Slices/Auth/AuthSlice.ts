import { createSlice } from "@reduxjs/toolkit";
import type { AuthState } from "./AuthType";
import { fetchUser, loginUser } from "./AuthThunk";




const initialState:AuthState={
    user:{},
    error:null,
    status:'idle'
}
const AuthSlice=createSlice({
    name:'auth',
    initialState,
    reducers:{
        addAuth:(state,action)=>{
            state.user=action.payload
        },
        removeAuth:(state)=>{
            state.user={};
            state.status='idle';
        }
    },
    extraReducers:(builder)=>{
        builder
        //fetch user
        .addCase(fetchUser.pending,(state)=>{
            state.status='loading'
        })
        .addCase(fetchUser.rejected,(state,action)=>{
            state.status='failed';
            state.error=action.payload||null;
        })
        .addCase(fetchUser.fulfilled,(state,action)=>{
            state.status='succeeded';
            state.user=action.payload.data||{};
        })

        //login user
        .addCase(loginUser.pending,(state)=>{
            state.status='loading';
        })
        .addCase(loginUser.rejected,(state,action)=>{
            state.status='failed';
            state.error=action.payload||null;
        })
        .addCase(loginUser.fulfilled,(state,action)=>{
            state.status='succeeded';
            state.user=action.payload.data||{};
        })

    }
    
})

export const{addAuth,removeAuth}=AuthSlice.actions

export default AuthSlice.reducer