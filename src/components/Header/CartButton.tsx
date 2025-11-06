import React from 'react';
import { Button, Badge } from 'react-bootstrap';

interface CartButtonProps {
    itemCount: number;
    onClick: () => void;
}

// Componente con responsabilidad única: Botón del carrito con contador
const CartButton: React.FC<CartButtonProps> = ({ itemCount, onClick }) => {
    return (
        <Button 
            className="position-relative btn-sm"
            onClick={onClick}
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
            {itemCount > 0 && (
                <Badge 
                    pill 
                    bg="danger"
                    className="position-absolute top-0 start-100 translate-middle"
                >
                    {itemCount}
                </Badge>
            )}
        </Button>
    );
};

export default CartButton;





