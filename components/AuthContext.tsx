'use client'
// import { createContext, useContext, useState, useEffect } from "react";
// import { getAuth, onAuthStateChanged } from "firebase/auth";
// import { app } from "@/firebaseConfig";

// interface AuthContextType {
//   userEmail: string | null;
//   userToken: string | null;
//   setUserEmail: (email: string) => void;
//   setUserToken: (token: string) => void;
//   loading: boolean; // Add loading state
// }

// const AuthContext = createContext<AuthContextType | null>(null);

// export function useAuth(): AuthContextType {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// }

// export function AuthProvider({ children }: { children: React.ReactNode }) {
//   const [userEmail, setUserEmail] = useState<string | null>(null);
//   const [userToken, setUserToken] = useState<string | null>(null);
//   const [loading, setLoading] = useState(true); // Initialize loading state

//   useEffect(() => {
//     const auth = getAuth(app);
//     const unsubscribe = onAuthStateChanged(auth, async (user) => {
//       if (user) {
//         const token = await user.getIdToken();
//         setUserToken(token);
//         setUserEmail(user.email);
//       }
//       setLoading(false); // Set loading to false after user state is confirmed
//     });

//     // Clean up the listener when the component unmounts
//     return () => unsubscribe();
//   }, []);

//   return (
//     <AuthContext.Provider value={{ userEmail, userToken, setUserEmail, setUserToken, loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }
// components/AuthContextClient.tsx
'use client';
import { createContext, useContext, useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "@/firebaseConfig";

interface AuthContextType {
  userEmail: string | null;
  userToken: string | null;
  setUserEmail: (email: string) => void;
  setUserToken: (token: string) => void;
  loading: boolean;
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const token = await user.getIdToken();
        setUserToken(token);
        setUserEmail(user.email);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ userEmail, userToken, setUserEmail, setUserToken, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;