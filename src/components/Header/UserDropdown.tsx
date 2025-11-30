import React from 'react';
import { Link } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import { User } from '../../types/User';
import { UserRole } from '../../types/User';

interface UserDropdownProps {
    user: User;
    onLogout: () => void;
}

// Componente con responsabilidad única: Mostrar dropdown del usuario
const UserDropdown: React.FC<UserDropdownProps> = ({ user, onLogout }) => {
    return (
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
                {user.role === UserRole.MODERATOR && (
                    <Dropdown.Item as={Link} to="/moderator">
                        <i className="bi bi-shield-check me-2"></i>Panel Moderador
                    </Dropdown.Item>
                )}
                <Dropdown.Divider />
                <Dropdown.Item onClick={onLogout}>
                    <i className="bi bi-box-arrow-right me-2"></i>Cerrar Sesión
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default UserDropdown;





