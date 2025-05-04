import React from "react";
import { useNavigate } from "react-router-dom";
function Header() {
  const navigate = useNavigate();
  return (
    <div>
      <div className="flex h-16 w-full bg-blue-200 justify-end">
        <div className="flex p-2 gap-2">
          <div className="flex p-2 items-center bg-blue-100 gap-2 rounded border">
            <div className="flex flex-col items-start">
              <p className=" font-semibold">Hello Lê Đức Thảo</p>
              <p className="text-sm text-gray-600">Teacher</p>
            </div>
          </div>
          <button
            className="p-2 bg-white border rounded-md hover:bg-blue-500 hover:text-white"
            onClick={() => {
              navigate("/signin");
              localStorage.removeItem("token");
              localStorage.removeItem("user");
              localStorage.removeItem("userId");
            }}
          >
            Đăng xuất
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;
