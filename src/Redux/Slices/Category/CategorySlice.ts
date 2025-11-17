import { createSlice } from "@reduxjs/toolkit";
import type { CategorySliceState } from "./CategoryType";
import { addCategory, deleteCategory, fetchCategory, updateCategory } from "./CategoryThunk";
import toast from "react-hot-toast";


const initialState:CategorySliceState={
    category: [],
    error:null,
    status: "idle",
  }

const CategorySlice = createSlice({
  name: "category",
  initialState,
  reducers:{
    
  },
  extraReducers:(builder)=>{
    builder
    //fetch category
    .addCase(fetchCategory.pending,(state)=>{
        state.status='loading'
    })
    .addCase(fetchCategory.rejected,(state,action)=>{
        state.status='failed';
        state.error=action.payload||null
    })
    .addCase(fetchCategory.fulfilled,(state,action)=>{
        state.status='succeeded';   
        state.category=action.payload.data
    })

    //add category
    .addCase(addCategory.pending,(state)=>{

    })
    .addCase(addCategory.rejected,(state,action)=>{
    })
    .addCase(addCategory.fulfilled,(state,action)=>{
        state.status='succeeded';
        state.category.push(action.payload.data);
    })

    //update category
    .addCase(updateCategory.pending,(state)=>{

    })
    .addCase(updateCategory.rejected,(state,action)=>{
        
    })
    .addCase(updateCategory.fulfilled,(state,action)=>{
        state.status='succeeded';
        const index=state.category.findIndex((value)=>value._id==action.payload.data._id);
        if(index!==-1)
        {
            state.category[index]=action.payload.data;
        }
    })

    //delete category
    .addCase(deleteCategory.pending,(state)=>{


    })
    .addCase(deleteCategory.rejected,(state,action)=>{
        
    })
    .addCase(deleteCategory.fulfilled, (state, action) => {
  state.status = 'succeeded';
  state.category = state.category.filter(
    (cat) => cat._id !== action.payload.id
  );
})

  }
});


export default CategorySlice.reducer