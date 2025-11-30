import React from 'react';
import { describe, test, expect, beforeEach, vi } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { AuthProvider, useAuth } from '../../context/AuthContext';
import authService from '../../services/authService';

vi.mock('../../services/authService', () => ({
    __esModule: true,
    default: {
        login: vi.fn(),
        register: vi.fn(),
        logout: vi.fn(),
        getCurrentUser: vi.fn().mockReturnValue(null)
    }
}));

const wrapper = ({ children }: { children: React.ReactNode }) => (
    <AuthProvider>{children}</AuthProvider>
);

describe('AuthContext', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        localStorage.clear();
    });

    test('debe proporcionar el contexto de autenticación', () => {
        const { result } = renderHook(() => useAuth(), { wrapper });

        expect(result.current).toBeDefined();
        expect(result.current.login).toBeDefined();
        expect(result.current.register).toBeDefined();
        expect(result.current.logout).toBeDefined();
        expect(result.current.isAuthenticated).toBe(false);
    });

    test('debe iniciar sesión correctamente', async () => {
        const mockUser = {
            id: 1,
            email: 'test@test.com',
            name: 'Test User',
            role: 'user',
            token: 'mock-token'
        };

        vi.mocked(authService.login).mockResolvedValue(mockUser);

        const { result } = renderHook(() => useAuth(), { wrapper });

        await act(async () => {
            await result.current.login('test@test.com', 'password123');
        });

        await waitFor(() => {
            expect(result.current.isAuthenticated).toBe(true);
            expect(result.current.user).toEqual(mockUser);
        });
    });

    test('debe registrar un usuario correctamente', async () => {
        const mockUser = {
            id: 1,
            email: 'new@test.com',
            name: 'New User',
            role: 'user',
            token: 'mock-token'
        };

        vi.mocked(authService.register).mockResolvedValue(mockUser);

        const { result } = renderHook(() => useAuth(), { wrapper });

        await act(async () => {
            await result.current.register('newuser', 'new@test.com', 'password123');
        });

        await waitFor(() => {
            expect(result.current.isAuthenticated).toBe(true);
            expect(result.current.user).toEqual(mockUser);
        });
    });

    test('debe cerrar sesión correctamente', async () => {
        vi.mocked(authService.logout).mockResolvedValue(undefined);

        const { result } = renderHook(() => useAuth(), { wrapper });

        await act(async () => {
            await result.current.logout();
        });

        await waitFor(() => {
            expect(result.current.isAuthenticated).toBe(false);
            expect(result.current.user).toBeNull();
        });
    });

    test('debe limpiar el error', () => {
        const { result } = renderHook(() => useAuth(), { wrapper });

        act(() => {
            result.current.clearError();
        });

        expect(result.current.error).toBeNull();
    });
});

