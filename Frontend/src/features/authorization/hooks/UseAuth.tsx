/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import { Navigate, Outlet } from "react-router-dom";
import LoadingIndicator from "../../../components/LoadingIndicator";
import { authService } from "../services/AuthService";
import type { UserDto } from "../types/AuthTypes";

interface AuthState {
  user: UserDto | undefined;
  isLoading: boolean;

  checkAuth: () => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthState | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserDto | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuth = async () => {
    setIsLoading(true);

    try {
      const response = (await authService.getMe()).data;
      setUser(response);
    } catch {
      setUser(undefined);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);

    try {
      await authService.logout();
      setUser(undefined);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        checkAuth,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function GuestOnly() {
  const { isLoading, user } = useAuth();

  if (isLoading) return <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-[#68131c] to-[#160609]"><LoadingIndicator size={144} showLabel /></div>;

  if (user) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export function AuthOnly() {
  const { isLoading, user } = useAuth();

  if (isLoading) return <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-[#68131c] to-[#160609]"><LoadingIndicator size={144} showLabel /></div>;

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth needs to be used within an AuthProvider");
  }

  return context;
};
