import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '../types/Product';
import productService from '../services/productService';

// Interfaces para ProductContext
export interface ProductContextType {
    products: Product[];
    loading: boolean;
    error: string | null;
    featuredProducts: Product[];
    getProductById: (id: string | number) => Product | undefined;
    getProductByIdAsync: (id: string | number) => Promise<Product | undefined>;
    getProductsByCategory: (category: string) => Product[];
    refreshProducts: (filters?: {
        categoria?: number;
        genero?: number;
        descuento?: boolean;
        search?: string;
    }) => Promise<void>;
    addProduct: (product: Omit<Product, 'id'>) => Promise<Product>;
    updateProduct: (id: string | number, product: Partial<Product>) => Promise<Product>;
    deleteProduct: (id: string) => Promise<boolean>;
    getCategories: () => Promise<any[]>;
    getGenres: () => Promise<any[]>;
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

    const loadProducts = async (filters?: {
        categoria?: number;
        genero?: number;
        descuento?: boolean;
        search?: string;
    }) => {
        try {
            setLoading(true);
            setError(null);
            const loadedProducts = await productService.getAllProducts(filters);
            setProducts(loadedProducts);
            if (loadedProducts.length === 0) {
                setError('No se encontraron juegos en la base de datos. Asegúrate de que el microservicio esté corriendo y tenga juegos registrados.');
            }
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Error al cargar productos';
            setError(errorMessage);
            setProducts([]); // Limpiar productos en caso de error
            console.error('Error al cargar productos desde el microservicio:', err);
        } finally {
            setLoading(false);
        }
    };

    // Productos destacados
    const featuredProducts = products.filter(p => p.featured);

    // Obtener producto por ID (sincrónico desde estado o asíncrono desde API)
    const getProductById = (id: string | number): Product | undefined => {
        return products.find(p => p.id === id || p.id?.toString() === id?.toString());
    };

    // Obtener producto por ID desde API
    const getProductByIdAsync = async (id: string | number): Promise<Product | undefined> => {
        try {
            return await productService.getProductById(id);
        } catch (err) {
            console.error('Error al obtener producto:', err);
            return undefined;
        }
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
        getProductByIdAsync,
        getProductsByCategory,
        refreshProducts: loadProducts,
        addProduct: async (product: Omit<Product, 'id'>) => {
            const newProduct = await productService.addProduct(product);
            await loadProducts();
            return newProduct;
        },
        updateProduct: async (id: string | number, product: Partial<Product>) => {
            const updatedProduct = await productService.updateProduct(id, product);
            await loadProducts();
            return updatedProduct;
        },
        deleteProduct: async (id: string) => {
            const deleted = await productService.deleteProduct(id);
            if (deleted) {
                await loadProducts();
            }
            return deleted;
        },
        getCategories: async () => {
            try {
                return await productService.getCategories();
            } catch (err) {
                console.error('Error al obtener categorías:', err);
                return [];
            }
        },
        getGenres: async () => {
            try {
                return await productService.getGenres();
            } catch (err) {
                console.error('Error al obtener géneros:', err);
                return [];
            }
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
