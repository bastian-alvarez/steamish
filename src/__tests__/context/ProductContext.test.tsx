import React from 'react';
import { describe, test, expect, beforeEach, vi } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { ProductProvider, useProducts } from '../../context/ProductContext';
import productService from '../../services/productService';

vi.mock('../../services/productService', () => ({
    __esModule: true,
    default: {
        getAllProducts: vi.fn().mockResolvedValue([
            {
                id: '1',
                name: 'Test Game',
                price: 59.99,
                category: 'Action',
                rating: 4.5,
                discount: 0,
                image: 'test.jpg',
                description: 'Test description',
                tags: ['Action'],
                featured: true
            }
        ]),
        getProductById: vi.fn(),
        getCategories: vi.fn().mockResolvedValue([]),
        getGenres: vi.fn().mockResolvedValue([]),
        addProduct: vi.fn(),
        deleteProduct: vi.fn()
    }
}));

const wrapper = ({ children }: { children: React.ReactNode }) => (
    <ProductProvider>{children}</ProductProvider>
);

describe('ProductContext', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    test('debe proporcionar el contexto de productos', () => {
        const { result } = renderHook(() => useProducts(), { wrapper });

        expect(result.current).toBeDefined();
        expect(result.current.products).toBeDefined();
        expect(result.current.loading).toBeDefined();
        expect(result.current.getProductById).toBeDefined();
    });

    test('debe cargar productos al montar', async () => {
        const { result } = renderHook(() => useProducts(), { wrapper });

        await waitFor(() => {
            expect(result.current.loading).toBe(false);
        });

        expect(result.current.products.length).toBeGreaterThan(0);
    });

    test('debe obtener producto por ID', () => {
        const { result } = renderHook(() => useProducts(), { wrapper });

        const product = result.current.getProductById('1');

        expect(product).toBeDefined();
    });

    test('debe obtener productos por categoría', () => {
        const { result } = renderHook(() => useProducts(), { wrapper });

        const products = result.current.getProductsByCategory('Action');

        expect(Array.isArray(products)).toBe(true);
    });

    test('debe refrescar productos', async () => {
        const { result } = renderHook(() => useProducts(), { wrapper });

        await act(async () => {
            await result.current.refreshProducts();
        });

        await waitFor(() => {
            expect(result.current.loading).toBe(false);
        });
    });
});

