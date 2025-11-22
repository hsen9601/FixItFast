import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = () => {
  const user = localStorage.getItem("FixItFast-User");
  if (!user || user == "") {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};
