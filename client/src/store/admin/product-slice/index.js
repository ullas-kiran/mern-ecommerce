import axios from "axios";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const initialState={
    isLoading:false,
    productList:[]
}

export const addNewProduct = createAsyncThunk('/products/addnewproduct',async(formData)=>{
    const result= await axios.post(`http://localhost:5000/api/admin/products/add`,formData,{
        headers:{
            'Content-Type':'application/json'
        }
    });

    return result?.data;
})

export const deleteProduct = createAsyncThunk('/products/deleteProduct',async(id)=>{
    const result= await axios.delete(`http://localhost:5000/api/admin/products/delete/${id}`);

    return result?.data;
})

export const editProduct = createAsyncThunk('/products/editProduct',async({id,formData})=>{
    const result= await axios.post(`http://localhost:5000/api/admin/products/edit/${id}`,formData,{
        headers:{
            'Content-Type':'application/json'
        }
    });

    return result?.data;
})

export const fetchAllProducts = createAsyncThunk('/products/fetchAllProducts',async(formData)=>{
    const result= await axios.get(`http://localhost:5000/api/admin/products/get`);

    return result?.data;
})

const AdminProductSlice=createSlice({
    name:"adminProducts",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{

    }
})