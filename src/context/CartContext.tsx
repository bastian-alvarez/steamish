import React, { createContext, useContext, useState } from 'react';
import { Product } from '../types/Product';

// 🛒 CARRITO CON PRODUCTOS REALES
interface CartItem extends Product {
    quantity: number;
}

interface CartContextType {
    items: CartItem[];
    count: number;
    totalPrice: number;
    add: (product: Product) => void;
    remove: (productId: string) => void;
    clear: () => void;
}

const CartContext = createContext<CartContextType>({
    items: [],
    count: 0,
    totalPrice: 0,
    add: () => {},
    remove: () => {},
    clear: () => {}
});

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [items, setItems] = useState<CartItem[]>([]);

    const add = (product: Product) => {
        setItems(currentItems => {
            const existingItem = currentItems.find(item => item.id === product.id);
            if (existingItem) {
                // Si ya existe, aumentar cantidad
                return currentItems.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                // Si no existe, agregar nuevo
                return [...currentItems, { ...product, quantity: 1 }];
            }
        });
    };

    const remove = (productId: string) => {
        setItems(currentItems => currentItems.filter(item => item.id !== productId));
    };

    const clear = () => {
        setItems([]);
    };

    const count = items.reduce((total, item) => total + item.quantity, 0);
    
    const totalPrice = items.reduce((total, item) => {
        const discountedPrice = item.discount > 0 
            ? item.price * (1 - item.discount / 100) 
            : item.price;
        return total + (discountedPrice * item.quantity);
    }, 0);

    return (
        <CartContext.Provider value={{ items, count, totalPrice, add, remove, clear }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);