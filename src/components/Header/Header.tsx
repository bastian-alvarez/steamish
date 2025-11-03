import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Button, Badge, Form, InputGroup } from 'react-bootstrap';
import Cart from '../Cart/Cart';
import { useCart } from '../../context/CartContext';
import { NavigationItem } from '../../types/Component';

// 🎯 Header con useState para el carrito
const Header: React.FC = () => {
    const cart = useCart();
    const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const navigate = useNavigate();

    // Navigation items con interfaces
    const navItems: NavigationItem[] = [
        { to: '/', icon: 'house-door', label: 'Inicio', color: 'info' },
        { to: '/productos', icon: 'grid-3x3-gap', label: 'Productos', color: 'info' },
        { to: '/blogs', icon: 'journal-text', label: 'Blog', color: 'info' },
        { to: '/nosotros', icon: 'people', label: 'Nosotros', color: 'info' },
        { to: '/contacto', icon: 'envelope', label: 'Contacto', color: 'light' },
        { to: '/admin', icon: 'gear', label: 'Admin', color: 'info' }
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
            <Navbar bg="primary" variant="dark" expand="lg" className="shadow-sm navbar-primary">
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
                                <Button type="submit" variant="primary" size="sm">
                                    <i className="bi bi-search"></i>
                                </Button>
                            </InputGroup>
                        </Form>
                        
                        <Nav className="ms-auto d-flex align-items-center">
                            <Link to="/login" className="btn btn-outline-light btn-sm me-3">
                                <i className="bi bi-box-arrow-in-right me-1"></i>Login
                            </Link>
                            
                            <Button 
                                variant="primary" 
                                className="position-relative"
                                onClick={() => setIsCartOpen(!isCartOpen)}
                                size="sm"
                                style={{ background: 'var(--color-2)', borderColor: 'var(--color-2)' }}
                            >
                                <i className="bi bi-cart3 me-1"></i>Carrito
                                {cart.count > 0 && (
                                    <Badge 
                                        bg="primary" 
                                        pill 
                                        className="position-absolute top-0 start-100 translate-middle"
                                    >
                                        {cart.count}
                                    </Badge>
                                )}
                            </Button>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Cart 
                isOpen={isCartOpen} 
                onClose={() => setIsCartOpen(false)}
                items={cart.items}
                count={cart.count}
                totalPrice={cart.totalPrice}
                onRemove={cart.remove}
                onClear={cart.clear}
            />
        </>
    );
};

export default Header;