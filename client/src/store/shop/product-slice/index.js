import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


const initialState={
    isLoading:false,
    productList:[]
}

export const fetchAllFilteredProducts = createAsyncThunk('/products/fetchAllProducts',async(formData)=>{
    const result= await axios.get(`http://localhost:5000/api/shop/products/get`);

    return result?.data;
})

const shoppingProductSlice=createSlice({
    name:"shoppingProducts",
    initialState,
    reducers:{  

    },
    extraReducers:(builder)=>{
        builder.addCase(fetchAllFilteredProducts.pending,(state,action)=>{
            state.isLoading=true
        }).addCase(fetchAllFilteredProducts.fulfilled,(state,action)=>{
            console.log(action.payload)
            state.isLoading=true;
            state.productList=action.payload
        }).addCase(fetchAllFilteredProducts.rejected,(state,action)=>{
            state.isLoading=true
            state.productList=[]
        })
    }
})

export default shoppingProductSlice.reducer