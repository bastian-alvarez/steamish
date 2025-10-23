import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Badge } from 'react-bootstrap';
import styles from './Home.module.css';

const Home: React.FC = () => {
    return (
        <div className="bg-light min-vh-100">
            {/* Hero Section */}
            <section className="bg-primary text-white py-5">
                <Container>
                    <Row className="align-items-center min-vh-75">
                        <Col lg={6} className="text-center text-lg-start animate__animated animate__fadeInLeft">
                            <h1 className="display-3 fw-bold mb-4 animate__animated animate__fadeInUp">
                                <i className="bi bi-controller text-info me-3 animate__animated animate__bounce animate__infinite animate__slow"></i>
                                Descubre Juegos
                                <span className="text-info d-block animate__animated animate__fadeInRight animate__delay-1s">Increíbles</span>
                            </h1>
                            <p className="lead mb-4 fs-5 animate__animated animate__fadeInUp animate__delay-1s">
                                La plataforma gaming más hermosa del mundo. Encuentra, explora y juega 
                                los mejores videojuegos con una experiencia visual espectacular.
                            </p>
                            <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center justify-content-lg-start animate__animated animate__fadeInUp animate__delay-2s">
                                <Link 
                                    to="/productos" 
                                    className="btn btn-info btn-lg fw-bold px-4"
                                >
                                    <i className="bi bi-grid-3x3-gap me-2"></i>
                                    Explorar Juegos
                                </Link>
                                <Link 
                                    to="/nosotros" 
                                    className="btn btn-outline-light btn-lg fw-bold px-4"
                                >
                                    <i className="bi bi-people me-2"></i>
                                    Conocer Más
                                </Link>
                            </div>
                        </Col>
                        
                        <Col lg={6} className="text-center mt-5 mt-lg-0 animate__animated animate__fadeInRight">
                            <Card className="shadow-lg border-0 mx-auto animate__animated animate__zoomIn animate__delay-1s" style={{ maxWidth: '350px' }}>
                                <Card.Body className="p-4">
                                    <div className="bg-primary text-white rounded-3 p-4 mb-3">
                                        <i className="bi bi-joystick display-1"></i>
                                    </div>
                                    <Card.Title className="h4 text-primary">Juegos Premium</Card.Title>
                                    <div className="d-flex justify-content-center align-items-center">
                                        <Badge bg="info" className="me-2">
                                            <i className="bi bi-star-fill me-1"></i>
                                            5.0
                                        </Badge>
                                        <small className="text-muted">Rating</small>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Featured Games Section */}
            <section className="py-5" style={{ backgroundColor: '#f8f9fa' }}>
                <Container>
                    <Row className="text-center mb-5">
                        <Col>
                            <h2 className="display-5 fw-bold text-primary mb-3 animate__animated animate__fadeInDown">
                                <i className="bi bi-star-fill text-info me-2"></i>
                                Juegos Destacados
                            </h2>
                            <p className="lead text-muted">Los títulos más populares y mejor valorados de nuestra plataforma</p>
                        </Col>
                    </Row>
                    
                    <Row className="g-4">
                        <Col lg={4} md={6} className="animate__animated animate__fadeInUp">
                            <Card className={`h-100 shadow-lg border-0 ${styles.gameCard} position-relative overflow-hidden`}>
                                <div className="position-relative">
                                    <div className="bg-primary d-flex align-items-center justify-content-center" 
                                         style={{ height: '200px' }}>
                                        <i className="bi bi-controller display-1 text-white"></i>
                                    </div>
                                    <Badge bg="info" className="position-absolute top-0 end-0 m-2">
                                        <i className="bi bi-star-fill me-1"></i>
                                        4.9
                                    </Badge>
                                </div>
                                <Card.Body className="p-4">
                                    <Card.Title className="h5 text-primary fw-bold">Cyber Adventure 2077</Card.Title>
                                    <Card.Text className="text-muted mb-3">
                                        Un mundo futurista lleno de acción y aventuras épicas que te mantendrán jugando por horas.
                                    </Card.Text>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div>
                                            <Badge bg="primary" className="me-1">Acción</Badge>
                                            <Badge bg="info">RPG</Badge>
                                        </div>
                                        <span className="fw-bold text-primary fs-5">$59.99</span>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                        
                        <Col lg={4} md={6} className="animate__animated animate__fadeInUp animate__delay-1s">
                            <Card className={`h-100 shadow-lg border-0 ${styles.gameCard} position-relative overflow-hidden`}>
                                <div className="position-relative">
                                    <div className="d-flex align-items-center justify-content-center" 
                                         style={{ height: '200px', backgroundColor: '#0dcaf0' }}>
                                        <i className="bi bi-puzzle display-1 text-white"></i>
                                    </div>
                                    <Badge bg="info" className="position-absolute top-0 end-0 m-2">
                                        <i className="bi bi-star-fill me-1"></i>
                                        4.8
                                    </Badge>
                                </div>
                                <Card.Body className="p-4">
                                    <Card.Title className="h5 text-primary fw-bold">Mystic Realms</Card.Title>
                                    <Card.Text className="text-muted mb-3">
                                        Explora mundos mágicos en este increíble juego de aventuras con gráficos espectaculares.
                                    </Card.Text>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div>
                                            <Badge bg="primary" className="me-1">Aventura</Badge>
                                            <Badge bg="info">Magia</Badge>
                                        </div>
                                        <span className="fw-bold text-primary fs-5">$49.99</span>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                        
                        <Col lg={4} md={6} className="animate__animated animate__fadeInUp animate__delay-2s">
                            <Card className={`h-100 shadow-lg border-0 ${styles.gameCard} position-relative overflow-hidden`}>
                                <div className="position-relative">
                                    <div className="d-flex align-items-center justify-content-center" 
                                         style={{ height: '200px', backgroundColor: '#6610f2' }}>
                                        <i className="bi bi-rocket display-1 text-white"></i>
                                    </div>
                                    <Badge bg="info" className="position-absolute top-0 end-0 m-2">
                                        <i className="bi bi-star-fill me-1"></i>
                                        4.7
                                    </Badge>
                                </div>
                                <Card.Body className="p-4">
                                    <Card.Title className="h5 text-primary fw-bold">Space Odyssey</Card.Title>
                                    <Card.Text className="text-muted mb-3">
                                        Vive la experiencia definitiva del espacio en este simulador de naves espaciales.
                                    </Card.Text>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div>
                                            <Badge bg="primary" className="me-1">Simulación</Badge>
                                            <Badge bg="info">Espacio</Badge>
                                        </div>
                                        <span className="fw-bold text-primary fs-5">$39.99</span>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                    
                    <Row className="mt-5">
                        <Col className="text-center">
                            <Link 
                                to="/productos" 
                                className="btn btn-primary btn-lg fw-bold px-4 animate__animated animate__pulse animate__infinite animate__slow"
                            >
                                <i className="bi bi-collection me-2"></i>
                                Ver Todos los Juegos
                            </Link>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Features Section */}
            <section className="py-5">
                <Container>
                    <Row className="text-center mb-5">
                        <Col>
                            <h2 className="display-5 fw-bold text-primary mb-3">
                                <i className="bi bi-question-circle me-2"></i>
                                ¿Por qué Steamish?
                            </h2>
                        </Col>
                    </Row>
                    
                    <Row className="g-4">
                        <Col md={4} className="animate__animated animate__fadeInUp">
                            <Card className="h-100 shadow-sm border-0 text-center hover-effect">
                                <Card.Body className="p-4">
                                    <div className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" 
                                         style={{ width: '80px', height: '80px' }}>
                                        <i className="bi bi-palette display-6"></i>
                                    </div>
                                    <Card.Title className="h4 text-primary">Diseño Profesional</Card.Title>
                                    <Card.Text className="text-muted">
                                        Interfaz moderna y elegante que hace que explorar juegos sea un placer
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        
                        <Col md={4} className="animate__animated animate__fadeInUp animate__delay-1s">
                            <Card className="h-100 shadow-sm border-0 text-center">
                                <Card.Body className="p-4">
                                    <div className="text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" 
                                         style={{ width: '80px', height: '80px', backgroundColor: '#0dcaf0' }}>
                                        <i className="bi bi-speedometer2 display-6"></i>
                                    </div>
                                    <Card.Title className="h4 text-info">Alto Rendimiento</Card.Title>
                                    <Card.Text className="text-muted">
                                        Navegación fluida y carga instantánea para la mejor experiencia
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        
                        <Col md={4} className="animate__animated animate__fadeInUp animate__delay-2s">
                            <Card className="h-100 shadow-sm border-0 text-center">
                                <Card.Body className="p-4">
                                    <div className="text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" 
                                         style={{ width: '80px', height: '80px', backgroundColor: '#6610f2' }}>
                                        <i className="bi bi-award display-6"></i>
                                    </div>
                                    <Card.Title className="h4 text-info">Calidad Premium</Card.Title>
                                    <Card.Text className="text-muted">
                                        Solo los mejores juegos, seleccionados cuidadosamente para ti
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

export default Home;