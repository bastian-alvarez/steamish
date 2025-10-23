import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { Navbar, Nav, Container, Button, Badge } from 'react-bootstrap';
import Cart from '../Cart/Cart';

const Header: React.FC = () => {
    const { count } = useCart();
    const [isCartOpen, setIsCartOpen] = useState(false);

    const toggleCart = () => {
        setIsCartOpen(!isCartOpen);
    };

    return (
        <>
            <Navbar bg="primary" variant="dark" expand="lg" className="shadow-sm animate__animated animate__fadeInDown">
                <Container>
                    <Navbar.Brand as={Link} to="/" className="fw-bold fs-3 animate__animated animate__pulse animate__infinite animate__slow">
                        <i className="bi bi-controller me-2 text-info"></i>
                        <span className="text-light">Steamish</span>
                    </Navbar.Brand>
                    
                    <Navbar.Toggle aria-controls="basic-navbar-nav">
                        <i className="bi bi-list"></i>
                    </Navbar.Toggle>
                    
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/" className="fw-semibold mx-2">
                                <i className="bi bi-house-door me-1 text-info"></i>
                                Inicio
                            </Nav.Link>
                            <Nav.Link as={Link} to="/productos" className="fw-semibold mx-2">
                                <i className="bi bi-grid-3x3-gap me-1 text-info"></i>
                                Productos
                            </Nav.Link>
                            <Nav.Link as={Link} to="/blogs" className="fw-semibold mx-2">
                                <i className="bi bi-journal-text me-1 text-info"></i>
                                Blog
                            </Nav.Link>
                            <Nav.Link as={Link} to="/nosotros" className="fw-semibold mx-2">
                                <i className="bi bi-people me-1 text-info"></i>
                                Nosotros
                            </Nav.Link>
                            <Nav.Link as={Link} to="/contacto" className="fw-semibold mx-2">
                                <i className="bi bi-envelope me-1 text-light"></i>
                                Contacto
                            </Nav.Link>
                            <Nav.Link as={Link} to="/admin" className="fw-semibold mx-2">
                                <i className="bi bi-gear me-1 text-info"></i>
                                Admin
                            </Nav.Link>
                        </Nav>
                        
                        <Nav className="ms-auto d-flex align-items-center">
                            <Link to="/login" className="btn btn-outline-light btn-sm me-3">
                                <i className="bi bi-box-arrow-in-right me-1"></i>
                                Login
                            </Link>
                            
                            <Button 
                                variant="info" 
                                className="position-relative"
                                onClick={toggleCart}
                                size="sm"
                            >
                                <i className="bi bi-cart3 me-1"></i>
                                Carrito
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