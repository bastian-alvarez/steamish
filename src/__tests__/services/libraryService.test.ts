import { describe, test, expect, beforeEach, vi } from 'vitest';
import libraryService from '../../services/libraryService';
import { API } from '../../config/constants';

global.fetch = vi.fn();

describe('libraryService', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        localStorage.clear();
        vi.mocked(fetch).mockClear();
    });

    test('debe obtener la biblioteca de un usuario', async () => {
        const mockLibrary = [
            {
                id: 1,
                userId: 1,
                juegoId: 1,
                name: 'Test Game',
                price: 59.99,
                dateAdded: '2024-01-01',
                status: 'owned',
                genre: 'Action'
            }
        ];

        vi.mocked(fetch).mockResolvedValueOnce({
            ok: true,
            json: async () => ({ _embedded: { libraryItemResponseList: mockLibrary } })
        } as Response);

        const library = await libraryService.getLibrary(1);

        expect(fetch).toHaveBeenCalledWith(`${API.libraryService}/api/library/user/1`);
        expect(Array.isArray(library)).toBe(true);
    });

    test('debe agregar un juego a la biblioteca', async () => {
        const mockItem = {
            id: 1,
            userId: 1,
            juegoId: 1,
            name: 'Test Game',
            price: 59.99,
            dateAdded: '2024-01-01',
            status: 'owned',
            genre: 'Action'
        };

        vi.mocked(fetch).mockResolvedValueOnce({
            ok: true,
            json: async () => mockItem
        } as Response);

        const item = await libraryService.addToLibrary(1, 1);

        expect(fetch).toHaveBeenCalledWith(
            `${API.libraryService}/api/library`,
            expect.objectContaining({
                method: 'POST'
            })
        );
        expect(item).toBeDefined();
    });

    test('debe verificar si un juego está en la biblioteca', async () => {
        vi.mocked(fetch).mockResolvedValueOnce({
            ok: true,
            json: async () => ({ owns: true })
        } as Response);

        const isInLibrary = await libraryService.isInLibrary(1, 1);

        expect(fetch).toHaveBeenCalledWith(
            `${API.libraryService}/api/library/user/1/game/1`
        );
        expect(isInLibrary).toBe(true);
    });

    test('debe eliminar un juego de la biblioteca', async () => {
        vi.mocked(fetch).mockResolvedValueOnce({
            ok: true
        } as Response);

        await libraryService.removeFromLibrary(1, 1);

        expect(fetch).toHaveBeenCalledWith(
            `${API.libraryService}/api/library/user/1/game/1`,
            expect.objectContaining({
                method: 'DELETE'
            })
        );
    });

    test('debe usar localStorage como fallback', async () => {
        vi.mocked(fetch).mockRejectedValueOnce(new Error('Network error'));

        const library = await libraryService.getLibrary(1);

        expect(Array.isArray(library)).toBe(true);
    });
});

