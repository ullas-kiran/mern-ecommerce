import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import adminProductSlice from "@/store/admin/product-slice"
import shopProductSlice from "@/store/shop/product-slice"
import shopCartSlice from "@/store/shop/cart-slice"


const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProducts:adminProductSlice,
    shopProducts:shopProductSlice,
    shopCart:shopCartSlice
  },
});

export default store;
