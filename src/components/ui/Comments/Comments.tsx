import React, { useState, useEffect } from 'react';
import { Card, Form, Button, Alert, Spinner, Badge } from 'react-bootstrap';
import commentService, { Comment } from '../../../services/commentService';
import { useAuth } from '../../../context/AuthContext';
import { useNotification } from '../NotificationToast/NotificationToast';
import { COLORS } from '../../../config/constants';

interface CommentsProps {
    juegoId: number;
}

const Comments: React.FC<CommentsProps> = ({ juegoId }) => {
    const { user, isAuthenticated } = useAuth();
    const { showSuccess, showError } = useNotification();
    const [comments, setComments] = useState<Comment[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [newComment, setNewComment] = useState<string>('');
    const [error, setError] = useState<string>('');

    // Cargar comentarios
    useEffect(() => {
        const loadComments = async () => {
            try {
                setLoading(true);
                const loadedComments = await commentService.getCommentsByGame(juegoId, false);
                // Filtrar comentarios ocultos
                setComments(loadedComments.filter(c => !c.oculto));
            } catch (error) {
                console.error('Error al cargar comentarios:', error);
                setError('Error al cargar los comentarios');
            } finally {
                setLoading(false);
            }
        };

        loadComments();
    }, [juegoId]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!isAuthenticated || !user) {
            showError('Debes iniciar sesión para comentar');
            return;
        }

        if (!newComment.trim()) {
            setError('El comentario no puede estar vacío');
            return;
        }

        try {
            setSubmitting(true);
            setError('');
            const userId = typeof user.id === 'string' ? parseInt(user.id) : user.id;
            const userName = user.name || user.username || 'Usuario';

            const createdComment = await commentService.createComment({
                juegoId,
                usuarioId: userId,
                usuarioNombre: userName,
                contenido: newComment.trim()
            });

            setComments([createdComment, ...comments]);
            setNewComment('');
            showSuccess('¡Comentario publicado exitosamente!');
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Error al publicar el comentario';
            setError(errorMessage);
            showError(errorMessage);
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (commentId: number) => {
        if (!window.confirm('¿Estás seguro de que deseas eliminar este comentario?')) {
            return;
        }

        try {
            const success = await commentService.deleteComment(commentId);
            if (success) {
                setComments(comments.filter(c => c.id !== commentId));
                showSuccess('Comentario eliminado exitosamente');
            } else {
                showError('Error al eliminar el comentario');
            }
        } catch (error) {
            showError('Error al eliminar el comentario');
        }
    };

    const formatDate = (dateString: string): string => {
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        } catch {
            return dateString;
        }
    };

    return (
        <div>
            <h5 className="mb-4" style={{ color: COLORS.textPrimary }}>
                <i className="bi bi-chat-dots me-2"></i>
                Comentarios ({comments.length})
            </h5>

            {/* Formulario de nuevo comentario */}
            {isAuthenticated && user && (
                <Card className="mb-4 border-0 shadow-sm" style={{ background: COLORS.color3, color: COLORS.textPrimary }}>
                    <Card.Body>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3">
                                <Form.Label className="fw-bold" style={{ color: COLORS.textPrimary }}>
                                    Escribe un comentario:
                                </Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={4}
                                    value={newComment}
                                    onChange={(e) => {
                                        setNewComment(e.target.value);
                                        setError('');
                                    }}
                                    placeholder="Comparte tu opinión sobre este juego..."
                                    disabled={submitting}
                                    style={{
                                        resize: 'none',
                                        borderColor: error ? '#FF5A6E' : undefined,
                                        background: COLORS.color2,
                                        color: COLORS.textPrimary
                                    }}
                                />
                                {error && (
                                    <Form.Text className="text-danger">
                                        {error}
                                    </Form.Text>
                                )}
                            </Form.Group>
                            <Button
                                type="submit"
                                variant="primary"
                                disabled={submitting || !newComment.trim()}
                                style={{ background: COLORS.gradientPrimary, borderColor: COLORS.primary }}
                            >
                                {submitting ? (
                                    <>
                                        <Spinner size="sm" className="me-2" />
                                        Publicando...
                                    </>
                                ) : (
                                    <>
                                        <i className="bi bi-send me-2"></i>
                                        Publicar Comentario
                                    </>
                                )}
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            )}

            {!isAuthenticated && (
                <Alert variant="info" className="mb-4" style={{ background: COLORS.color3, color: COLORS.textPrimary, borderColor: COLORS.color4 }}>
                    <i className="bi bi-info-circle me-2"></i>
                    <a href="/login" style={{ color: 'inherit', textDecoration: 'underline' }}>
                        Inicia sesión
                    </a> para dejar un comentario
                </Alert>
            )}

            {/* Lista de comentarios */}
            {loading ? (
                <div className="text-center py-5">
                    <Spinner animation="border" variant="primary" />
                    <p className="mt-3" style={{ color: COLORS.textSecondary }}>Cargando comentarios...</p>
                </div>
            ) : comments.length === 0 ? (
                <Alert variant="dark" className="text-center" style={{ background: COLORS.color3, color: COLORS.textPrimary, borderColor: COLORS.color4 }}>
                    <i className="bi bi-chat-left-text me-2"></i>
                    Aún no hay comentarios. ¡Sé el primero en comentar!
                </Alert>
            ) : (
                <div className="d-flex flex-column gap-3">
                    {comments.map((comment) => (
                        <Card key={comment.id} className="border-0 shadow-sm" style={{ background: COLORS.color3, color: COLORS.textPrimary }}>
                            <Card.Body>
                                <div className="d-flex justify-content-between align-items-start mb-2">
                                    <div className="d-flex align-items-center gap-2">
                                        <Badge bg="primary" className="rounded-circle p-2" style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            {comment.usuarioNombre.charAt(0).toUpperCase()}
                                        </Badge>
                                        <div>
                                            <strong style={{ color: COLORS.textPrimary }}>
                                                {comment.usuarioNombre}
                                            </strong>
                                            <div className="text-muted small" style={{ color: COLORS.textSecondary }}>
                                                {formatDate(comment.fechaCreacion)}
                                            </div>
                                        </div>
                                    </div>
                                    {isAuthenticated && user && (
                                        (typeof user.id === 'string' ? parseInt(user.id) : user.id) === comment.usuarioId && (
                                            <Button
                                                variant="outline-danger"
                                                size="sm"
                                                onClick={() => handleDelete(comment.id)}
                                            >
                                                <i className="bi bi-trash"></i>
                                            </Button>
                                        )
                                    )}
                                </div>
                                <p className="mb-0" style={{ lineHeight: '1.6', color: COLORS.textSecondary }}>
                                    {comment.contenido}
                                </p>
                            </Card.Body>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Comments;

