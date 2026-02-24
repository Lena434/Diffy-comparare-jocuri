import { createContext, useContext, useState } from "react";
import type { User, UserRole } from "../types";
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
  login: (email: string, password: string) => string | null;
  signup: (username: string, email: string, password: string) => string | null;
  logout: () => void;
  updateProfile: (data: Partial<Pick<User, 'username' | 'email' | 'profile'>>) => string | null;
  changePassword: (oldPassword: string, newPassword: string) => string | null;
}

const AuthContext = createContext<AuthContextValue>({
  currentUser: null,
  isAuthenticated: false,
  role: null,
  login: () => null,
  signup: () => null,
  logout: () => {},
  updateProfile: () => null,
  changePassword: () => null,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(() => loadCurrentUser());

  const isAuthenticated = currentUser !== null;
  const role: UserRole | null = currentUser?.role ?? null;

  function login(email: string, password: string): string | null {
    const found = findUserByCredentials(email, password);
    if (!found) return "INVALID EMAIL OR PASSWORD!";
    setCurrentUser(found);
    saveCurrentUser(found);
    return null;
  }

  function signup(username: string, email: string, password: string): string | null {
    if (isEmailTaken(email)) return "EMAIL ALREADY REGISTERED!";

    const users = getUsers();
    const newUser: User = { username, email, password, role: 'user' };
    users.push(newUser);
    saveUsers(users);
    setCurrentUser(newUser);
    saveCurrentUser(newUser);
    return null;
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
