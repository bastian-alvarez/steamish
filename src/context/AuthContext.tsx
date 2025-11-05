import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { User, LoginCredentials, RegisterData, UserRole } from '../types/User';
import authService from '../services/authService';

// 🔐 Interfaces para AuthContext
export interface AuthContextType {
    user: User | null;
    loading: boolean;
    error: string | null;
    login: (email: string, password: string) => Promise<User>;
    register: (username: string, email: string, password: string) => Promise<User>;
    logout: () => Promise<void>;
    isAuthenticated: boolean;
    isAdmin: boolean;
    clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 🔐 AuthProvider con mejor manejo de estado usando useContext
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Cargar usuario al montar
    useEffect(() => {
        loadCurrentUser();
    }, []);

    const loadCurrentUser = useCallback(() => {
        try {
            setLoading(true);
            setError(null);
            const currentUser = authService.getCurrentUser();
            setUser(currentUser);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error al cargar usuario');
        } finally {
            setLoading(false);
        }
    }, []);

    const login = useCallback(async (email: string, password: string): Promise<User> => {
        try {
            setLoading(true);
            setError(null);
            const userData = await authService.login({ email, password });
            setUser(userData);
            return userData;
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Error al iniciar sesión';
            setError(errorMessage);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const register = useCallback(async (username: string, email: string, password: string): Promise<User> => {
        try {
            setLoading(true);
            setError(null);
            const userData = await authService.register({ username, email, password });
            setUser(userData);
            return userData;
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Error al registrar usuario';
            setError(errorMessage);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const logout = useCallback(async (): Promise<void> => {
        try {
            setLoading(true);
            setError(null);
            await authService.logout();
            setUser(null);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error al cerrar sesión');
        } finally {
            setLoading(false);
        }
    }, []);

    const clearError = useCallback(() => {
        setError(null);
    }, []);

    const value: AuthContextType = {
        user,
        loading,
        error,
        login,
        register,
        logout,
        isAuthenticated: user !== null,
        isAdmin: user?.role === UserRole.ADMIN,
        clearError
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook para usar el contexto de autenticación
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth debe ser usado dentro de un AuthProvider');
    }
    return context;
};