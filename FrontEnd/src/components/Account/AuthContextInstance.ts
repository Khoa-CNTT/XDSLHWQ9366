import { createContext } from "react";

interface AuthContextType {
  isLoggedIn: boolean;
  user: string | null;
  role: string | null;
  displayName: string | null;
  login: (user: string, role: string, displayName: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
