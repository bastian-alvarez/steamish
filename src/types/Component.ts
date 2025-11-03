import React from 'react';
import { Product, SearchResult } from './Product';
import { CartItem } from './Cart';

// 🎯 Interfaces para props de componentes

export interface CartProps {
    isOpen: boolean;
    onClose: () => void;
    items: CartItem[];
    count: number;
    totalPrice: number;
    onRemove: (productId: string) => void;
    onClear: () => void;
}

export interface GameResultsProps {
    products: Product[];
    searchTerm: string;
    onGameSelect?: (product: Product) => void;
}

export interface SearchBarProps {
    products: Product[];
    onSearchResult: (result: SearchResult) => void;
    placeholder?: string;
    showFilters?: boolean;
    initialQuery?: string;
}

export interface HeaderProps {
    cartCount: number;
    onCartClick: () => void;
}

export interface NavigationItem {
    to: string;
    icon: string;
    label: string;
    color?: string;
}

export interface FormField {
    field: string;
    icon: string;
    label: string;
    type: string;
    placeholder: string;
}

export interface ProductCardProps {
    product: Product;
    onAddToCart: (product: Product) => void;
    highlightTerm?: string;
}

