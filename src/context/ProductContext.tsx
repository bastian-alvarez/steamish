import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '../types/Product';
import productService from '../services/productService';

// Interfaces para ProductContext
export interface ProductContextType {
    products: Product[];
    loading: boolean;
    error: string | null;
    featuredProducts: Product[];
    getProductById: (id: string) => Product | undefined;
    getProductsByCategory: (category: string) => Product[];
    refreshProducts: () => void;
    addProduct: (product: Omit<Product, 'id'>) => Product;
    deleteProduct: (id: string) => boolean;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

// ProductProvider con estado mejorado usando useContext
export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Cargar productos al montar
    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = () => {
        try {
            setLoading(true);
            setError(null);
            const loadedProducts = productService.getAllProducts();
            setProducts(loadedProducts);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error al cargar productos');
        } finally {
            setLoading(false);
        }
    };

    // Productos destacados
    const featuredProducts = products.filter(p => p.featured);

    // Obtener producto por ID
    const getProductById = (id: string): Product | undefined => {
        return products.find(p => p.id === id);
    };

    // Obtener productos por categoría
    const getProductsByCategory = (category: string): Product[] => {
        return products.filter(p => p.category === category);
    };

    const value: ProductContextType = {
        products,
        loading,
        error,
        featuredProducts,
        getProductById,
        getProductsByCategory,
        refreshProducts: loadProducts,
        addProduct: (product: Omit<Product, 'id'>) => {
            const newProduct = productService.addProduct(product);
            loadProducts();
            return newProduct;
        },
        deleteProduct: (id: string) => {
            const deleted = productService.deleteProduct(id);
            if (deleted) {
                loadProducts();
            }
            return deleted;
        }
    };

    return (
        <ProductContext.Provider value={value}>
            {children}
        </ProductContext.Provider>
    );
};

// Hook para usar el contexto de productos
export const useProducts = (): ProductContextType => {
    const context = useContext(ProductContext);
    if (!context) {
        throw new Error('useProducts debe ser usado dentro de un ProductProvider');
    }
    return context;
};