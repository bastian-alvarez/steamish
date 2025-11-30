import { API } from '../config/constants';

export interface Comment {
    id: number;
    juegoId: number;
    usuarioId: number;
    usuarioNombre: string;
    contenido: string;
    fechaCreacion: string;
    oculto: boolean;
}

export interface CreateCommentRequest {
    juegoId: number;
    usuarioId?: number;
    usuarioNombre?: string;
    contenido: string;
}

class CommentService {
    // Obtener todos los comentarios
    async getAllComments(includeHidden: boolean = false): Promise<Comment[]> {
        try {
            const response = await fetch(`${API.gameCatalogService}/api/comments?includeHidden=${includeHidden}`);
            
            if (!response.ok) {
                throw new Error('Error al obtener los comentarios');
            }

            const data = await response.json();
            const comments = data._embedded?.commentResponseList || data._embedded || (Array.isArray(data) ? data : []);
            
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
            console.error('Error al obtener comentarios:', error);
            return [];
        }
    }

    // Obtener comentarios de un juego
    async getCommentsByGame(juegoId: number, includeHidden: boolean = false): Promise<Comment[]> {
        try {
            const response = await fetch(`${API.gameCatalogService}/api/comments/game/${juegoId}?includeHidden=${includeHidden}`);
            
            if (!response.ok) {
                throw new Error('Error al obtener los comentarios del juego');
            }

            const data = await response.json();
            const comments = data._embedded?.commentResponseList || data._embedded || (Array.isArray(data) ? data : []);
            
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
            console.error('Error al obtener comentarios del juego:', error);
            return [];
        }
    }

    // Obtener comentarios de un usuario
    async getCommentsByUser(usuarioId: number, includeHidden: boolean = false): Promise<Comment[]> {
        try {
            const response = await fetch(`${API.gameCatalogService}/api/comments/user/${usuarioId}?includeHidden=${includeHidden}`);
            
            if (!response.ok) {
                throw new Error('Error al obtener los comentarios del usuario');
            }

            const data = await response.json();
            const comments = data._embedded?.commentResponseList || data._embedded || (Array.isArray(data) ? data : []);
            
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

    // Crear comentario
    async createComment(request: CreateCommentRequest): Promise<Comment> {
        try {
            const response = await fetch(`${API.gameCatalogService}/api/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    juegoId: request.juegoId,
                    usuarioId: request.usuarioId,
                    usuarioNombre: request.usuarioNombre,
                    contenido: request.contenido
                })
            });

            if (!response.ok) {
                const errorText = await response.text().catch(() => 'Error al crear el comentario');
                throw new Error(errorText);
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
            throw new Error('Error al crear el comentario');
        }
    }

    // Eliminar comentario
    async deleteComment(commentId: number): Promise<boolean> {
        try {
            const response = await fetch(`${API.gameCatalogService}/api/comments/${commentId}`, {
                method: 'DELETE'
            });

            return response.ok;
        } catch (error) {
            console.error('Error al eliminar comentario:', error);
            return false;
        }
    }
}

export default new CommentService();

