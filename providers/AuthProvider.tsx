import backendService, { UserPreferences } from "@/service/backend.service";
import React, {
    createContext,
    ReactNode,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";
import { Models } from "react-native-appwrite";

type AuthContextType = {
  user: Models.User<UserPreferences> | null;
  loading: boolean;
  isLoggedIn: boolean;
  avatar: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: false,
  isLoggedIn: false,
  avatar: null,
  login: async () => {},
  register: async () => {},
  logout: async () => {},
  refresh: async () => {},
});

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return ctx;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Models.User<UserPreferences> | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const currentUser = await backendService.getCurrentUser();
      console.log("Fetched current user:", currentUser);
      setUser(currentUser);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const login = useCallback(
    async (email: string, password: string) => {
      setLoading(true);
      try {
        await backendService.login(email, password);
        await refresh();
      } catch (err) {
        setUser(null);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [refresh]
  );

  const register = useCallback(
    async (email: string, password: string, name: string) => {
      setLoading(true);
      try {
        await backendService.register(email, password, name);
        await refresh();
      } catch (err) {
        setUser(null);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [refresh]
  );

  const logout = useCallback(async () => {
    setLoading(true);
    try {
      await backendService.logout();
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const isLoggedIn = !!user;
  const avatar = user?.prefs?.avatar ?? null;

  const value = useMemo<AuthContextType>(
    () => ({
      user,
      loading,
      isLoggedIn,
      avatar,
      login,
      register,
      logout,
      refresh,
    }),
    [user, loading, isLoggedIn, avatar, login, register, logout, refresh]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
