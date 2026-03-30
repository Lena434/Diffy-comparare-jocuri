import { createContext, useContext, useState } from "react";
import type { User, UserRole } from "../types";
import { useAxios } from "../axios/context";
import {
  getUsers,
  saveUsers,
  loadCurrentUser,
  saveCurrentUser,
  findUserByCredentials,
  isEmailTaken,
} from "../services/authService";

export type { User, UserRole, UserProfile, PcSpecs } from "../types";

interface AuthContextValue {
  currentUser: User | null;
  isAuthenticated: boolean;
  role: UserRole | null;
  login: (email: string, password: string) => Promise<string | null>;
  signup: (username: string, email: string, password: string) => Promise<string | null>;
  logout: () => void;
  updateProfile: (data: Partial<Pick<User, 'username' | 'email' | 'profile'>>) => string | null;
  changePassword: (oldPassword: string, newPassword: string) => string | null;
}

const AuthContext = createContext<AuthContextValue>({
  currentUser: null,
  isAuthenticated: false,
  role: null,
  login: async () => null,
  signup: async () => null,
  logout: () => {},
  updateProfile: () => null,
  changePassword: () => null,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { api } = useAxios();
  const [currentUser, setCurrentUser] = useState<User | null>(() => loadCurrentUser());

  const isAuthenticated = currentUser !== null;
  const role: UserRole | null = currentUser?.role ?? null;

  async function login(email: string, password: string): Promise<string | null> {
    try {
      const userData = await api.post<any>("/api/auth/login", { email, password });
      const loggedUser: User = {
        username: userData.username,
        email: userData.email,
        password: password,
        role: userData.role === 30 ? 'admin' : 'user',
      };
      setCurrentUser(loggedUser);
      saveCurrentUser(loggedUser);
      return null;
    } catch {
      return "INVALID EMAIL OR PASSWORD!";
    }
  }

  async function signup(username: string, email: string, password: string): Promise<string | null> {
    try {
      await api.post("/api/auth/register", { username, email, password });
      return await login(email, password);
    } catch {
      return "EMAIL ALREADY REGISTERED!";
    }
  }

  function logout() {
    setCurrentUser(null);
    saveCurrentUser(null);
  }

  function updateProfile(data: Partial<Pick<User, 'username' | 'email' | 'profile'>>): string | null {
    if (!currentUser) return "NOT LOGGED IN!";
    const users = getUsers();
    const idx = users.findIndex(
      (u) => u.email.toLowerCase() === currentUser.email.toLowerCase()
    );
    if (idx === -1) return "USER NOT FOUND!";

    if (data.email && data.email.toLowerCase() !== currentUser.email.toLowerCase()) {
      if (isEmailTaken(data.email, idx)) return "EMAIL ALREADY IN USE!";
    }

    const updated: User = { ...users[idx], ...data };
    users[idx] = updated;
    saveUsers(users);
    setCurrentUser(updated);
    saveCurrentUser(updated);
    return null;
  }

  function changePassword(oldPassword: string, newPassword: string): string | null {
    if (!currentUser) return "NOT LOGGED IN!";
    if (currentUser.password !== oldPassword) return "INCORRECT OLD PASSWORD!";

    const users = getUsers();
    const idx = users.findIndex(
      (u) => u.email.toLowerCase() === currentUser.email.toLowerCase()
    );
    if (idx === -1) return "USER NOT FOUND!";

    users[idx].password = newPassword;
    saveUsers(users);
    const updated = { ...currentUser, password: newPassword };
    setCurrentUser(updated);
    saveCurrentUser(updated);
    return null;
  }

  return (
    <AuthContext.Provider value={{ currentUser, isAuthenticated, role, login, signup, logout, updateProfile, changePassword }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
