import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const initialState={
   cartItems:[],
   isLoading:false
}


export const addToCart=createAsyncThunk('add/addToCart',async({userId,productId,quantity})=>{
       const response=await axios.post(`http://localhost:5000/api/shop/cart/add`,{
        userId,productId,quantity
       })

       return response.data
});

const shoppingCartSlice=createSlice({
    name:'shoppingCart',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{

    }
})