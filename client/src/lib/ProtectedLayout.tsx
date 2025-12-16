
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";


const ProtectedLayout = () => {
  const accessToken = useSelector((state:RootState) => state.auth.accessToken);
  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />; // will render nested protected routes
};

export default ProtectedLayout;
