import React from 'react';
import { Row, Col, Card, Badge, Button } from 'react-bootstrap';
import { Product } from '../../types/Product';

// 🎮 INTERFACE PARA PROPS DEL COMPONENTE
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
    // 🎯 FUNCIÓN PARA RESALTAR TEXTO DE BÚSQUEDA
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

    // 🎨 FUNCIÓN PARA OBTENER COLOR DE CATEGORÍA
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

    // 🌟 FUNCIÓN PARA RENDERIZAR ESTRELLAS
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

    // 📊 MENSAJE CUANDO NO HAY RESULTADOS
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
                    <Card className="h-100 shadow-sm border-0 game-result-card position-relative overflow-hidden">
                        {/* 🏷️ BADGE DE DESTACADO */}
                        {product.featured && (
                            <Badge bg="info" className="position-absolute top-0 start-0 m-2 z-index-1">
                                <i className="bi bi-star-fill me-1"></i>
                                Destacado
                            </Badge>
                        )}

                        {/* 💰 BADGE DE DESCUENTO */}
                        {product.discount > 0 && (
                            <Badge bg="danger" className="position-absolute top-0 end-0 m-2 z-index-1">
                                -{product.discount}%
                            </Badge>
                        )}

                        {/* 🎮 IMAGEN DEL JUEGO */}
                        <div className="position-relative" style={{ height: '200px', overflow: 'hidden' }}>
                            <img 
                                src={product.image} 
                                alt={product.name}
                                className="img-fluid w-100 h-100"
                                style={{ 
                                    objectFit: 'cover',
                                    backgroundColor: '#f8f9fa'
                                }}
                                onError={(e) => {
                                    // Fallback si la imagen no carga
                                    const target = e.target as HTMLImageElement;
                                    target.style.display = 'none';
                                    const fallback = target.parentElement?.querySelector('.image-fallback');
                                    if (fallback) {
                                        (fallback as HTMLElement).style.display = 'flex';
                                    }
                                }}
                            />
                            <div 
                                className="image-fallback bg-primary d-flex align-items-center justify-content-center position-absolute top-0 start-0 w-100 h-100"
                                style={{ display: 'none' }}
                            >
                                <i className="bi bi-controller display-1 text-white"></i>
                            </div>
                        </div>

                        <Card.Body className="p-4">
                            {/* 📝 TÍTULO DEL JUEGO */}
                            <Card.Title className="h5 fw-bold mb-2" style={{ color: 'var(--color-1)' }}>
                                {highlightSearchTerm(product.name, searchTerm)}
                            </Card.Title>

                            {/* 📄 DESCRIPCIÓN */}
                            <Card.Text className="text-muted mb-3 small">
                                {highlightSearchTerm(product.description, searchTerm)}
                            </Card.Text>

                            {/* ⭐ RATING */}
                            <div className="d-flex align-items-center mb-3">
                                <div className="me-2">
                                    {renderStars(product.rating)}
                                </div>
                                <span className="fw-bold" style={{ color: 'var(--color-1)' }}>{product.rating}</span>
                                <small className="text-muted ms-1">({Math.floor(Math.random() * 1000) + 100} reseñas)</small>
                            </div>

                            {/* 🏷️ CATEGORÍA Y TAGS */}
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

                            {/* 💰 PRECIO Y ACCIÓN */}
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
                                            ${product.price.toFixed(2)}
                                        </span>
                                    )}
                                </div>
                                
                                <Button 
                                    variant="primary" 
                                    size="sm"
                                    onClick={() => onGameSelect?.(product)}
                                    className="fw-bold"
                                    style={{ background: 'var(--gradient-primary)', borderColor: 'var(--color-4)', color: 'white' }}
                                >
                                    <i className="bi bi-cart-plus me-1"></i>
                                    Agregar
                                </Button>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            ))}
        </Row>
    );
};

export default GameResults;