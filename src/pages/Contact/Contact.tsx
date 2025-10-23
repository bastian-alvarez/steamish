import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';

// 📞 Contact con Colores Azules Bootstrap
const Contact: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('✅ Mensaje enviado:', { name, email, message });
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
        setName('');
        setEmail('');
        setMessage('');
    };

    return (
        <div className="min-vh-100" style={{ background: 'linear-gradient(135deg, #0d6efd 0%, #6610f2 100%)' }}>
            {/* Hero Section */}
            <div className="bg-primary text-white py-5">
                <Container>
                    <Row className="justify-content-center text-center">
                        <Col lg={8}>
                            <h1 className="display-4 fw-bold mb-3">
                                <i className="bi bi-telephone me-3"></i>
                                Contáctanos
                            </h1>
                            <p className="lead">
                                ¿Tienes preguntas? ¡Nos encantaría ayudarte!
                            </p>
                        </Col>
                    </Row>
                </Container>
            </div>

            <Container className="py-5">
                <Row className="justify-content-center">
                    <Col lg={10}>
                        <Row className="g-5">
                            {/* Información de contacto */}
                            <Col lg={6}>
                                <Card className="border-0 shadow-lg h-100">
                                    <Card.Body className="p-4">
                                        <h2 className="text-primary mb-4">
                                            <i className="bi bi-chat-dots me-2"></i>
                                            Hablemos
                                        </h2>
                                        <p className="text-muted mb-4">
                                            Nuestro equipo gaming está aquí para resolver todas tus dudas y 
                                            ayudarte a tener la mejor experiencia en Steamish.
                                        </p>
                                        
                                        <div className="d-flex flex-column gap-4">
                                            <div className="d-flex align-items-center">
                                                <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3" 
                                                     style={{ width: '50px', height: '50px' }}>
                                                    <i className="bi bi-envelope"></i>
                                                </div>
                                                <div>
                                                    <h5 className="mb-1">Email</h5>
                                                    <p className="text-muted mb-0">hello@steamish.com</p>
                                                </div>
                                            </div>
                                            
                                            <div className="d-flex align-items-center">
                                                <div className="bg-info text-white rounded-circle d-flex align-items-center justify-content-center me-3" 
                                                     style={{ width: '50px', height: '50px' }}>
                                                    <i className="bi bi-discord"></i>
                                                </div>
                                                <div>
                                                    <h5 className="mb-1">Discord</h5>
                                                    <p className="text-muted mb-0">Steamish Gaming Community</p>
                                                </div>
                                            </div>
                                            
                                            <div className="d-flex align-items-center">
                                                <div className="bg-warning text-white rounded-circle d-flex align-items-center justify-content-center me-3" 
                                                     style={{ width: '50px', height: '50px' }}>
                                                    <i className="bi bi-lightning"></i>
                                                </div>
                                                <div>
                                                    <h5 className="mb-1">Respuesta</h5>
                                                    <p className="text-muted mb-0">En menos de 24 horas</p>
                                                </div>
                                            </div>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>

                            {/* Formulario de contacto */}
                            <Col lg={6}>
                                <Card className="border-0 shadow-lg h-100">
                                    <Card.Body className="p-4">
                                        <h2 className="text-primary mb-4">
                                            <i className="bi bi-envelope-plus me-2"></i>
                                            Envíanos un mensaje
                                        </h2>
                                        
                                        {success && (
                                            <Alert variant="success" className="d-flex align-items-center">
                                                <i className="bi bi-check-circle me-2"></i>
                                                ¡Mensaje enviado con éxito! Te responderemos pronto.
                                            </Alert>
                                        )}

                                        <Form onSubmit={handleSubmit}>
                                            <Row>
                                                <Col md={12} className="mb-3">
                                                    <Form.Label className="fw-bold text-primary">
                                                        <i className="bi bi-person me-1"></i>
                                                        Nombre Completo
                                                    </Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="Tu nombre completo"
                                                        value={name}
                                                        onChange={(e) => setName(e.target.value)}
                                                        className="border-2"
                                                        style={{ borderColor: '#0d6efd' }}
                                                        required
                                                    />
                                                </Col>
                                            </Row>

                                            <Row>
                                                <Col md={12} className="mb-3">
                                                    <Form.Label className="fw-bold text-primary">
                                                        <i className="bi bi-envelope me-1"></i>
                                                        Correo Electrónico
                                                    </Form.Label>
                                                    <Form.Control
                                                        type="email"
                                                        placeholder="tu@email.com"
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                        className="border-2"
                                                        style={{ borderColor: '#0d6efd' }}
                                                        required
                                                    />
                                                </Col>
                                            </Row>

                                            <Row>
                                                <Col md={12} className="mb-4">
                                                    <Form.Label className="fw-bold text-primary">
                                                        <i className="bi bi-chat-text me-1"></i>
                                                        Tu Mensaje
                                                    </Form.Label>
                                                    <Form.Control
                                                        as="textarea"
                                                        rows={5}
                                                        placeholder="Cuéntanos cómo podemos ayudarte..."
                                                        value={message}
                                                        onChange={(e) => setMessage(e.target.value)}
                                                        className="border-2"
                                                        style={{ borderColor: '#0d6efd' }}
                                                        required
                                                    />
                                                </Col>
                                            </Row>

                                            <Button 
                                                type="submit" 
                                                variant="primary" 
                                                size="lg" 
                                                className="w-100 fw-bold"
                                                style={{ 
                                                    background: 'linear-gradient(135deg, #0d6efd, #6610f2)',
                                                    border: 'none'
                                                }}
                                            >
                                                <i className="bi bi-send me-2"></i>
                                                Enviar Mensaje
                                            </Button>
                                        </Form>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Contact;