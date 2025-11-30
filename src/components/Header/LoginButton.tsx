import React from 'react';
import { Link } from 'react-router-dom';

// Componente con responsabilidad única: Botón de login
const LoginButton: React.FC = () => {
    return (
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
    );
};

export default LoginButton;





