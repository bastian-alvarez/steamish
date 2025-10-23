import { useEffect, useState } from 'react';
import { Product } from '../types/Product';
import productService from '../services/productService';

const useProducts = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadProducts = () => {
            try {
                const fetchedProducts = productService.getAllProducts();
                setProducts(fetchedProducts);
            } catch (err) {
                setError('Error al cargar los productos');
            } finally {
                setLoading(false);
            }
        };

        loadProducts();
    }, []);

    return { products, loading, error };
};

export default useProducts;