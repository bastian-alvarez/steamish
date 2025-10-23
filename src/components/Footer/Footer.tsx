import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';

const Footer: React.FC = () => {
    return (
        <footer className="bg-dark text-light py-5 mt-auto">
            <Container>
                <Row className="g-4">
                    <Col lg={3} md={6}>
                        <h5 className="fw-bold mb-3">
                            <i className="bi bi-controller text-info me-2"></i>
                            Steamish Gaming
                        </h5>
                        <p className="text-muted mb-3">
                            La plataforma de videojuegos más elegante y moderna. Descubre, compra y disfruta de los mejores títulos del momento.
                        </p>
                        <div className="d-flex gap-2">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" 
                               className="btn btn-outline-primary btn-sm">
                                <i className="bi bi-facebook"></i>
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" 
                               className="btn btn-outline-danger btn-sm">
                                <i className="bi bi-instagram"></i>
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" 
                               className="btn btn-outline-info btn-sm">
                                <i className="bi bi-twitter"></i>
                            </a>
                            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" 
                               className="btn btn-outline-danger btn-sm">
                                <i className="bi bi-youtube"></i>
                            </a>
                        </div>
                    </Col>

                    <Col lg={2} md={6}>
                        <h6 className="fw-bold mb-3 text-info">
                            <i className="bi bi-link-45deg me-1"></i>
                            Enlaces
                        </h6>
                        <ul className="list-unstyled">
                            <li className="mb-2">
                                <Link to="/productos" className="text-muted text-decoration-none">
                                    <i className="bi bi-chevron-right me-1"></i>
                                    Productos
                                </Link>
                            </li>
                            <li className="mb-2">
                                <Link to="/blogs" className="text-muted text-decoration-none">
                                    <i className="bi bi-chevron-right me-1"></i>
                                    Blog
                                </Link>
                            </li>
                            <li className="mb-2">
                                <Link to="/nosotros" className="text-muted text-decoration-none">
                                    <i className="bi bi-chevron-right me-1"></i>
                                    Nosotros
                                </Link>
                            </li>
                            <li>
                                <Link to="/contacto" className="text-muted text-decoration-none">
                                    <i className="bi bi-chevron-right me-1"></i>
                                    Contacto
                                </Link>
                            </li>
                        </ul>
                    </Col>

                    <Col lg={3} md={6}>
                        <h6 className="fw-bold mb-3 text-info">
                            <i className="bi bi-question-circle me-1"></i>
                            Soporte
                        </h6>
                        <ul className="list-unstyled">
                            <li className="mb-2">
                                <a href="/ayuda" className="text-muted text-decoration-none">
                                    <i className="bi bi-chevron-right me-1"></i>
                                    Centro de ayuda
                                </a>
                            </li>
                            <li className="mb-2">
                                <a href="/reembolsos" className="text-muted text-decoration-none">
                                    <i className="bi bi-chevron-right me-1"></i>
                                    Política de reembolsos
                                </a>
                            </li>
                            <li className="mb-2">
                                <a href="/terminos" className="text-muted text-decoration-none">
                                    <i className="bi bi-chevron-right me-1"></i>
                                    Términos de servicio
                                </a>
                            </li>
                            <li>
                                <a href="/privacidad" className="text-muted text-decoration-none">
                                    <i className="bi bi-chevron-right me-1"></i>
                                    Política de privacidad
                                </a>
                            </li>
                        </ul>
                    </Col>

                    <Col lg={4} md={6}>
                        <h6 className="fw-bold mb-3 text-info">
                            <i className="bi bi-envelope me-1"></i>
                            Newsletter Gaming
                        </h6>
                        <p className="text-muted mb-3">
                            Únete a nuestra comunidad exclusiva y recibe ofertas especiales y lanzamientos.
                        </p>
                        <Form className="d-flex flex-column gap-2">
                            <Form.Control 
                                type="email" 
                                placeholder="gamer@ejemplo.com" 
                                className="bg-secondary border-0 text-light"
                            />
                            <Button variant="info" type="submit" className="fw-bold">
                                <i className="bi bi-lightning me-1"></i>
                                Unirse Ahora
                            </Button>
                        </Form>
                    </Col>
                </Row>

                <hr className="my-4 border-secondary" />
                
                <Row className="align-items-center">
                    <Col md={6}>
                        <small className="text-muted">
                            <i className="bi bi-c-circle me-1"></i>
                            2025 Steamish Gaming Platform. Todos los derechos reservados.
                        </small>
                    </Col>
                    <Col md={6} className="text-md-end">
                        <small className="text-muted">
                            <i className="bi bi-heart-fill text-danger me-1"></i>
                            Creado para la comunidad gamer mundial
                        </small>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;