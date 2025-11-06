import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Container, Nav } from 'react-bootstrap';
import Cart from '../Cart/Cart';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { NavigationItem } from '../../types/Component';
import { COLORS } from '../../utils/constants';
import NavigationLinks from './NavigationLinks';
import QuickSearch from './QuickSearch';
import UserDropdown from './UserDropdown';
import CartButton from './CartButton';
import LoginButton from './LoginButton';

// Header - Responsabilidad única: Layout y coordinación de componentes de navegación
const Header: React.FC = () => {
    const cart = useCart();
    const { isAuthenticated, user, logout } = useAuth();
    const navigate = useNavigate();
    const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

    // Navigation items con interfaces (Admin removido - solo accesible con credenciales)
    const navItems: NavigationItem[] = [
        { to: '/', icon: 'house-door', label: 'Inicio', color: 'info' },
        { to: '/productos', icon: 'joystick', label: 'Productos', color: 'info' },
        { to: '/blogs', icon: 'journal-text', label: 'Blog', color: 'info' },
        { to: '/nosotros', icon: 'people', label: 'Nosotros', color: 'info' },
        { to: '/contacto', icon: 'envelope', label: 'Contacto', color: 'light' }
    ];

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
                        <NavigationLinks items={navItems} />
                        <QuickSearch />
                        
                        <Nav className="d-flex align-items-center gap-2">
                            {isAuthenticated && user ? (
                                <UserDropdown user={user} onLogout={handleLogout} />
                            ) : (
                                <LoginButton />
                            )}
                            <CartButton itemCount={cart.count} onClick={() => setIsCartOpen(!isCartOpen)} />
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