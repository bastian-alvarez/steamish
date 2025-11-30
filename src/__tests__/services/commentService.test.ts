import { describe, test, expect, beforeEach, vi } from 'vitest';
import commentService from '../../services/commentService';

// Mock global de fetch
global.fetch = vi.fn();

describe('CommentService', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('getAllComments', () => {
        test('debe obtener todos los comentarios', async () => {
            const mockComments = [
                { id: 1, juegoId: 1, usuarioId: 1, usuarioNombre: 'User 1', contenido: 'Comment 1', fechaCreacion: '2024-01-01', oculto: false },
                { id: 2, juegoId: 1, usuarioId: 2, usuarioNombre: 'User 2', contenido: 'Comment 2', fechaCreacion: '2024-01-02', oculto: false }
            ];

            vi.mocked(fetch).mockResolvedValueOnce({
                ok: true,
                json: async () => ({ _embedded: { commentResponseList: mockComments } })
            } as Response);

            const comments = await commentService.getAllComments();

            expect(comments).toHaveLength(2);
            expect(comments[0].contenido).toBe('Comment 1');
        });

        test('debe retornar array vacío en caso de error', async () => {
            vi.mocked(fetch).mockResolvedValueOnce({
                ok: false
            } as Response);

            const comments = await commentService.getAllComments();
            expect(comments).toEqual([]);
        });
    });

    describe('getCommentsByGame', () => {
        test('debe obtener comentarios de un juego específico', async () => {
            const mockComments = [
                { id: 1, juegoId: 1, usuarioId: 1, usuarioNombre: 'User 1', contenido: 'Comment 1', fechaCreacion: '2024-01-01', oculto: false }
            ];

            vi.mocked(fetch).mockResolvedValueOnce({
                ok: true,
                json: async () => ({ _embedded: { commentResponseList: mockComments } })
            } as Response);

            const comments = await commentService.getCommentsByGame(1);

            expect(comments).toHaveLength(1);
            expect(comments[0].juegoId).toBe(1);
        });

        test('debe incluir comentarios ocultos si se solicita', async () => {
            const mockComments = [
                { id: 1, juegoId: 1, usuarioId: 1, usuarioNombre: 'User 1', contenido: 'Comment 1', fechaCreacion: '2024-01-01', oculto: true }
            ];

            vi.mocked(fetch).mockResolvedValueOnce({
                ok: true,
                json: async () => ({ _embedded: { commentResponseList: mockComments } })
            } as Response);

            const comments = await commentService.getCommentsByGame(1, true);

            expect(comments[0].oculto).toBe(true);
        });
    });

    describe('getCommentsByUser', () => {
        test('debe obtener comentarios de un usuario específico', async () => {
            const mockComments = [
                { id: 1, juegoId: 1, usuarioId: 1, usuarioNombre: 'User 1', contenido: 'Comment 1', fechaCreacion: '2024-01-01', oculto: false }
            ];

            vi.mocked(fetch).mockResolvedValueOnce({
                ok: true,
                json: async () => ({ _embedded: { commentResponseList: mockComments } })
            } as Response);

            const comments = await commentService.getCommentsByUser(1);

            expect(comments).toHaveLength(1);
            expect(comments[0].usuarioId).toBe(1);
        });
    });

    describe('createComment', () => {
        test('debe crear un comentario exitosamente', async () => {
            const mockComment = {
                id: 1,
                juegoId: 1,
                usuarioId: 1,
                usuarioNombre: 'User 1',
                contenido: 'New comment',
                fechaCreacion: '2024-01-01',
                oculto: false
            };

            const createRequest = {
                juegoId: 1,
                usuarioId: 1,
                usuarioNombre: 'User 1',
                contenido: 'New comment'
            };

            vi.mocked(fetch).mockResolvedValueOnce({
                ok: true,
                json: async () => ({ _embedded: mockComment })
            } as Response);

            const comment = await commentService.createComment(createRequest);

            expect(comment.contenido).toBe('New comment');
            expect(fetch).toHaveBeenCalledWith(
                expect.stringContaining('/api/comments'),
                expect.objectContaining({
                    method: 'POST',
                    body: JSON.stringify(createRequest)
                })
            );
        });

        test('debe lanzar error si falla la creación', async () => {
            vi.mocked(fetch).mockResolvedValueOnce({
                ok: false,
                text: async () => 'Error al crear comentario'
            } as Response);

            await expect(commentService.createComment({
                juegoId: 1,
                contenido: 'Test'
            })).rejects.toThrow();
        });
    });

    describe('deleteComment', () => {
        test('debe eliminar un comentario exitosamente', async () => {
            vi.mocked(fetch).mockResolvedValueOnce({
                ok: true
            } as Response);

            const result = await commentService.deleteComment(1);

            expect(result).toBe(true);
            expect(fetch).toHaveBeenCalledWith(
                expect.stringContaining('/api/comments/1'),
                expect.objectContaining({
                    method: 'DELETE'
                })
            );
        });

        test('debe retornar false si falla la eliminación', async () => {
            vi.mocked(fetch).mockResolvedValueOnce({
                ok: false
            } as Response);

            const result = await commentService.deleteComment(1);
            expect(result).toBe(false);
        });
    });
});

