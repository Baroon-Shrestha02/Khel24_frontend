// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import {
  login as loginApi,
  logout as logoutApi,
  loggedUser,
  register as registerApi,
} from "../Services/AuthServices";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // true while checking session on mount

  // On mount: check if a valid cookie session exists
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await loggedUser();
        setUser(res.data.user);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  // Login — calls POST /login, then fetches the logged-in user
  const login = async ({ email, password }) => {
    await loginApi({ email, password });
    const res = await loggedUser();
    setUser(res.data.user);
  };

  // Register — maps camelCase → backend field names
  const register = async ({ firstName, lastName, email, password }) => {
    const res = await registerApi({
      firstname: firstName,
      lastname: lastName,
      email,
      password,
    });
    return res.data;
  };

  // Logout — clears cookie on server, resets user state
  const logout = async () => {
    await logoutApi();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isLoggedIn: !!user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
