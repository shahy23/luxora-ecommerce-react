import { createContext, useContext, useEffect, useState } from "react";
import { getItem, setItem, removeItem } from "../utils/localStorage";

const AuthContext = createContext(null);

function getUsersDb() {
  return getItem("users", []);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => getItem("currentUser", null));

  useEffect(() => {
    if (user) setItem("currentUser", user);
    else removeItem("currentUser");
  }, [user]);

  function login({ email, password }) {
    const users = getUsersDb();
    const found = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (!found) return { success: false, error: "No account found with that email." };
    if (found.password !== password) return { success: false, error: "Incorrect password." };
    const { password: _pw, ...safeUser } = found;
    setUser(safeUser);
    return { success: true };
  }

  function register({ firstName, lastName, email, password }) {
    const users = getUsersDb();
    if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
      return { success: false, error: "An account with this email already exists." };
    }
    const newUser = {
      id: `usr_${Date.now()}`,
      firstName,
      lastName,
      email,
      password,
      phone: "",
      address: "",
    };
    setItem("users", [...users, newUser]);
    const { password: _pw, ...safeUser } = newUser;
    setUser(safeUser);
    return { success: true };
  }

  function logout() {
    setUser(null);
  }

  function updateProfile(updates) {
    setUser((prev) => {
      const next = { ...prev, ...updates };
      const users = getUsersDb().map((u) => (u.id === next.id ? { ...u, ...updates } : u));
      setItem("users", users);
      return next;
    });
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!user, login, register, logout, updateProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
