import {  useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
    const navigate = useNavigate(); // ✅ نستخدم navigate
    const {isLoggedIn, setIsLoggedIn} = useAuth();
  // نتحقق من وجود token
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, [setIsLoggedIn]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav className="bg-blue-500 text-white px-6 py-4 flex justify-between items-center">
      <div className="text-2xl font-bold">
        <Link to="/">MyApp</Link>
      </div>

      <div className="space-x-4">
        {isLoggedIn ? (
          <>
            <Link to="/dashboard" className="hover:text-gray-200">
              Dashboard
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-500 px-4 py-1 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="bg-green-500 px-4 py-1 rounded hover:bg-green-600"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-yellow-500 px-4 py-1 rounded hover:bg-yellow-600"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
