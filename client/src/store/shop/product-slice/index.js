import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const initialState={
    isLoading:false,
    productList:[]
}


export const fetchAllFilteredProducts = createAsyncThunk(
  "/products/fetchAllProducts",
  async ({ filterParams, sortParams }) => {
    console.log(fetchAllFilteredProducts, "fetchAllFilteredProducts");

    const query = new URLSearchParams({
      ...filterParams,
      sortBy: sortParams,
    });

    const result = await axios.get(
      `http://localhost:5000/api/shop/products/get?${query}`
    );

    console.log(result);

    return result?.data;
  }
);

const shoppingProductSlice=createSlice({
    name:"shoppingProducts",
    initialState,
    reducers:{  

    },
    extraReducers:(builder)=>{
        builder.addCase(fetchAllFilteredProducts.pending,(state,action)=>{
            state.isLoading=true
        }).addCase(fetchAllFilteredProducts.fulfilled,(state,action)=>{
            state.isLoading=true;
            state.productList=action.payload?.data
        }).addCase(fetchAllFilteredProducts.rejected,(state,action)=>{
            state.isLoading=true
            state.productList=[]
        })
    }
})

export default shoppingProductSlice.reducer