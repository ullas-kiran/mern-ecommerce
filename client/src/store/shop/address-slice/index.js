import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState={
    isLoading:false,
    addressList:[]
}

export const addNewAddress=createAsyncThunk('/addresses/addNewAddress',async(formData)=>{
  const response=await axios.post(`http://localhost:5000/api/shop/address/add`,formData);

  return response.data
})

export const fetchAllAddresses=createAsyncThunk('/addresses/addNewAddress',async(userId)=>{
  const response=await axios.get(`http://localhost:5000/api/shop/address/get/${userId}`);

  return response.data
})

export const editAddress=createAsyncThunk('/addresses/editAddress',async({userId,addressId,formData})=>{
  const response=await axios.put(`http://localhost:5000/api/shop/address/update/${userId}/${addressId}/`,formData);

  return response.data
})

export const deleteAddress=createAsyncThunk('/addresses/deleteAddress',async({userId,addressId})=>{
  const response=await axios.delete(`http://localhost:5000/api/shop/address/delete/${userId}/${addressId}`);

  return response.data
})

const addressSlice=createSlice({
    name:'address',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{

    }
})