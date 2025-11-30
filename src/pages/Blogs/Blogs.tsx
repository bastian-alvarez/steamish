import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Badge, Button, InputGroup, Form, Nav } from 'react-bootstrap';
import { blogs } from '../../fixtures/blogsMocks';
import { COLORS } from '../../config/constants';

// Blog con Mock Data - Estructura similar a juegos
const Blogs: React.FC = () => {
    const navigate = useNavigate();
    const [activeCategory, setActiveCategory] = useState('Todos');
    const [searchTerm, setSearchTerm] = useState('');

    // Usar blogs del mock
    const blogPosts = blogs;

    const categories = ['Todos', 'Novedades', 'Tutoriales', 'Tecnología', 'Reviews', 'eSports', 'Arte'];
    
    // Filtered posts with optimized dependencies
    const filteredPosts = useMemo(() => {
        return blogPosts.filter(post => {
            const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = activeCategory === 'Todos' || post.category === activeCategory;
            return matchesSearch && matchesCategory;
        });
    }, [searchTerm, activeCategory, blogPosts]);
    
    const featuredPost = filteredPosts.find(post => post.featured);
    const regularPosts = filteredPosts.filter(post => !post.featured);

    // Helper para badges de categoría
    const getCategoryVariant = (category: string) => ({
        'Novedades': 'primary', 'Tutoriales': 'info', 'Tecnología': 'success',
        'Reviews': 'warning', 'eSports': 'danger', 'Arte': 'secondary'
    }[category] || 'secondary');

    const resetFilters = () => { setSearchTerm(''); setActiveCategory('Todos'); };

    return (
        <div style={{ background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)', minHeight: '100vh' }}>
            {/* Hero Section Compacto */}
            <div className="bg-primary text-white py-5 text-center" style={{ background: COLORS.gradientPrimary }}>
                <Container>
                    <h1 className="display-4 fw-bold mb-3">
                        <i className="bi bi-journal-text me-3"></i>Gaming Blog
                    </h1>
                    <p className="lead">Noticias, reviews, guías y todo sobre el mundo gaming</p>
                </Container>
            </div>

            <Container className="py-5">
                {/* Search & Filters Simplificado */}
                <Row className="mb-5 justify-content-center">
                    <Col lg={8}>
                        <InputGroup className="mb-4">
                            <InputGroup.Text className="text-white border-primary" style={{ background: COLORS.color4 }}>
                                <i className="bi bi-search"></i>
                            </InputGroup.Text>
                            <Form.Control
                                placeholder="Buscar artículos..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="border-primary"
                            />
                        </InputGroup>

                        <Nav variant="pills" className="justify-content-center flex-wrap gap-2">
                            {categories.map(category => (
                                <Nav.Link
                                    key={category}
                                    active={activeCategory === category}
                                    onClick={() => setActiveCategory(category)}
                                    className={activeCategory === category ? '' : ''}
                                    style={activeCategory === category 
                                        ? { background: COLORS.color4, color: 'white' }
                                        : { color: COLORS.color4 }}
                                >
                                    {category}
                                </Nav.Link>
                            ))}
                        </Nav>
                    </Col>
                </Row>

                {/* Featured Article */}
                {featuredPost && (
                    <Card className="border-0 shadow-lg overflow-hidden mb-5">
                        <Row className="g-0">
                            <Col md={5}>
                                <Card.Img src={featuredPost.image} alt={featuredPost.title} style={{ height: '300px', objectFit: 'cover' }} />
                            </Col>
                            <Col md={7}>
                                <Card.Body className="p-4 h-100 d-flex flex-column">
                                    <div className="d-flex align-items-center mb-3">
                                        <Badge bg="danger" className="me-2">DESTACADO</Badge>
                                        <Badge bg={getCategoryVariant(featuredPost.category)} className="me-2">{featuredPost.category}</Badge>
                                        <small className="text-muted">{featuredPost.date}</small>
                                    </div>
                                    <Card.Title className="h3 fw-bold mb-3" style={{ color: COLORS.color4 }}>{featuredPost.title}</Card.Title>
                                    <Card.Text className="text-muted mb-4 flex-grow-1">{featuredPost.excerpt}</Card.Text>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <small className="text-muted"><i className="bi bi-clock me-1"></i>{featuredPost.readTime}</small>
                                        <Button 
                                            variant="primary"
                                            onClick={() => navigate(`/blogs/${featuredPost.id}`)}
                                        >
                                            <i className="bi bi-book me-2"></i>Leer Artículo
                                        </Button>
                                    </div>
                                </Card.Body>
                            </Col>
                        </Row>
                    </Card>
                )}

                {/* Articles Grid */}
                <Row className="mb-4">
                    <Col>
                        <h2 className="fw-bold" style={{ color: COLORS.color4 }}>
                            <i className="bi bi-fire me-2"></i>Últimos Artículos
                            <Badge bg="info" className="ms-2">{regularPosts.length}</Badge>
                        </h2>
                    </Col>
                </Row>

                <Row className="g-4">
                    {regularPosts.map(post => (
                        <Col key={post.id} lg={4} md={6}>
                            <Card className="h-100 border-0 shadow hover-shadow-lg transition-all">
                                <Card.Img variant="top" src={post.image} alt={post.title} style={{ height: '200px', objectFit: 'cover' }} />
                                <Card.Body className="d-flex flex-column">
                                    <div className="d-flex align-items-center mb-2">
                                        <Badge bg={getCategoryVariant(post.category)} className="me-2">{post.category}</Badge>
                                        <small className="text-muted">{post.date}</small>
                                    </div>
                                    <Card.Title className="h5 fw-bold mb-2" style={{ color: COLORS.color4 }}>{post.title}</Card.Title>
                                    <Card.Text className="text-muted mb-3 flex-grow-1">{post.excerpt}</Card.Text>
                                    <div className="d-flex justify-content-between align-items-center mt-auto">
                                        <small className="text-muted"><i className="bi bi-clock me-1"></i>{post.readTime}</small>
                                        <Button 
                                            variant="outline-primary" 
                                            size="sm"
                                            onClick={() => navigate(`/blogs/${post.id}`)}
                                        >
                                            Leer más <i className="bi bi-arrow-right ms-1"></i>
                                        </Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>

                {/* 🚫 No Results */}
                {filteredPosts.length === 0 && (
                    <div className="text-center py-5">
                        <i className="bi bi-search text-muted" style={{ fontSize: '4rem' }}></i>
                        <h3 className="text-muted mt-3">No se encontraron artículos</h3>
                        <p className="text-muted">Intenta con otros términos de búsqueda o categoría</p>
                        <Button variant="primary" onClick={resetFilters}>
                            <i className="bi bi-arrow-counterclockwise me-2"></i>Limpiar filtros
                        </Button>
                    </div>
                )}
            </Container>

            {/* CSS Inline Minimalista */}
            <style>{`.hover-shadow-lg:hover { transform: translateY(-5px); box-shadow: 0 1rem 3rem rgba(0,0,0,.175) !important; } .transition-all { transition: all 0.3s ease; }`}</style>
        </div>
    );
};

export default Blogs;
