'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios, { AxiosResponse } from 'axios';

// Types
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'SUPERADMIN' | 'ADMIN' | 'SELLER' | 'CUSTOMER';
  permissions: string[];
  isActive: boolean;
  businessName?: string;
  avatar?: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  role: 'CUSTOMER' | 'SELLER';
  businessName?: string;
}

interface AuthContextType {
  user: User | null;
  tokens: AuthTokens | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  refreshToken: () => Promise<void>;
  hasRole: (roles: string[]) => boolean;
  hasPermission: (permission: string) => boolean;
  updateUser: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_AUTH_SERVICE || 'http://localhost:10000';

// Create axios instance with interceptors
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Auth Provider Component
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [tokens, setTokens] = useState<AuthTokens | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = !!user && !!tokens;

  // Setup axios interceptors
  useEffect(() => {
    // Request interceptor to add auth token
    const requestInterceptor = apiClient.interceptors.request.use(
      (config) => {
        if (tokens?.accessToken) {
          config.headers.Authorization = `Bearer ${tokens.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor to handle token refresh
    const responseInterceptor = apiClient.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            await refreshToken();
            // Retry the original request with new token
            return apiClient(originalRequest);
          } catch (refreshError) {
            logout();
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      }
    );

    return () => {
      apiClient.interceptors.request.eject(requestInterceptor);
      apiClient.interceptors.response.eject(responseInterceptor);
    };
  }, [tokens]);

  // Initialize auth state from localStorage
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const storedTokens = localStorage.getItem('authTokens');
        const storedUser = localStorage.getItem('user');

        if (storedTokens && storedUser) {
          const parsedTokens = JSON.parse(storedTokens);
          const parsedUser = JSON.parse(storedUser);

          // Check if token is still valid
          const now = Date.now();
          const tokenExpiry = parsedTokens.expiresIn * 1000;

          if (now < tokenExpiry) {
            setTokens(parsedTokens);
            setUser(parsedUser);
          } else {
            // Try to refresh token
            try {
              await refreshTokens(parsedTokens.refreshToken);
            } catch (error) {
              clearAuthData();
            }
          }
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        clearAuthData();
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // Login function
  const login = async (credentials: LoginCredentials): Promise<void> => {
    try {
      setIsLoading(true);
      const response: AxiosResponse = await apiClient.post('/auth/login', credentials);

      if (response.data.success) {
        const { user: userData, tokens: tokenData } = response.data.data;
        
        const authTokens: AuthTokens = {
          accessToken: tokenData.accessToken,
          refreshToken: tokenData.refreshToken,
          expiresIn: Date.now() + (tokenData.expiresIn * 1000),
        };

        setUser(userData);
        setTokens(authTokens);

        // Store in localStorage
        localStorage.setItem('authTokens', JSON.stringify(authTokens));
        localStorage.setItem('user', JSON.stringify(userData));
      } else {
        throw new Error(response.data.message || 'Login failed');
      }
    } catch (error: any) {
      console.error('Login error:', error);
      throw new Error(error.response?.data?.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  // Register function
  const register = async (data: RegisterData): Promise<void> => {
    try {
      setIsLoading(true);
      const response: AxiosResponse = await apiClient.post('/auth/register', data);

      if (response.data.success) {
        // Auto-login after successful registration
        await login({ email: data.email, password: data.password });
      } else {
        throw new Error(response.data.message || 'Registration failed');
      }
    } catch (error: any) {
      console.error('Registration error:', error);
      throw new Error(error.response?.data?.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = (): void => {
    try {
      // Call logout API if user is authenticated
      if (tokens?.accessToken) {
        apiClient.post('/auth/logout', { refreshToken: tokens.refreshToken })
          .catch(console.error);
      }
    } catch (error) {
      console.error('Logout API error:', error);
    } finally {
      clearAuthData();
    }
  };

  // Refresh token function
  const refreshToken = async (): Promise<void> => {
    if (!tokens?.refreshToken) {
      throw new Error('No refresh token available');
    }

    try {
      await refreshTokens(tokens.refreshToken);
    } catch (error) {
      clearAuthData();
      throw error;
    }
  };

  // Helper function to refresh tokens
  const refreshTokens = async (refreshToken: string): Promise<void> => {
    const response: AxiosResponse = await apiClient.post('/auth/refresh', {
      refreshToken,
    });

    if (response.data.success) {
      const { accessToken, refreshToken: newRefreshToken, expiresIn } = response.data.data;
      
      const newTokens: AuthTokens = {
        accessToken,
        refreshToken: newRefreshToken,
        expiresIn: Date.now() + (expiresIn * 1000),
      };

      setTokens(newTokens);
      localStorage.setItem('authTokens', JSON.stringify(newTokens));
    } else {
      throw new Error('Token refresh failed');
    }
  };

  // Clear auth data
  const clearAuthData = (): void => {
    setUser(null);
    setTokens(null);
    localStorage.removeItem('authTokens');
    localStorage.removeItem('user');
  };

  // Role checking helper
  const hasRole = (roles: string[]): boolean => {
    if (!user) return false;
    return roles.includes(user.role);
  };

  // Permission checking helper
  const hasPermission = (permission: string): boolean => {
    if (!user) return false;
    return user.permissions.includes(permission);
  };

  // Update user data
  const updateUser = (userData: Partial<User>): void => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  const value: AuthContextType = {
    user,
    tokens,
    isLoading,
    isAuthenticated,
    login,
    register,
    logout,
    refreshToken,
    hasRole,
    hasPermission,
    updateUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use auth context
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Demo data for development
export const DEMO_ACCOUNTS = [
  {
    email: 'superadmin@demo.com',
    password: 'password123',
    role: 'SUPERADMIN',
    name: 'Super Admin'
  },
  {
    email: 'admin@demo.com',
    password: 'password123',
    role: 'ADMIN',
    name: 'Admin User'
  },
  {
    email: 'seller@demo.com',
    password: 'password123',
    role: 'SELLER',
    name: 'Seller User'
  },
  {
    email: 'customer@demo.com',
    password: 'password123',
    role: 'CUSTOMER',
    name: 'Customer User'
  }
];
