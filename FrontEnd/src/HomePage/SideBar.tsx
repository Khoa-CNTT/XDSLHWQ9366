import { useNavigate } from "react-router-dom";

import { useAuth } from "../components/Account/AuthContext";
import SidebarButton from "./SidebarButton";
import { SideBarItem } from "./SidebarItem";
import { useEffect, useState } from "react";

export default function Sidebar() {
  const { isLoggedIn, role } = useAuth();
  const navigate = useNavigate();

  const [selectedKey, setSelectedKey] = useState<string | null>(null);

  useEffect(() => {
    // Lấy key từ localStorage nếu có
    const storedKey = localStorage.getItem("sidebar-selected-key");
    if (storedKey) {
      setSelectedKey(storedKey);
      // Xoá sau khi dùng để tránh giữ trạng thái khi chuyển trang khác
      localStorage.removeItem("sidebar-selected-key");
    }
  }, []);

  // Lọc các mục sidebar dựa trên vai trò
  const filteredItems = SideBarItem.filter((item) =>
    item.roles.includes(role || "")
  );
  console.log("Role:", role); // Kiểm tra giá trị role
  console.log("Filtered Items:", filteredItems); // Kiểm tra các mục được lọc
  return (
    <div>
      {isLoggedIn && (
        <div className="bg-blue-50 p-4 shadow-md border">
          <div className="text-sm flex flex-col">
            <p className="text-orange-500 font-medium">CHỨC NĂNG CHÍNH</p>
            {filteredItems.map(({ key, label, icon, route }) => (
              <SidebarButton
                key={key}
                icon={icon}
                label={label}
                selected={selectedKey === key}
                onClick={() => {
                  setSelectedKey(key);
                  navigate(route);
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
