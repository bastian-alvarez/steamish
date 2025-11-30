import { API } from '../config/constants';

export interface Rating {
    id: number;
    juegoId: number;
    usuarioId: number;
    calificacion: number; // 1-5
    fechaCreacion: string;
}

export interface CreateRatingRequest {
    juegoId: number;
    usuarioId?: number;
    calificacion: number; // 1-5
}

export interface GameRatingInfo {
    juegoId: number;
    averageRating: number;
    ratingCount: number;
}

class RatingService {
    // Crear o actualizar calificación
    async createOrUpdateRating(request: CreateRatingRequest): Promise<Rating> {
        try {
            const response = await fetch(`${API.gameCatalogService}/api/ratings`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    juegoId: request.juegoId,
                    usuarioId: request.usuarioId,
                    calificacion: request.calificacion
                })
            });

            if (!response.ok) {
                const errorText = await response.text().catch(() => 'Error al guardar la calificación');
                throw new Error(errorText);
            }

            const data = await response.json();
            const ratingData = data._embedded || data;
            
            return {
                id: ratingData.id,
                juegoId: ratingData.juegoId,
                usuarioId: ratingData.usuarioId,
                calificacion: ratingData.calificacion,
                fechaCreacion: ratingData.fechaCreacion
            };
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            }
            throw new Error('Error al guardar la calificación');
        }
    }

    // Obtener calificación de un usuario para un juego
    async getUserRating(juegoId: number, usuarioId: number): Promise<Rating | null> {
        try {
            const response = await fetch(`${API.gameCatalogService}/api/ratings/game/${juegoId}/user/${usuarioId}`);
            
            if (!response.ok) {
                if (response.status === 404) {
                    return null;
                }
                throw new Error('Error al obtener la calificación');
            }

            const data = await response.json();
            const ratingData = data._embedded || data;
            
            return {
                id: ratingData.id,
                juegoId: ratingData.juegoId,
                usuarioId: ratingData.usuarioId,
                calificacion: ratingData.calificacion,
                fechaCreacion: ratingData.fechaCreacion
            };
        } catch (error) {
            console.error('Error al obtener calificación del usuario:', error);
            return null;
        }
    }

    // Obtener información de calificaciones de un juego
    async getGameRating(juegoId: number): Promise<GameRatingInfo> {
        try {
            const response = await fetch(`${API.gameCatalogService}/api/ratings/game/${juegoId}`);
            
            if (!response.ok) {
                throw new Error('Error al obtener las calificaciones del juego');
            }

            const data = await response.json();
            const ratingInfo = data._embedded || data;
            
            return {
                juegoId: ratingInfo.juegoId || juegoId,
                averageRating: ratingInfo.averageRating || 0,
                ratingCount: ratingInfo.ratingCount || 0
            };
        } catch (error) {
            console.error('Error al obtener calificaciones del juego:', error);
            return {
                juegoId,
                averageRating: 0,
                ratingCount: 0
            };
        }
    }
}

export default new RatingService();

