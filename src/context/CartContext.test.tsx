import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { CartProvider, useCart } from './CartContext';
import { Product } from '../types/Product';

// Mock de productos para las pruebas
const mockProduct: Product = {
    id: '1',
    name: 'Test Game',
    price: 29.99,
    discount: 10,
    image: 'test.jpg',
    category: 'Action',
    description: 'Test description',
    rating: 4.5
};

// Wrapper para el hook con el provider
const wrapper = ({ children }: { children: React.ReactNode }) => (
    <CartProvider>{children}</CartProvider>
);

describe('CartContext - Pruebas de Estado (State)', () => {
    
    // Prueba 1: Verificar estado inicial del carrito
    test('debe tener el estado inicial del carrito vacío', () => {
        const { result } = renderHook(() => useCart(), { wrapper });

        expect(result.current.items).toEqual([]);
        expect(result.current.count).toBe(0);
        expect(result.current.totalPrice).toBe(0);
    });

    // Prueba 2: Verificar que el estado cambia al agregar un producto
    test('debe actualizar el estado cuando se agrega un producto', () => {
        const { result } = renderHook(() => useCart(), { wrapper });

        act(() => {
            result.current.add(mockProduct);
        });

        expect(result.current.items.length).toBe(1);
        expect(result.current.count).toBe(1);
        expect(result.current.items[0].id).toBe(mockProduct.id);
        expect(result.current.items[0].quantity).toBe(1);
    });

    // Prueba 3: Verificar que el estado actualiza la cantidad al agregar el mismo producto
    test('debe incrementar la cantidad cuando se agrega el mismo producto', () => {
        const { result } = renderHook(() => useCart(), { wrapper });

        act(() => {
            result.current.add(mockProduct);
            result.current.add(mockProduct);
        });

        expect(result.current.count).toBe(2);
        expect(result.current.items[0].quantity).toBe(2);
    });

    // Prueba 4: Verificar que el estado se actualiza al remover un producto
    test('debe actualizar el estado cuando se remueve un producto', () => {
        const { result } = renderHook(() => useCart(), { wrapper });

        act(() => {
            result.current.add(mockProduct);
        });

        expect(result.current.items.length).toBe(1);

        act(() => {
            result.current.remove(mockProduct.id);
        });

        expect(result.current.items.length).toBe(0);
        expect(result.current.count).toBe(0);
    });

    // Prueba 5: Verificar que el estado se limpia completamente
    test('debe limpiar todo el estado del carrito', () => {
        const { result } = renderHook(() => useCart(), { wrapper });

        act(() => {
            result.current.add(mockProduct);
            result.current.add({ ...mockProduct, id: '2' });
        });

        expect(result.current.items.length).toBe(2);

        act(() => {
            result.current.clear();
        });

        expect(result.current.items.length).toBe(0);
        expect(result.current.count).toBe(0);
        expect(result.current.totalPrice).toBe(0);
    });

    // Prueba 6: Verificar que el estado actualiza la cantidad correctamente
    test('debe actualizar la cantidad de un producto específico', () => {
        const { result } = renderHook(() => useCart(), { wrapper });

        act(() => {
            result.current.add(mockProduct);
            result.current.updateQuantity(mockProduct.id, 5);
        });

        expect(result.current.items[0].quantity).toBe(5);
        expect(result.current.count).toBe(5);
    });

    // Prueba 7: Verificar cálculo del precio total con descuento
    test('debe calcular el precio total correctamente con descuentos', () => {
        const { result } = renderHook(() => useCart(), { wrapper });

        act(() => {
            result.current.add(mockProduct);
        });

        // Precio con descuento: 29.99 * (1 - 0.10) = 26.99
        const expectedPrice = mockProduct.price * (1 - mockProduct.discount / 100);
        expect(result.current.totalPrice).toBeCloseTo(expectedPrice, 2);
    });

    // Prueba 8: Verificar que el estado se actualiza correctamente con múltiples productos
    test('debe manejar múltiples productos diferentes correctamente', () => {
        const { result } = renderHook(() => useCart(), { wrapper });

        const product2: Product = {
            ...mockProduct,
            id: '2',
            price: 49.99,
            discount: 0
        };

        act(() => {
            result.current.add(mockProduct);
            result.current.add(mockProduct);
            result.current.add(product2);
        });

        expect(result.current.items.length).toBe(2);
        expect(result.current.count).toBe(3); // 2 del producto 1 + 1 del producto 2
    });
});




