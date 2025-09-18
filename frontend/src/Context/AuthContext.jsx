// src/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from 'react';
import * as api from '../Api/authLogout';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // on startup, check /api/auth/me to persist session if cookie present
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await api.me();
        if (mounted && data?.username) setUser({ username: data.username });
      } catch (err) {
        // not logged in or error — ignore silently
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => (mounted = false);
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
