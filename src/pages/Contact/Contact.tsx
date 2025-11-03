import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';

// 📞 Contact Simplificado - Código Mínimo
const Contact: React.FC = () => {
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [success, setSuccess] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('✅ Mensaje enviado:', form);
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
        setForm({ name: '', email: '', message: '' });
    };

    const contactData = [
        { icon: 'envelope', title: 'Email', desc: 'hello@steamish.com', bg: 'primary' },
        { icon: 'discord', title: 'Discord', desc: 'Steamish Gaming Community', bg: 'info' },
        { icon: 'lightning', title: 'Respuesta', desc: 'En menos de 24 horas', bg: 'warning' }
    ];

    return (
        <div className="min-vh-100" style={{ background: 'var(--gradient-primary)' }}>
            {/* Hero Section */}
            <div className="bg-primary text-white py-5" style={{ background: 'var(--gradient-primary)' }}>
                <Container>
                    <Row className="justify-content-center text-center">
                        <Col lg={8}>
                            <h1 className="display-4 fw-bold mb-3">
                                <i className="bi bi-telephone me-3"></i>Contáctanos
                            </h1>
                            <p className="lead">¿Tienes preguntas? ¡Nos encantaría ayudarte!</p>
                        </Col>
                    </Row>
                </Container>
            </div>

            <Container className="py-5">
                <Row className="justify-content-center">
                    <Col lg={10}>
                        <Row className="g-5">
                            {/* Info de contacto */}
                            <Col lg={6}>
                                <Card className="border-0 shadow-lg h-100">
                                    <Card.Body className="p-4">
                                        <h2 className="mb-4" style={{ color: 'var(--color-4)' }}>
                                            <i className="bi bi-chat-dots me-2"></i>Hablemos
                                        </h2>
                                        <p className="text-muted mb-4">
                                            Nuestro equipo gaming está aquí para resolver todas tus dudas.
                                        </p>
                                        
                                        <div className="d-flex flex-column gap-4">
                                            {contactData.map(item => (
                                                <div key={item.title} className="d-flex align-items-center">
                                                    <div className={`bg-${item.bg} text-white rounded-circle d-flex align-items-center justify-content-center me-3`} 
                                                         style={{ width: '50px', height: '50px' }}>
                                                        <i className={`bi bi-${item.icon}`}></i>
                                                    </div>
                                                    <div>
                                                        <h5 className="mb-1">{item.title}</h5>
                                                        <p className="text-muted mb-0">{item.desc}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>

                            {/* Formulario simplificado */}
                            <Col lg={6}>
                                <Card className="border-0 shadow-lg h-100">
                                    <Card.Body className="p-4">
                                        <h2 className="mb-4" style={{ color: 'var(--color-4)' }}>
                                            <i className="bi bi-envelope-plus me-2"></i>Envíanos un mensaje
                                        </h2>
                                        
                                        {success && (
                                            <Alert variant="success" className="d-flex align-items-center">
                                                <i className="bi bi-check-circle me-2"></i>
                                                ¡Mensaje enviado con éxito!
                                            </Alert>
                                        )}

                                        <Form onSubmit={handleSubmit}>
                                            {[
                                                { field: 'name', icon: 'person', label: 'Nombre', type: 'text', placeholder: 'Tu nombre' },
                                                { field: 'email', icon: 'envelope', label: 'Email', type: 'email', placeholder: 'tu@email.com' }
                                            ].map(({ field, icon, label, type, placeholder }) => (
                                                <div key={field} className="mb-3">
                                                    <Form.Label className="fw-bold" style={{ color: 'var(--color-4)' }}>
                                                        <i className={`bi bi-${icon} me-1`}></i>{label}
                                                    </Form.Label>
                                                    <Form.Control
                                                        type={type}
                                                        placeholder={placeholder}
                                                        value={form[field as keyof typeof form]}
                                                        onChange={(e) => setForm(prev => ({ ...prev, [field]: e.target.value }))}
                                                        className="border-2"
                                                        style={{ borderColor: '#0d6efd' }}
                                                        required
                                                    />
                                                </div>
                                            ))}
                                            
                                            <div className="mb-3">
                                                <Form.Label className="fw-bold text-primary">
                                                    <i className="bi bi-chat-text me-1"></i>Mensaje
                                                </Form.Label>
                                                <Form.Control
                                                    as="textarea"
                                                    rows={5}
                                                    placeholder="Tu mensaje..."
                                                    value={form.message}
                                                    onChange={(e) => setForm(prev => ({ ...prev, message: e.target.value }))}
                                                    className="border-2"
                                                    style={{ borderColor: '#0d6efd' }}
                                                    required
                                                />
                                            </div>

                                            <Button 
                                                type="submit" 
                                                variant="primary" 
                                                size="lg" 
                                                className="w-100 fw-bold"
                                                style={{ background: 'linear-gradient(135deg, #0d6efd, #6610f2)', border: 'none' }}
                                            >
                                                <i className="bi bi-send me-2"></i>Enviar Mensaje
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