import React from 'react';
import { Container, Row, Col, Card, Badge } from 'react-bootstrap';
import { COLORS } from '../../config/constants';

const About: React.FC = () => {
    // Valores principales
    const values = [
        {
            icon: 'shield-check',
            title: 'Calidad Premium',
            desc: 'Seleccionamos solo los mejores títulos y servicios para garantizar una experiencia excepcional',
            color: '#4d4d80',
            gradient: 'linear-gradient(135deg, #4d4d80 0%, #1c1f3b 100%)'
        },
        {
            icon: 'people-fill',
            title: 'Comunidad Global',
            desc: 'Conectamos a millones de gamers alrededor del mundo en una comunidad inclusiva y colaborativa',
            color: '#3c3f68',
            gradient: 'linear-gradient(135deg, #3c3f68 0%, #282c4d 100%)'
        },
        {
            icon: 'rocket-takeoff',
            title: 'Innovación Constante',
            desc: 'Utilizamos tecnología de vanguardia para crear experiencias únicas e inmersivas',
            color: '#606271',
            gradient: 'linear-gradient(135deg, #606271 0%, #4d4d80 100%)'
        }
    ];

    // Estadísticas
    const stats = [
        { number: '10K+', label: 'Juegos Disponibles', icon: 'controller' },
        { number: '2M+', label: 'Usuarios Activos', icon: 'people' },
        { number: '150+', label: 'Países', icon: 'globe' },
        { number: '99%', label: 'Satisfacción', icon: 'star-fill' }
    ];

    // Misión y Visión
    const mission = {
        title: 'Nuestra Misión',
        description: 'Revolucionar la forma en que los gamers descubren, compran y disfrutan de videojuegos, creando la plataforma más elegante, intuitiva y completa del mercado.',
        icon: 'bullseye'
    };

    const vision = {
        title: 'Nuestra Visión',
        description: 'Ser la plataforma gaming líder a nivel mundial, reconocida por nuestra excelencia, innovación y compromiso con la comunidad gamer.',
        icon: 'eye-fill'
    };

    return (
        <div className="min-vh-100">
            {/* Hero Section Mejorado */}
            <section className="text-white py-5 position-relative overflow-hidden" style={{ 
                background: COLORS.gradientPrimary,
                minHeight: '60vh',
                display: 'flex',
                alignItems: 'center'
            }}>
                {/* Elementos decorativos */}
                <div className="position-absolute top-0 start-0 w-100 h-100" style={{ 
                    background: 'radial-gradient(circle at 30% 50%, rgba(255, 255, 255, 0.05) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(255, 255, 255, 0.05) 0%, transparent 50%)',
                    pointerEvents: 'none'
                }}></div>
                
                <Container className="position-relative" style={{ zIndex: 1 }}>
                    <Row className="text-center py-5">
                        <Col lg={10} className="mx-auto">
                            <div className="mb-4">
                                <i className="bi bi-controller text-white" style={{ fontSize: '4rem' }}></i>
                            </div>
                            <h1 className="display-3 fw-bold mb-4 text-white">
                                Sobre Nosotros
                            </h1>
                            <p className="lead fs-3 text-white mb-4" style={{ opacity: 0.95, maxWidth: '800px', margin: '0 auto' }}>
                                La plataforma gaming más elegante y moderna
                            </p>
                            <p className="fs-5 text-white" style={{ opacity: 0.9, maxWidth: '700px', margin: '0 auto' }}>
                                Creamos experiencias extraordinarias con pasión, tecnología y dedicación constante a la excelencia.
                            </p>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Estadísticas */}
            <section className="py-5" style={{ background: '#f8f9fa' }}>
                <Container>
                    <Row className="g-4">
                        {stats.map((stat, index) => (
                            <Col key={index} lg={3} md={6}>
                                <Card className="h-100 border-0 shadow-sm text-center" style={{ 
                                    borderRadius: '15px',
                                    transition: 'all 0.3s ease'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-8px)';
                                    e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.1)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
                                }}
                                >
                                    <Card.Body className="p-4">
                                        <div className="mb-3">
                                            <div 
                                                className="rounded-circle d-inline-flex align-items-center justify-content-center"
                                                style={{ 
                                                    width: '70px', 
                                                    height: '70px',
                                                    background: COLORS.gradientPrimary,
                                                    color: 'white'
                                                }}
                                            >
                                                <i className={`bi bi-${stat.icon}`} style={{ fontSize: '2rem' }}></i>
                                            </div>
                                        </div>
                                        <h2 className="display-5 fw-bold mb-2" style={{ color: COLORS.color1 }}>
                                            {stat.number}
                                        </h2>
                                        <p className="text-muted mb-0 fw-semibold">{stat.label}</p>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </section>

            {/* Historia */}
            <section className="py-5">
                <Container>
                    <Row className="align-items-center g-5">
                        <Col lg={6}>
                            <Badge className="mb-3 px-3 py-2 rounded-pill" style={{ 
                                background: COLORS.gradientPrimary,
                                color: 'white',
                                fontSize: '0.9rem'
                            }}>
                                <i className="bi bi-clock-history me-2"></i>Nuestra Historia
                            </Badge>
                            <h2 className="display-5 fw-bold mb-4" style={{ color: COLORS.color1 }}>
                                Una Pasión por los Videojuegos
                            </h2>
                            <p className="lead text-muted mb-4" style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
                                Steamish nació de la pasión por los videojuegos y la visión de crear una plataforma 
                                que conecte a gamers de todo el mundo de manera elegante y moderna.
                            </p>
                            <p className="text-muted mb-4" style={{ lineHeight: '1.8' }}>
                                Desde nuestros humildes comienzos, hemos crecido hasta convertirnos en una plataforma 
                                reconocida internacionalmente. Mantenemos nuestro compromiso inquebrantable con la calidad, 
                                la innovación y, sobre todo, con nuestra comunidad.
                            </p>
                            <p className="text-muted" style={{ lineHeight: '1.8' }}>
                                Cada día trabajamos para mejorar tu experiencia, ofreciendo los mejores juegos, 
                                las mejores ofertas y un servicio al cliente excepcional.
                            </p>
                        </Col>
                        
                        <Col lg={6}>
                            <div className="position-relative">
                                <Card className="border-0 shadow-lg" style={{ borderRadius: '20px', overflow: 'hidden' }}>
                                    <div 
                                        className="p-5 text-center text-white"
                                        style={{ 
                                            background: COLORS.gradientPrimary,
                                            minHeight: '300px',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}
                                    >
                                        <i className="bi bi-trophy-fill mb-3" style={{ fontSize: '4rem' }}></i>
                                        <h3 className="h4 mb-3">Premios y Reconocimientos</h3>
                                        <p className="mb-0" style={{ opacity: 0.95 }}>
                                            Plataforma del Año 2024 • Mejor UX Gaming • Innovación Tecnológica
                                        </p>
                                    </div>
                                </Card>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Misión y Visión */}
            <section className="py-5" style={{ background: '#f8f9fa' }}>
                <Container>
                    <Row className="g-4">
                        <Col lg={6}>
                            <Card className="h-100 border-0 shadow-sm" style={{ borderRadius: '20px' }}>
                                <Card.Body className="p-5">
                                    <div className="mb-4">
                                        <div 
                                            className="rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                                            style={{ 
                                                width: '80px', 
                                                height: '80px',
                                                background: COLORS.gradientPrimary,
                                                color: 'white'
                                            }}
                                        >
                                            <i className={`bi bi-${mission.icon}`} style={{ fontSize: '2.5rem' }}></i>
                                        </div>
                                    </div>
                                    <Card.Title className="h3 fw-bold mb-3" style={{ color: COLORS.color1 }}>
                                        {mission.title}
                                    </Card.Title>
                                    <Card.Text className="text-muted" style={{ lineHeight: '1.8', fontSize: '1rem' }}>
                                        {mission.description}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        
                        <Col lg={6}>
                            <Card className="h-100 border-0 shadow-sm" style={{ borderRadius: '20px' }}>
                                <Card.Body className="p-5">
                                    <div className="mb-4">
                                        <div 
                                            className="rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                                            style={{ 
                                                width: '80px', 
                                                height: '80px',
                                                background: COLORS.gradientPrimary,
                                                color: 'white'
                                            }}
                                        >
                                            <i className={`bi bi-${vision.icon}`} style={{ fontSize: '2.5rem' }}></i>
                                        </div>
                                    </div>
                                    <Card.Title className="h3 fw-bold mb-3" style={{ color: COLORS.color1 }}>
                                        {vision.title}
                                    </Card.Title>
                                    <Card.Text className="text-muted" style={{ lineHeight: '1.8', fontSize: '1rem' }}>
                                        {vision.description}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Valores */}
            <section className="py-5">
                <Container>
                    <Row className="text-center mb-5">
                        <Col lg={8} className="mx-auto">
                            <Badge className="mb-3 px-3 py-2 rounded-pill" style={{ 
                                background: COLORS.gradientPrimary,
                                color: 'white',
                                fontSize: '0.9rem'
                            }}>
                                <i className="bi bi-star-fill me-2"></i>Nuestros Pilares
                            </Badge>
                            <h2 className="display-5 fw-bold mb-3" style={{ color: COLORS.color1 }}>
                                Lo Que Nos Define
                            </h2>
                            <p className="lead text-muted">
                                Valores fundamentales que guían cada decisión y acción en Steamish
                            </p>
                        </Col>
                    </Row>
                    
                    <Row className="g-4">
                        {values.map((value, index) => (
                            <Col key={index} lg={4} md={6}>
                                <Card 
                                    className="h-100 border-0 shadow-sm text-center" 
                                    style={{ 
                                        borderRadius: '20px',
                                        transition: 'all 0.3s ease',
                                        overflow: 'hidden'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'translateY(-10px)';
                                        e.currentTarget.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.15)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
                                    }}
                                >
                                    <Card.Body className="p-5">
                                        <div 
                                            className="rounded-circle d-inline-flex align-items-center justify-content-center mb-4" 
                                            style={{ 
                                                width: '100px', 
                                                height: '100px',
                                                background: value.gradient,
                                                color: 'white',
                                                boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)'
                                            }}
                                        >
                                            <i className={`bi bi-${value.icon}`} style={{ fontSize: '2.5rem' }}></i>
                                        </div>
                                        <Card.Title className="h4 fw-bold mb-3" style={{ color: COLORS.color1 }}>
                                            {value.title}
                                        </Card.Title>
                                        <Card.Text className="text-muted" style={{ lineHeight: '1.8' }}>
                                            {value.desc}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </section>

            {/* Call to Action */}
            <section className="py-5 text-white" style={{ background: COLORS.gradientPrimary }}>
                <Container>
                    <Row className="text-center">
                        <Col lg={8} className="mx-auto">
                            <h2 className="display-5 fw-bold mb-4 text-white">
                                Únete a Nuestra Comunidad
                            </h2>
                            <p className="lead mb-4 text-white" style={{ opacity: 0.95 }}>
                                Sé parte de la revolución gaming. Descubre, juega y comparte con millones de gamers alrededor del mundo.
                            </p>
                            <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
                                <a 
                                    href="/productos" 
                                    className="btn btn-lg fw-bold px-5 py-3 rounded-3 text-decoration-none"
                                    style={{ 
                                        background: 'rgba(255, 255, 255, 0.2)',
                                        border: '2px solid rgba(255, 255, 255, 0.3)',
                                        color: 'white',
                                        backdropFilter: 'blur(10px)'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)';
                                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.5)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                                    }}
                                >
                                    <i className="bi bi-joystick me-2"></i>Explorar Juegos
                                </a>
                                <a 
                                    href="/contacto" 
                                    className="btn btn-outline-light btn-lg fw-bold px-5 py-3 rounded-3 text-decoration-none"
                                    style={{ 
                                        borderWidth: '2px',
                                        borderColor: 'rgba(255, 255, 255, 0.5)',
                                        color: 'white'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.8)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background = 'transparent';
                                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.5)';
                                    }}
                                >
                                    <i className="bi bi-envelope me-2"></i>Contactar
                                </a>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </div>
    );
};

export default About;
