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

export const fetchCartItems=createAsyncThunk('add/fetchCartItems',async(userId)=>{
       const response=await axios.get(`http://localhost:5000/api/shop/cart/get/${userId}`)

       return response.data
});

export const deleteCartItem=createAsyncThunk('add/deleteCartItem',async({userId,productId})=>{
       const response=await axios.delete(`http://localhost:5000/api/shop/cart/${userId}/${productId}`)

       return response.data
});

export const updateCartQuantity=createAsyncThunk('add/updateCartQuantity',async({userId,productId,quantity})=>{
       const response=await axios.put(`http://localhost:5000/api/shop/cart/update-cart`,{
        userId,productId,quantity
       })

       return response.data
});

const shoppingCartSlice=createSlice({ 
    name:'shoppingCart',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
       builder.addCase(addToCart.pending,(state)=>{
          state.isLoading=true
       }).addCase(addToCart.fulfilled,(state,action)=>{
          state.isLoading=false;
          state.cartItems=action.payload.data
       }).addCase(addToCart.rejected,(state)=>{
          state.isLoading=false
          state.cartItems=[]
       })

        builder.addCase(fetchCartItems.pending,(state)=>{
          state.isLoading=true
       }).addCase(fetchCartItems.fulfilled,(state,action)=>{
          state.isLoading=false;
          state.cartItems=action.payload.data
       }).addCase(fetchCartItems.rejected,(state)=>{
          state.isLoading=false
          state.cartItems=[]
       })

            builder.addCase(updateCartQuantity.pending,(state)=>{
          state.isLoading=true
       }).addCase(updateCartQuantity.fulfilled,(state,action)=>{
          state.isLoading=false;
          state.cartItems=action.payload.data
       }).addCase(updateCartQuantity.rejected,(state)=>{
          state.isLoading=false
          state.cartItems=[]
       })

            builder.addCase(deleteCartItem.pending,(state)=>{
          state.isLoading=true
       }).addCase(deleteCartItem.fulfilled,(state,action)=>{
          state.isLoading=false;
          state.cartItems=action.payload.data
       }).addCase(deleteCartItem.rejected,(state)=>{
          state.isLoading=false
          state.cartItems=[]
       })
    }
})

export default shoppingCartSlice.reducer