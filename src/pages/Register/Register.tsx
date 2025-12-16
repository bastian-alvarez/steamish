import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';
import { RegisterData } from '../../types/User';
import { FormField } from '../../types/Component';
import { COLORS } from '../../config/constants';

// Register con interfaces y useContext mejorado
interface RegisterForm extends RegisterData {
    confirmPassword: string;
}

const Register: React.FC = () => {
    const { register, error: authError, clearError } = useAuth();
    const navigate = useNavigate();
    const [form, setForm] = useState<RegisterForm>({ 
        username: '', 
        email: '', 
        password: '', 
        confirmPassword: '',
        phone: ''
    });
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent): Promise<void> => {
        e.preventDefault();
        clearError();
        setError('');

        if (form.password !== form.confirmPassword) {
            setError('Las contraseñas no coinciden');
            return;
        }
        if (form.password.length < 6) {
            setError('La contraseña debe tener al menos 6 caracteres');
            return;
        }

        try {
            setLoading(true);
            const { confirmPassword, ...registerData } = form;
            await register(registerData.username, registerData.email, registerData.password, registerData.phone);
            navigate('/');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error al registrar usuario');
        } finally {
            setLoading(false);
        }
    };

    const formFields: FormField[] = [
        { field: 'username', icon: 'person', label: 'Usuario', type: 'text', placeholder: 'GamerPro123' },
        { field: 'email', icon: 'envelope', label: 'Email', type: 'email', placeholder: 'tu@email.com' },
        { field: 'phone', icon: 'telephone', label: 'Teléfono', type: 'tel', placeholder: '1234567890' },
        { field: 'password', icon: 'lock', label: 'Contraseña', type: 'password', placeholder: '••••••••' },
        { field: 'confirmPassword', icon: 'shield-check', label: 'Confirmar', type: 'password', placeholder: '••••••••' }
    ];

    return (
        <div className="min-vh-100 d-flex align-items-center" style={{ background: COLORS.gradientLight }}>
            <Container>
                <Row className="justify-content-center">
                    <Col lg={6} md={8}>
                        <Card className="border-0 shadow-lg">
                            <Card.Body className="p-5">
                                <div className="text-center mb-4">
                                    <div className="rounded-circle d-inline-flex align-items-center justify-content-center mb-3 text-white"
                                         style={{ background: COLORS.gradientAccent, width: '80px', height: '80px' }}>
                                        <i className="bi bi-person-plus display-4"></i>
                                    </div>
                                    <h1 className="h3 text-primary fw-bold">Únete a Steamish</h1>
                                    <p className="text-muted">Crea tu cuenta gaming y comienza la aventura</p>
                                </div>

                                {(error || authError) && (
                                    <Alert variant="danger" className="d-flex align-items-center">
                                        <i className="bi bi-exclamation-circle me-2"></i>
                                        {error || authError}
                                    </Alert>
                                )}

                                <Form onSubmit={handleSubmit}>
                                    <Row>
                                        {formFields.map(({ field, icon, label, type, placeholder }) => (
                                            <Col key={field} md={field === 'phone' ? 12 : 6} className="mb-3">
                                                <Form.Label className="fw-bold text-primary">
                                                    <i className={`bi bi-${icon} me-2`}></i>{label}
                                                </Form.Label>
                                                <Form.Control
                                                    type={type}
                                                    placeholder={placeholder}
                                                    value={form[field as keyof typeof form]}
                                                    onChange={(e) => setForm(prev => ({ ...prev, [field]: e.target.value }))}
                                                    className="border-2"
                                                    style={{ borderColor: '#7C7CFF' }}
                                                    required
                                                />
                                            </Col>
                                        ))}
                                    </Row>

                                    <Button 
                                        type="submit" 
                                        variant="primary" 
                                        size="lg" 
                                        className="w-100 fw-bold mb-3"
                                        style={{ background: COLORS.gradientAccent, border: 'none' }}
                                        disabled={loading}
                                    >
                                        <i className="bi bi-star me-2"></i>
                                        {loading ? 'Creando cuenta...' : 'Crear Mi Cuenta'}
                                    </Button>

                                    <div className="text-center">
                                        <p className="text-muted mb-1">¿Ya tienes cuenta?</p>
                                        <Link to="/login" className="text-info fw-bold text-decoration-none">
                                            <i className="bi bi-box-arrow-in-right me-1"></i>Iniciar sesión aquí
                                        </Link>
                                    </div>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>

            {/* Sparkle animations */}
            <div className="position-fixed" style={{ top: '20%', left: '20%', zIndex: -1 }}>
                <div className="bg-primary rounded-circle opacity-25" style={{ width: '60px', height: '60px', animation: 'sparkle 3s ease-in-out infinite' }}></div>
            </div>
            <div className="position-fixed" style={{ bottom: '20%', right: '20%', zIndex: -1 }}>
                <div className="bg-info rounded-circle opacity-25" style={{ width: '40px', height: '40px', animation: 'sparkle 2s ease-in-out infinite reverse' }}></div>
            </div>

            <style>{`
                @keyframes sparkle {
                    0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.25; }
                    50% { transform: scale(1.2) rotate(180deg); opacity: 0.5; }
                }
            `}</style>
        </div>
    );
};

export default Register;
