import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';

// 🔐 Login Simplificado - Bootstrap Puro
const Login: React.FC = () => {
    const [form, setForm] = useState({ email: '', password: '' });
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.email || !form.password) {
            setError('Por favor, completa todos los campos.');
            return;
        }
        setError('');
        console.log('Iniciando sesión:', form);
    };

    return (
        <div className="min-vh-100 d-flex align-items-center" style={{ background: 'linear-gradient(135deg, #0d6efd 0%, #6610f2 100%)' }}>
            <Container>
                <Row className="justify-content-center">
                    <Col lg={5} md={7}>
                        <Card className="border-0 shadow-lg">
                            <Card.Body className="p-5">
                                <div className="text-center mb-4">
                                    <div className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" 
                                         style={{ width: '80px', height: '80px' }}>
                                        <i className="bi bi-person-check display-4"></i>
                                    </div>
                                    <h1 className="h3 text-primary fw-bold">Bienvenido de Vuelta</h1>
                                    <p className="text-muted">Inicia sesión en tu cuenta gaming</p>
                                </div>

                                {error && (
                                    <Alert variant="danger" className="d-flex align-items-center">
                                        <i className="bi bi-exclamation-circle me-2"></i>{error}
                                    </Alert>
                                )}

                                <Form onSubmit={handleSubmit}>
                                    {[
                                        { field: 'email', icon: 'envelope', label: 'Email', type: 'email', placeholder: 'tu@email.com' },
                                        { field: 'password', icon: 'lock', label: 'Contraseña', type: 'password', placeholder: '••••••••' }
                                    ].map(({ field, icon, label, type, placeholder }) => (
                                        <div key={field} className="mb-3">
                                            <Form.Label className="fw-bold text-primary">
                                                <i className={`bi bi-${icon} me-2`}></i>{label}
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

                                    <Button 
                                        type="submit" 
                                        variant="primary" 
                                        size="lg" 
                                        className="w-100 fw-bold mb-3"
                                        style={{ background: 'linear-gradient(135deg, #0d6efd, #6610f2)', border: 'none' }}
                                    >
                                        <i className="bi bi-box-arrow-in-right me-2"></i>Iniciar Sesión
                                    </Button>

                                    <div className="text-center">
                                        <p className="text-muted mb-1">¿No tienes cuenta?</p>
                                        <Link to="/registro" className="text-primary fw-bold text-decoration-none">
                                            <i className="bi bi-person-plus me-1"></i>Crear cuenta nueva
                                        </Link>
                                    </div>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>

            {/* Floating elements */}
            <div className="position-fixed" style={{ top: '10%', left: '10%', zIndex: -1 }}>
                <div className="bg-info rounded-circle opacity-25" style={{ width: '100px', height: '100px', animation: 'float 6s ease-in-out infinite' }}></div>
            </div>
            <div className="position-fixed" style={{ bottom: '15%', right: '15%', zIndex: -1 }}>
                <div className="bg-warning rounded-circle opacity-25" style={{ width: '80px', height: '80px', animation: 'float 4s ease-in-out infinite reverse' }}></div>
            </div>

            <style>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-20px); }
                }
            `}</style>
        </div>
    );
};

export default Login;