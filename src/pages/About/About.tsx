import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

// 🎯 About Simplificado - Factory Pattern
const About: React.FC = () => {
    const createValue = (icon: string, title: string, desc: string, color: string) => ({
        icon, title, desc, color
    });

    const values = [
        createValue('shield-check', 'Calidad', 'Productos y servicios de la más alta calidad', '#0d6efd'),
        createValue('people', 'Comunidad', 'Comunidad gaming inclusiva y colaborativa', '#6610f2'),
        createValue('rocket', 'Innovación', 'Tecnología de vanguardia para experiencias únicas', '#0dcaf0')
    ];

    return (
        <div className="bg-light min-vh-100">
            {/* Hero */}
            <section className="bg-primary text-white py-5">
                <Container>
                    <Row className="text-center">
                        <Col>
                            <h1 className="display-3 fw-bold mb-4">
                                <i className="bi bi-people-fill text-info me-3"></i>
                                Sobre Nosotros
                                <span className="text-info d-block">Steamish Gaming</span>
                            </h1>
                            <p className="lead fs-4">
                                Creamos experiencias gaming extraordinarias con pasión y tecnología.
                            </p>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Story */}
            <section className="py-5">
                <Container>
                    <Row className="align-items-center g-5">
                        <Col lg={6}>
                            <h2 className="display-5 fw-bold text-primary mb-4">
                                <i className="bi bi-book me-2"></i>Nuestra Historia
                            </h2>
                            <p className="lead text-muted mb-4">
                                Steamish nació de la pasión por los videojuegos y la visión de crear 
                                una plataforma que conecte a gamers de todo el mundo.
                            </p>
                            <p className="text-muted">
                                Desde nuestros humildes comienzos hasta convertirnos en una plataforma 
                                reconocida mundialmente, mantenemos nuestro compromiso con la calidad.
                            </p>
                        </Col>
                        
                        <Col lg={6} className="text-center">
                            <Card className="shadow-lg border-0">
                                <Card.Body className="p-5">
                                    <div className="bg-primary text-white rounded-3 p-4 mb-3">
                                        <i className="bi bi-lightbulb display-1"></i>
                                    </div>
                                    <Card.Title className="h3 text-primary">Innovación</Card.Title>
                                    <Card.Text className="text-muted">
                                        Tecnología de vanguardia para la mejor experiencia gaming
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Values */}
            <section className="py-5 bg-white">
                <Container>
                    <Row className="text-center mb-5">
                        <Col>
                            <h2 className="display-5 fw-bold text-primary">
                                <i className="bi bi-star me-2"></i>Nuestros Valores
                            </h2>
                        </Col>
                    </Row>
                    
                    <Row className="g-4">
                        {values.map(value => (
                            <Col key={value.title} md={4}>
                                <Card className="h-100 border-0 shadow-sm text-center hover-effect">
                                    <Card.Body className="p-4">
                                        <div className="text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" 
                                             style={{ width: '80px', height: '80px', backgroundColor: value.color }}>
                                            <i className={`bi bi-${value.icon} display-6`}></i>
                                        </div>
                                        <Card.Title className="h4" style={{ color: value.color }}>{value.title}</Card.Title>
                                        <Card.Text className="text-muted">{value.desc}</Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </section>

            <style>{`.hover-effect:hover { transform: translateY(-5px); transition: all 0.3s ease; }`}</style>
        </div>
    );
};

export default About;