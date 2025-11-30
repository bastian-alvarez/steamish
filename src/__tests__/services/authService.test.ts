import { describe, test, expect, beforeEach, vi } from 'vitest';
import authService from '../../services/authService';
import { API } from '../../config/constants';

// Mock de fetch global
global.fetch = vi.fn();

describe('authService', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        localStorage.clear();
        vi.mocked(fetch).mockClear();
    });

    test('debe obtener el token del localStorage', () => {
        localStorage.setItem('steamish_token', 'test-token');
        const token = authService.getToken();
        expect(token).toBe('test-token');
    });

    test('debe retornar null si no hay token', () => {
        const token = authService.getToken();
        expect(token).toBeNull();
    });

    test('debe obtener el usuario actual del localStorage', () => {
        const mockUser = {
            id: 1,
            email: 'test@test.com',
            name: 'Test User'
        };
        localStorage.setItem('steamish_user', JSON.stringify(mockUser));
        const user = authService.getCurrentUser();
        expect(user).toEqual(mockUser);
    });

    test('debe retornar null si no hay usuario', () => {
        const user = authService.getCurrentUser();
        expect(user).toBeNull();
    });

    test('debe iniciar sesión correctamente', async () => {
        const mockResponse = {
            user: {
                id: 1,
                email: 'test@test.com',
                name: 'Test User',
                isBlocked: false
            },
            token: 'mock-token'
        };

        vi.mocked(fetch).mockResolvedValueOnce({
            ok: true,
            json: async () => mockResponse
        } as Response);

        const user = await authService.login({ email: 'test@test.com', password: 'password123' });

        expect(fetch).toHaveBeenCalledWith(
            `${API.authService}/api/auth/login`,
            expect.objectContaining({
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        );

        expect(user).toBeDefined();
        expect(localStorage.getItem('steamish_token')).toBe('mock-token');
    });

    test('debe registrar un usuario correctamente', async () => {
        const mockResponse = {
            user: {
                id: 1,
                email: 'new@test.com',
                name: 'New User',
                isBlocked: false
            },
            token: 'mock-token'
        };

        vi.mocked(fetch).mockResolvedValueOnce({
            ok: true,
            json: async () => mockResponse
        } as Response);

        const user = await authService.register({
            username: 'newuser',
            email: 'new@test.com',
            password: 'password123'
        });

        expect(fetch).toHaveBeenCalledWith(
            `${API.authService}/api/auth/register`,
            expect.objectContaining({
                method: 'POST'
            })
        );

        expect(user).toBeDefined();
    });

    test('debe cerrar sesión correctamente', async () => {
        localStorage.setItem('steamish_user', 'test');
        localStorage.setItem('steamish_token', 'test-token');

        await authService.logout();

        expect(localStorage.getItem('steamish_user')).toBeNull();
        expect(localStorage.getItem('steamish_token')).toBeNull();
    });

    test('debe obtener headers de autenticación', () => {
        localStorage.setItem('steamish_token', 'test-token');
        const headers = authService.getAuthHeaders();

        expect(headers).toHaveProperty('Authorization', 'Bearer test-token');
        expect(headers).toHaveProperty('Content-Type', 'application/json');
    });
});

