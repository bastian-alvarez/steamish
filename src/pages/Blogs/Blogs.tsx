import React, { useState } from 'react';
import { Container, Row, Col, Card, Badge, Button, InputGroup, Form, Nav } from 'react-bootstrap';

// 📝 Blog Minimalista con Bootstrap y Colores Azules
const Blogs: React.FC = () => {
    const [activeCategory, setActiveCategory] = useState('Todos');
    const [searchTerm, setSearchTerm] = useState('');

    const blogPosts = [
        {
            id: 1,
            title: "Los 10 Juegos Más Esperados de 2025",
            excerpt: "Descubre los títulos que revolucionarán el gaming este año con gráficos increíbles y jugabilidad innovadora...",
            image: "https://via.placeholder.com/400x200/0d6efd/ffffff?text=Gaming+2025",
            date: "15 Oct 2025",
            category: "Novedades",
            readTime: "5 min",
            featured: true
        },
        {
            id: 2,
            title: "Guía Completa: Cómo Optimizar tu PC Gaming",
            excerpt: "Consejos profesionales para sacar el máximo rendimiento a tu equipo y disfrutar gaming a 60fps...",
            image: "https://via.placeholder.com/400x200/6610f2/ffffff?text=PC+Gaming",
            date: "12 Oct 2025",
            category: "Tutoriales",
            readTime: "8 min",
            featured: false
        },
        {
            id: 3,
            title: "El Futuro del Gaming: Realidad Virtual",
            excerpt: "Explora cómo la VR está transformando la industria de los videojuegos y creando experiencias inmersivas...",
            image: "https://via.placeholder.com/400x200/0dcaf0/ffffff?text=VR+Gaming",
            date: "10 Oct 2025",
            category: "Tecnología",
            readTime: "6 min",
            featured: false
        },
        {
            id: 4,
            title: "Review: Los Mejores Indies de la Temporada",
            excerpt: "Una selección cuidadosa de juegos independientes que no puedes perderte, con historias únicas...",
            image: "https://via.placeholder.com/400x200/0d6efd/ffffff?text=Indie+Games",
            date: "8 Oct 2025",
            category: "Reviews",
            readTime: "7 min",
            featured: false
        },
        {
            id: 5,
            title: "eSports 2025: Torneos y Competencias",
            excerpt: "Todo lo que necesitas saber sobre los próximos torneos mundiales y cómo participar...",
            image: "https://via.placeholder.com/400x200/6610f2/ffffff?text=eSports",
            date: "5 Oct 2025",
            category: "eSports",
            readTime: "4 min",
            featured: false
        },
        {
            id: 6,
            title: "Construcción de Mundos: Arte en Videojuegos",
            excerpt: "Detrás de escenas: cómo los artistas crean universos fantásticos que cobran vida en pantalla...",
            image: "https://via.placeholder.com/400x200/0dcaf0/ffffff?text=Game+Art",
            date: "2 Oct 2025",
            category: "Arte",
            readTime: "9 min",
            featured: false
        }
    ];

    const categories = ['Todos', 'Novedades', 'Tutoriales', 'Tecnología', 'Reviews', 'eSports', 'Arte'];

    const filteredPosts = blogPosts.filter(post => {
        const matchesCategory = activeCategory === 'Todos' || post.category === activeCategory;
        const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const featuredPost = blogPosts.find(post => post.featured);
    const regularPosts = filteredPosts.filter(post => !post.featured);

    return (
        <div style={{ background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)', minHeight: '100vh' }}>
            {/* Hero Section */}
            <div className="bg-primary text-white py-5">
                <Container>
                    <Row className="justify-content-center text-center">
                        <Col lg={8}>
                            <h1 className="display-4 fw-bold mb-3">
                                <i className="bi bi-journal-text me-3"></i>
                                Gaming Blog
                            </h1>
                            <p className="lead">
                                Noticias, reviews, guías y todo sobre el mundo gaming
                            </p>
                        </Col>
                    </Row>
                </Container>
            </div>

            <Container className="py-5">
                {/* Search and Filters */}
                <Row className="mb-5">
                    <Col lg={8} className="mx-auto">
                        <InputGroup className="mb-4">
                            <InputGroup.Text className="bg-primary text-white border-primary">
                                <i className="bi bi-search"></i>
                            </InputGroup.Text>
                            <Form.Control
                                type="text"
                                placeholder="Buscar artículos..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="border-primary"
                            />
                        </InputGroup>

                        <Nav variant="pills" className="justify-content-center flex-wrap gap-2">
                            {categories.map(category => (
                                <Nav.Item key={category}>
                                    <Nav.Link
                                        active={activeCategory === category}
                                        onClick={() => setActiveCategory(category)}
                                        className={activeCategory === category ? 'bg-primary' : 'text-primary'}
                                    >
                                        {category}
                                    </Nav.Link>
                                </Nav.Item>
                            ))}
                        </Nav>
                    </Col>
                </Row>

                {/* Featured Article */}
                {featuredPost && (
                    <Row className="mb-5">
                        <Col>
                            <Card className="border-0 shadow-lg overflow-hidden">
                                <Row className="g-0">
                                    <Col md={5}>
                                        <Card.Img 
                                            src={featuredPost.image} 
                                            alt={featuredPost.title}
                                            style={{ height: '300px', objectFit: 'cover' }}
                                        />
                                    </Col>
                                    <Col md={7}>
                                        <Card.Body className="p-4 h-100 d-flex flex-column">
                                            <div className="d-flex align-items-center mb-3">
                                                <Badge bg="danger" className="me-2">DESTACADO</Badge>
                                                <Badge bg="primary" className="me-2">{featuredPost.category}</Badge>
                                                <small className="text-muted">{featuredPost.date}</small>
                                            </div>
                                            <Card.Title className="h3 text-primary fw-bold mb-3">
                                                {featuredPost.title}
                                            </Card.Title>
                                            <Card.Text className="text-muted mb-4 flex-grow-1">
                                                {featuredPost.excerpt}
                                            </Card.Text>
                                            <div className="d-flex justify-content-between align-items-center">
                                                <small className="text-muted">
                                                    <i className="bi bi-clock me-1"></i>
                                                    {featuredPost.readTime}
                                                </small>
                                                <Button variant="primary">
                                                    <i className="bi bi-book me-2"></i>
                                                    Leer Artículo
                                                </Button>
                                            </div>
                                        </Card.Body>
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                    </Row>
                )}

                {/* Blog Posts Grid */}
                <Row>
                    <Col>
                        <h2 className="text-primary fw-bold mb-4">
                            <i className="bi bi-fire me-2"></i>
                            Últimos Artículos
                            <Badge bg="info" className="ms-2">{regularPosts.length}</Badge>
                        </h2>
                    </Col>
                </Row>

                <Row className="g-4">
                    {regularPosts.map(post => (
                        <Col key={post.id} lg={4} md={6}>
                            <Card className="h-100 border-0 shadow hover-shadow-lg transition-all">
                                <Card.Img 
                                    variant="top" 
                                    src={post.image} 
                                    alt={post.title}
                                    style={{ height: '200px', objectFit: 'cover' }}
                                />
                                <Card.Body className="d-flex flex-column">
                                    <div className="d-flex align-items-center mb-2">
                                        <Badge 
                                            bg={post.category === 'Novedades' ? 'primary' : 
                                                post.category === 'Tutoriales' ? 'info' :
                                                post.category === 'Tecnología' ? 'success' :
                                                post.category === 'Reviews' ? 'warning' :
                                                post.category === 'eSports' ? 'danger' : 'secondary'}
                                            className="me-2"
                                        >
                                            {post.category}
                                        </Badge>
                                        <small className="text-muted">{post.date}</small>
                                    </div>
                                    <Card.Title className="h5 text-primary fw-bold mb-2">
                                        {post.title}
                                    </Card.Title>
                                    <Card.Text className="text-muted mb-3 flex-grow-1">
                                        {post.excerpt}
                                    </Card.Text>
                                    <div className="d-flex justify-content-between align-items-center mt-auto">
                                        <small className="text-muted">
                                            <i className="bi bi-clock me-1"></i>
                                            {post.readTime}
                                        </small>
                                        <Button variant="outline-primary" size="sm">
                                            Leer más
                                            <i className="bi bi-arrow-right ms-1"></i>
                                        </Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>

                {/* No Results */}
                {filteredPosts.length === 0 && (
                    <Row className="py-5">
                        <Col className="text-center">
                            <i className="bi bi-search text-muted" style={{ fontSize: '4rem' }}></i>
                            <h3 className="text-muted mt-3">No se encontraron artículos</h3>
                            <p className="text-muted">
                                Intenta con otros términos de búsqueda o categoría
                            </p>
                            <Button 
                                variant="primary" 
                                onClick={() => {
                                    setSearchTerm('');
                                    setActiveCategory('Todos');
                                }}
                            >
                                <i className="bi bi-arrow-counterclockwise me-2"></i>
                                Limpiar filtros
                            </Button>
                        </Col>
                    </Row>
                )}
            </Container>

            {/* Custom CSS for hover effects */}
            <style>{`
                .hover-shadow-lg:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 1rem 3rem rgba(0,0,0,.175) !important;
                }
                .transition-all {
                    transition: all 0.3s ease;
                }
            `}</style>
        </div>
    );
};

export default Blogs;