import { createContext, useContext, useState } from "react";

export type UserRole = 'user' | 'admin';

export interface User {
  username: string;
  email: string;
  password: string;
  role: UserRole;
}

interface AuthContextValue {
  currentUser: User | null;
  isAuthenticated: boolean;
  role: UserRole | null;
  login: (email: string, password: string) => string | null;
  signup: (username: string, email: string, password: string) => string | null;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue>({
  currentUser: null,
  isAuthenticated: false,
  role: null,
  login: () => null,
  signup: () => null,
  logout: () => {},
});

function getUsers(): User[] {
  try {
    return JSON.parse(localStorage.getItem("diffy-users") || "[]");
  } catch {
    return [];
  }
}

function saveUsers(users: User[]) {
  localStorage.setItem("diffy-users", JSON.stringify(users));
}

function saveCurrentUser(user: User | null) {
  if (user) {
    localStorage.setItem("diffy-current-user", JSON.stringify(user));
  } else {
    localStorage.removeItem("diffy-current-user");
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    try {
      const stored = localStorage.getItem("diffy-current-user");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const isAuthenticated = currentUser !== null;
  const role: UserRole | null = currentUser?.role ?? null;

  function login(email: string, password: string): string | null {
    const users = getUsers();
    const found = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    if (!found) return "INVALID EMAIL OR PASSWORD!";
    setCurrentUser(found);
    saveCurrentUser(found);
    return null;
  }

  function signup(username: string, email: string, password: string): string | null {
    const users = getUsers();
    const exists = users.some(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );
    if (exists) return "EMAIL ALREADY REGISTERED!";

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

  return (
    <AuthContext.Provider value={{ currentUser, isAuthenticated, role, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
