import { Comment } from './commentService';
import { API } from '../config/constants';
import authService from './authService';

export interface UserData {
    id: number;
    name: string;
    email: string;
    phone?: string;
    profilePhotoUri?: string;
    isBlocked: boolean;
    role: string;
}

class ModeratorService {
    // Obtener datos de un usuario
    async getUserData(userId: number): Promise<UserData | null> {
        try {
            const token = authService.getToken();
            if (!token) {
                throw new Error('No autenticado. Debes iniciar sesión como moderador.');
            }

            const response = await fetch(`${API.gameCatalogService}/api/moderator/users/${userId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                if (response.status === 404) {
                    return null;
                }
                throw new Error('Error al obtener los datos del usuario');
            }

            const data = await response.json();
            const userData = data._embedded || data;
            
            return {
                id: userData.id,
                name: userData.name,
                email: userData.email,
                phone: userData.phone,
                profilePhotoUri: userData.profilePhotoUri,
                isBlocked: userData.isBlocked || false,
                role: userData.role || 'USER'
            };
        } catch (error) {
            console.error('Error al obtener datos del usuario:', error);
            return null;
        }
    }

    // Obtener comentarios de un usuario (incluyendo ocultos)
    async getUserComments(userId: number): Promise<Comment[]> {
        try {
            const token = authService.getToken();
            if (!token) {
                throw new Error('No autenticado. Debes iniciar sesión como moderador.');
            }

            const response = await fetch(`${API.gameCatalogService}/api/moderator/users/${userId}/comments`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Error al obtener los comentarios del usuario');
            }

            const data = await response.json();
            let comments: any[] = [];
            if (data._embedded) {
                comments = data._embedded.commentResponseList || data._embedded || [];
            } else if (Array.isArray(data)) {
                comments = data;
            } else if (data.content) {
                comments = data.content;
            }

            return comments.map((comment: any) => ({
                id: comment.id,
                juegoId: comment.juegoId,
                usuarioId: comment.usuarioId,
                usuarioNombre: comment.usuarioNombre,
                contenido: comment.contenido,
                fechaCreacion: comment.fechaCreacion,
                oculto: comment.oculto || false
            }));
        } catch (error) {
            console.error('Error al obtener comentarios del usuario:', error);
            return [];
        }
    }

    // Ocultar comentario
    async hideComment(commentId: number): Promise<Comment> {
        try {
            const token = authService.getToken();
            if (!token) {
                throw new Error('No autenticado. Debes iniciar sesión como moderador.');
            }

            const response = await fetch(`${API.gameCatalogService}/api/moderator/comments/${commentId}/hide`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Error al ocultar el comentario');
            }

            const data = await response.json();
            const commentData = data._embedded || data;
            
            return {
                id: commentData.id,
                juegoId: commentData.juegoId,
                usuarioId: commentData.usuarioId,
                usuarioNombre: commentData.usuarioNombre,
                contenido: commentData.contenido,
                fechaCreacion: commentData.fechaCreacion,
                oculto: commentData.oculto || false
            };
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            }
            throw new Error('Error al ocultar el comentario');
        }
    }

    // Mostrar comentario
    async showComment(commentId: number): Promise<Comment> {
        try {
            const token = authService.getToken();
            if (!token) {
                throw new Error('No autenticado. Debes iniciar sesión como moderador.');
            }

            const response = await fetch(`${API.gameCatalogService}/api/moderator/comments/${commentId}/show`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Error al mostrar el comentario');
            }

            const data = await response.json();
            const commentData = data._embedded || data;
            
            return {
                id: commentData.id,
                juegoId: commentData.juegoId,
                usuarioId: commentData.usuarioId,
                usuarioNombre: commentData.usuarioNombre,
                contenido: commentData.contenido,
                fechaCreacion: commentData.fechaCreacion,
                oculto: commentData.oculto || false
            };
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            }
            throw new Error('Error al mostrar el comentario');
        }
    }
}

export default new ModeratorService();

