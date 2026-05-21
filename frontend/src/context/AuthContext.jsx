import React, { createContext, useState, useEffect, useCallback } from 'react';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Handle OAuth redirect or restore token
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const oauthToken = params.get('oauthToken');
    const oauthUser = params.get('oauthUser');
    const authError = params.get('authError');

    // Clear query params from URL
    if (oauthToken || authError) {
      window.history.replaceState({}, document.title, window.location.pathname);
    }

    if (authError) {
      sessionStorage.setItem('authError', authError);
      setLoading(false);
      return;
    }

    if (oauthToken && oauthUser) {
      try {
        const parsed = JSON.parse(decodeURIComponent(oauthUser));
        localStorage.setItem('cide_token', oauthToken);
        setToken(oauthToken);
        setUser(parsed);
      } catch (_) {}
      setLoading(false);
      return;
    }

    // Restore from localStorage
    const stored = localStorage.getItem('cide_token');
    if (!stored) {
      setLoading(false);
      return;
    }

    fetch(`${API_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${stored}` },
    })
      .then((r) => r.json())
      .then((d) => {
        if (d.user) {
          setToken(stored);
          setUser(d.user);
        } else {
          localStorage.removeItem('cide_token');
        }
      })
      .catch(() => localStorage.removeItem('cide_token'))
      .finally(() => setLoading(false));
  }, []);

  const login = useCallback((tok, usr) => {
    localStorage.setItem('cide_token', tok);
    setToken(tok);
    setUser(usr);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('cide_token');
    setToken(null);
    setUser(null);
  }, []);

  const apiFetch = useCallback((url, opts = {}) => {
    const tok = localStorage.getItem('cide_token');
    return fetch(`${API_URL}${url}`, {
      ...opts,
      headers: {
        'Content-Type': 'application/json',
        ...(tok ? { Authorization: `Bearer ${tok}` } : {}),
        ...opts.headers,
      },
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout, apiFetch }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
