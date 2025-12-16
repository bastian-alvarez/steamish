import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import { COLORS } from '../../config/constants';

// Contact - Diseño Moderno Mejorado
const Contact: React.FC = () => {
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [success, setSuccess] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Mensaje enviado:', form);
        setSuccess(true);
        setTimeout(() => setSuccess(false), 5000);
        setForm({ name: '', email: '', message: '' });
    };

    const contactData = [
        { 
            icon: 'envelope-check', 
            title: 'Email', 
            desc: 'hello@steamish.com',
            color: '#7C7CFF'
        },
        { 
            icon: 'discord', 
            title: 'Discord', 
            desc: 'Steamish Gaming Community',
            color: '#3FA9F5'
        },
        { 
            icon: 'lightning-charge', 
            title: 'Respuesta', 
            desc: 'En menos de 24 horas',
            color: '#FFB703'
        }
    ];

    return (
        <div className="min-vh-100" style={{ background: COLORS.gradientPrimary, paddingBottom: '3rem' }}>
            <Container className="py-5">
                <Row className="justify-content-center">
                    <Col lg={11}>
                        <Row className="g-4">
                            {/* Panel Izquierdo - Información de Contacto */}
                            <Col lg={5}>
                                <Card className="border-0 shadow-lg h-100" style={{ borderRadius: '20px', overflow: 'hidden', background: COLORS.color3 }}>
                                    <Card.Body className="p-5">
                                        <div className="mb-4">
                                            <div className="d-flex align-items-center mb-3">
                                                <div 
                                                    className="rounded-circle d-flex align-items-center justify-content-center me-3"
                                                    style={{ 
                                                        width: '60px', 
                                                        height: '60px',
                                                        background: COLORS.gradientPrimary
                                                    }}
                                                >
                                                    <i className="bi bi-chat-dots-fill text-white" style={{ fontSize: '1.5rem' }}></i>
                                                </div>
                                                <h2 className="mb-0 fw-bold" style={{ color: COLORS.textPrimary, fontSize: '2rem' }}>
                                                    Hablemos
                                                </h2>
                                            </div>
                                            <p className="mb-0" style={{ fontSize: '1.1rem', lineHeight: '1.6', color: COLORS.textSecondary }}>
                                                Nuestro equipo gaming está aquí para resolver todas tus dudas.
                                            </p>
                                        </div>
                                        
                                        <div className="d-flex flex-column gap-4 mt-5">
                                            {contactData.map((item, index) => (
                                                <div 
                                                    key={item.title} 
                                                    className="d-flex align-items-center p-3 rounded-3"
                                                    style={{ 
                                                        transition: 'all 0.3s ease',
                                                        backgroundColor: 'rgba(35, 42, 77, 0.35)'
                                                    }}
                                                    onMouseEnter={(e) => {
                                                        e.currentTarget.style.backgroundColor = 'rgba(35, 42, 77, 0.55)';
                                                        e.currentTarget.style.transform = 'translateX(5px)';
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        e.currentTarget.style.backgroundColor = 'rgba(35, 42, 77, 0.35)';
                                                        e.currentTarget.style.transform = 'translateX(0)';
                                                    }}
                                                >
                                                    <div 
                                                        className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0 me-4"
                                                        style={{ 
                                                            width: '60px', 
                                                            height: '60px',
                                                            backgroundColor: item.color,
                                                            boxShadow: `0 4px 15px rgba(${item.color === '#7C7CFF' ? '124, 124, 255' : item.color === '#3FA9F5' ? '63, 169, 245' : '255, 183, 3'}, 0.35)`
                                                        }}
                                                    >
                                                        <i className={`bi bi-${item.icon} text-white`} style={{ fontSize: '1.5rem' }}></i>
                                                    </div>
                                                    <div className="flex-grow-1">
                                                        <h5 className="mb-1 fw-bold" style={{ color: COLORS.textPrimary, fontSize: '1.1rem' }}>
                                                            {item.title}
                                                        </h5>
                                                        <p className="mb-0" style={{ fontSize: '0.95rem', color: COLORS.textSecondary }}>
                                                            {item.desc}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>

                            {/* Panel Derecho - Formulario */}
                            <Col lg={7}>
                                <Card className="border-0 shadow-lg h-100" style={{ borderRadius: '20px', overflow: 'hidden', background: COLORS.color3 }}>
                                    <Card.Body className="p-5">
                                        <div className="d-flex align-items-center mb-4">
                                            <div 
                                                className="rounded-circle d-flex align-items-center justify-content-center me-3"
                                                style={{ 
                                                    width: '60px', 
                                                    height: '60px',
                                                    background: COLORS.gradientPrimary
                                                }}
                                            >
                                                <i className="bi bi-envelope-plus-fill text-white" style={{ fontSize: '1.5rem' }}></i>
                                            </div>
                                            <h2 className="mb-0 fw-bold" style={{ color: COLORS.textPrimary, fontSize: '2rem' }}>
                                                Envíanos un mensaje
                                            </h2>
                                        </div>
                                        
                                        {success && (
                                            <Alert 
                                                variant="success" 
                                                className="d-flex align-items-center mb-4 rounded-3"
                                                style={{ 
                                                    border: 'none',
                                                    backgroundColor: 'rgba(46, 230, 166, 0.15)',
                                                    color: '#2EE6A6'
                                                }}
                                            >
                                                <i className="bi bi-check-circle-fill me-2" style={{ fontSize: '1.2rem' }}></i>
                                                <span className="fw-semibold">¡Mensaje enviado con éxito! Te responderemos pronto.</span>
                                            </Alert>
                                        )}

                                        <Form onSubmit={handleSubmit}>
                                            {[
                                                { field: 'name', icon: 'person-fill', label: 'Nombre', type: 'text', placeholder: 'Tu nombre' },
                                                { field: 'email', icon: 'envelope-fill', label: 'Email', type: 'email', placeholder: 'tu@email.com' }
                                            ].map(({ field, icon, label, type, placeholder }) => (
                                                <div key={field} className="mb-4">
                                                    <Form.Label className="fw-bold mb-2 d-flex align-items-center" style={{ color: COLORS.textPrimary, fontSize: '1rem' }}>
                                                        <i className={`bi bi-${icon} me-2`} style={{ color: COLORS.primary }}></i>
                                                        {label}
                                                    </Form.Label>
                                                    <Form.Control
                                                        type={type}
                                                        name={field}
                                                        placeholder={placeholder}
                                                        value={form[field as keyof typeof form]}
                                                        onChange={(e) => setForm(prev => ({ ...prev, [field]: e.target.value }))}
                                                        className="border-2 rounded-3"
                                                        style={{ 
                                                            borderColor: COLORS.color4,
                                                            padding: '0.75rem 1rem',
                                                            fontSize: '1rem',
                                                            transition: 'all 0.3s ease'
                                                        }}
                                                        onFocus={(e) => {
                                                            e.currentTarget.style.borderColor = COLORS.primary;
                                                            e.currentTarget.style.boxShadow = '0 0 0 0.2rem rgba(124, 124, 255, 0.2)';
                                                        }}
                                                        onBlur={(e) => {
                                                            e.currentTarget.style.borderColor = COLORS.color4;
                                                            e.currentTarget.style.boxShadow = 'none';
                                                        }}
                                                        required
                                                    />
                                                </div>
                                            ))}
                                            
                                            <div className="mb-4">
                                                <Form.Label className="fw-bold mb-2 d-flex align-items-center" style={{ color: COLORS.textPrimary, fontSize: '1rem' }}>
                                                    <i className="bi bi-chat-left-text-fill me-2" style={{ color: COLORS.primary }}></i>
                                                    Mensaje
                                                </Form.Label>
                                                <Form.Control
                                                    as="textarea"
                                                    name="message"
                                                    rows={6}
                                                    placeholder="Tu mensaje..."
                                                    value={form.message}
                                                    onChange={(e) => setForm(prev => ({ ...prev, message: e.target.value }))}
                                                    className="border-2 rounded-3"
                                                    style={{ 
                                                        borderColor: COLORS.color4,
                                                        padding: '0.75rem 1rem',
                                                        fontSize: '1rem',
                                                        resize: 'vertical',
                                                        transition: 'all 0.3s ease'
                                                    }}
                                                    onFocus={(e) => {
                                                        e.currentTarget.style.borderColor = COLORS.primary;
                                                        e.currentTarget.style.boxShadow = '0 0 0 0.2rem rgba(124, 124, 255, 0.2)';
                                                    }}
                                                    onBlur={(e) => {
                                                        e.currentTarget.style.borderColor = COLORS.color4;
                                                        e.currentTarget.style.boxShadow = 'none';
                                                    }}
                                                    required
                                                />
                                            </div>

                                            <Button 
                                                type="submit" 
                                                size="lg" 
                                                className="w-100 fw-bold rounded-3 py-3"
                                                style={{ 
                                                    background: COLORS.gradientPrimary, 
                                                    border: 'none',
                                                    color: 'white',
                                                    fontSize: '1.1rem',
                                                        boxShadow: '0 4px 15px rgba(124, 124, 255, 0.35)',
                                                    transition: 'all 0.3s ease'
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.transform = 'translateY(-2px)';
                                                        e.currentTarget.style.boxShadow = '0 6px 20px rgba(154, 154, 255, 0.45)';
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.transform = 'translateY(0)';
                                                        e.currentTarget.style.boxShadow = '0 4px 15px rgba(124, 124, 255, 0.35)';
                                                }}
                                            >
                                                <i className="bi bi-send-fill me-2"></i>Enviar Mensaje
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
