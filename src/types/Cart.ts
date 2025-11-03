import { Product } from './Product';

// 🛒 Interfaces para el carrito de compras
export interface CartItem extends Product {
    quantity: number;
}

export interface CartState {
    items: CartItem[];
    count: number;
    totalPrice: number;
}

export interface CartActions {
    add: (product: Product) => void;
    remove: (productId: string) => void;
    clear: () => void;
    updateQuantity: (productId: string, quantity: number) => void;
}

export interface CartHook extends CartState, CartActions {}

