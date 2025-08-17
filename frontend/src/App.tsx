import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import InputTodo from "./components/InputTodo";
import ListTodo from "./components/ListTodo";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/ui/Navbar";
import { AuthProvider } from "./context/AuthContext";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import "./index.css";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        {/* الشريط العلوي يمكنه الوصول لحالة تسجيل الدخول */}
        <Navbar />

        {/* إشعارات Toast */}
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />

        {/* الصفحات */}
        <Routes>
          {/* الصفحات العامة */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />

          {/* الصفحات المحمية */}
          <Route
            path="/todos"
            element={
              <ProtectedRoute>
                <ListTodo />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add"
            element={
              <ProtectedRoute>
                <InputTodo setTodos={() => {}} />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
