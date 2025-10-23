import React from 'react';
import { useProducts } from '../../context/ProductContext';
import { useCart } from '../../context/CartContext';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';

const Products: React.FC = () => {
    const products = useProducts();
    const { add } = useCart();

    return (
        <div className="bg-light min-vh-100 py-5">
            <Container>
                <Row className="mb-5">
                    <Col className="text-center">
                        <h1 className="display-4 fw-bold text-primary mb-3">
                            <i className="bi bi-controller text-info me-3"></i>
                            Juegos Increíbles
                        </h1>
                        <p className="lead text-muted">Descubre nuestra colección de los mejores videojuegos</p>
                    </Col>
                </Row>
                
                <Row className="g-4">
                    {products.map(product => (
                        <Col key={product.id} lg={4} md={6}>
                            <Card className="h-100 shadow-sm border-0 position-relative">
                                <div className="position-relative">
                                    <div className="bg-primary text-white d-flex align-items-center justify-content-center" 
                                         style={{ height: '200px' }}>
                                        <i className="bi bi-joystick display-1"></i>
                                    </div>
                                    <Badge bg="info" 
                                           className="position-absolute top-0 end-0 m-2">
                                        <i className="bi bi-star-fill me-1"></i>
                                        Nuevo
                                    </Badge>
                                </div>
                                
                                <Card.Body className="d-flex flex-column">
                                    <Card.Title className="h5 text-primary fw-bold">
                                        {product.name}
                                    </Card.Title>
                                    <Card.Text className="text-muted flex-grow-1">
                                        Juego increíble con una experiencia única de gaming.
                                    </Card.Text>
                                    
                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                        <div className="text-muted small">
                                            <i className="bi bi-tag me-1"></i>
                                            Categoria: Juego
                                        </div>
                                        <Badge bg="primary" text="white" className="fs-6">
                                            ${product.price}
                                        </Badge>
                                    </div>
                                    
                                    <Button 
                                        variant="primary" 
                                        className="fw-bold"
                                        onClick={() => add(product)}
                                    >
                                        <i className="bi bi-cart-plus me-2"></i>
                                        Agregar al Carrito
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    );
};

export default Products;