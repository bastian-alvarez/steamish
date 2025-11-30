import React from 'react';
import { Link } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import { NavigationItem } from '../../types/Component';

interface NavigationLinksProps {
    items: NavigationItem[];
}

// Componente con responsabilidad única: Renderizar enlaces de navegación
const NavigationLinks: React.FC<NavigationLinksProps> = ({ items }) => {
    return (
        <Nav className="me-auto">
            {items.map(item => (
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
    );
};

export default NavigationLinks;





