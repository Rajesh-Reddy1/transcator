import { createContext, useContext, useState } from "react";

interface AuthContextType {
  userEmail: string | null;
  userToken: string | null;
  setUserEmail: (email: string) => void;
  setUserToken: (token: string) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userToken, setUserToken] = useState<string | null>(null);

  return (
    <AuthContext.Provider value={{ userEmail, userToken, setUserEmail, setUserToken }}>
      {children}
    </AuthContext.Provider>
  );
}