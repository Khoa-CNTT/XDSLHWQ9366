import React, { useState } from "react";
import { AuthContext } from "./AuthContextInstance";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState<string | null>(null);

  const login = (user: string, role: string, displayName: string) => {
    setIsLoggedIn(true);
    setUser(user);
    setRole(role);
    setDisplayName(displayName);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    setRole(null);
    setDisplayName(null);
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, user, role, displayName, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
