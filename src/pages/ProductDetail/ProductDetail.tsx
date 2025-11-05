import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Badge, Spinner } from 'react-bootstrap';
import { useProducts } from '../../context/ProductContext';
import { useCart } from '../../context/CartContext';
import { COLORS } from '../../utils/constants';

const ProductDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { getProductById } = useProducts();
    const cart = useCart();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    
    const product = id ? getProductById(id) : undefined;

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

    // Función para renderizar estrellas
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

    const handleAddToCart = () => {
        if (product) {
            cart.add(product);
            console.log(`Juego "${product.name}" agregado al carrito`);
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

    const finalPrice = product.discount > 0 
        ? product.price * (1 - product.discount / 100)
        : product.price;

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

                            {/* Rating */}
                            <div className="d-flex align-items-center mb-4">
                                <div className="me-3">
                                    {renderStars(product.rating)}
                                </div>
                                <span className="fw-bold fs-5" style={{ color: COLORS.color4 }}>
                                    {product.rating}
                                </span>
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
                                    {product.discount > 0 ? (
                                        <div>
                                            <span className="text-muted text-decoration-line-through me-3 fs-5">
                                                ${product.price.toFixed(2)}
                                            </span>
                                            <span className="fw-bold text-danger display-6">
                                                ${finalPrice.toFixed(2)}
                                            </span>
                                        </div>
                                    ) : (
                                        <span className="fw-bold text-primary display-6">
                                            ${product.price.toFixed(2)}
                                        </span>
                                    )}
                                    {product.price === 0 && (
                                        <span className="fw-bold text-success display-6">
                                            Gratis
                                        </span>
                                    )}
                                </div>

                                <div className="d-flex gap-3 flex-wrap">
                                    <Button 
                                        variant="primary" 
                                        size="lg"
                                        onClick={handleAddToCart}
                                        className="fw-bold px-4"
                                        style={{ background: COLORS.gradientPrimary, borderColor: COLORS.color4, color: 'white' }}
                                        disabled={product.price === 0}
                                    >
                                        <i className="bi bi-cart-plus me-2"></i>
                                        {product.price === 0 ? 'Gratis' : 'Agregar al Carrito'}
                                    </Button>
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
            </Container>
        </div>
    );
};

export default ProductDetail;

