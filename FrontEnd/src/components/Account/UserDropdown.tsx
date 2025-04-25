import { useState } from "react";
import { useNavigate } from "react-router-dom";

const UserDropdown = () => {
  const [isDropdownTaiKhoan, setIsDropdownTaiKhoan] = useState(false);
  const navigate = useNavigate();

  const toggleDropdownTaiKhoan = () => {
    setIsDropdownTaiKhoan(!isDropdownTaiKhoan);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userInfo");
    navigate("/login");
  };

  const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");

  return (
    <div className="w-4/5 relative">
      <div className="flex h-16 w-full bg-gray-50 justify-end">
        <div className="flex p-2 gap-4 relative">
          <button
            className="flex p-2 items-center gap-2 rounded-xl border"
            onClick={toggleDropdownTaiKhoan}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-12"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
            <div className="flex flex-col items-start text-left">
              <span className="font-semibold">{userInfo.name || "Admin"}</span>
              <span className="text-sm text-gray-600">
                {userInfo.role || "Teacher"}
              </span>
            </div>
            <svg
              className={`h-5 w-5 transform transition-transform duration-200 ${
                isDropdownTaiKhoan ? "rotate-180" : ""
              }`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          {/* Dropdown menu */}
          {isDropdownTaiKhoan && (
            <div className="absolute right-0 top-16 mt-2 w-44 bg-white shadow-lg rounded-xl border z-50">
              <ul className="py-2">
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left text-red-500"
                  >
                    Đăng xuất
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDropdown;
