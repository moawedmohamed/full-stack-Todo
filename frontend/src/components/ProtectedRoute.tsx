import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const token = localStorage.getItem("token");

  if (!token) {
    // لو مش مسجل دخول → ارجع المستخدم لصفحة login
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>; // لو مسجل دخول → اعرض الصفحة
};

export default ProtectedRoute;
