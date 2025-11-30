// CartContext - Usa useState internamente para el estado del carrito
import React, { createContext, useContext, useState, useMemo, useCallback, ReactNode } from 'react';
import { Product } from '../types/Product';
import { CartItem, CartHook } from '../types/Cart';

// Contexto para compartir el estado del carrito usando useState
interface CartContextType extends CartHook {}

const CartContext = createContext<CartContextType | undefined>(undefined);

// Provider que usa useState para manejar el estado del carrito
export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [items, setItems] = useState<CartItem[]>([]);

    // Agregar producto al carrito
    const add = useCallback((product: Product) => {
        setItems(current => {
            const existing = current.find(item => item.id === product.id);
            if (existing) {
                return current.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...current, { ...product, quantity: 1 }];
        });
    }, []);

    // Remover producto del carrito
    const remove = useCallback((productId: string) => {
        setItems(current => current.filter(item => item.id !== productId));
    }, []);

    // Limpiar carrito
    const clear = useCallback(() => {
        setItems([]);
    }, []);

    // Actualizar cantidad de un producto
    const updateQuantity = useCallback((productId: string, quantity: number) => {
        if (quantity <= 0) {
            remove(productId);
            return;
        }
        setItems(current =>
            current.map(item =>
                item.id === productId ? { ...item, quantity } : item
            )
        );
    }, [remove]);

    // Calcular total de items
    const count = useMemo(() => {
        return items.reduce((total, item) => total + item.quantity, 0);
    }, [items]);

    // Calcular precio total
    const totalPrice = useMemo(() => {
        return items.reduce((total, item) => {
            const price = item.discount > 0
                ? item.price * (1 - item.discount / 100)
                : item.price;
            return total + (price * item.quantity);
        }, 0);
    }, [items]);

    const value: CartContextType = {
        items,
        count,
        totalPrice,
        add,
        remove,
        clear,
        updateQuantity
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};

// Hook para usar el carrito
export const useCart = (): CartHook => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart debe ser usado dentro de un CartProvider');
    }
    return context;
};
