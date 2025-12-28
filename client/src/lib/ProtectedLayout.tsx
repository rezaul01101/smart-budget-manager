
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";


const ProtectedLayout = () => {
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const location = useLocation();
  
  if (!accessToken) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />; // will render nested protected routes
};

export default ProtectedLayout;
