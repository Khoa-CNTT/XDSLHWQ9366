import { useNavigate } from "react-router-dom";

import { useAuth } from "../components/Account/AuthContext";
import SidebarButton from "./SidebarButton";
import { SideBarItem } from "./SidebarItem";
import { useState } from "react";
export default function Sidebar() {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const [selectedKey, setSelectedKey] = useState<string | null>(null);

  return (
    <div>
      {isLoggedIn && (
        <div className="bg-blue-50 p-4 shadow-md border">
          {/* Hiển thị các mục quản lý nếu đã đăng nhập */}

          <div className=" text-sm flex flex-col">
            <p className="text-orange-500 font-medium">CHỨC NĂNG CHÍNH</p>
            {SideBarItem.map(({ key, label, icon, route }) => (
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
