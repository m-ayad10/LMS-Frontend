import { createAsyncThunk } from "@reduxjs/toolkit";
import type {  LoginInput, UserReturn } from "./AuthType";


const server_url = import.meta.env.VITE_API_URL as string;

export const fetchUser = createAsyncThunk<
  UserReturn,
  void,
  { rejectValue: string }
>("auth/fetch", async (_, { rejectWithValue }) => {
  try {
    const response = await fetch(`${server_url}/verify-token`,{credentials:'include'});
    const data: UserReturn = await response.json();
    if (!response.ok)return rejectWithValue(data.message || "Some thing went wrong");
    return data;
  } catch (error: any) {
    return rejectWithValue("Internal server error");
  }
});

export const loginUser = createAsyncThunk<  
  UserReturn,
  LoginInput,
  { rejectValue: string }
>("auth/login", async (obj, { rejectWithValue }) => {
  try {
    const response = await fetch(`${server_url}/login`, {
      method: "POST",
      body: JSON.stringify(obj),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    const data: UserReturn = await response.json();
    if (!response.ok) return rejectWithValue(data.message || "Some thing went wrong");
    return data;
  } catch (error: any) {
    return rejectWithValue("Internal server error");
  }
});


