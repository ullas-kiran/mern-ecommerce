import CheckAuth from "@/common/check-auth";
import AdminLayout from "@/components/admin/layout";
import AuthLayout from "@/components/auth/layout";
import ShoppingLayout from "@/components/shopping/layout";
import { Skeleton } from "@/components/ui/skeleton";
import AdminDashboard from "@/pages/admin/dashboard";
import AdminFeatures from "@/pages/admin/features";
import AdminOrders from "@/pages/admin/orders";
import AdminProducts from "@/pages/admin/products";
import AuthLogin from "@/pages/auth/login";
import AuthRegister from "@/pages/auth/register";
import NotFound from "@/pages/not-found";
import ShoppingAccount from "@/pages/shopping/account";
import ShoppingCheckout from "@/pages/shopping/checkout";
import ShoppingHome from "@/pages/shopping/home";
import ShoppingListing from "@/pages/shopping/listing";
import UnauthPage from "@/pages/unauth-page";
import { checkAuth } from "@/store/auth-slice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";

const Approute = () => {
  // const isAuthenticated = false;
  // const user =null

  const {user,isAuthenticated,isLoading} = useSelector((state)=>state.auth);
  const dispatch=useDispatch();

  useEffect(()=>{
   dispatch(checkAuth())
  },[dispatch])

  if(isLoading){
   return <Skeleton className="w-full h-[600px] rounded-full" />  
  }

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Routes>
        <Route
          path="/auth"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AuthLayout />
            </CheckAuth>
          }
        >
          <Route path="login" element={<AuthLogin />} />
          <Route path="register" element={<AuthRegister />} />
        </Route>
        <Route
          path="/admin"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AdminLayout />
            </CheckAuth>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="features" element={<AdminFeatures />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
        </Route>
        <Route
          path="/shop"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <ShoppingLayout />
            </CheckAuth>
          }
        >
          <Route path="home" element={<ShoppingHome />} />
          <Route path="listing" element={<ShoppingListing />} />
          <Route path="checkout" element={<ShoppingCheckout />} />
          <Route path="account" element={<ShoppingAccount />} />
        </Route>
        <Route path="/unauth-page" element={<UnauthPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default Approute;
