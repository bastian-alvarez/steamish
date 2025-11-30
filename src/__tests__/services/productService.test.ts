import { describe, test, expect, beforeEach, vi } from 'vitest';
import productService from '../../services/productService';
import { API } from '../../config/constants';

global.fetch = vi.fn();

describe('productService', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        localStorage.clear();
        vi.mocked(fetch).mockClear();
    });

    test('debe obtener todos los productos', async () => {
        const mockProducts = [
            {
                id: 1,
                name: 'Test Game',
                price: 59.99,
                category: 'Action'
            }
        ];

        vi.mocked(fetch).mockResolvedValueOnce({
            ok: true,
            json: async () => ({ _embedded: { gameResponseList: mockProducts } })
        } as Response);

        const products = await productService.getAllProducts();

        expect(fetch).toHaveBeenCalled();
        expect(Array.isArray(products)).toBe(true);
    });

    test('debe obtener un producto por ID', async () => {
        const mockProduct = {
            id: 1,
            name: 'Test Game',
            price: 59.99
        };

        vi.mocked(fetch).mockResolvedValueOnce({
            ok: true,
            json: async () => mockProduct
        } as Response);

        const product = await productService.getProductById(1);

        expect(fetch).toHaveBeenCalled();
        expect(product).toBeDefined();
    });

    test('debe usar datos por defecto si falla la API', async () => {
        vi.mocked(fetch).mockRejectedValueOnce(new Error('Network error'));

        const products = await productService.getAllProducts();

        // Debe usar datos por defecto del mock
        expect(Array.isArray(products)).toBe(true);
    });

    test('debe obtener categorías', async () => {
        const mockCategories = [
            { id: 1, name: 'Action' },
            { id: 2, name: 'Adventure' }
        ];

        vi.mocked(fetch).mockResolvedValueOnce({
            ok: true,
            json: async () => ({ _embedded: { categoryResponseList: mockCategories } })
        } as Response);

        const categories = await productService.getCategories();

        expect(fetch).toHaveBeenCalled();
        expect(Array.isArray(categories)).toBe(true);
    });

    test('debe obtener géneros', async () => {
        const mockGenres = [
            { id: 1, name: 'RPG' },
            { id: 2, name: 'FPS' }
        ];

        vi.mocked(fetch).mockResolvedValueOnce({
            ok: true,
            json: async () => ({ _embedded: { genreResponseList: mockGenres } })
        } as Response);

        const genres = await productService.getGenres();

        expect(fetch).toHaveBeenCalled();
        expect(Array.isArray(genres)).toBe(true);
    });
});

