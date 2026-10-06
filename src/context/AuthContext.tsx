'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  isAdmin: boolean;
  login: (email: string, pass: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = 'soluciones_admin_session_v1';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    try {
      const storedSession = localStorage.getItem(AUTH_STORAGE_KEY);
      if (storedSession === 'true') {
        setIsAdmin(true);
      }
    } catch (e) {}
  }, []);

  const login = (email: string, pass: string): boolean => {
    // Admin demo credentials
    if (
      (email.toLowerCase() === 'admin@solucionesempresariales.sv' || email.toLowerCase() === 'admin') &&
      pass === 'admin123'
    ) {
      setIsAdmin(true);
      try {
        localStorage.setItem(AUTH_STORAGE_KEY, 'true');
      } catch (e) {}
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdmin(false);
    try {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    } catch (e) {}
  };

  return (
    <AuthContext.Provider value={{ isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
