import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const About: React.FC = () => {
    return (
        <div className="bg-light min-vh-100">
            {/* Hero Section */}
            <section className="bg-primary text-white py-5">
                <Container>
                    <Row className="text-center">
                        <Col>
                            <h1 className="display-3 fw-bold mb-4 animate__animated animate__fadeInDown">
                                <i className="bi bi-people-fill text-info me-3"></i>
                                Sobre Nosotros
                                <span className="text-info d-block">Steamish Gaming</span>
                            </h1>
                            <p className="lead fs-4 animate__animated animate__fadeInUp animate__delay-1s">
                                Creamos experiencias gaming extraordinarias con pasión y tecnología de vanguardia.
                            </p>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Story Section */}
            <section className="py-5">
                <Container>
                    <Row className="align-items-center g-5">
                        <Col lg={6} className="animate__animated animate__fadeInLeft">
                            <h2 className="display-5 fw-bold text-primary mb-4">
                                <i className="bi bi-book me-2"></i>
                                Nuestra Historia
                            </h2>
                            <p className="lead text-muted mb-4">
                                Steamish nació de la pasión por los videojuegos y la visión de crear 
                                una plataforma que conecte a gamers de todo el mundo con experiencias únicas.
                            </p>
                            <p className="text-muted">
                                Desde nuestros humildes comienzos hasta convertirnos en una plataforma 
                                reconocida mundialmente, hemos mantenido nuestro compromiso con la calidad, 
                                la innovación y la comunidad gaming.
                            </p>
                        </Col>
                        
                        <Col lg={6} className="text-center animate__animated animate__fadeInRight">
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

            {/* Values Section */}
            <section className="py-5 bg-white">
                <Container>
                    <Row className="text-center mb-5">
                        <Col>
                            <h2 className="display-5 fw-bold text-primary animate__animated animate__fadeInUp">
                                <i className="bi bi-star me-2"></i>
                                Nuestros Valores
                            </h2>
                        </Col>
                    </Row>
                    
                    <Row className="g-4">
                        <Col md={4} className="animate__animated animate__fadeInUp">
                            <Card className="h-100 border-0 shadow-sm text-center">
                                <Card.Body className="p-4">
                                    <div className="text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" 
                                         style={{ width: '80px', height: '80px', backgroundColor: '#0d6efd' }}>
                                        <i className="bi bi-shield-check display-6"></i>
                                    </div>
                                    <Card.Title className="h4" style={{ color: '#0d6efd' }}>Calidad</Card.Title>
                                    <Card.Text className="text-muted">
                                        Productos y servicios de la más alta calidad para nuestros usuarios
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        
                        <Col md={4} className="animate__animated animate__fadeInUp animate__delay-1s">
                            <Card className="h-100 border-0 shadow-sm text-center">
                                <Card.Body className="p-4">
                                    <div className="text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" 
                                         style={{ width: '80px', height: '80px', backgroundColor: '#6610f2' }}>
                                        <i className="bi bi-people display-6"></i>
                                    </div>
                                    <Card.Title className="h4" style={{ color: '#6610f2' }}>Comunidad</Card.Title>
                                    <Card.Text className="text-muted">
                                        Fomentamos una comunidad gaming inclusiva y colaborativa
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        
                        <Col md={4} className="animate__animated animate__fadeInUp animate__delay-2s">
                            <Card className="h-100 border-0 shadow-sm text-center">
                                <Card.Body className="p-4">
                                    <div className="text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" 
                                         style={{ width: '80px', height: '80px', backgroundColor: '#0dcaf0' }}>
                                        <i className="bi bi-rocket display-6"></i>
                                    </div>
                                    <Card.Title className="h4" style={{ color: '#0dcaf0' }}>Innovación</Card.Title>
                                    <Card.Text className="text-muted">
                                        Tecnología de vanguardia para experiencias gaming únicas
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>
        </div>
    );
};

export default About;