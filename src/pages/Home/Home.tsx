import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Badge, Button } from 'react-bootstrap';
import { useProducts } from '../../context/ProductContext';
import { useCart } from '../../context/CartContext';
import { Product } from '../../types/Product';
import { COLORS } from '../../utils/constants';

// Home con diseño mejorado
const Home: React.FC = () => {
    const { featuredProducts } = useProducts();
    const cart = useCart();
    const navigate = useNavigate();

    // Si no hay productos destacados, usar datos de ejemplo
    const featuredGames: Product[] = featuredProducts.length > 0 
        ? featuredProducts.slice(0, 3)
        : [
            {
                id: '1',
                name: 'Cyber Adventure 2077',
                price: 59.99,
                rating: 4.9,
                category: 'Acción',
                image: 'https://via.placeholder.com/300x200/0d6efd/ffffff?text=Cyber+Adventure',
                discount: 20,
                description: 'Aventura cyberpunk épica',
                tags: ['Acción', 'Futurista'],
                featured: true
            },
            {
                id: '2',
                name: 'Mystic Realms',
                price: 49.99,
                rating: 4.8,
                category: 'Aventura',
                image: 'https://via.placeholder.com/300x200/6610f2/ffffff?text=Mystic+Realms',
                discount: 10,
                description: 'Mundo de fantasía mística',
                tags: ['Aventura', 'Fantasía'],
                featured: true
            },
            {
                id: '3',
                name: 'Space Odyssey',
                price: 39.99,
                rating: 4.7,
                category: 'Simulación',
                image: 'https://via.placeholder.com/300x200/0dcaf0/ffffff?text=Space+Odyssey',
                discount: 0,
                description: 'Exploración espacial',
                tags: ['Simulación', 'Espacio'],
                featured: true
            }
        ];

    const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>, game: Product): void => {
        e.stopPropagation();
        cart.add(game);
    };

    return (
        <div className="min-vh-100">
            {/* Hero Section Mejorado */}
            <section className="text-white py-5 position-relative overflow-hidden" style={{ background: COLORS.gradientPrimary, minHeight: '85vh' }}>
                {/* Elementos decorativos de fondo */}
                <div className="position-absolute top-0 start-0 w-100 h-100" style={{ 
                    background: 'radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.05) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.05) 0%, transparent 50%)',
                    pointerEvents: 'none'
                }}></div>
                
                <Container className="position-relative" style={{ zIndex: 1 }}>
                    <Row className="align-items-center min-vh-75 py-5">
                        <Col lg={6} className="text-center text-lg-start mb-5 mb-lg-0">
                            <div className="mb-4">
                                <h1 className="display-3 fw-bold mb-3 text-white" style={{ lineHeight: '1.2' }}>
                                    <i className="bi bi-controller me-3 d-inline-block" style={{ fontSize: '3rem' }}></i>
                                    <span className="d-block mt-2">Descubre Juegos</span>
                                    <span className="d-block text-white">Increíbles</span>
                                </h1>
                            </div>
                            <p className="lead mb-4 text-white" style={{ 
                                opacity: 0.95, 
                                fontSize: '1.25rem',
                                lineHeight: '1.6',
                                maxWidth: '90%'
                            }}>
                                La plataforma gaming más hermosa del mundo. Encuentra, explora y juega los mejores videojuegos con una experiencia visual espectacular.
                            </p>
                            <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center justify-content-lg-start">
                                <Link 
                                    to="/productos" 
                                    className="btn btn-lg fw-bold px-5 py-3 rounded-3 text-decoration-none"
                                    style={{ 
                                        background: 'rgba(255, 255, 255, 0.15)',
                                        border: '2px solid rgba(255, 255, 255, 0.3)',
                                        color: 'white',
                                        backdropFilter: 'blur(10px)',
                                        transition: 'all 0.3s ease'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.25)';
                                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.5)';
                                        e.currentTarget.style.transform = 'translateY(-3px)';
                                        e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.3)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
                                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.boxShadow = 'none';
                                    }}
                                >
                                    <i className="bi bi-joystick me-2"></i>Explorar Juegos
                                </Link>
                                <Link 
                                    to="/nosotros" 
                                    className="btn btn-outline-light btn-lg fw-bold px-5 py-3 rounded-3 text-decoration-none"
                                    style={{ 
                                        borderWidth: '2px',
                                        borderColor: 'rgba(255, 255, 255, 0.5)',
                                        color: 'white',
                                        background: 'transparent',
                                        transition: 'all 0.3s ease'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.8)';
                                        e.currentTarget.style.transform = 'translateY(-3px)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background = 'transparent';
                                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.5)';
                                        e.currentTarget.style.transform = 'translateY(0)';
                                    }}
                                >
                                    <i className="bi bi-people me-2"></i>Conocer Más
                                </Link>
                            </div>
                        </Col>
                        
                        {/* Card Premium - Mejorado */}
                        <Col lg={6} className="text-center mt-5 mt-lg-0">
                            <Card className="border-0 shadow-lg mx-auto" style={{ 
                                maxWidth: '380px',
                                borderRadius: '20px',
                                overflow: 'hidden',
                                transition: 'transform 0.3s ease'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-10px)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                            }}
                            >
                                {/* Icon Area */}
                                <div 
                                    className="p-5 d-flex align-items-center justify-content-center"
                                    style={{ 
                                        background: COLORS.gradientPrimary,
                                        minHeight: '200px'
                                    }}
                                >
                                    <i className="bi bi-joystick text-white" style={{ fontSize: '5rem' }}></i>
                                </div>
                                
                                <Card.Body className="p-5">
                                    <Card.Title className="h3 mb-3 fw-bold" style={{ color: COLORS.color1, fontSize: '1.75rem' }}>
                                        Juegos Premium
                                    </Card.Title>
                                    <div className="d-flex justify-content-center align-items-center gap-3 mb-3">
                                        <Badge 
                                            className="px-3 py-2 rounded-pill" 
                                            style={{ 
                                                background: COLORS.gradientPrimary,
                                                color: 'white',
                                                fontSize: '1rem'
                                            }}
                                        >
                                            <i className="bi bi-star-fill me-1"></i>5.0
                                        </Badge>
                                        <small className="text-muted" style={{ fontSize: '0.95rem' }}>
                                            +10,000 juegos disponibles
                                        </small>
                                    </div>
                                    <p className="text-muted mb-0" style={{ fontSize: '0.9rem' }}>
                                        Accede a nuestra biblioteca completa de títulos seleccionados
                                    </p>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Featured Games Section - Mejorado */}
            <section className="py-5" style={{ background: '#f8f9fa' }}>
                <Container>
                    <Row className="mb-5 text-center">
                        <Col>
                            <h2 className="display-5 fw-bold mb-3" style={{ color: COLORS.color1 }}>
                                <i className="bi bi-fire me-3" style={{ color: COLORS.color4 }}></i>
                                Juegos Destacados
                            </h2>
                            <p className="lead text-muted mb-0">Los títulos más populares de la temporada</p>
                        </Col>
                    </Row>

                    <Row className="g-4">
                        {featuredGames.map(game => (
                            <Col key={game.id} lg={4} md={6}>
                                <Card 
                                    className="h-100 border-0 shadow-sm position-relative" 
                                    style={{ 
                                        borderRadius: '20px',
                                        overflow: 'hidden',
                                        transition: 'all 0.3s ease',
                                        backgroundColor: 'white',
                                        cursor: 'pointer'
                                    }}
                                    onClick={() => navigate(`/productos/${game.id}`)}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'translateY(-10px)';
                                        e.currentTarget.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.15)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
                                    }}
                                >
                                    {/* Imagen del juego */}
                                    <div style={{ 
                                        position: 'relative', 
                                        overflow: 'hidden',
                                        backgroundColor: '#f8f9fa',
                                        height: '280px'
                                    }}>
                                        <img 
                                            src={game.image} 
                                            alt={game.name}
                                            className="w-100 h-100"
                                            style={{ 
                                                objectFit: 'cover',
                                                transition: 'transform 0.4s ease',
                                                backgroundColor: '#e9ecef'
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.transform = 'scale(1.08)';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.transform = 'scale(1)';
                                            }}
                                            loading="lazy"
                                        />
                                        
                                        {/* Badge de descuento */}
                                        {game.discount > 0 && (
                                            <Badge 
                                                bg="danger" 
                                                className="position-absolute top-0 end-0 m-3 px-3 py-2 fw-bold"
                                                onClick={(e) => e.stopPropagation()}
                                                style={{ 
                                                    fontSize: '1rem', 
                                                    borderRadius: '25px',
                                                    zIndex: 10,
                                                    boxShadow: '0 4px 10px rgba(220, 53, 69, 0.4)',
                                                    pointerEvents: 'auto'
                                                }}
                                            >
                                                -{game.discount}%
                                            </Badge>
                                        )}
                                        
                                        {/* Badge de categoría */}
                                        <Badge 
                                            className="position-absolute top-0 start-0 m-3 px-3 py-2 fw-semibold"
                                            onClick={(e) => e.stopPropagation()}
                                            style={{ 
                                                background: 'rgba(255, 255, 255, 0.9)',
                                                color: COLORS.color1,
                                                fontSize: '0.85rem',
                                                borderRadius: '20px',
                                                zIndex: 10,
                                                backdropFilter: 'blur(10px)',
                                                pointerEvents: 'auto'
                                            }}
                                        >
                                            {game.category}
                                        </Badge>
                                    </div>
                                    
                                    <Card.Body className="d-flex flex-column p-4">
                                        <Card.Title className="h5 mb-3 fw-bold" style={{ 
                                            color: COLORS.color1,
                                            fontSize: '1.25rem',
                                            lineHeight: '1.4',
                                            minHeight: '3rem'
                                        }}>
                                            {game.name}
                                        </Card.Title>
                                        
                                        {/* Rating */}
                                        <div className="d-flex align-items-center mb-3">
                                            <div className="text-warning me-2" style={{ fontSize: '1.1rem' }}>
                                                {[...Array(5)].map((_, i) => (
                                                    <i key={i} className={`bi bi-star${i < Math.floor(game.rating) ? '-fill' : i < game.rating ? '-half' : ''}`}></i>
                                                ))}
                                            </div>
                                            <span className="fw-bold text-muted" style={{ fontSize: '0.95rem' }}>
                                                {game.rating}
                                            </span>
                                        </div>
                                        
                                        <div className="mt-auto">
                                            {/* Precio */}
                                            <div className="mb-3">
                                                {game.discount > 0 ? (
                                                    <div className="d-flex align-items-baseline gap-2">
                                                        <span className="text-muted text-decoration-line-through" style={{ fontSize: '1rem' }}>
                                                            ${game.price.toFixed(2)}
                                                        </span>
                                                        <span className="h4 text-success mb-0 fw-bold">
                                                            ${(game.price * (1 - game.discount / 100)).toFixed(2)}
                                                        </span>
                                                    </div>
                                                ) : (
                                                    <span className="h4 text-success mb-0 fw-bold">
                                                        ${game.price.toFixed(2)}
                                                    </span>
                                                )}
                                            </div>
                                            
                                            {/* Botón */}
                                            <Button 
                                                variant="primary" 
                                                className="w-100 fw-bold rounded-3 py-3"
                                                onClick={(e) => handleAddToCart(e, game)}
                                                style={{ 
                                                    background: COLORS.gradientPrimary, 
                                                    border: 'none',
                                                    color: 'white',
                                                    fontSize: '1rem',
                                                    transition: 'all 0.3s ease'
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.transform = 'translateY(-3px)';
                                                    e.currentTarget.style.boxShadow = '0 8px 20px rgba(28, 31, 59, 0.35)';
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.transform = 'translateY(0)';
                                                    e.currentTarget.style.boxShadow = 'none';
                                                }}
                                            >
                                                <i className="bi bi-cart-plus me-2"></i>Agregar al Carrito
                                            </Button>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </section>
        </div>
    );
};

export default Home;
