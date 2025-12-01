import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { Container, Row, Col, Card, Spinner } from 'react-bootstrap';
import { COLORS } from '../../../config/constants';

// Interfaces para ProtectedRoute
interface ProtectedRouteProps {
    children: React.ReactElement;
    requireAdmin?: boolean;
    requireModerator?: boolean;
}

// Componente para proteger rutas que requieren autenticación y/o permisos de admin
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requireAdmin = false, requireModerator = false }) => {
    const { isAuthenticated, isAdmin, loading } = useAuth();
    // isModerator se calcula desde el contexto si es necesario
    const isModerator = false; // Por ahora no se usa, pero se puede agregar al AuthContext si es necesario

    // Mostrar spinner mientras se carga la autenticación
    if (loading) {
        return (
            <div className="min-vh-100 d-flex align-items-center justify-content-center" style={{ background: COLORS.gradientPrimary }}>
                <Container>
                    <Row className="justify-content-center">
                        <Col md={6}>
                            <Card className="border-0 shadow-lg text-center">
                                <Card.Body className="p-5">
                                    <Spinner animation="border" variant="primary" className="mb-3" />
                                    <p className="mb-0">Verificando credenciales...</p>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }

    // Si requiere autenticación y no está autenticado, redirigir al login
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // Si requiere admin y no es admin, redirigir automáticamente al home
    if (requireAdmin && !isAdmin) {
        return <Navigate to="/" replace />;
    }

    // Si requiere moderador y no es moderador ni admin, mostrar error de acceso denegado
    if (requireModerator && !isModerator && !isAdmin) {
        return (
            <div className="min-vh-100 d-flex align-items-center justify-content-center" style={{ background: COLORS.gradientPrimary }}>
                <Container>
                    <Row className="justify-content-center">
                        <Col md={6}>
                            <Card className="border-0 shadow-lg">
                                <Card.Body className="p-5 text-center">
                                    <div className="mb-4">
                                        <i className="bi bi-shield-exclamation display-1 text-danger"></i>
                                    </div>
                                    <Card.Title className="h3 mb-3" style={{ color: COLORS.color4 }}>
                                        Acceso Denegado
                                    </Card.Title>
                                    <Alert variant="danger" className="mb-4">
                                        <Alert.Heading>No tienes permisos de moderador</Alert.Heading>
                                        <p className="mb-0">
                                            Solo los moderadores pueden acceder a esta sección.
                                            Por favor, inicia sesión con una cuenta de moderador.
                                        </p>
                                    </Alert>
                                    <div className="d-flex gap-2 justify-content-center flex-wrap">
                                        <Link 
                                            to="/" 
                                            className="btn text-decoration-none"
                                            style={{ 
                                                background: COLORS.gradientPrimary, 
                                                border: 'none',
                                                color: 'white'
                                            }}
                                        >
                                            <i className="bi bi-house me-2"></i>Ir al Inicio
                                        </Link>
                                        <Link 
                                            to="/login" 
                                            className="btn text-decoration-none"
                                            style={{ 
                                                borderColor: COLORS.color4,
                                                color: COLORS.color4,
                                                backgroundColor: 'transparent',
                                                borderWidth: '1px',
                                                borderStyle: 'solid'
                                            }}
                                        >
                                            <i className="bi bi-box-arrow-in-right me-2"></i>Iniciar Sesión
                                        </Link>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }

    // Si pasa todas las validaciones, mostrar el componente protegido
    return children;
};

export default ProtectedRoute;

