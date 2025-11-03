import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

// ⚡ Admin Panel Simplificado
const Admin: React.FC = () => {
    const adminStats = [
        { icon: 'controller', title: 'Juegos', count: '1,247', color: 'primary' },
        { icon: 'people', title: 'Usuarios', count: '15,684', color: 'info' },
        { icon: 'cart', title: 'Ventas', count: '8,592', color: 'success' },
        { icon: 'star', title: 'Reviews', count: '4,731', color: 'warning' }
    ];

    const quickActions = [
        { icon: 'plus-circle', title: 'Nuevo Juego', desc: 'Agregar producto', color: 'primary' },
        { icon: 'gear', title: 'Configuración', desc: 'Ajustes del sitio', color: 'info' },
        { icon: 'bar-chart', title: 'Reportes', desc: 'Ver estadísticas', color: 'success' }
    ];

    return (
        <div className="min-vh-100 bg-light">
            {/* Header */}
            <div className="bg-primary text-white py-4" style={{ background: 'var(--gradient-primary)' }}>
                <Container>
                    <Row>
                        <Col>
                            <h1 className="display-5 fw-bold mb-2">
                                <i className="bi bi-shield-check me-3"></i>Panel Admin
                            </h1>
                            <p className="lead mb-0">Gestiona tu plataforma gaming</p>
                        </Col>
                    </Row>
                </Container>
            </div>

            <Container className="py-5">
                {/* Stats Cards */}
                <Row className="g-4 mb-5">
                    {adminStats.map(stat => (
                        <Col key={stat.title} lg={3} md={6}>
                            <Card className="border-0 shadow-sm h-100">
                                <Card.Body className="text-center p-4">
                                    <div className={`bg-${stat.color} text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3`} 
                                         style={{ width: '60px', height: '60px' }}>
                                        <i className={`bi bi-${stat.icon} fs-4`}></i>
                                    </div>
                                    <h3 className={`text-${stat.color} fw-bold`}>{stat.count}</h3>
                                    <p className="text-muted mb-0">{stat.title}</p>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>

                {/* Quick Actions */}
                <Row>
                    <Col>
                        <h2 className="mb-4" style={{ color: 'var(--color-4)' }}>
                            <i className="bi bi-lightning me-2"></i>Acciones Rápidas
                        </h2>
                        <Row className="g-4">
                            {quickActions.map(action => (
                                <Col key={action.title} lg={4} md={6}>
                                    <Card className="border-0 shadow-sm h-100 hover-effect">
                                        <Card.Body className="p-4">
                                            <div className="d-flex align-items-center mb-3">
                                                <div className={`bg-${action.color} text-white rounded-3 d-flex align-items-center justify-content-center me-3`} 
                                                     style={{ width: '50px', height: '50px' }}>
                                                    <i className={`bi bi-${action.icon}`}></i>
                                                </div>
                                                <div>
                                                    <Card.Title className={`h5 text-${action.color} mb-1`}>{action.title}</Card.Title>
                                                    <small className="text-muted">{action.desc}</small>
                                                </div>
                                            </div>
                                            <Button variant={action.color} size="sm" className="w-100">
                                                Acceder <i className="bi bi-arrow-right ms-1"></i>
                                            </Button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </Col>
                </Row>
            </Container>

            <style>{`.hover-effect:hover { transform: translateY(-3px); transition: all 0.3s ease; }`}</style>
        </div>
    );
};

export default Admin;