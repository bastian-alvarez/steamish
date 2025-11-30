import { describe, test, expect, beforeEach, vi } from 'vitest';
import moderatorService from '../../services/moderatorService';
import authService from '../../services/authService';

// Mock de authService
vi.mock('../../services/authService', () => ({
    default: {
        getToken: vi.fn()
    }
}));

// Mock global de fetch
global.fetch = vi.fn();

describe('ModeratorService', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('getUserData', () => {
        test('debe obtener datos de un usuario exitosamente', async () => {
            const mockUserData = {
                id: 1,
                name: 'User 1',
                email: 'user1@test.com',
                phone: '123456789',
                profilePhotoUri: 'photo.jpg',
                isBlocked: false,
                role: 'USER'
            };

            vi.mocked(authService.getToken).mockReturnValue('mock-token');
            vi.mocked(fetch).mockResolvedValueOnce({
                ok: true,
                json: async () => ({ _embedded: mockUserData })
            } as Response);

            const userData = await moderatorService.getUserData(1);

            expect(userData).not.toBeNull();
            expect(userData?.email).toBe('user1@test.com');
        });

        test('debe retornar null si el usuario no existe', async () => {
            vi.mocked(authService.getToken).mockReturnValue('mock-token');
            vi.mocked(fetch).mockResolvedValueOnce({
                ok: false,
                status: 404
            } as Response);

            const userData = await moderatorService.getUserData(999);

            expect(userData).toBeNull();
        });

        test('debe retornar null si no hay token', async () => {
            vi.mocked(authService.getToken).mockReturnValue(null);
            
            // El servicio lanza error pero lo captura y retorna null
            const userData = await moderatorService.getUserData(1);
            expect(userData).toBeNull();
        });
    });

    describe('getUserComments', () => {
        test('debe obtener comentarios de un usuario', async () => {
            const mockComments = [
                { id: 1, juegoId: 1, usuarioId: 1, usuarioNombre: 'User 1', contenido: 'Comment 1', fechaCreacion: '2024-01-01', oculto: false }
            ];

            vi.mocked(authService.getToken).mockReturnValue('mock-token');
            vi.mocked(fetch).mockResolvedValueOnce({
                ok: true,
                json: async () => ({ _embedded: { commentResponseList: mockComments } })
            } as Response);

            const comments = await moderatorService.getUserComments(1);

            expect(comments).toHaveLength(1);
            expect(comments[0].usuarioId).toBe(1);
        });

        test('debe retornar array vacío en caso de error', async () => {
            vi.mocked(authService.getToken).mockReturnValue('mock-token');
            vi.mocked(fetch).mockResolvedValueOnce({
                ok: false
            } as Response);

            const comments = await moderatorService.getUserComments(1);
            expect(comments).toEqual([]);
        });
    });

    describe('hideComment', () => {
        test('debe ocultar un comentario exitosamente', async () => {
            const mockComment = {
                id: 1,
                juegoId: 1,
                usuarioId: 1,
                usuarioNombre: 'User 1',
                contenido: 'Comment 1',
                fechaCreacion: '2024-01-01',
                oculto: true
            };

            vi.mocked(authService.getToken).mockReturnValue('mock-token');
            vi.mocked(fetch).mockResolvedValueOnce({
                ok: true,
                json: async () => ({ _embedded: mockComment })
            } as Response);

            const comment = await moderatorService.hideComment(1);

            expect(comment.oculto).toBe(true);
            expect(fetch).toHaveBeenCalledWith(
                expect.stringContaining('/api/moderator/comments/1/hide'),
                expect.objectContaining({
                    method: 'POST'
                })
            );
        });
    });

    describe('showComment', () => {
        test('debe mostrar un comentario exitosamente', async () => {
            const mockComment = {
                id: 1,
                juegoId: 1,
                usuarioId: 1,
                usuarioNombre: 'User 1',
                contenido: 'Comment 1',
                fechaCreacion: '2024-01-01',
                oculto: false
            };

            vi.mocked(authService.getToken).mockReturnValue('mock-token');
            vi.mocked(fetch).mockResolvedValueOnce({
                ok: true,
                json: async () => ({ _embedded: mockComment })
            } as Response);

            const comment = await moderatorService.showComment(1);

            expect(comment.oculto).toBe(false);
            expect(fetch).toHaveBeenCalledWith(
                expect.stringContaining('/api/moderator/comments/1/show'),
                expect.objectContaining({
                    method: 'POST'
                })
            );
        });
    });
});

