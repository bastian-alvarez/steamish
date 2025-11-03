import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';

// 🦶 Footer Simplificado - Factory Pattern
const Footer: React.FC = () => {
    const createLink = (to: string, label: string) => ({ to, label });
    const createSocial = (href: string, icon: string, variant: string) => ({ href, icon, variant });

    const navLinks = [
        createLink('/productos', 'Productos'),
        createLink('/blogs', 'Blog'),
        createLink('/nosotros', 'Nosotros'),
        createLink('/contacto', 'Contacto')
    ];

    const supportLinks = [
        createLink('/ayuda', 'Centro de ayuda'),
        createLink('/reembolsos', 'Política de reembolsos'),
        createLink('/terminos', 'Términos de servicio'),
        createLink('/privacidad', 'Política de privacidad')
    ];

    const socialLinks = [
        createSocial('https://facebook.com', 'facebook', 'primary'),
        createSocial('https://instagram.com', 'instagram', 'danger'),
        createSocial('https://twitter.com', 'twitter', 'info'),
        createSocial('https://youtube.com', 'youtube', 'danger')
    ];

    return (
        <footer className="text-light py-5 mt-auto" style={{ background: 'var(--gradient-primary)' }}>
            <Container>
                <Row className="g-4">
                    <Col lg={3} md={6}>
                        <h5 className="fw-bold mb-3 text-white">
                            <i className="bi bi-controller me-2" style={{ color: 'var(--color-1)' }}></i>Steamish Gaming
                        </h5>
                        <p className="mb-3" style={{ color: 'var(--color-2)' }}>
                            La plataforma de videojuegos más elegante y moderna. Descubre y disfruta de los mejores títulos.
                        </p>
                        <div className="d-flex gap-2">
                            {socialLinks.map(social => (
                                <a 
                                    key={social.icon} 
                                    href={social.href} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="btn btn-sm"
                                    style={{ 
                                        borderColor: 'var(--color-2)', 
                                        color: 'var(--color-2)',
                                        backgroundColor: 'transparent'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor = 'var(--color-2)';
                                        e.currentTarget.style.color = 'var(--color-5)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor = 'transparent';
                                        e.currentTarget.style.color = 'var(--color-2)';
                                    }}
                                >
                                    <i className={`bi bi-${social.icon}`}></i>
                                </a>
                            ))}
                        </div>
                    </Col>

                    <Col lg={2} md={6}>
                        <h6 className="fw-bold mb-3" style={{ color: 'var(--color-3)' }}>
                            <i className="bi bi-link-45deg me-1"></i>Enlaces
                        </h6>
                        <ul className="list-unstyled">
                            {navLinks.map(link => (
                                <li key={link.to} className="mb-2">
                                    <Link 
                                        to={link.to} 
                                        className="text-decoration-none"
                                        style={{ color: 'var(--color-2)' }}
                                        onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-1)'}
                                        onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-2)'}
                                    >
                                        <i className="bi bi-chevron-right me-1"></i>{link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </Col>

                    <Col lg={3} md={6}>
                        <h6 className="fw-bold mb-3" style={{ color: 'var(--color-3)' }}>
                            <i className="bi bi-question-circle me-1"></i>Soporte
                        </h6>
                        <ul className="list-unstyled">
                            {supportLinks.map(link => (
                                <li key={link.to} className="mb-2">
                                    <a 
                                        href={link.to} 
                                        className="text-decoration-none"
                                        style={{ color: 'var(--color-2)' }}
                                        onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-1)'}
                                        onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-2)'}
                                    >
                                        <i className="bi bi-chevron-right me-1"></i>{link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </Col>

                    <Col lg={4} md={6}>
                        <h6 className="fw-bold mb-3" style={{ color: 'var(--color-3)' }}>
                            <i className="bi bi-envelope me-1"></i>Newsletter Gaming
                        </h6>
                        <p className="mb-3" style={{ color: 'var(--color-2)' }}>
                            Únete y recibe ofertas especiales y lanzamientos.
                        </p>
                        <Form className="d-flex flex-column gap-2">
                            <Form.Control 
                                type="email" 
                                placeholder="gamer@ejemplo.com" 
                                className="border-0"
                                style={{ 
                                    backgroundColor: 'rgba(255, 255, 255, 0.1)', 
                                    color: 'white',
                                    backdropFilter: 'blur(10px)'
                                }}
                            />
                            <Button 
                                type="submit" 
                                className="fw-bold"
                                style={{ 
                                    background: 'var(--color-3)', 
                                    borderColor: 'var(--color-3)',
                                    color: 'white'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = 'var(--color-2)';
                                    e.currentTarget.style.borderColor = 'var(--color-2)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = 'var(--color-3)';
                                    e.currentTarget.style.borderColor = 'var(--color-3)';
                                }}
                            >
                                <i className="bi bi-lightning me-1"></i>Unirse Ahora
                            </Button>
                        </Form>
                    </Col>
                </Row>

                <hr className="my-4" style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} />
                
                <Row className="align-items-center">
                    <Col md={6}>
                        <small style={{ color: 'var(--color-2)' }}>
                            <i className="bi bi-c-circle me-1"></i>
                            2025 Steamish Gaming Platform. Todos los derechos reservados.
                        </small>
                    </Col>
                    <Col md={6} className="text-md-end">
                        <small style={{ color: 'var(--color-2)' }}>
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