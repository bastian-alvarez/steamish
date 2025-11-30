import { describe, test, expect, beforeEach, vi } from 'vitest';
import ratingService from '../../services/ratingService';

// Mock global de fetch
global.fetch = vi.fn();

describe('RatingService', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('createOrUpdateRating', () => {
        test('debe crear o actualizar una calificación exitosamente', async () => {
            const mockRating = {
                id: 1,
                juegoId: 1,
                usuarioId: 1,
                calificacion: 5,
                fechaCreacion: '2024-01-01'
            };

            const createRequest = {
                juegoId: 1,
                usuarioId: 1,
                calificacion: 5
            };

            vi.mocked(fetch).mockResolvedValueOnce({
                ok: true,
                json: async () => ({ _embedded: mockRating })
            } as Response);

            const rating = await ratingService.createOrUpdateRating(createRequest);

            expect(rating.calificacion).toBe(5);
            expect(fetch).toHaveBeenCalledWith(
                expect.stringContaining('/api/ratings'),
                expect.objectContaining({
                    method: 'POST',
                    body: JSON.stringify(createRequest)
                })
            );
        });

        test('debe lanzar error si falla la creación', async () => {
            vi.mocked(fetch).mockResolvedValueOnce({
                ok: false,
                text: async () => 'Error al guardar la calificación'
            } as Response);

            await expect(ratingService.createOrUpdateRating({
                juegoId: 1,
                calificacion: 5
            })).rejects.toThrow();
        });
    });

    describe('getUserRating', () => {
        test('debe obtener la calificación de un usuario para un juego', async () => {
            const mockRating = {
                id: 1,
                juegoId: 1,
                usuarioId: 1,
                calificacion: 4,
                fechaCreacion: '2024-01-01'
            };

            vi.mocked(fetch).mockResolvedValueOnce({
                ok: true,
                json: async () => ({ _embedded: mockRating })
            } as Response);

            const rating = await ratingService.getUserRating(1, 1);

            expect(rating).not.toBeNull();
            expect(rating?.calificacion).toBe(4);
        });

        test('debe retornar null si no existe calificación', async () => {
            vi.mocked(fetch).mockResolvedValueOnce({
                ok: false,
                status: 404
            } as Response);

            const rating = await ratingService.getUserRating(1, 1);

            expect(rating).toBeNull();
        });

        test('debe retornar null en caso de error', async () => {
            vi.mocked(fetch).mockRejectedValueOnce(new Error('Network error'));

            const rating = await ratingService.getUserRating(1, 1);

            expect(rating).toBeNull();
        });
    });

    describe('getGameRating', () => {
        test('debe obtener información de calificaciones de un juego', async () => {
            const mockRatingInfo = {
                juegoId: 1,
                averageRating: 4.5,
                ratingCount: 10
            };

            vi.mocked(fetch).mockResolvedValueOnce({
                ok: true,
                json: async () => ({ _embedded: mockRatingInfo })
            } as Response);

            const ratingInfo = await ratingService.getGameRating(1);

            expect(ratingInfo.averageRating).toBe(4.5);
            expect(ratingInfo.ratingCount).toBe(10);
        });

        test('debe retornar valores por defecto en caso de error', async () => {
            vi.mocked(fetch).mockResolvedValueOnce({
                ok: false
            } as Response);

            const ratingInfo = await ratingService.getGameRating(1);

            expect(ratingInfo.averageRating).toBe(0);
            expect(ratingInfo.ratingCount).toBe(0);
            expect(ratingInfo.juegoId).toBe(1);
        });

        test('debe manejar errores de red', async () => {
            vi.mocked(fetch).mockRejectedValueOnce(new Error('Network error'));

            const ratingInfo = await ratingService.getGameRating(1);

            expect(ratingInfo.averageRating).toBe(0);
            expect(ratingInfo.ratingCount).toBe(0);
        });
    });
});

