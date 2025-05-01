import { Navigate, useLocation } from "react-router-dom";

const CheckAuth = ({ isAuthenticated, user, children }) => {
  const location = useLocation();

  if (
    (!isAuthenticated && !location.pathname.includes("/login")) ||
    !location.pathname.includes("/register")
  ) {
    return <Navigate to={"/auth/login"} />;
  }

  if (isAuthenticated && location.pathname.includes("/login")) {
    if (user?.role === "admin") {
      return <Navigate to={"/admin/dashboard"} />;
    } else {
      return <Navigate to={"shop/home"} />;
    }
  }

  if(!isAuthenticated && user?.role !== 'admin' && location.pathname.includes('admin')){
    return <Navigate to={"/unauth-page"}/> 
  }

  return children;
};

export default CheckAuth;
