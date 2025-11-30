import { describe, test, expect, beforeEach, vi } from 'vitest';
import notificationService from '../../services/notificationService';

// Mock global de fetch
global.fetch = vi.fn();

describe('NotificationService', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('getAllNotifications', () => {
        test('debe obtener todas las notificaciones de un usuario', async () => {
            const mockNotifications = [
                { id: 1, userId: 1, titulo: 'Notification 1', mensaje: 'Message 1', tipo: 'info', leida: false, fechaCreacion: '2024-01-01' },
                { id: 2, userId: 1, titulo: 'Notification 2', mensaje: 'Message 2', tipo: 'success', leida: true, fechaCreacion: '2024-01-02' }
            ];

            vi.mocked(fetch).mockResolvedValueOnce({
                ok: true,
                json: async () => ({ _embedded: { notificationResponseList: mockNotifications } })
            } as Response);

            const notifications = await notificationService.getAllNotifications(1);

            expect(notifications).toHaveLength(2);
            expect(notifications[0].titulo).toBe('Notification 1');
        });

        test('debe retornar array vacío en caso de error', async () => {
            vi.mocked(fetch).mockResolvedValueOnce({
                ok: false
            } as Response);

            const notifications = await notificationService.getAllNotifications(1);
            expect(notifications).toEqual([]);
        });
    });

    describe('getUnreadNotifications', () => {
        test('debe obtener notificaciones no leídas', async () => {
            const mockNotifications = [
                { id: 1, userId: 1, titulo: 'Notification 1', mensaje: 'Message 1', tipo: 'info', leida: false, fechaCreacion: '2024-01-01' }
            ];

            vi.mocked(fetch).mockResolvedValueOnce({
                ok: true,
                json: async () => ({ _embedded: { notificationResponseList: mockNotifications } })
            } as Response);

            const notifications = await notificationService.getUnreadNotifications(1);

            expect(notifications).toHaveLength(1);
            expect(notifications[0].leida).toBe(false);
        });
    });

    describe('getUnreadCount', () => {
        test('debe obtener el conteo de notificaciones no leídas', async () => {
            vi.mocked(fetch).mockResolvedValueOnce({
                ok: true,
                json: async () => ({ _embedded: { count: 5 } })
            } as Response);

            const count = await notificationService.getUnreadCount(1);

            expect(count).toBe(5);
        });

        test('debe retornar 0 en caso de error', async () => {
            vi.mocked(fetch).mockResolvedValueOnce({
                ok: false
            } as Response);

            const count = await notificationService.getUnreadCount(1);
            expect(count).toBe(0);
        });
    });

    describe('createNotification', () => {
        test('debe crear una notificación exitosamente', async () => {
            const mockNotification = {
                id: 1,
                userId: 1,
                titulo: 'New Notification',
                mensaje: 'New Message',
                tipo: 'info',
                leida: false,
                fechaCreacion: '2024-01-01'
            };

            const createRequest = {
                userId: 1,
                titulo: 'New Notification',
                mensaje: 'New Message',
                tipo: 'info'
            };

            vi.mocked(fetch).mockResolvedValueOnce({
                ok: true,
                json: async () => ({ _embedded: mockNotification })
            } as Response);

            const notification = await notificationService.createNotification(createRequest);

            expect(notification.titulo).toBe('New Notification');
            expect(fetch).toHaveBeenCalledWith(
                expect.stringContaining('/api/notifications'),
                expect.objectContaining({
                    method: 'POST',
                    body: JSON.stringify(createRequest)
                })
            );
        });
    });

    describe('markAsRead', () => {
        test('debe marcar una notificación como leída', async () => {
            const mockNotification = {
                id: 1,
                userId: 1,
                titulo: 'Notification',
                mensaje: 'Message',
                tipo: 'info',
                leida: true,
                fechaCreacion: '2024-01-01'
            };

            vi.mocked(fetch).mockResolvedValueOnce({
                ok: true,
                json: async () => ({ _embedded: mockNotification })
            } as Response);

            const notification = await notificationService.markAsRead(1, 1);

            expect(notification.leida).toBe(true);
        });
    });

    describe('markAllAsRead', () => {
        test('debe marcar todas las notificaciones como leídas', async () => {
            vi.mocked(fetch).mockResolvedValueOnce({
                ok: true
            } as Response);

            await expect(notificationService.markAllAsRead(1)).resolves.not.toThrow();
        });
    });

    describe('deleteNotification', () => {
        test('debe eliminar una notificación exitosamente', async () => {
            vi.mocked(fetch).mockResolvedValueOnce({
                ok: true
            } as Response);

            const result = await notificationService.deleteNotification(1, 1);

            expect(result).toBe(true);
        });

        test('debe retornar false si falla la eliminación', async () => {
            vi.mocked(fetch).mockResolvedValueOnce({
                ok: false
            } as Response);

            const result = await notificationService.deleteNotification(1, 1);
            expect(result).toBe(false);
        });
    });

    describe('deleteAllNotifications', () => {
        test('debe eliminar todas las notificaciones exitosamente', async () => {
            vi.mocked(fetch).mockResolvedValueOnce({
                ok: true
            } as Response);

            const result = await notificationService.deleteAllNotifications(1);

            expect(result).toBe(true);
        });
    });
});

