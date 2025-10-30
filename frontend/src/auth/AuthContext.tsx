import { createContext, useContext, useEffect, useMemo, useState } from 'react';

export type AuthState = {
  isAuthenticated: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  username: string | null;
};

export type AuthContextValue = AuthState & {
  login: (username: string, password: string) => Promise<boolean>;
  register: (
    username: string,
    email: string,
    password: string,
  ) => Promise<boolean>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function saveState(state: AuthState) {
  localStorage.setItem('auth', JSON.stringify(state));
}

function loadState(): AuthState {
  try {
    const raw = localStorage.getItem('auth');
    if (!raw)
      return {
        isAuthenticated: false,
        accessToken: null,
        refreshToken: null,
        username: null,
      };
    return JSON.parse(raw);
  } catch {
    return {
      isAuthenticated: false,
      accessToken: null,
      refreshToken: null,
      username: null,
    };
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>(loadState());

  useEffect(() => {
    saveState(state);
  }, [state]);

  const value = useMemo<AuthContextValue>(
    () => ({
      ...state,
      login: async (username: string, password: string) => {
        const res = await fetch('/api/auth/token/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password }),
        });
        if (!res.ok) return false;
        const data = await res.json();
        setState({
          isAuthenticated: true,
          accessToken: data.access,
          refreshToken: data.refresh ?? null,
          username,
        });
        return true;
      },
      register: async (username: string, email: string, password: string) => {
        const res = await fetch('/api/auth/register/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, email, password }),
        });
        if (!res.ok) return false;
        return true;
      },
      logout: () => {
        setState({
          isAuthenticated: false,
          accessToken: null,
          refreshToken: null,
          username: null,
        });
      },
    }),
    [state],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
