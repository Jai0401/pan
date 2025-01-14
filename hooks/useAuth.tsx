import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (credentials: { panNumber: string; password: string }) => Promise<void>;
  register: (userData: {
    panNumber: string;
    password: string;
    email?: string;
    mobile?: string;
    address?: string;
  }) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      setIsAuthenticated(!!token);
    } catch (error) {
      console.error('Error checking auth status:', error);
    }
  };

  const login = async (credentials: { panNumber: string; password: string }) => {
    await AsyncStorage.setItem('authToken', 'dummy-token');
    setIsAuthenticated(true);
  };

  const register = async (userData: {
    panNumber: string;
    password: string;
    email?: string;
    mobile?: string;
    address?: string;
  }) => {
    await AsyncStorage.setItem('authToken', 'dummy-token');
    setIsAuthenticated(true);
  };

  const logout = async () => {
    await AsyncStorage.removeItem('authToken');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 