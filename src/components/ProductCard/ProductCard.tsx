import React from 'react';
import styles from './ProductCard.module.css';
import { Product } from '../../types/Product';

// 🎨 Producto Card Súper Bonito y Simple 
const ProductCard: React.FC<{ product: Product; onAdd: (product: Product) => void }> = ({ product, onAdd }) => {
    const discountedPrice = product.discount > 0 ? product.price * (1 - product.discount / 100) : product.price;
    
    return (
        <div className={styles.card}>
            <div className={styles.imageContainer}>
                <img src={product.image} alt={product.name} className={styles.image} />
                {product.discount > 0 && (
                    <div className={styles.discount}>-{product.discount}%</div>
                )}
                <div className={styles.rating}>
                    <span className={styles.stars}>{'★'.repeat(Math.floor(product.rating))}</span>
                    <span className={styles.ratingValue}>{product.rating}</span>
                </div>
            </div>
            
            <div className={styles.content}>
                <h3 className={styles.title}>{product.name}</h3>
                
                <div className={styles.priceContainer}>
                    {product.discount > 0 && (
                        <span className={styles.originalPrice}>${product.price.toFixed(2)}</span>
                    )}
                    <span className={styles.price}>${discountedPrice.toFixed(2)}</span>
                </div>
                
                <button className={styles.addButton} onClick={() => onAdd(product)}>
                    <span className={styles.buttonIcon}>🛒</span>
                    Agregar
                </button>
            </div>
        </div>
    );
};

export default ProductCard;