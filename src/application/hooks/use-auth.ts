'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, AuthState } from '@/domain/types';
import { authService } from '@/application/services';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [state, setState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false,
    error: null,
  });

  const updateUserState = (user: User | null) => {
    setState(prev => ({
      ...prev,
      user,
      isAuthenticated: !!user,
      isLoading: false,
      error: null,
    }));
  };

  const login = async (email: string, password: string) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const response = await authService.login({ email, password });
      updateUserState(response.user);
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Erro ao fazer login',
      }));
      throw error;
    }
  };

  const register = async (data: any) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const response = await authService.register(data);
      updateUserState(response.user);
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Erro ao criar conta',
      }));
      throw error;
    }
  };

  const logout = async () => {
    setState(prev => ({ ...prev, isLoading: true }));
    
    try {
      await authService.logout();
      updateUserState(null);
    } catch (error) {
      updateUserState(null);
    }
  };

  const refreshUser = async () => {
    try {
      await authService.refreshTokens();
      const user = authService.getCurrentUser();
      updateUserState(user);
    } catch (error) {
      updateUserState(null);
    }
  };

  useEffect(() => {
    const initializeAuth = () => {
      const user = authService.getCurrentUser();
      updateUserState(user);
    };

    initializeAuth();
  }, []);

  const value: AuthContextType = {
    ...state,
    login,
    register,
    logout,
    refreshUser,
  };

  return (
    <AuthContext.Provider value={value}>
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

export function usePermission(permission: string): boolean {
  const { user } = useAuth();
  
  if (!user) return false;
  
  return user.role === 'ADMIN';
}
