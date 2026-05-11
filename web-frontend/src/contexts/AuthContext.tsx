import { createContext, useContext, useState, useEffect } from "react";
import type { User, UserRole, UserProfile } from "../types";
import { useAxios } from "../axios/context";
import { loadCurrentUser, saveCurrentUser, loadToken, saveToken } from "../services/authService";
import { API_ROUTES } from "../axios/apiRoutes";

export type { User, UserRole, UserProfile, PcSpecs } from "../types";

interface AuthContextValue {
  currentUser: User | null;
  isAuthenticated: boolean;
  role: UserRole | null;
  login: (email: string, password: string) => Promise<string | null>;
  signup: (username: string, email: string, password: string) => Promise<string | null>;
  logout: () => void;
  updateProfile: (data: Partial<Pick<User, 'username' | 'email'>>) => Promise<string | null>;
  updateLocalProfile: (profile: UserProfile) => void;
  changePassword: (oldPassword: string, newPassword: string) => Promise<string | null>;
}

const AuthContext = createContext<AuthContextValue>({
  currentUser: null,
  isAuthenticated: false,
  role: null,
  login: async () => null,
  signup: async () => null,
  logout: () => {},
  updateProfile: async () => null,
  updateLocalProfile: () => {},
  changePassword: async () => null,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { client, api } = useAxios();
  const [currentUser, setCurrentUser] = useState<User | null>(() => loadCurrentUser());

  // Attach saved token to every outgoing request
  useEffect(() => {
    const id = client.interceptors.request.use((config) => {
      const token = loadToken();
      if (token) {
        config.headers = config.headers ?? {};
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    });
    return () => client.interceptors.request.eject(id);
  }, [client]);

  const isAuthenticated = currentUser !== null;
  const role: UserRole | null = currentUser?.role ?? null;

  async function login(email: string, password: string): Promise<string | null> {
    try {
      const { token, user } = await api.post<any>(API_ROUTES.AUTH.LOGIN, { email, password });
      const loggedUser: User = {
        id: user.id,
        username: user.username,
        email: user.email,
        role: (user.role as string)?.toLowerCase() as UserRole,
      };
      saveToken(token);
      setCurrentUser(loggedUser);
      saveCurrentUser(loggedUser);
      return null;
    } catch {
      return "INVALID EMAIL OR PASSWORD!";
    }
  }

  async function signup(username: string, email: string, password: string): Promise<string | null> {
    try {
      await api.post(API_ROUTES.AUTH.REGISTER, { username, email, password });
      return await login(email, password);
    } catch {
      return "EMAIL ALREADY REGISTERED!";
    }
  }

  function logout() {
    setCurrentUser(null);
    saveCurrentUser(null);
    saveToken(null);
  }

  async function updateProfile(data: Partial<Pick<User, 'username' | 'email'>>): Promise<string | null> {
    if (!currentUser) return "NOT LOGGED IN!";
    try {
      await api.patch(API_ROUTES.USERS.UPDATE_PROFILE, {
        email: currentUser.email,
        username: data.username ?? currentUser.username,
        newEmail: data.email ?? currentUser.email,
      });
      const updated: User = { ...currentUser, ...data };
      setCurrentUser(updated);
      saveCurrentUser(updated);
      return null;
    } catch {
      return "EMAIL ALREADY IN USE!";
    }
  }

  function updateLocalProfile(profile: UserProfile) {
    if (!currentUser) return;
    const updated = { ...currentUser, profile };
    setCurrentUser(updated);
    saveCurrentUser(updated);
  }


  async function changePassword(oldPassword: string, newPassword: string): Promise<string | null> {
    if (!currentUser) return "NOT LOGGED IN!";
    try {
      await api.patch(API_ROUTES.USERS.CHANGE_PASSWORD, {
        email: currentUser.email,
        oldPassword,
        newPassword,
      });
      return null;
    } catch {
      return "INCORRECT OLD PASSWORD!";
    }
  }

  return (
    <AuthContext.Provider value={{ currentUser, isAuthenticated, role, login, signup, logout, updateProfile, updateLocalProfile, changePassword }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
