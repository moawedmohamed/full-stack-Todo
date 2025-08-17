import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn, logout, user } = useAuth(); // تأكد أن user موجود في AuthContext
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const t = localStorage.getItem("token");
    setToken(t);
    setIsLoggedIn(!!t);
  }, [setIsLoggedIn]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-blue-500 text-white px-6 py-4 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <div className="text-2xl font-bold">
          <Link to="/">MyApp</Link>
        </div>

        {isLoggedIn && user && (
          <div className="flex items-center space-x-2">
            {/* Avatar */}
            <img
              src={user.avatar || "https://i.pravatar.cc/40"} // رابط افتراضي
              alt="avatar"
              className="w-10 h-10 rounded-full border-2 border-white"
            />
            {/* اسم المستخدم */}
            <span className="font-medium">{user.username}</span>
          </div>
        )}
      </div>

      <div className="space-x-4">
        {isLoggedIn ? (
          <>
            <Link to="/todos" className="hover:text-gray-200">
              Home
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
