import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { COLORS } from '../../../config/constants';

// Footer y enlaces organizados
const Footer: React.FC = () => {
    const createLink = (to: string, label: string) => ({ to, label });
    const createSocial = (href: string, icon: string) => ({ href, icon });

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
        createSocial('https://facebook.com', 'facebook'),
        createSocial('https://instagram.com', 'instagram'),
        createSocial('https://twitter.com', 'twitter'),
        createSocial('https://youtube.com', 'youtube')
    ];

    return (
        <footer className="text-white py-5 mt-auto" style={{ background: COLORS.gradientPrimary }}>
            <Container>
                <Row className="g-4 mb-4">
                    {/* Brand Column */}
                    <Col lg={4} md={6}>
                        <div className="mb-4">
                            <h5 className="fw-bold mb-3 d-flex align-items-center text-white">
                                <i className="bi bi-controller me-2" style={{ fontSize: '1.8rem', color: 'white' }}></i>
                                <span>Steamish Gaming</span>
                            </h5>
                            <p className="mb-4 text-white" style={{ opacity: 0.9, lineHeight: '1.6', fontSize: '1rem' }}>
                                Tu próximo juego favorito te está esperando. Exploramos, probamos y seleccionamos los títulos que realmente valen la pena.
                            </p>
                            <div className="d-flex gap-2">
                                {socialLinks.map(social => (
                                    <a 
                                        key={social.icon} 
                                        href={social.href} 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="btn btn-sm rounded-circle d-flex align-items-center justify-content-center"
                                        style={{ 
                                            width: '45px',
                                            height: '45px',
                                            borderColor: 'rgba(255, 255, 255, 0.3)', 
                                            color: 'white',
                                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                            transition: 'all 0.3s ease'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                                            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.5)';
                                            e.currentTarget.style.transform = 'translateY(-3px)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                                            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                                            e.currentTarget.style.transform = 'translateY(0)';
                                        }}
                                    >
                                        <i className={`bi bi-${social.icon}`} style={{ fontSize: '1.2rem' }}></i>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </Col>

                    {/* Enlaces Column */}
                    <Col lg={2} md={6}>
                        <h6 className="fw-bold mb-3 text-white d-flex align-items-center">
                            <i className="bi bi-link-45deg me-2" style={{ fontSize: '1.1rem' }}></i>
                            Enlaces
                        </h6>
                        <ul className="list-unstyled">
                            {navLinks.map(link => (
                                <li key={link.to} className="mb-2">
                                    <Link 
                                        to={link.to} 
                                        className="text-decoration-none d-flex align-items-center text-white"
                                        style={{ 
                                            opacity: 0.85,
                                            transition: 'all 0.2s ease',
                                            fontSize: '0.95rem'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.opacity = '1';
                                            e.currentTarget.style.transform = 'translateX(5px)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.opacity = '0.85';
                                            e.currentTarget.style.transform = 'translateX(0)';
                                        }}
                                    >
                                        <i className="bi bi-chevron-right me-2" style={{ fontSize: '0.7rem' }}></i>
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </Col>

                    {/* Soporte Column */}
                    <Col lg={2} md={6}>
                        <h6 className="fw-bold mb-3 text-white d-flex align-items-center">
                            <i className="bi bi-question-circle me-2" style={{ fontSize: '1.1rem' }}></i>
                            Soporte
                        </h6>
                        <ul className="list-unstyled">
                            {supportLinks.map(link => (
                                <li key={link.to} className="mb-2">
                                    <a
                                        href={link.to}
                                        className="text-decoration-none d-flex align-items-center text-white"
                                        style={{ 
                                            opacity: 0.85,
                                            transition: 'all 0.2s ease',
                                            fontSize: '0.95rem'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.opacity = '1';
                                            e.currentTarget.style.transform = 'translateX(5px)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.opacity = '0.85';
                                            e.currentTarget.style.transform = 'translateX(0)';
                                        }}
                                    >
                                        <i className="bi bi-chevron-right me-2" style={{ fontSize: '0.7rem' }}></i>
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </Col>

                    {/* Newsletter Column */}
                    <Col lg={4} md={6}>
                        <h6 className="fw-bold mb-3 text-white d-flex align-items-center">
                            <i className="bi bi-envelope me-2" style={{ fontSize: '1.1rem' }}></i>
                            Newsletter Gaming
                        </h6>
                        <p className="text-white mb-3" style={{ opacity: 0.9, fontSize: '0.95rem' }}>
                            Únete y recibe ofertas especiales y lanzamientos.
                        </p>
                        <Form className="d-flex flex-column gap-2">
                            <Form.Control 
                                type="email" 
                                placeholder="gamer@ejemplo.com" 
                                className="border-0 rounded-3"
                                style={{ 
                                    backgroundColor: 'rgba(255, 255, 255, 0.15)', 
                                    color: 'white',
                                    padding: '0.75rem 1rem',
                                    backdropFilter: 'blur(10px)',
                                    transition: 'all 0.3s ease'
                                }}
                                onFocus={(e) => {
                                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.25)';
                                }}
                                onBlur={(e) => {
                                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
                                }}
                            />
                            <Button
                                type="submit"
                                className="fw-bold rounded-3"
                                style={{
                                    background: 'rgba(255, 255, 255, 0.2)',
                                    borderColor: 'rgba(255, 255, 255, 0.3)',
                                    color: 'white',
                                    padding: '0.75rem',
                                    transition: 'all 0.3s ease'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)';
                                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.5)';
                                    e.currentTarget.style.transform = 'translateY(-2px)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                                    e.currentTarget.style.transform = 'translateY(0)';
                                }}
                            >
                                <i className="bi bi-lightning-charge-fill me-2"></i>Unirse Ahora
                            </Button>
                        </Form>
                    </Col>
                </Row>

                {/* Bottom Bar */}
                <Row>
                    <Col>
                        <hr style={{ borderColor: 'rgba(255, 255, 255, 0.2)', margin: '2rem 0 1rem' }} />
                        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center text-white" style={{ opacity: 0.85 }}>
                            <small className="mb-2 mb-md-0">
                                <i className="bi bi-c-circle me-1"></i>
                                2025 Steamish Gaming Platform. Todos los derechos reservados.
                            </small>
                        </div>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;
