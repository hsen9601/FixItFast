import { createContext } from "react";
import type { User } from "../../types/types";

export type AuthContextType = {
  user: User | null;
  token: string | null;
  setAuth: (user: User, token: string) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);
