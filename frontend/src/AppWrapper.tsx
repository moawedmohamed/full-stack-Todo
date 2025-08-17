import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

export const AppWrapper = ({ children }: { children: React.ReactNode }) => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && !isLoggedIn) {
      navigate("/todos"); // لو فيه توكن → روح لصفحة Todos
    }
  }, [isLoggedIn, navigate]);

  return <>{children}</>;
};
