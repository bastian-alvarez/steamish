import React, { createContext, useContext } from 'react';
import { Product } from '../types/Product';
import productService from '../services/productService';

// 🎯 CONTEXTO SÚPER SIMPLE - Sin loading ni error states complicados
const ProductContext = createContext<Product[]>([]);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const products = productService.getAllProducts();
    return (
        <ProductContext.Provider value={products}>
            {children}
        </ProductContext.Provider>
    );
};

export const useProducts = () => useContext(ProductContext);