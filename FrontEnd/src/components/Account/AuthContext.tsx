import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContextInstance";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState<string | null>(null);

  // ✅ Lấy dữ liệu từ localStorage khi trang được tải
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedRole = localStorage.getItem("role");
    const storedDisplayName = localStorage.getItem("displayName");

    if (storedUser && storedRole && storedDisplayName) {
      setIsLoggedIn(true);
      setUser(storedUser);
      setRole(storedRole);
      setDisplayName(storedDisplayName);
    }
  }, []);

  // ✅ Lưu vào localStorage khi đăng nhập
  const login = (user: string, role: string, displayName: string) => {
    setIsLoggedIn(true);
    setUser(user);
    setRole(role);
    setDisplayName(displayName);

    localStorage.setItem("user", user);
    localStorage.setItem("role", role);
    localStorage.setItem("displayName", displayName);
  };

  // ✅ Xoá khỏi localStorage khi đăng xuất
  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    setRole(null);
    setDisplayName(null);

    localStorage.removeItem("user");
    localStorage.removeItem("role");
    localStorage.removeItem("displayName");
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, user, role, displayName, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
