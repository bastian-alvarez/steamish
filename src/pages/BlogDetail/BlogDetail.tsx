import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Badge } from 'react-bootstrap';
import { getBlogPorId } from '../../mock-data/blogsMocks';
import { COLORS } from '../../utils/constants';

const BlogDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const blog = id ? getBlogPorId(parseInt(id)) : undefined;

    // Helper para badges de categoría
    const getCategoryVariant = (category: string) => ({
        'Novedades': 'primary', 'Tutoriales': 'info', 'Tecnología': 'success',
        'Reviews': 'warning', 'eSports': 'danger', 'Arte': 'secondary'
    }[category] || 'secondary');

    if (!blog) {
        return (
            <div style={{ background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)', minHeight: '100vh' }}>
                <Container className="py-5 text-center">
                    <h2 className="text-muted mb-4">Artículo no encontrado</h2>
                    <Button variant="primary" onClick={() => navigate('/blogs')}>
                        <i className="bi bi-arrow-left me-2"></i>Volver al Blog
                    </Button>
                </Container>
            </div>
        );
    }

    return (
        <div style={{ background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)', minHeight: '100vh' }}>
            {/* Hero Section */}
            <div className="bg-primary text-white py-4" style={{ background: COLORS.gradientPrimary }}>
                <Container>
                    <Button 
                        variant="outline-light" 
                        size="sm" 
                        onClick={() => navigate('/blogs')}
                        className="mb-3"
                    >
                        <i className="bi bi-arrow-left me-2"></i>Volver al Blog
                    </Button>
                </Container>
            </div>

            <Container className="py-5">
                <Row className="justify-content-center">
                    <Col lg={8}>
                        {/* Article Header */}
                        <div className="mb-4">
                            <div className="d-flex align-items-center mb-3 flex-wrap gap-2">
                                <Badge bg={getCategoryVariant(blog.category)} className="me-2">{blog.category}</Badge>
                                {blog.featured && <Badge bg="danger">DESTACADO</Badge>}
                                <small className="text-muted ms-auto">
                                    <i className="bi bi-calendar me-1"></i>{blog.date}
                                </small>
                                <small className="text-muted">
                                    <i className="bi bi-clock me-1"></i>{blog.readTime}
                                </small>
                            </div>
                            <h1 className="display-4 fw-bold mb-3" style={{ color: COLORS.color4 }}>
                                {blog.title}
                            </h1>
                            <p className="lead text-muted">{blog.excerpt}</p>
                        </div>

                        {/* Featured Image */}
                        <div className="mb-4">
                            <img 
                                src={blog.image} 
                                alt={blog.title} 
                                className="img-fluid rounded shadow-lg"
                                style={{ width: '100%', maxHeight: '500px', objectFit: 'cover' }}
                            />
                        </div>

                        {/* Article Content */}
                        <div 
                            className="article-content mb-5"
                            style={{ 
                                fontSize: '1.1rem', 
                                lineHeight: '1.8',
                                color: '#333'
                            }}
                            dangerouslySetInnerHTML={{ __html: blog.content || `<p>${blog.excerpt}</p><p>Contenido completo próximamente...</p>` }}
                        />

                        {/* 🔗 Navigation */}
                        <div className="d-flex justify-content-between align-items-center pt-4 border-top">
                            <Button 
                                variant="outline-primary" 
                                onClick={() => navigate('/blogs')}
                            >
                                <i className="bi bi-arrow-left me-2"></i>Volver al Blog
                            </Button>
                            <div className="text-muted">
                                <small>
                                    <i className="bi bi-tag me-1"></i>{blog.category} • 
                                    <i className="bi bi-clock ms-2 me-1"></i>{blog.readTime}
                                </small>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>

            {/* Estilos para el contenido del artículo */}
            <style>{`
                .article-content h3 {
                    color: ${COLORS.color4};
                    margin-top: 2rem;
                    margin-bottom: 1rem;
                    font-weight: 600;
                }
                .article-content p {
                    margin-bottom: 1.5rem;
                }
                .article-content img {
                    max-width: 100%;
                    height: auto;
                    border-radius: 8px;
                    margin: 1.5rem 0;
                }
            `}</style>
        </div>
    );
};

export default BlogDetail;

