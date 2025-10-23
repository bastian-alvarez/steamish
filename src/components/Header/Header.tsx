import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { Navbar, Nav, Container, Button, Badge, Form, InputGroup } from 'react-bootstrap';
import Cart from '../Cart/Cart';

// 🎯 Header Simplificado - Factory Pattern
const Header: React.FC = () => {
    const { count } = useCart();
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    // Navigation items factory
    const createNavItem = (to: string, icon: string, label: string, color = 'info') => ({
        to, icon, label, color
    });

    const navItems = [
        createNavItem('/', 'house-door', 'Inicio'),
        createNavItem('/productos', 'grid-3x3-gap', 'Productos'),
        createNavItem('/blogs', 'journal-text', 'Blog'),
        createNavItem('/nosotros', 'people', 'Nosotros'),
        createNavItem('/contacto', 'envelope', 'Contacto', 'light'),
        createNavItem('/admin', 'gear', 'Admin')
    ];

    const handleQuickSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/productos?search=${encodeURIComponent(searchQuery.trim())}`);
            setSearchQuery('');
        }
    };

    return (
        <>
            <Navbar bg="primary" variant="dark" expand="lg" className="shadow-sm">
                <Container>
                    <Navbar.Brand as={Link} to="/" className="fw-bold fs-3">
                        <i className="bi bi-controller me-2 text-info"></i>
                        <span className="text-light">Steamish</span>
                    </Navbar.Brand>
                    
                    <Navbar.Toggle aria-controls="basic-navbar-nav">
                        <i className="bi bi-list"></i>
                    </Navbar.Toggle>
                    
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            {navItems.map(item => (
                                <Nav.Link key={item.to} as={Link} to={item.to} className="fw-semibold mx-2">
                                    <i className={`bi bi-${item.icon} me-1 text-${item.color}`}></i>
                                    {item.label}
                                </Nav.Link>
                            ))}
                        </Nav>
                        
                        {/* Search */}
                        <Form onSubmit={handleQuickSearch} className="d-none d-lg-flex me-3">
                            <InputGroup size="sm">
                                <Form.Control
                                    type="text"
                                    placeholder="Buscar juegos..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="border-info"
                                    style={{ minWidth: '200px' }}
                                />
                                <Button type="submit" variant="info" size="sm">
                                    <i className="bi bi-search"></i>
                                </Button>
                            </InputGroup>
                        </Form>
                        
                        <Nav className="ms-auto d-flex align-items-center">
                            <Link to="/login" className="btn btn-outline-light btn-sm me-3">
                                <i className="bi bi-box-arrow-in-right me-1"></i>Login
                            </Link>
                            
                            <Button 
                                variant="info" 
                                className="position-relative"
                                onClick={() => setIsCartOpen(!isCartOpen)}
                                size="sm"
                            >
                                <i className="bi bi-cart3 me-1"></i>Carrito
                                {count > 0 && (
                                    <Badge 
                                        bg="primary" 
                                        pill 
                                        className="position-absolute top-0 start-100 translate-middle"
                                    >
                                        {count}
                                    </Badge>
                                )}
                            </Button>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </>
    );
};

export default Header;