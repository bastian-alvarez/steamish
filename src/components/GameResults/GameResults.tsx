import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Card, Badge, Button, ButtonGroup } from 'react-bootstrap';
import { Product } from '../../types/Product';
import { COLORS } from '../../utils/constants';

// INTERFACE PARA PROPS DEL COMPONENTE
interface GameResultsProps {
    products: Product[];
    searchTerm: string;
    onGameSelect?: (product: Product) => void;
}

const GameResults: React.FC<GameResultsProps> = ({ 
    products, 
    searchTerm, 
    onGameSelect 
}) => {
    const navigate = useNavigate();
    // FUNCIÓN PARA RESALTAR TEXTO DE BÚSQUEDA
    const highlightSearchTerm = (text: string, term: string): JSX.Element => {
        if (!term.trim()) {
            return <span>{text}</span>;
        }

        const regex = new RegExp(`(${term})`, 'gi');
        const parts = text.split(regex);

        return (
            <span>
                {parts.map((part, index) => 
                    regex.test(part) ? (
                        <mark key={index} className="bg-warning text-dark fw-bold">
                            {part}
                        </mark>
                    ) : (
                        <span key={index}>{part}</span>
                    )
                )}
            </span>
        );
    };

    // FUNCIÓN PARA OBTENER COLOR DE CATEGORÍA
    const getCategoryColor = (category: string): string => {
        const colors: Record<string, string> = {
            'Acción': 'danger',
            'Aventura': 'success',
            'Simulación': 'info',
            'Carreras': 'warning',
            'Estrategia': 'primary',
            'RPG': 'secondary'
        };
        return colors[category] || 'dark';
    };

    // FUNCIÓN PARA RENDERIZAR ESTRELLAS
    const renderStars = (rating: number): JSX.Element[] => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        for (let i = 0; i < fullStars; i++) {
            stars.push(
                <i key={i} className="bi bi-star-fill text-warning"></i>
            );
        }

        if (hasHalfStar) {
            stars.push(
                <i key="half" className="bi bi-star-half text-warning"></i>
            );
        }

        const emptyStars = 5 - Math.ceil(rating);
        for (let i = 0; i < emptyStars; i++) {
            stars.push(
                <i key={`empty-${i}`} className="bi bi-star text-muted"></i>
            );
        }

        return stars;
    };

    // MENSAJE CUANDO NO HAY RESULTADOS
    if (products.length === 0) {
        return (
            <div className="text-center py-5">
                <div className="mb-4">
                    <i className="bi bi-search display-1 text-muted"></i>
                </div>
                <h3 className="text-muted mb-3">No se encontraron juegos</h3>
                <p className="text-muted">
                    {searchTerm ? (
                        <>
                            No hay resultados para "<strong>{searchTerm}</strong>".<br />
                            Intenta con otros términos de búsqueda.
                        </>
                    ) : (
                        'Ajusta los filtros para ver más resultados.'
                    )}
                </p>
            </div>
        );
    }

    return (
        <Row className="g-4">
            {products.map((product, index) => (
                <Col key={product.id} lg={4} md={6} className="animate__animated animate__fadeInUp" 
                     style={{ animationDelay: `${index * 0.1}s` }}>
                    <Card 
                        className="h-100 shadow-sm border-0 game-result-card position-relative overflow-hidden"
                        style={{ cursor: 'pointer' }}
                        onClick={() => navigate(`/productos/${product.id}`)}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-5px)';
                            e.currentTarget.style.transition = 'transform 0.3s ease';
                            e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.15)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '';
                        }}
                    >
                        {/* BADGE DE DESTACADO */}
                        {product.featured && (
                            <Badge 
                                bg="info" 
                                className="position-absolute top-0 start-0 m-2 z-index-1"
                                onClick={(e) => e.stopPropagation()}
                                style={{ pointerEvents: 'auto' }}
                            >
                                <i className="bi bi-star-fill me-1"></i>
                                Destacado
                            </Badge>
                        )}

                        {/* BADGE DE DESCUENTO */}
                        {product.discount > 0 && (
                            <Badge 
                                bg="danger" 
                                className="position-absolute top-0 end-0 m-2 z-index-1"
                                onClick={(e) => e.stopPropagation()}
                                style={{ pointerEvents: 'auto' }}
                            >
                                -{product.discount}%
                            </Badge>
                        )}

                        {/* IMAGEN DEL JUEGO */}
                        <div className="position-relative" style={{ height: '250px', overflow: 'hidden', backgroundColor: '#f8f9fa' }}>
                            <img 
                                src={product.image || 'https://via.placeholder.com/300x200/4d4d80/ffffff?text=Game'} 
                                alt={product.name}
                                className="img-fluid w-100 h-100"
                                style={{ 
                                    objectFit: 'cover',
                                    transition: 'transform 0.3s ease',
                                    backgroundColor: '#e9ecef'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'scale(1.05)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'scale(1)';
                                }}
                                onError={(e) => {
                                    // Fallback si la imagen no carga
                                    const target = e.target as HTMLImageElement;
                                    target.src = 'https://via.placeholder.com/300x200/4d4d80/ffffff?text=' + encodeURIComponent(product.name);
                                }}
                                loading="lazy"
                            />
                        </div>

                        <Card.Body className="p-4">
                            {/* TÍTULO DEL JUEGO */}
                            <Card.Title className="h5 fw-bold mb-2" style={{ color: COLORS.color1 }}>
                                {highlightSearchTerm(product.name, searchTerm)}
                            </Card.Title>

                            {/* DESCRIPCIÓN */}
                            <Card.Text className="text-muted mb-3 small">
                                {highlightSearchTerm(product.description, searchTerm)}
                            </Card.Text>

                            {/* RATING */}
                            <div className="d-flex align-items-center mb-3">
                                <div className="me-2">
                                    {renderStars(product.rating)}
                                </div>
                                <span className="fw-bold" style={{ color: COLORS.color1 }}>{product.rating}</span>
                            </div>

                            {/* CATEGORÍA Y TAGS */}
                            <div className="mb-3">
                                <Badge bg={getCategoryColor(product.category)} className="me-2">
                                    {product.category}
                                </Badge>
                                {product.tags && product.tags.slice(0, 2).map(tag => (
                                    <Badge key={tag} bg="outline-secondary" text="dark" className="me-1">
                                        {tag}
                                    </Badge>
                                ))}
                            </div>

                            {/* PRECIO Y ACCIÓN */}
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    {product.discount > 0 ? (
                                        <div>
                                            <span className="text-muted text-decoration-line-through me-2">
                                                ${product.price.toFixed(2)}
                                            </span>
                                            <span className="fw-bold text-danger fs-5">
                                                ${(product.price * (1 - product.discount / 100)).toFixed(2)}
                                            </span>
                                        </div>
                                    ) : (
                                        <span className="fw-bold text-primary fs-5">
                                            {product.price === 0 ? 'Gratis' : `$${product.price.toFixed(2)}`}
                                        </span>
                                    )}
                                </div>
                                
                                <ButtonGroup onClick={(e) => e.stopPropagation()}>
                                <Button 
                                    variant="primary" 
                                    size="sm"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onGameSelect?.(product);
                                        }}
                                    className="fw-bold"
                                        style={{ background: COLORS.gradientPrimary, borderColor: COLORS.color4, color: 'white' }}
                                        disabled={product.price === 0}
                                >
                                    <i className="bi bi-cart-plus me-1"></i>
                                        {product.price === 0 ? 'Gratis' : 'Agregar'}
                                </Button>
                                </ButtonGroup>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            ))}
        </Row>
    );
};

export default GameResults;