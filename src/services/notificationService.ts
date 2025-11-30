import { API } from '../config/constants';
import authService from './authService';

export interface Notification {
    id: number;
    userId: number;
    titulo: string;
    mensaje: string;
    tipo: string;
    leida: boolean;
    fechaCreacion: string;
}

export interface CreateNotificationRequest {
    userId: number;
    titulo: string;
    mensaje: string;
    tipo?: string;
}

class NotificationService {
    // Obtener todas las notificaciones de un usuario
    async getAllNotifications(userId: number): Promise<Notification[]> {
        try {
            const response = await fetch(`${API.authService}/api/notifications?userId=${userId}`);

            if (!response.ok) {
                throw new Error('Error al obtener las notificaciones');
            }

            const data = await response.json();
            let notifications: any[] = [];
            if (data._embedded) {
                notifications = data._embedded.notificationResponseList || data._embedded || [];
            } else if (Array.isArray(data)) {
                notifications = data;
            } else if (data.content) {
                notifications = data.content;
            }

            return notifications.map((notif: any) => ({
                id: notif.id,
                userId: notif.userId,
                titulo: notif.titulo,
                mensaje: notif.mensaje,
                tipo: notif.tipo || 'info',
                leida: notif.leida || false,
                fechaCreacion: notif.fechaCreacion
            }));
        } catch (error) {
            console.error('Error al obtener notificaciones:', error);
            return [];
        }
    }

    // Obtener notificaciones no leídas
    async getUnreadNotifications(userId: number): Promise<Notification[]> {
        try {
            const response = await fetch(`${API.authService}/api/notifications/unread?userId=${userId}`);

            if (!response.ok) {
                throw new Error('Error al obtener las notificaciones no leídas');
            }

            const data = await response.json();
            let notifications: any[] = [];
            if (data._embedded) {
                notifications = data._embedded.notificationResponseList || data._embedded || [];
            } else if (Array.isArray(data)) {
                notifications = data;
            } else if (data.content) {
                notifications = data.content;
            }

            return notifications.map((notif: any) => ({
                id: notif.id,
                userId: notif.userId,
                titulo: notif.titulo,
                mensaje: notif.mensaje,
                tipo: notif.tipo || 'info',
                leida: notif.leida || false,
                fechaCreacion: notif.fechaCreacion
            }));
        } catch (error) {
            console.error('Error al obtener notificaciones no leídas:', error);
            return [];
        }
    }

    // Obtener conteo de notificaciones no leídas
    async getUnreadCount(userId: number): Promise<number> {
        try {
            const response = await fetch(`${API.authService}/api/notifications/unread/count?userId=${userId}`);

            if (!response.ok) {
                return 0;
            }

            const data = await response.json();
            const countData = data._embedded || data;
            return countData.count || 0;
        } catch (error) {
            console.error('Error al obtener conteo de notificaciones:', error);
            return 0;
        }
    }

    // Crear notificación
    async createNotification(request: CreateNotificationRequest): Promise<Notification> {
        try {
            const response = await fetch(`${API.authService}/api/notifications`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: request.userId,
                    titulo: request.titulo,
                    mensaje: request.mensaje,
                    tipo: request.tipo || 'info'
                })
            });

            if (!response.ok) {
                const errorText = await response.text().catch(() => 'Error al crear la notificación');
                throw new Error(errorText);
            }

            const data = await response.json();
            const notifData = data._embedded || data;
            
            return {
                id: notifData.id,
                userId: notifData.userId,
                titulo: notifData.titulo,
                mensaje: notifData.mensaje,
                tipo: notifData.tipo || 'info',
                leida: notifData.leida || false,
                fechaCreacion: notifData.fechaCreacion
            };
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            }
            throw new Error('Error al crear la notificación');
        }
    }

    // Marcar notificación como leída
    async markAsRead(notificationId: number, userId: number): Promise<Notification> {
        try {
            const response = await fetch(`${API.authService}/api/notifications/${notificationId}/read?userId=${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                throw new Error('Error al marcar la notificación como leída');
            }

            const data = await response.json();
            const notifData = data._embedded || data;
            
            return {
                id: notifData.id,
                userId: notifData.userId,
                titulo: notifData.titulo,
                mensaje: notifData.mensaje,
                tipo: notifData.tipo || 'info',
                leida: notifData.leida || false,
                fechaCreacion: notifData.fechaCreacion
            };
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            }
            throw new Error('Error al marcar la notificación como leída');
        }
    }

    // Marcar todas las notificaciones como leídas
    async markAllAsRead(userId: number): Promise<void> {
        try {
            const response = await fetch(`${API.authService}/api/notifications/read-all?userId=${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                throw new Error('Error al marcar todas las notificaciones como leídas');
            }
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            }
            throw new Error('Error al marcar todas las notificaciones como leídas');
        }
    }

    // Eliminar notificación
    async deleteNotification(notificationId: number, userId: number): Promise<boolean> {
        try {
            const response = await fetch(`${API.authService}/api/notifications/${notificationId}?userId=${userId}`, {
                method: 'DELETE'
            });

            return response.ok;
        } catch (error) {
            console.error('Error al eliminar notificación:', error);
            return false;
        }
    }

    // Eliminar todas las notificaciones
    async deleteAllNotifications(userId: number): Promise<boolean> {
        try {
            const response = await fetch(`${API.authService}/api/notifications?userId=${userId}`, {
                method: 'DELETE'
            });

            return response.ok;
        } catch (error) {
            console.error('Error al eliminar todas las notificaciones:', error);
            return false;
        }
    }
}

export default new NotificationService();

