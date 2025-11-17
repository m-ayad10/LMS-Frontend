import { createAsyncThunk } from "@reduxjs/toolkit";
import type { EnrolledReturn } from "./EnrolledType";

const server_url = import.meta.env.VITE_API_URL + "/enrollment";

export const fetchEnrollded = createAsyncThunk<
  EnrolledReturn,
  void,
  { rejectValue: string }
>("enrolled/fetch", async (_, { rejectWithValue }) => {
  try {
    const response = await fetch(`${server_url}`, { credentials: "include" });
    const data = await response.json();
    if (!response.ok) {
      return rejectWithValue(data.message || "Failed to fetch enrolled courses");
    }
    return data;
  } catch (error: any) {
    return rejectWithValue("Internal server error");
  }
});

export const enrollFromCart = createAsyncThunk<
  EnrolledReturn,
  void,
  { rejectValue: string }
>("enrolled/enrollFromCart", async (_, { rejectWithValue }) => {
  try {
    const response = await fetch(`${server_url}`, {
      method: "POST",
      credentials:"include"
    });
    const data = await response.json();
    console.log(data)
    if (!response.ok) {
      return rejectWithValue(data.message || "Failed to enroll course");
    }
    return data;
  } catch (error: any) {
    return rejectWithValue("Internal server error");
  }
});
