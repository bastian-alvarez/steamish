import React from 'react';
import { useCart } from '../../context/CartContext';
import styles from './Cart.module.css';

// 🛒 Cart Modal con Detalles de Juegos
interface CartProps {
    isOpen: boolean;
    onClose: () => void;
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose }) => {
    const { items, count, totalPrice, remove, clear } = useCart();

    if (!isOpen) return null;

    return (
        <div className={styles.cartOverlay} onClick={onClose}>
            <div className={styles.cartModal} onClick={(e) => e.stopPropagation()}>
                <div className={styles.cartHeader}>
                    <h2 className={styles.cartTitle}>
                        <span className={styles.cartTitleIcon}>🛒</span>
                        Mi Carrito ({count})
                    </h2>
                    <button className={styles.closeButton} onClick={onClose}>
                        ✕
                    </button>
                </div>

                <div className={styles.cartContent}>
                    {items.length === 0 ? (
                        <div className={styles.emptyCart}>
                            <div className={styles.emptyIcon}>🛒</div>
                            <h3>Tu carrito está vacío</h3>
                            <p>¡Agrega algunos juegos increíbles!</p>
                        </div>
                    ) : (
                        <>
                            <div className={styles.cartItemsList}>
                                {items.map((item) => {
                                    const discountedPrice = item.discount > 0 
                                        ? item.price * (1 - item.discount / 100) 
                                        : item.price;
                                    
                                    return (
                                        <div key={item.id} className={styles.cartItem}>
                                            <img 
                                                src={item.image} 
                                                alt={item.name}
                                                className={styles.itemImage}
                                            />
                                            <div className={styles.itemDetails}>
                                                <h4 className={styles.itemName}>{item.name}</h4>
                                                <div className={styles.itemPrice}>
                                                    {item.discount > 0 ? (
                                                        <>
                                                            <span className={styles.originalPrice}>
                                                                ${item.price.toFixed(2)}
                                                            </span>
                                                            <span className={styles.discountPrice}>
                                                                ${discountedPrice.toFixed(2)}
                                                            </span>
                                                            <span className={styles.discountBadge}>
                                                                -{item.discount}%
                                                            </span>
                                                        </>
                                                    ) : (
                                                        <span className={styles.normalPrice}>
                                                            ${item.price.toFixed(2)}
                                                        </span>
                                                    )}
                                                </div>
                                                <div className={styles.itemMeta}>
                                                    <span className={styles.quantity}>
                                                        🎮 Cantidad: {item.quantity}
                                                    </span>
                                                    <span className={styles.rating}>
                                                        ⭐ {item.rating}/5
                                                    </span>
                                                </div>
                                            </div>
                                            <button 
                                                onClick={() => remove(item.id)}
                                                className={styles.removeButton}
                                                title="Eliminar del carrito"
                                            >
                                                🗑️
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className={styles.cartFooter}>
                                <div className={styles.totalSection}>
                                    <div className={styles.finalTotal}>
                                        <strong>Total: ${totalPrice.toFixed(2)}</strong>
                                    </div>
                                    <div className={styles.actionButtons}>
                                        <button 
                                            onClick={clear}
                                            className={styles.clearButton}
                                        >
                                            🗑️ Vaciar Carrito
                                        </button>
                                        <button className={styles.checkoutButton}>
                                            <span className={styles.buttonIcon}>💳</span>
                                            Proceder al Pago
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Cart;