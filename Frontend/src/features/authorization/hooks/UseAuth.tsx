import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { authService } from "../services/AuthService";
import { Navigate, Outlet } from "react-router-dom";

interface AuthState{
  isLogged: boolean,
  isLoading: boolean,
  checkAuth: () => Promise<void>;
}

export const AuthContext = createContext<AuthState | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuth = async () => {
    setIsLoading(true);

    try {
      const response = (await authService.isLoggedIn()).data;
      setIsAuthenticated(response === true);
    } catch {
      setIsAuthenticated(false);
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
        isLogged: isAuthenticated,
        isLoading,
        checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function GuestOnly(){
  const {isLoading, isLogged} = useAuth();

  if(isLoading) return null;
  if(isLogged) return <Navigate to="/archive" replace />

  return <Outlet/>
}

export function AuthOnly(){
  const {isLoading, isLogged} = useAuth();

  if(isLoading) return null;
  if(!isLogged) return <Navigate to="auth/login" replace/>

  return <Outlet/>
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if(!context) throw new Error("useAuth needs to be used within a AuthProvider")
  return context;
}
