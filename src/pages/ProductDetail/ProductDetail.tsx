import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Badge, Spinner, Alert } from 'react-bootstrap';
import { useProducts } from '../../context/ProductContext';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../components/ui/NotificationToast/NotificationToast';
import libraryService from '../../services/libraryService';
import productService from '../../services/productService';
import Rating from '../../components/ui/Rating/Rating';
import Comments from '../../components/ui/Comments/Comments';
import { Product } from '../../types/Product';
import { GameRatingInfo } from '../../services/ratingService';
import { COLORS } from '../../config/constants';

const ProductDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { getProductById, getProductByIdAsync } = useProducts();
    const cart = useCart();
    const { isAuthenticated, user } = useAuth();
    const { showSuccess, showWarning } = useNotification();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [showAddedAlert, setShowAddedAlert] = useState<boolean>(false);
    const [showAuthAlert, setShowAuthAlert] = useState<boolean>(false);
    const [isOwned, setIsOwned] = useState<boolean>(false);
    const [product, setProduct] = useState<Product | undefined>(undefined);
    const [ratingInfo, setRatingInfo] = useState<GameRatingInfo | null>(null);
    
    // Cargar producto desde contexto o API
    useEffect(() => {
        const loadProduct = async () => {
            if (!id) return;
            
            setIsLoading(true);
            try {
                // Intentar obtener desde el contexto primero
                let loadedProduct = getProductById(id);
                
                // Si no está en el contexto, obtener desde la API
                if (!loadedProduct) {
                    loadedProduct = await getProductByIdAsync(id);
                }
                
                // Si aún no está, intentar directamente desde el servicio
                if (!loadedProduct) {
                    loadedProduct = await productService.getProductById(id);
                }
                
                setProduct(loadedProduct);
            } catch (error) {
                console.error('Error al cargar producto:', error);
            } finally {
                setIsLoading(false);
            }
        };
        
        loadProduct();
    }, [id, getProductById, getProductByIdAsync]);

    // Verificar si el juego ya está en la biblioteca
    useEffect(() => {
        const checkOwnership = async () => {
            if (user && product) {
                try {
                    const userId = typeof user.id === 'string' ? parseInt(user.id) : user.id;
                    const juegoId = typeof product.id === 'string' ? parseInt(product.id) : product.id;
                    const owned = await libraryService.isInLibrary(userId, juegoId);
                    setIsOwned(owned);
                } catch (error) {
                    console.error('Error al verificar propiedad:', error);
                    setIsOwned(false);
                }
            }
        };
        
        checkOwnership();
    }, [user, product]);

    // Loader de carga por 1 segundo
    useEffect(() => {
        setIsLoading(true);
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000); // 1 segundo

        return () => clearTimeout(timer);
    }, [id]);

    // Función para obtener color de categoría
    const getCategoryColor = (category: string): string => {
        const colors: Record<string, string> = {
            'Acción': 'danger',
            'Aventura': 'success',
            'Simulación': 'info',
            'Carreras': 'warning',
            'Estrategia': 'primary',
            'RPG': 'secondary',
            'Deportes': 'warning',
            'Battle Royale': 'danger',
            'MOBA': 'primary'
        };
        return colors[category] || 'dark';
    };

    // Función para renderizar estrellas (para uso en otras partes si es necesario)
    const renderStars = (rating: number): JSX.Element[] => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        for (let i = 0; i < fullStars; i++) {
            stars.push(
                <i key={i} className="bi bi-star-fill text-warning fs-5"></i>
            );
        }

        if (hasHalfStar) {
            stars.push(
                <i key="half" className="bi bi-star-half text-warning fs-5"></i>
            );
        }

        const emptyStars = 5 - Math.ceil(rating);
        for (let i = 0; i < emptyStars; i++) {
            stars.push(
                <i key={`empty-${i}`} className="bi bi-star text-muted fs-5"></i>
            );
        }

        return stars;
    };

    // Handler para actualizar el rating cuando cambie
    const handleRatingUpdate = (info: GameRatingInfo) => {
        setRatingInfo(info);
        // Actualizar el producto con el nuevo rating
        if (product) {
            setProduct({
                ...product,
                rating: info.averageRating,
                averageRating: info.averageRating,
                ratingCount: info.ratingCount
            });
        }
    };

    const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();
        
        // Verificar si el usuario está autenticado
        if (!isAuthenticated) {
            showWarning('Debes iniciar sesión para agregar productos al carrito');
            setShowAuthAlert(true);
            setTimeout(() => {
                setShowAuthAlert(false);
            }, 4000);
            // Redirigir al login después de mostrar el mensaje
            setTimeout(() => {
                navigate('/login');
            }, 2000);
            return;
        }
        
        if (product) {
            cart.add(product);
            showSuccess(`¡${product.name} agregado al carrito!`);
            
            // Mostrar alerta de confirmación local también
            setShowAddedAlert(true);
            setTimeout(() => {
                setShowAddedAlert(false);
            }, 3000);
        }
    };

    // Componente de Loader
    const LoadingSpinner = () => (
        <div 
            style={{ 
                background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)', 
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 9999
            }}
            className="animate__animated animate__fadeIn"
        >
            <div className="text-center">
                <div className="mb-4">
                    <Spinner 
                        animation="border" 
                        role="status"
                        style={{ 
                            width: '4rem', 
                            height: '4rem',
                            borderWidth: '0.3rem',
                            color: COLORS.color4
                        }}
                    >
                        <span className="visually-hidden">Cargando...</span>
                    </Spinner>
                </div>
                <h3 className="fw-bold mb-2" style={{ color: COLORS.color4 }}>
                    <i className="bi bi-joystick me-2"></i>
                    Cargando juego...
                </h3>
                <p className="text-muted">Preparando los detalles</p>
            </div>
        </div>
    );

    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (!product) {
        return (
            <div style={{ background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)', minHeight: '100vh' }}>
                <Container className="py-5 text-center">
                    <h2 className="text-muted mb-4">Juego no encontrado</h2>
                    <Button variant="primary" onClick={() => navigate('/productos')}>
                        <i className="bi bi-arrow-left me-2"></i>Volver al Catálogo
                    </Button>
                </Container>
            </div>
        );
    }

    // Calcular precio final de forma segura
    const price = product.price ?? product.precio ?? 0;
    const discount = product.discount ?? 0;
    const finalPrice = discount > 0 && price > 0 
        ? price * (1 - discount / 100)
        : price;

    return (
        <div 
            style={{ background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)', minHeight: '100vh' }}
            className="animate__animated animate__fadeIn"
        >
            {/* Hero Section */}
            <div className="bg-primary text-white py-4" style={{ background: COLORS.gradientPrimary }}>
                <Container>
                    <Button 
                        variant="outline-light" 
                        size="sm" 
                        onClick={() => navigate('/productos')}
                        className="mb-3"
                    >
                        <i className="bi bi-arrow-left me-2"></i>Volver al Catálogo
                    </Button>
                </Container>
            </div>

            <Container className="py-5">
                <Row className="g-4">
                    {/* Imagen del Juego */}
                    <Col lg={5} md={6}>
                        <div className="position-relative" style={{ borderRadius: '12px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}>
                            {product.featured && (
                                <Badge bg="info" className="position-absolute top-0 start-0 m-3 z-index-1 fs-6">
                                    <i className="bi bi-star-fill me-1"></i>
                                    Destacado
                                </Badge>
                            )}
                            {product.discount > 0 && (
                                <Badge bg="danger" className="position-absolute top-0 end-0 m-3 z-index-1 fs-6">
                                    -{product.discount}%
                                </Badge>
                            )}
                            <img 
                                src={product.image || 'https://via.placeholder.com/600x400/4d4d80/ffffff?text=Game'} 
                                alt={product.name}
                                className="img-fluid w-100"
                                style={{ 
                                    display: 'block',
                                    height: '500px',
                                    objectFit: 'cover',
                                    backgroundColor: '#e9ecef'
                                }}
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.src = 'https://via.placeholder.com/600x400/4d4d80/ffffff?text=' + encodeURIComponent(product.name);
                                }}
                            />
                        </div>
                    </Col>

                    {/* Información del Juego */}
                    <Col lg={7} md={6}>
                        <div className="h-100 d-flex flex-column">
                            {/* Título y Categoría */}
                            <div className="mb-3">
                                <Badge bg={getCategoryColor(product.category)} className="mb-2 fs-6">
                                    {product.category}
                                </Badge>
                                <h1 className="display-5 fw-bold mb-3" style={{ color: COLORS.color4 }}>
                                    {product.name}
                                </h1>
                            </div>

                            {/* Rating - Mostrar rating básico en la parte superior */}
                            <div className="d-flex align-items-center mb-4">
                                <div className="me-3">
                                    {renderStars(ratingInfo?.averageRating || product.rating || 0)}
                                </div>
                                <span className="fw-bold fs-5" style={{ color: COLORS.color4 }}>
                                    {ratingInfo?.averageRating || product.rating || 0}
                                </span>
                                {ratingInfo && ratingInfo.ratingCount > 0 && (
                                    <span className="ms-2 text-muted">
                                        ({ratingInfo.ratingCount} {ratingInfo.ratingCount === 1 ? 'calificación' : 'calificaciones'})
                                    </span>
                                )}
                            </div>

                            {/* Tags */}
                            {product.tags && product.tags.length > 0 && (
                                <div className="mb-4">
                                    <h5 className="mb-2" style={{ color: COLORS.color4 }}>Etiquetas:</h5>
                                    <div className="d-flex flex-wrap gap-2">
                                        {product.tags.map(tag => (
                                            <Badge key={tag} bg="outline-secondary" text="dark" className="fs-6 p-2">
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Descripción */}
                            <div className="mb-4 flex-grow-1">
                                <h5 className="mb-3" style={{ color: COLORS.color4 }}>Descripción:</h5>
                                <p className="lead text-muted" style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
                                    {product.description}
                                </p>
                            </div>

                            {/* Precio y Botones */}
                            <div className="border-top pt-4 mt-auto">
                                <div className="mb-4">
                                    {(() => {
                                        const price = product.price ?? product.precio ?? 0;
                                        const discount = product.discount ?? 0;
                                        
                                        if (discount > 0 && price > 0) {
                                            const finalPrice = price * (1 - discount / 100);
                                            return (
                                                <div>
                                                    <span className="text-muted text-decoration-line-through me-3 fs-5">
                                                        ${price.toFixed(2)}
                                                    </span>
                                                    <span className="fw-bold text-danger display-6">
                                                        ${finalPrice.toFixed(2)}
                                                    </span>
                                                </div>
                                            );
                                        } else if (price === 0) {
                                            return (
                                                <span className="fw-bold text-success display-6">
                                                    Gratis
                                                </span>
                                            );
                                        } else {
                                            return (
                                                <span className="fw-bold text-primary display-6">
                                                    ${price.toFixed(2)}
                                                </span>
                                            );
                                        }
                                    })()}
                                </div>

                                {/* Alerta de confirmación */}
                                {showAddedAlert && (
                                    <Alert 
                                        variant="success" 
                                        className="mb-3 animate__animated animate__fadeIn"
                                        onClose={() => setShowAddedAlert(false)} 
                                        dismissible
                                    >
                                        <i className="bi bi-check-circle me-2"></i>
                                        <strong>¡Agregado al carrito!</strong> El juego "{product.name}" se ha agregado correctamente.
                                    </Alert>
                                )}

                                {/* Alerta de autenticación requerida */}
                                {showAuthAlert && (
                                    <Alert 
                                        variant="warning" 
                                        className="mb-3 animate__animated animate__fadeIn"
                                        onClose={() => setShowAuthAlert(false)} 
                                        dismissible
                                    >
                                        <i className="bi bi-exclamation-triangle me-2"></i>
                                        <strong>Inicia sesión para comprar</strong> Debes iniciar sesión para agregar productos al carrito. Redirigiendo...
                                    </Alert>
                                )}

                                <div className="d-flex gap-3 flex-wrap">
                                    {isOwned ? (
                                        <>
                                            <Button 
                                                variant="success" 
                                                size="lg"
                                                onClick={() => navigate('/biblioteca')}
                                                className="fw-bold px-4"
                                            >
                                                <i className="bi bi-check-circle me-2"></i>
                                                Ya en tu Biblioteca
                                            </Button>
                                            <Button 
                                                variant="outline-primary" 
                                                size="lg"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    // Botón sin funcionalidad
                                                }}
                                                className="fw-bold px-4"
                                            >
                                                <i className="bi bi-download me-2"></i>
                                                Descargar
                                            </Button>
                                        </>
                                    ) : (
                                        <Button 
                                            variant="primary" 
                                            size="lg"
                                            onClick={handleAddToCart}
                                            className="fw-bold px-4"
                                            style={{ background: COLORS.gradientPrimary, borderColor: COLORS.color4, color: 'white' }}
                                            disabled={price === 0}
                                        >
                                            <i className="bi bi-cart-plus me-2"></i>
                                            {price === 0 ? 'Gratis' : 'Agregar al Carrito'}
                                        </Button>
                                    )}
                                    <Button 
                                        variant="outline-secondary" 
                                        size="lg"
                                        onClick={() => navigate('/productos')}
                                        className="fw-bold px-4"
                                    >
                                        <i className="bi bi-arrow-left me-2"></i>
                                        Volver
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>

                {/* Sección de Rating y Comentarios */}
                <Row className="mt-5">
                    <Col lg={12}>
                        <div className="bg-white rounded p-4 shadow-sm">
                            {/* Componente de Rating Interactivo */}
                            {product && (
                                <Rating 
                                    juegoId={typeof product.id === 'string' ? parseInt(product.id) : product.id}
                                    onRatingUpdate={handleRatingUpdate}
                                />
                            )}
                        </div>
                    </Col>
                </Row>

                <Row className="mt-4">
                    <Col lg={12}>
                        <div className="bg-white rounded p-4 shadow-sm">
                            {/* Componente de Comentarios */}
                            {product && (
                                <Comments 
                                    juegoId={typeof product.id === 'string' ? parseInt(product.id) : product.id}
                                />
                            )}
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default ProductDetail;

