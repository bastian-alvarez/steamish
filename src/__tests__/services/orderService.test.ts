import { describe, test, expect, beforeEach, vi } from 'vitest';
import orderService from '../../services/orderService';
import { API } from '../../config/constants';

global.fetch = vi.fn();

describe('orderService', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        vi.mocked(fetch).mockClear();
    });

    test('debe crear una orden', async () => {
        const mockOrder = {
            id: 1,
            userId: 1,
            fechaOrden: '2024-01-01',
            total: 100,
            estadoId: 1,
            estadoNombre: 'Completada',
            metodoPago: 'Tarjeta',
            detalles: []
        };

        vi.mocked(fetch).mockResolvedValueOnce({
            ok: true,
            json: async () => mockOrder
        } as Response);

        const order = await orderService.createOrder({
            userId: 1,
            items: [{ juegoId: 1, cantidad: 1 }],
            metodoPago: 'Tarjeta'
        });

        expect(fetch).toHaveBeenCalledWith(
            `${API.orderService}/api/orders`,
            expect.objectContaining({
                method: 'POST'
            })
        );
        expect(order).toBeDefined();
    });

    test('debe obtener órdenes por usuario', async () => {
        const mockOrders = [
            {
                id: 1,
                userId: 1,
                total: 100,
                detalles: []
            }
        ];

        vi.mocked(fetch).mockResolvedValueOnce({
            ok: true,
            json: async () => ({ _embedded: { orderResponseList: mockOrders } })
        } as Response);

        const orders = await orderService.getOrdersByUserId(1);

        expect(fetch).toHaveBeenCalledWith(
            `${API.orderService}/api/orders/user/1`,
            expect.objectContaining({
                headers: expect.objectContaining({
                    'Content-Type': 'application/json',
                })
            })
        );
        expect(Array.isArray(orders)).toBe(true);
    });

    test('debe obtener una orden por ID', async () => {
        const mockOrder = {
            id: 1,
            userId: 1,
            total: 100,
            detalles: []
        };

        vi.mocked(fetch).mockResolvedValueOnce({
            ok: true,
            json: async () => mockOrder
        } as Response);

        const order = await orderService.getOrderById(1);

        expect(fetch).toHaveBeenCalledWith(
            `${API.orderService}/api/orders/1`,
            expect.objectContaining({
                headers: expect.objectContaining({
                    'Content-Type': 'application/json',
                })
            })
        );
        expect(order).toBeDefined();
    });

    test('debe obtener todas las órdenes', async () => {
        const mockOrders = [
            {
                id: 1,
                userId: 1,
                total: 100,
                detalles: []
            }
        ];

        vi.mocked(fetch).mockResolvedValueOnce({
            ok: true,
            json: async () => ({ _embedded: { orderResponseList: mockOrders } })
        } as Response);

        const orders = await orderService.getAllOrders();

        expect(fetch).toHaveBeenCalledWith(
            `${API.orderService}/api/orders`,
            expect.objectContaining({
                headers: expect.objectContaining({
                    'Content-Type': 'application/json',
                })
            })
        );
        expect(Array.isArray(orders)).toBe(true);
    });

    test('debe crear una orden desde el carrito', async () => {
        const mockOrder = {
            id: 1,
            userId: 1,
            total: 100,
            detalles: []
        };

        vi.mocked(fetch).mockResolvedValueOnce({
            ok: true,
            json: async () => mockOrder
        } as Response);

        const order = await orderService.createOrderFromCart(1, [
            { id: 1, quantity: 1 }
        ]);

        expect(order).toBeDefined();
    });
});

