import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Badge, Button } from 'react-bootstrap';
import { useProducts } from '../../context/ProductContext';
import { useCart } from '../../context/CartContext';
import { Product } from '../../types/Product';

// 🏠 Home con interfaces y useContext mejorado
const Home: React.FC = () => {
    const { featuredProducts } = useProducts();
    const cart = useCart();

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

    const handleAddToCart = (game: Product): void => {
        cart.add(game);
    };

    return (
        <div className="bg-light min-vh-100">
            {/* 🎯 Hero Section Compacto */}
            <section className="bg-primary text-white py-5" style={{ background: 'var(--gradient-primary)' }}>
                <Container>
                    <Row className="align-items-center min-vh-75">
                        <Col lg={6} className="text-center text-lg-start">
                            <h1 className="display-3 fw-bold mb-4">
                                <i className="bi bi-controller me-3" style={{ color: 'var(--color-1)' }}></i>
                                Descubre Juegos
                                <span className="d-block" style={{ color: 'var(--color-1)' }}>Increíbles</span>
                            </h1>
                            <p className="lead mb-4 fs-5">
                                La plataforma gaming más hermosa del mundo. Encuentra, explora y juega 
                                los mejores videojuegos con una experiencia visual espectacular.
                            </p>
                            <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center justify-content-lg-start">
                                <Link 
                                    to="/productos" 
                                    className="btn btn-lg fw-bold px-4"
                                    style={{ background: 'var(--color-2)', borderColor: 'var(--color-2)', color: 'var(--color-5)' }}
                                >
                                    <i className="bi bi-grid-3x3-gap me-2"></i>Explorar Juegos
                                </Link>
                                <Link 
                                    to="/nosotros" 
                                    className="btn btn-outline-light btn-lg fw-bold px-4"
                                    style={{ borderColor: 'var(--color-1)', color: 'var(--color-1)' }}
                                >
                                    <i className="bi bi-people me-2"></i>Conocer Más
                                </Link>
                            </div>
                        </Col>
                        
                        <Col lg={6} className="text-center mt-5 mt-lg-0">
                            <Card className="shadow-lg border-0 mx-auto" style={{ maxWidth: '350px' }}>
                                <Card.Body className="p-4">
                                    <div className="rounded-3 p-4 mb-3" style={{ background: 'var(--gradient-primary)' }}>
                                        <i className="bi bi-joystick display-1 text-white"></i>
                                    </div>
                                    <Card.Title className="h4" style={{ color: 'var(--color-4)' }}>Juegos Premium</Card.Title>
                                    <div className="d-flex justify-content-center align-items-center">
                                        <Badge className="me-2" style={{ background: 'var(--color-3)', color: 'white' }}>
                                            <i className="bi bi-star-fill me-1"></i>5.0
                                        </Badge>
                                        <small className="text-muted">+10,000 juegos disponibles</small>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* 🎮 Featured Games Simplificado */}
            <section className="py-5">
                <Container>
                    <Row className="mb-5 text-center">
                        <Col>
                            <h2 className="display-5 fw-bold mb-3" style={{ color: 'var(--color-4)' }}>
                                <i className="bi bi-fire me-3" style={{ color: 'var(--color-3)' }}></i>Juegos Destacados
                            </h2>
                            <p className="lead text-muted">Los títulos más populares de la temporada</p>
                        </Col>
                    </Row>

                    <Row className="g-4">
                        {featuredGames.map(game => (
                            <Col key={game.id} lg={4} md={6}>
                                <Card className="h-100 border-0 shadow-sm hover-effect">
                                    <Card.Img 
                                        variant="top" 
                                        src={game.image || 'https://via.placeholder.com/300x200'} 
                                        alt={game.name} 
                                        style={{ height: '200px', objectFit: 'cover' }} 
                                    />
                                    <Card.Body className="d-flex flex-column">
                                        <div className="d-flex justify-content-between align-items-start mb-2">
                                            <Badge style={{ background: 'var(--color-3)' }}>{game.category}</Badge>
                                            {game.discount > 0 && <Badge bg="danger">-{game.discount}%</Badge>}
                                        </div>
                                        <Card.Title className="h5" style={{ color: 'var(--color-4)' }}>{game.name}</Card.Title>
                                        <div className="d-flex align-items-center mb-3">
                                            <div className="text-warning me-2">
                                                {[...Array(5)].map((_, i) => (
                                                    <i key={i} className={`bi bi-star${i < Math.floor(game.rating) ? '-fill' : ''}`}></i>
                                                ))}
                                            </div>
                                            <small className="text-muted">({game.rating})</small>
                                        </div>
                                        <div className="mt-auto">
                                            <div className="d-flex justify-content-between align-items-center mb-3">
                                                <div>
                                                    {game.discount > 0 ? (
                                                        <>
                                                            <span className="text-muted text-decoration-line-through me-2">${game.price}</span>
                                                            <span className="h5 text-success mb-0">${(game.price * (1 - game.discount / 100)).toFixed(2)}</span>
                                                        </>
                                                    ) : (
                                                        <span className="h5 text-success mb-0">${game.price}</span>
                                                    )}
                                                </div>
                                            </div>
                                            <Button 
                                                variant="primary" 
                                                className="w-100"
                                                onClick={() => handleAddToCart(game)}
                                                style={{ background: 'var(--gradient-primary)', border: 'none' }}
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

            {/* 🎨 CSS Inline Minimalista */}
            <style>{`.hover-effect:hover { transform: translateY(-5px); transition: all 0.3s ease; }`}</style>
        </div>
    );
};

export default Home;