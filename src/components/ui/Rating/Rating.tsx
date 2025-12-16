import React, { useState, useEffect } from 'react';
import { Button, Alert } from 'react-bootstrap';
import ratingService, { GameRatingInfo, Rating as RatingType } from '../../../services/ratingService';
import { useAuth } from '../../../context/AuthContext';
import { useNotification } from '../NotificationToast/NotificationToast';
import { COLORS } from '../../../config/constants';

interface RatingProps {
    juegoId: number;
    onRatingUpdate?: (ratingInfo: GameRatingInfo) => void;
}

const Rating: React.FC<RatingProps> = ({ juegoId, onRatingUpdate }) => {
    const { user, isAuthenticated } = useAuth();
    const { showSuccess, showError } = useNotification();
    const [ratingInfo, setRatingInfo] = useState<GameRatingInfo>({
        juegoId,
        averageRating: 0,
        ratingCount: 0
    });
    const [userRating, setUserRating] = useState<RatingType | null>(null);
    const [hoveredStar, setHoveredStar] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [submitting, setSubmitting] = useState<boolean>(false);

    // Cargar información de rating del juego
    useEffect(() => {
        const loadRatingInfo = async () => {
            try {
                setLoading(true);
                const info = await ratingService.getGameRating(juegoId);
                setRatingInfo(info);
                if (onRatingUpdate) {
                    onRatingUpdate(info);
                }
            } catch (error) {
                console.error('Error al cargar rating:', error);
            } finally {
                setLoading(false);
            }
        };

        loadRatingInfo();
    }, [juegoId, onRatingUpdate]);

    // Cargar rating del usuario si está autenticado
    useEffect(() => {
        const loadUserRating = async () => {
            if (!isAuthenticated || !user) return;

            try {
                const userId = typeof user.id === 'string' ? parseInt(user.id) : user.id;
                const rating = await ratingService.getUserRating(juegoId, userId);
                setUserRating(rating);
            } catch (error) {
                console.error('Error al cargar rating del usuario:', error);
            }
        };

        loadUserRating();
    }, [juegoId, user, isAuthenticated]);

    const handleStarClick = async (rating: number) => {
        if (!isAuthenticated || !user) {
            showError('Debes iniciar sesión para calificar juegos');
            return;
        }

        try {
            setSubmitting(true);
            const userId = typeof user.id === 'string' ? parseInt(user.id) : user.id;
            const newRating = await ratingService.createOrUpdateRating({
                juegoId,
                usuarioId: userId,
                calificacion: rating
            });

            setUserRating(newRating);
            showSuccess(`¡Has calificado este juego con ${rating} estrella${rating > 1 ? 's' : ''}!`);

            // Recargar información del rating
            const updatedInfo = await ratingService.getGameRating(juegoId);
            setRatingInfo(updatedInfo);
            if (onRatingUpdate) {
                onRatingUpdate(updatedInfo);
            }
        } catch (error) {
            showError(error instanceof Error ? error.message : 'Error al guardar la calificación');
        } finally {
            setSubmitting(false);
        }
    };

    const renderStars = (rating: number, interactive: boolean = false): JSX.Element[] => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5 && rating % 1 < 1;

        for (let i = 1; i <= 5; i++) {
            let starClass = 'bi-star';
            let starColor = 'text-muted';

            if (interactive) {
                // Estrellas interactivas (para calificar)
                if (i <= hoveredStar || (hoveredStar === 0 && userRating && i <= userRating.calificacion)) {
                    starClass = 'bi-star-fill';
                    starColor = 'text-warning';
                } else if (userRating && i <= userRating.calificacion) {
                    starClass = 'bi-star-fill';
                    starColor = 'text-warning';
                }
            } else {
                // Estrellas de visualización (promedio)
                if (i <= fullStars) {
                    starClass = 'bi-star-fill';
                    starColor = 'text-warning';
                } else if (i === fullStars + 1 && hasHalfStar) {
                    starClass = 'bi-star-half';
                    starColor = 'text-warning';
                }
            }

            stars.push(
                <i
                    key={i}
                    className={`bi ${starClass} ${starColor} fs-4`}
                    style={{
                        cursor: interactive && !submitting ? 'pointer' : 'default',
                        transition: 'all 0.2s ease',
                        opacity: submitting ? 0.6 : 1
                    }}
                    onMouseEnter={() => interactive && !submitting && setHoveredStar(i)}
                    onMouseLeave={() => interactive && setHoveredStar(0)}
                    onClick={() => interactive && !submitting && handleStarClick(i)}
                />
            );
        }

        return stars;
    };

    return (
        <div>
            {/* Rating Promedio */}
            <div className="mb-4">
                <h5 className="mb-3" style={{ color: COLORS.textPrimary }}>
                    <i className="bi bi-star-fill me-2 text-warning"></i>
                    Calificación
                </h5>
                <div className="d-flex align-items-center gap-3">
                    <div className="d-flex align-items-center">
                        {loading ? (
                            <span className="text-muted">Cargando...</span>
                        ) : (
                            <>
                                {renderStars(ratingInfo.averageRating)}
                                <span className="ms-3 fw-bold fs-5" style={{ color: COLORS.textPrimary }}>
                                    {ratingInfo.averageRating > 0 ? ratingInfo.averageRating.toFixed(1) : 'Sin calificaciones'}
                                </span>
                                {ratingInfo.ratingCount > 0 && (
                                    <span className="ms-2 text-muted">
                                        ({ratingInfo.ratingCount} {ratingInfo.ratingCount === 1 ? 'calificación' : 'calificaciones'})
                                    </span>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Calificar (solo si está autenticado) */}
            {isAuthenticated && user && (
                <div className="mb-4 p-3 border rounded" style={{ backgroundColor: '#181E36' }}>
                    <h6 className="mb-3" style={{ color: COLORS.textPrimary }}>
                        {userRating ? 'Tu Calificación:' : 'Califica este juego:'}
                    </h6>
                    <div className="d-flex align-items-center gap-2">
                        {renderStars(userRating?.calificacion || 0, true)}
                        {userRating && (
                            <span className="ms-2 text-muted small">
                                Calificaste con {userRating.calificacion} estrella{userRating.calificacion > 1 ? 's' : ''}
                            </span>
                        )}
                    </div>
                    {submitting && (
                        <Alert variant="info" className="mt-2 mb-0 py-2">
                            <i className="bi bi-hourglass-split me-2"></i>
                            Guardando calificación...
                        </Alert>
                    )}
                </div>
            )}

            {!isAuthenticated && (
                <Alert variant="info" className="mb-0">
                    <i className="bi bi-info-circle me-2"></i>
                    <a href="/login" style={{ color: 'inherit', textDecoration: 'underline' }}>
                        Inicia sesión
                    </a> para calificar este juego
                </Alert>
            )}
        </div>
    );
};

export default Rating;

