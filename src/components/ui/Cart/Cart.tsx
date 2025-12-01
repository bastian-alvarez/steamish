import React, { useState } from 'react';
import { Modal, Button, ListGroup, Badge, Row, Col, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { CartProps } from '../../../types/Component';
import { useAuth } from '../../../context/AuthContext';
import { useNotification } from '../NotificationToast/NotificationToast';
import { useCart } from '../../../context/CartContext';
import libraryService from '../../../services/libraryService';
import orderService from '../../../services/orderService';
import { COLORS } from '../../../config/constants';

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

    // Funciones para incrementar/decrementar cantidad
    const handleIncreaseQuantity = (productId: string, currentQuantity: number) => {
        cart.updateQuantity(productId, currentQuantity + 1);
    };

    const handleDecreaseQuantity = (productId: string, currentQuantity: number) => {
        if (currentQuantity > 1) {
            cart.updateQuantity(productId, currentQuantity - 1);
        } else {
            onRemove(productId);
        }
    };

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
            // Validaciones previas
            if (!user || !user.id) {
                throw new Error('Usuario no válido. Por favor, inicia sesión nuevamente.');
            }

            if (items.length === 0) {
                showWarning('Tu carrito está vacío');
                setIsProcessing(false);
                return;
            }

            // Validar que todos los items tengan ID y cantidad válidos
            const invalidItems = items.filter(item => !item.id || item.quantity <= 0);
            if (invalidItems.length > 0) {
                throw new Error('Algunos productos en el carrito tienen datos inválidos');
            }

            // Convertir userId a number si es string
            const userId = typeof user.id === 'string' ? parseInt(user.id) : user.id;
            
            if (isNaN(userId) || userId <= 0) {
                throw new Error('ID de usuario inválido');
            }

            // Preparar items para la orden
            const cartItems = items.map(item => {
                const itemId = typeof item.id === 'string' ? parseInt(item.id) : item.id;
                if (isNaN(itemId) || itemId <= 0) {
                    throw new Error(`ID de producto inválido: ${item.id}`);
                }
                if (item.quantity <= 0) {
                    throw new Error(`Cantidad inválida para ${item.name}`);
                }
                return {
                    id: itemId,
                    quantity: item.quantity
                };
            });

            console.log('Procesando checkout:', {
                userId,
                itemsCount: cartItems.length,
                items: cartItems
            });
            
            // Crear orden en el microservicio
            // Nota: El backend ya agrega automáticamente los juegos a la biblioteca del usuario
            const order = await orderService.createOrderFromCart(userId, cartItems);
            
            // Limpiar el carrito
            cart.clear();
            
            // Cerrar el modal
            onClose();
            
            // Mostrar mensaje de éxito
            showSuccess(`¡Compra exitosa! Orden #${order.id} creada. ${items.length} ${items.length === 1 ? 'juego agregado' : 'juegos agregados'} a tu biblioteca.`);
            
            // Redirigir a la biblioteca después de 1 segundo
            setTimeout(() => {
                navigate('/biblioteca');
            }, 1500);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Error al procesar el pago';
            showWarning(`Error: ${errorMessage}. Intenta nuevamente.`);
            console.error('Error en checkout:', {
                error,
                user: user?.id,
                itemsCount: items.length,
                items: items.map(i => ({ id: i.id, quantity: i.quantity }))
            });
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <Modal show={isOpen} onHide={onClose} centered size="lg" className="cart-modal">
            <Modal.Header closeButton className="text-white border-0" style={{ background: COLORS.gradientPrimary }}>
                <Modal.Title className="d-flex align-items-center">
                    <i className="bi bi-cart3 me-2" style={{ fontSize: '1.5rem' }}></i>
                    <div>
                        <div className="fw-bold">Mi Carrito</div>
                        <small className="opacity-75">{count} {count === 1 ? 'artículo' : 'artículos'}</small>
                    </div>
                </Modal.Title>
            </Modal.Header>

            <Modal.Body className="p-0" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
                {/* Alerta de autenticación requerida */}
                {showAuthAlert && (
                    <Alert 
                        variant="warning" 
                        className="m-3 mb-0 animate__animated animate__fadeIn"
                        onClose={() => setShowAuthAlert(false)} 
                        dismissible
                    >
                        <i className="bi bi-exclamation-triangle me-2"></i>
                        <strong>Inicia sesión para comprar</strong> Debes iniciar sesión para proceder con el pago. Redirigiendo...
                    </Alert>
                )}

                {items.length === 0 ? (
                    <div className="text-center py-5 px-4">
                        <i className="bi bi-cart-x text-muted" style={{ fontSize: '5rem', opacity: 0.5 }}></i>
                        <h4 className="mt-4 mb-2" style={{ color: COLORS.color4 }}>Tu carrito está vacío</h4>
                        <p className="text-muted mb-4">¡Agrega algunos juegos increíbles a tu carrito!</p>
                        <Button 
                            variant="primary" 
                            onClick={onClose}
                            style={{ background: COLORS.gradientPrimary, border: 'none' }}
                        >
                            <i className="bi bi-arrow-left me-2"></i>Explorar Juegos
                        </Button>
                    </div>
                ) : (
                    <>
                        <div className="p-3">
                            <ListGroup variant="flush">
                                {items.map((item) => {
                                    const itemPrice = item.price ?? 0;
                                    const itemDiscount = item.discount ?? 0;
                                    const unitPrice = itemDiscount > 0 
                                        ? itemPrice * (1 - itemDiscount / 100) 
                                        : itemPrice;
                                    const subtotal = unitPrice * item.quantity;
                                    
                                    return (
                                        <ListGroup.Item 
                                            key={item.id} 
                                            className="border-bottom px-0 py-3"
                                            style={{ borderColor: 'rgba(0,0,0,0.1)' }}
                                        >
                                            <Row className="align-items-center g-3">
                                                {/* Imagen del producto */}
                                                <Col xs={12} sm={3} className="text-center">
                                                    <div className="position-relative d-inline-block">
                                                        <img 
                                                            src={item.image || '/placeholder-game.jpg'} 
                                                            alt={item.name}
                                                            className="img-fluid rounded shadow-sm"
                                                            style={{ 
                                                                width: '100px', 
                                                                height: '100px', 
                                                                objectFit: 'cover',
                                                                border: '2px solid rgba(0,0,0,0.1)'
                                                            }}
                                                            onError={(e) => {
                                                                (e.target as HTMLImageElement).src = '/placeholder-game.jpg';
                                                            }}
                                                        />
                                                        {itemDiscount > 0 && (
                                                            <Badge 
                                                                bg="danger" 
                                                                className="position-absolute top-0 start-0 translate-middle"
                                                                style={{ fontSize: '0.7rem' }}
                                                            >
                                                                -{itemDiscount}%
                                                            </Badge>
                                                        )}
                                                    </div>
                                                </Col>

                                                {/* Información del producto */}
                                                <Col xs={12} sm={5}>
                                                    <h6 className="mb-2 fw-bold" style={{ color: COLORS.color1 }}>
                                                        {item.name}
                                                    </h6>
                                                    <div className="mb-2">
                                                        {itemDiscount > 0 && itemPrice > 0 ? (
                                                            <div className="d-flex align-items-center gap-2 flex-wrap">
                                                                <span className="text-decoration-line-through text-muted small">
                                                                    ${itemPrice.toFixed(2)}
                                                                </span>
                                                                <span className="text-success fw-bold fs-6">
                                                                    ${unitPrice.toFixed(2)}
                                                                </span>
                                                                <small className="text-muted">c/u</small>
                                                            </div>
                                                        ) : (
                                                            <div className="d-flex align-items-center gap-2">
                                                                <span className="text-success fw-bold fs-6">
                                                                    ${unitPrice.toFixed(2)}
                                                                </span>
                                                                <small className="text-muted">c/u</small>
                                                            </div>
                                                        )}
                                                    </div>
                                                    {item.rating && item.rating > 0 && (
                                                        <div className="d-flex align-items-center gap-1 mb-2">
                                                            <i className="bi bi-star-fill text-warning" style={{ fontSize: '0.85rem' }}></i>
                                                            <small className="text-muted">{item.rating.toFixed(1)}/5</small>
                                                        </div>
                                                    )}
                                                    <div className="text-primary fw-semibold">
                                                        Subtotal: ${subtotal.toFixed(2)}
                                                    </div>
                                                </Col>

                                                {/* Controles de cantidad y eliminar */}
                                                <Col xs={12} sm={4} className="text-center text-sm-end">
                                                    {/* Controles de cantidad */}
                                                    <div className="d-flex align-items-center justify-content-center justify-content-sm-end gap-2 mb-3">
                                                        <Button
                                                            variant="outline-secondary"
                                                            size="sm"
                                                            onClick={() => handleDecreaseQuantity(item.id, item.quantity)}
                                                            style={{
                                                                width: '35px',
                                                                height: '35px',
                                                                padding: 0,
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                                borderRadius: '50%'
                                                            }}
                                                        >
                                                            <i className="bi bi-dash"></i>
                                                        </Button>
                                                        <div 
                                                            className="fw-bold px-3"
                                                            style={{ 
                                                                minWidth: '50px',
                                                                fontSize: '1.1rem',
                                                                color: COLORS.color4
                                                            }}
                                                        >
                                                            {item.quantity}
                                                        </div>
                                                        <Button
                                                            variant="outline-primary"
                                                            size="sm"
                                                            onClick={() => handleIncreaseQuantity(item.id, item.quantity)}
                                                            style={{
                                                                width: '35px',
                                                                height: '35px',
                                                                padding: 0,
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                                borderRadius: '50%',
                                                                background: COLORS.color4,
                                                                borderColor: COLORS.color4,
                                                                color: 'white'
                                                            }}
                                                        >
                                                            <i className="bi bi-plus"></i>
                                                        </Button>
                                                    </div>

                                                    {/* Botón eliminar */}
                                                    <Button 
                                                        variant="outline-danger"
                                                        size="sm"
                                                        onClick={() => onRemove(item.id)}
                                                        className="w-100 w-sm-auto"
                                                    >
                                                        <i className="bi bi-trash me-1"></i>
                                                        Eliminar
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    );
                                })}
                            </ListGroup>
                        </div>

                        {/* Resumen del total */}
                        <div 
                            className="border-top p-4 sticky-bottom"
                            style={{ 
                                background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
                                borderTop: '2px solid rgba(0,0,0,0.1)'
                            }}
                        >
                            <Row className="mb-3">
                                <Col xs={6}>
                                    <div className="text-muted">Subtotal ({count} {count === 1 ? 'artículo' : 'artículos'}):</div>
                                </Col>
                                <Col xs={6} className="text-end">
                                    <div className="fw-bold">${(totalPrice ?? 0).toFixed(2)}</div>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={6}>
                                    <div className="fs-5 fw-bold" style={{ color: COLORS.color1 }}>
                                        Total:
                                    </div>
                                </Col>
                                <Col xs={6} className="text-end">
                                    <div className="fs-4 fw-bold text-success">
                                        ${(totalPrice ?? 0).toFixed(2)}
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </>
                )}
            </Modal.Body>

            {items.length > 0 && (
                <Modal.Footer className="border-0 p-3" style={{ background: '#f8f9fa' }}>
                    <div className="d-flex gap-2 w-100 flex-column flex-sm-row">
                        <Button 
                            variant="outline-danger" 
                            onClick={onClear}
                            className="flex-fill"
                        >
                            <i className="bi bi-trash me-2"></i>Vaciar Carrito
                        </Button>
                        <Button 
                            variant="primary" 
                            size="lg"
                            onClick={handleProceedToCheckout}
                            disabled={isProcessing}
                            className="flex-fill"
                            style={{ 
                                background: COLORS.gradientPrimary, 
                                border: 'none',
                                fontWeight: '600'
                            }}
                        >
                            {isProcessing ? (
                                <>
                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                    Procesando...
                                </>
                            ) : isAuthenticated ? (
                                <>
                                    <i className="bi bi-credit-card me-2"></i>
                                    Proceder al Pago
                                </>
                            ) : (
                                <>
                                    <i className="bi bi-box-arrow-in-right me-2"></i>
                                    Inicia sesión para comprar
                                </>
                            )}
                        </Button>
                    </div>
                </Modal.Footer>
            )}
        </Modal>
    );
};

export default Cart;
