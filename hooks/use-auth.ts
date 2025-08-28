// import { useState, useEffect, createContext, useContext } from 'react';
// import { apiClient } from '../lib/api-client';

// interface User {
//   id: string;
//   name: string;
//   email: string;
//   phone?: string;
//   role: string;
// }

// interface AuthContextType {
//   user: User | null;
//   loading: boolean;
//   login: (data: { email?: string; phone?: string; name?: string }) => Promise<void>;
//   logout: () => Promise<void>;
//   checkAuth: () => Promise<void>;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// function AuthProvider({ children }: { children: React.ReactNode }) {
//   const [user, setUser] = useState<User | null>(null);
//   const [loading, setLoading] = useState(true);

//   const checkAuth = async () => {
//     try {
//       const response = await apiClient.me();
//       setUser(response.user);
//     } catch {
//       setUser(null);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const login = async (data: { email?: string; phone?: string; name?: string }) => {
//     const response = await apiClient.login(data);
//     setUser(response.user);
//   };

//   const logout = async () => {
//     await apiClient.logout();
//     setUser(null);
//   };

//   useEffect(() => {
//     checkAuth();
//   }, []);

//   return (
//     <AuthContext.Provider value={{ user, loading, login, logout, checkAuth }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// function useAuth() {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// }

// export { AuthProvider, useAuth };
