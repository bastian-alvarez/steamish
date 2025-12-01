import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Badge, Button, Alert, Spinner } from 'react-bootstrap';
import libraryService from '../../services/libraryService';
import productService from '../../services/productService';
import { Product } from '../../types/Product';
import { LibraryItem } from '../../types/Library';
import { COLORS } from '../../config/constants';
import { getImagePlaceholder, handleImageError } from '../../utils/helpers';

const Library: React.FC = () => {
    const { user, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [library, setLibrary] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (!isAuthenticated || !user) {
            navigate('/login');
            return;
        }

        const loadLibrary = async () => {
            try {
                setLoading(true);
                const userId = typeof user.id === 'string' ? parseInt(user.id) : user.id;
                const libraryItems = await libraryService.getLibrary(userId);
                
                // Convertir LibraryItem a Product obteniendo detalles del juego
                const products: Product[] = [];
                for (const item of libraryItems) {
                    try {
                        const juegoId = typeof item.juegoId === 'string' ? parseInt(item.juegoId) : item.juegoId;
                        const game = await productService.getProductById(juegoId);
                        if (game) {
                            products.push(game);
                        } else {
                            // Si no se encuentra el juego, crear un producto básico desde LibraryItem
                            products.push({
                                id: item.juegoId,
                                name: item.name,
                                price: item.price,
                                image: '',
                                rating: 0,
                                discount: 0,
                                category: item.genre || 'Sin categoría',
                                description: '',
                                tags: []
                            });
                        }
                    } catch (error) {
                        console.error(`Error al cargar juego ${item.juegoId}:`, error);
                    }
                }
                
                setLibrary(products);
            } catch (error) {
                console.error('Error al cargar biblioteca:', error);
                // Fallback a método sincrónico si está disponible
                if (user.id) {
                    const syncLibrary = libraryService.getLibrarySync(user.id.toString());
                    setLibrary(syncLibrary);
                }
            } finally {
                setLoading(false);
            }
        };

        loadLibrary();
    }, [user, isAuthenticated, navigate]);

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

    if (!isAuthenticated || !user) {
        return null;
    }

    return (
        <div style={{ background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)', minHeight: '100vh' }}>
            <div className="bg-primary text-white py-4" style={{ background: COLORS.gradientPrimary }}>
                <Container>
                    <h1 className="h3 mb-0">
                        <i className="bi bi-collection me-2"></i>Mi Biblioteca
                    </h1>
                    <p className="mb-0">Juegos que has comprado</p>
                </Container>
            </div>

            <Container className="py-5">
                {loading ? (
                    <div className="text-center py-5">
                        <Spinner animation="border" variant="primary" />
                        <p className="mt-3 text-muted">Cargando tu biblioteca...</p>
                    </div>
                ) : library.length === 0 ? (
                    <Alert variant="info" className="text-center">
                        <i className="bi bi-info-circle me-2"></i>
                        <strong>Tu biblioteca está vacía</strong>
                        <p className="mb-0 mt-2">Compra algunos juegos para agregarlos a tu biblioteca.</p>
                        <Button 
                            variant="primary" 
                            className="mt-3"
                            onClick={() => navigate('/productos')}
                        >
                            <i className="bi bi-cart-plus me-2"></i>Ir a la Tienda
                        </Button>
                    </Alert>
                ) : (
                    <>
                        <div className="mb-4">
                            <h2 className="h4 fw-bold">
                                {library.length} {library.length === 1 ? 'Juego' : 'Juegos'} en tu biblioteca
                            </h2>
                        </div>
                        <Row className="g-4">
                            {library.map((game) => (
                                <Col key={game.id} lg={3} md={4} sm={6}>
                                    <Card 
                                        className="h-100 border-0 shadow-sm"
                                        style={{ 
                                            borderRadius: '12px',
                                            overflow: 'hidden',
                                            cursor: 'pointer',
                                            transition: 'transform 0.2s'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.transform = 'translateY(-5px)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.transform = 'translateY(0)';
                                        }}
                                        onClick={() => navigate(`/productos/${game.id}`)}
                                    >
                                        <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
                                            {game.featured && (
                                                <Badge 
                                                    bg="info" 
                                                    className="position-absolute top-0 start-0 m-2"
                                                >
                                                    <i className="bi bi-star-fill me-1"></i>Destacado
                                                </Badge>
                                            )}
                                            <img 
                                                src={game.image || getImagePlaceholder(300, 200, 'Juego')} 
                                                alt={game.name}
                                                className="img-fluid w-100 h-100"
                                                style={{ objectFit: 'cover' }}
                                                onError={(e) => handleImageError(e, game.name)}
                                            />
                                        </div>
                                        <Card.Body className="d-flex flex-column">
                                            <Badge bg={getCategoryColor(game.category)} className="mb-2 align-self-start">
                                                {game.category}
                                            </Badge>
                                            <Card.Title className="h5 fw-bold mb-2" style={{ color: COLORS.color4 }}>
                                                {game.name}
                                            </Card.Title>
                                            <Card.Text className="text-muted small flex-grow-1">
                                                {game.description.substring(0, 100)}...
                                            </Card.Text>
                                            <div className="d-flex justify-content-between align-items-center mt-auto">
                                                <div>
                                                    <i className="bi bi-star-fill text-warning me-1"></i>
                                                    <span className="fw-bold">{game.rating}</span>
                                                </div>
                                                <Badge bg="success">
                                                    <i className="bi bi-check-circle me-1"></i>Propiedad
                                                </Badge>
                                            </div>
                                            <Button 
                                                variant="primary" 
                                                className="w-100 mt-3"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    e.preventDefault();
                                                    // Botón sin funcionalidad
                                                }}
                                            >
                                                <i className="bi bi-download me-2"></i>Descargar
                                            </Button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </>
                )}
            </Container>
        </div>
    );
};

export default Library;

