import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Button, Badge, Form, InputGroup, Dropdown } from 'react-bootstrap';
import Cart from '../Cart/Cart';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types/User';
import { NavigationItem } from '../../types/Component';
import { COLORS } from '../../utils/constants';

// Header con useState para el carrito
const Header: React.FC = () => {
    const cart = useCart();
    const { isAuthenticated, user, logout } = useAuth();
    const navigate = useNavigate();
    const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>('');

    // Navigation items con interfaces (Admin removido - solo accesible con credenciales)
    const navItems: NavigationItem[] = [
        { to: '/', icon: 'house-door', label: 'Inicio', color: 'info' },
        { to: '/productos', icon: 'joystick', label: 'Productos', color: 'info' },
        { to: '/blogs', icon: 'journal-text', label: 'Blog', color: 'info' },
        { to: '/nosotros', icon: 'people', label: 'Nosotros', color: 'info' },
        { to: '/contacto', icon: 'envelope', label: 'Contacto', color: 'light' }
    ];

    const handleQuickSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/productos?search=${encodeURIComponent(searchQuery.trim())}`);
            setSearchQuery('');
        }
    };

    const handleLogout = async () => {
        await logout();
        navigate('/');
    };

    return (
        <>
            <Navbar 
                expand="lg" 
                className="shadow-sm"
                style={{ 
                    background: COLORS.gradientPrimary,
                    paddingTop: '0.75rem',
                    paddingBottom: '0.75rem'
                }}
            >
                <Container>
                    <Navbar.Brand 
                        as={Link} 
                        to="/" 
                        className="fw-bold d-flex align-items-center"
                        style={{ 
                            color: 'white',
                            textDecoration: 'none',
                            fontSize: '1.5rem'
                        }}
                    >
                        <i 
                            className="bi bi-controller me-2" 
                            style={{ 
                                fontSize: '1.75rem',
                                color: 'rgba(255, 255, 255, 0.95)'
                            }}
                        ></i>
                        <span>Steamish</span>
                    </Navbar.Brand>
                    
                    <Navbar.Toggle 
                        aria-controls="basic-navbar-nav"
                        style={{ 
                            borderColor: 'rgba(255, 255, 255, 0.5)'
                        }}
                    >
                        <i className="bi bi-list" style={{ color: 'white', fontSize: '1.5rem' }}></i>
                    </Navbar.Toggle>
                    
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            {navItems.map(item => (
                                <Nav.Link 
                                    key={item.to} 
                                    as={Link} 
                                    to={item.to} 
                                    className="fw-medium"
                                    style={{ 
                                        color: 'rgba(255, 255, 255, 0.9)',
                                        transition: 'all 0.2s ease',
                                        padding: '0.5rem 0.75rem',
                                        margin: '0 0.15rem',
                                        borderRadius: '6px'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.color = 'white';
                                        e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.color = 'rgba(255, 255, 255, 0.9)';
                                        e.currentTarget.style.backgroundColor = 'transparent';
                                    }}
                                >
                                    <i 
                                        className={`bi bi-${item.icon} me-1`}
                                        style={{ fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.8)' }}
                                    ></i>
                                    {item.label}
                                </Nav.Link>
                            ))}
                        </Nav>
                        
                        {/* Search */}
                        <Form onSubmit={handleQuickSearch} className="d-none d-lg-flex me-3">
                            <InputGroup size="sm">
                                <InputGroup.Text style={{ 
                                    background: 'rgba(255, 255, 255, 0.15)',
                                    borderColor: 'rgba(255, 255, 255, 0.3)',
                                    color: 'white',
                                    borderRight: 'none'
                                }}>
                                    <i className="bi bi-search"></i>
                                </InputGroup.Text>
                                <Form.Control
                                    type="text"
                                    placeholder="Buscar juegos..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    style={{ 
                                        borderColor: 'rgba(255, 255, 255, 0.3)',
                                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                        borderLeft: 'none',
                                        borderRight: 'none',
                                        minWidth: '260px'
                                    }}
                                />
                                <Button 
                                    type="submit" 
                                    size="sm"
                                style={{ 
                                    background: 'rgba(255, 255, 255, 0.2)',
                                    borderColor: 'rgba(255, 255, 255, 0.3)',
                                    color: 'white',
                                    borderLeft: 'none'
                                }}
                                >
                                    <i className="bi bi-search"></i>
                                </Button>
                            </InputGroup>
                        </Form>
                        
                        <Nav className="d-flex align-items-center gap-2">
                            {isAuthenticated && user ? (
                                <>
                                    <Dropdown>
                                        <Dropdown.Toggle 
                                            variant="outline-light" 
                                            size="sm"
                                            className="d-flex align-items-center"
                                            style={{ 
                                                borderColor: 'rgba(255, 255, 255, 0.4)',
                                                color: 'white'
                                            }}
                                        >
                                            <i className="bi bi-person-circle me-2"></i>
                                            {user.username || user.email}
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Dropdown.ItemText>
                                                <small className="text-muted">{user.email}</small>
                                            </Dropdown.ItemText>
                                            <Dropdown.Divider />
                                            <Dropdown.Item as={Link} to="/biblioteca">
                                                <i className="bi bi-collection me-2"></i>Mi Biblioteca
                                            </Dropdown.Item>
                                            {user.role === UserRole.ADMIN && (
                                                <Dropdown.Item as={Link} to="/admin">
                                                    <i className="bi bi-shield-check me-2"></i>Panel Admin
                                                </Dropdown.Item>
                                            )}
                                            <Dropdown.Divider />
                                            <Dropdown.Item onClick={handleLogout}>
                                                <i className="bi bi-box-arrow-right me-2"></i>Cerrar Sesión
                                            </Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </>
                            ) : (
                                <Link 
                                    to="/login" 
                                    className="btn btn-sm text-decoration-none"
                                    style={{ 
                                        borderColor: 'rgba(255, 255, 255, 0.4)',
                                        color: 'white',
                                        backgroundColor: 'transparent',
                                        borderWidth: '1px',
                                        borderStyle: 'solid'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor = 'transparent';
                                    }}
                                >
                                    <i className="bi bi-box-arrow-in-right me-1"></i>Login
                                </Link>
                            )}
                            
                            <Button 
                                className="position-relative btn-sm"
                                onClick={() => setIsCartOpen(!isCartOpen)}
                                style={{ 
                                    background: 'rgba(255, 255, 255, 0.2)',
                                    borderColor: 'rgba(255, 255, 255, 0.3)',
                                    color: 'white',
                                    fontWeight: '600'
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
                                <i className="bi bi-cart3 me-1"></i>Carrito
                                {cart.count > 0 && (
                                    <Badge 
                                        pill 
                                        bg="danger"
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