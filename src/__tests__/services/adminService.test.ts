import { describe, test, expect, beforeEach, vi } from 'vitest';
import adminService from '../../services/adminService';
import authService from '../../services/authService';

// Mock de authService
vi.mock('../../services/authService', () => ({
    default: {
        getToken: vi.fn()
    }
}));

// Mock global de fetch
global.fetch = vi.fn();

describe('AdminService', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        localStorage.clear();
    });

    describe('getAllUsers', () => {
        test('debe obtener todos los usuarios exitosamente', async () => {
            const mockUsers = [
                { id: 1, name: 'User 1', email: 'user1@test.com', role: 'USER' },
                { id: 2, name: 'User 2', email: 'user2@test.com', role: 'ADMIN' }
            ];

            vi.mocked(authService.getToken).mockReturnValue('mock-token');
            vi.mocked(fetch).mockResolvedValueOnce({
                ok: true,
                json: async () => ({ _embedded: { userResponseList: mockUsers } })
            } as Response);

            const users = await adminService.getAllUsers();

            expect(users).toHaveLength(2);
            expect(users[0].email).toBe('user1@test.com');
            expect(fetch).toHaveBeenCalledWith(
                expect.stringContaining('/api/admin/users'),
                expect.objectContaining({
                    headers: expect.objectContaining({
                        'Authorization': 'Bearer mock-token'
                    })
                })
            );
        });

        test('debe lanzar error si no hay token', async () => {
            vi.mocked(authService.getToken).mockReturnValue(null);

            await expect(adminService.getAllUsers()).rejects.toThrow('No autenticado');
        });

        test('debe manejar respuesta con array directo', async () => {
            const mockUsers = [{ id: 1, name: 'User 1', email: 'user1@test.com' }];

            vi.mocked(authService.getToken).mockReturnValue('mock-token');
            vi.mocked(fetch).mockResolvedValueOnce({
                ok: true,
                json: async () => mockUsers
            } as Response);

            const users = await adminService.getAllUsers();
            expect(users).toHaveLength(1);
        });
    });

    describe('getUserById', () => {
        test('debe obtener un usuario por ID', async () => {
            const mockUser = { id: 1, name: 'User 1', email: 'user1@test.com', role: 'USER' };

            vi.mocked(authService.getToken).mockReturnValue('mock-token');
            vi.mocked(fetch).mockResolvedValueOnce({
                ok: true,
                json: async () => ({ _embedded: mockUser })
            } as Response);

            const user = await adminService.getUserById(1);

            expect(user.id).toBe(1);
            expect(user.email).toBe('user1@test.com');
        });

        test('debe lanzar error si el usuario no existe', async () => {
            vi.mocked(authService.getToken).mockReturnValue('mock-token');
            vi.mocked(fetch).mockResolvedValueOnce({
                ok: false,
                status: 404
            } as Response);

            await expect(adminService.getUserById(999)).rejects.toThrow('Usuario no encontrado');
        });
    });

    describe('updateUser', () => {
        test('debe actualizar un usuario exitosamente', async () => {
            const mockUser = { id: 1, name: 'Updated User', email: 'updated@test.com' };
            const updateRequest = { name: 'Updated User', email: 'updated@test.com' };

            vi.mocked(authService.getToken).mockReturnValue('mock-token');
            vi.mocked(fetch).mockResolvedValueOnce({
                ok: true,
                json: async () => ({ _embedded: mockUser })
            } as Response);

            const user = await adminService.updateUser(1, updateRequest);

            expect(user.name).toBe('Updated User');
            expect(fetch).toHaveBeenCalledWith(
                expect.stringContaining('/api/admin/users/1'),
                expect.objectContaining({
                    method: 'PUT',
                    body: JSON.stringify(updateRequest)
                })
            );
        });
    });

    describe('deleteUser', () => {
        test('debe eliminar un usuario exitosamente', async () => {
            vi.mocked(authService.getToken).mockReturnValue('mock-token');
            vi.mocked(fetch).mockResolvedValueOnce({
                ok: true
            } as Response);

            const result = await adminService.deleteUser(1);

            expect(result).toBe(true);
            expect(fetch).toHaveBeenCalledWith(
                expect.stringContaining('/api/admin/users/1'),
                expect.objectContaining({
                    method: 'DELETE'
                })
            );
        });

        test('debe retornar false si falla la eliminación', async () => {
            vi.mocked(authService.getToken).mockReturnValue('mock-token');
            vi.mocked(fetch).mockResolvedValueOnce({
                ok: false
            } as Response);

            const result = await adminService.deleteUser(1);
            expect(result).toBe(false);
        });
    });

    describe('blockUser', () => {
        test('debe bloquear un usuario exitosamente', async () => {
            const mockUser = { id: 1, name: 'User 1', email: 'user1@test.com', isBlocked: true };

            vi.mocked(authService.getToken).mockReturnValue('mock-token');
            vi.mocked(fetch).mockResolvedValueOnce({
                ok: true,
                json: async () => ({ _embedded: mockUser })
            } as Response);

            const user = await adminService.blockUser(1);

            expect(user.isBlocked).toBe(true);
        });
    });

    describe('unblockUser', () => {
        test('debe desbloquear un usuario exitosamente', async () => {
            const mockUser = { id: 1, name: 'User 1', email: 'user1@test.com', isBlocked: false };

            vi.mocked(authService.getToken).mockReturnValue('mock-token');
            vi.mocked(fetch).mockResolvedValueOnce({
                ok: true,
                json: async () => ({ _embedded: mockUser })
            } as Response);

            const user = await adminService.unblockUser(1);

            expect(user.isBlocked).toBe(false);
        });
    });
});

