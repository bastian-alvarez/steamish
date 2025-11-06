import React, { useState } from 'react';
import { Modal, Button, ListGroup, Badge, Row, Col, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { CartProps } from '../../types/Component';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../NotificationToast/NotificationToast';
import { useCart } from '../../context/CartContext';
import libraryService from '../../services/libraryService';
import { COLORS } from '../../utils/constants';

// Cart con props usando interfaces

const Cart: React.FC<CartProps> = ({ 
    isOpen, 
    onClose, 
    items, 
    count, 
    totalPrice, 
    onRemove, 
    onClear 
}) => {
    const { isAuthenticated, user } = useAuth();
    const navigate = useNavigate();
    const { showWarning, showSuccess } = useNotification();
    const cart = useCart();
    const [showAuthAlert, setShowAuthAlert] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleProceedToCheckout = async () => {
        if (!isAuthenticated || !user) {
            showWarning('Debes iniciar sesión para proceder con el pago');
            setShowAuthAlert(true);
            setTimeout(() => {
                onClose();
                navigate('/login');
            }, 2000);
            return;
        }

        if (items.length === 0) {
            showWarning('Tu carrito está vacío');
            return;
        }

        setIsProcessing(true);
        
        try {
            // Simular proceso de pago
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Agregar todos los juegos a la biblioteca del usuario
            const productsToAdd = items.map(item => {
                const { quantity, ...product } = item;
                return product;
            });
            
            libraryService.addMultipleToLibrary(user.id, productsToAdd);
            
            // Limpiar el carrito
            cart.clear();
            
            // Cerrar el modal
            onClose();
            
            // Mostrar mensaje de éxito
            showSuccess(`¡Compra exitosa! ${items.length} ${items.length === 1 ? 'juego agregado' : 'juegos agregados'} a tu biblioteca.`);
            
            // Redirigir a la biblioteca después de 1 segundo
            setTimeout(() => {
                navigate('/biblioteca');
            }, 1500);
        } catch (error) {
            showWarning('Error al procesar el pago. Intenta nuevamente.');
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <Modal show={isOpen} onHide={onClose} centered size="lg">
            <Modal.Header closeButton className="bg-primary text-white" style={{ background: COLORS.gradientPrimary }}>
                <Modal.Title>
                    <i className="bi bi-cart3 me-2"></i>Mi Carrito ({count})
                </Modal.Title>
            </Modal.Header>

            <Modal.Body className="p-4">
                {/* Alerta de autenticación requerida */}
                {showAuthAlert && (
                    <Alert 
                        variant="warning" 
                        className="mb-3 animate__animated animate__fadeIn"
                        onClose={() => setShowAuthAlert(false)} 
                        dismissible
                    >
                        <i className="bi bi-exclamation-triangle me-2"></i>
                        <strong>Inicia sesión para comprar</strong> Debes iniciar sesión para proceder con el pago. Redirigiendo...
                    </Alert>
                )}

                {items.length === 0 ? (
                    <div className="text-center py-5">
                        <i className="bi bi-cart-x text-muted" style={{ fontSize: '4rem' }}></i>
                        <h4 className="mt-3 text-muted">Tu carrito está vacío</h4>
                        <p className="text-muted">¡Agrega algunos juegos increíbles!</p>
                    </div>
                ) : (
                    <>
                        <ListGroup variant="flush" className="mb-3">
                            {items.map((item) => {
                                const price = item.discount > 0 
                                    ? item.price * (1 - item.discount / 100) 
                                    : item.price;
                                
                                return (
                                    <ListGroup.Item key={item.id} className="border-0 px-0">
                                        <Row className="align-items-center">
                                            <Col xs={3}>
                                                <img 
                                                    src={item.image} 
                                                    alt={item.name}
                                                    className="img-fluid rounded"
                                                    style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                                                />
                                            </Col>
                                            <Col xs={6}>
                                                <h6 className="mb-1 fw-bold">{item.name}</h6>
                                                <div className="d-flex align-items-center gap-2">
                                                    {item.discount > 0 ? (
                                                        <>
                                                            <span className="text-decoration-line-through text-muted small">
                                                                ${item.price.toFixed(2)}
                                                            </span>
                                                            <span className="text-success fw-bold">${price.toFixed(2)}</span>
                                                            <Badge bg="danger">-{item.discount}%</Badge>
                                                        </>
                                                    ) : (
                                                        <span className="text-success fw-bold">${item.price.toFixed(2)}</span>
                                                    )}
                                                </div>
                                                <small className="text-muted">
                                                    <i className="bi bi-star-fill text-warning me-1"></i>
                                                    {item.rating}/5 • Cant: {item.quantity}
                                                </small>
                                            </Col>
                                            <Col xs={3} className="text-end">
                                                <Button 
                                                    variant="outline-danger"
                                                    size="sm"
                                                    onClick={() => onRemove(item.id)}
                                                >
                                                    <i className="bi bi-trash"></i>
                                                </Button>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                );
                            })}
                        </ListGroup>

                        <div className="border-top pt-3">
                            <h4 className="mb-0 fw-bold" style={{ color: COLORS.color1 }}>
                                Total: ${totalPrice.toFixed(2)}
                            </h4>
                        </div>
                    </>
                )}
            </Modal.Body>

            {items.length > 0 && (
                <Modal.Footer className="bg-light">
                    <Button variant="outline-danger" onClick={onClear}>
                        <i className="bi bi-trash me-2"></i>Vaciar Carrito
                    </Button>
                    <Button 
                        variant="primary" 
                        size="lg"
                        onClick={handleProceedToCheckout}
                        disabled={isProcessing}
                    >
                        <i className="bi bi-credit-card me-2"></i>
                        {isProcessing 
                            ? 'Procesando...' 
                            : isAuthenticated 
                                ? 'Proceder al Pago' 
                                : 'Inicia sesión para comprar'
                        }
                    </Button>
                </Modal.Footer>
            )}
        </Modal>
    );
};

export default Cart;