import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import Dashboard from "./Dashboard";

function AppTest() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userInfo");
    navigate("/login");
  };

  return (
    <Router>
      <div className="w-full">
        {/* Header with Logout Button */}
        <div className="bg-gray-800 p-4 flex justify-between items-center">
          <h1 className="text-white text-2xl font-bold">Hệ thống Quản lý</h1>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700"
          >
            Đăng xuất
          </button>
        </div>

        {/* Routes */}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default AppTest;
