import React, { useState, useEffect } from 'react';
import { useProducts } from '../../context/ProductContext';
import { useCart } from '../../context/CartContext';
import { useLocation } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import SearchBar from '../../components/SearchBar/SearchBar';
import GameResults from '../../components/GameResults/GameResults';
import { Product, SearchResult } from '../../types/Product';

// 🎮 Products con useState para el carrito y mejor uso de interfaces
const Products: React.FC = () => {
    const { products } = useProducts();
    const cart = useCart();
    const location = useLocation();
    const [searchResult, setSearchResult] = useState<SearchResult>({
        products: [],
        totalCount: 0,
        filteredCount: 0,
        searchTerm: ''
    });
    const [initialSearchTerm, setInitialSearchTerm] = useState<string>('');

    // 🔍 URL search params detection
    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchParam = urlParams.get('search');
        if (searchParam) setInitialSearchTerm(searchParam);
    }, [location.search]);

    // 🎮 Event handlers
    const handleGameSelect = (product: Product): void => {
        cart.add(product);
        console.log(`Juego "${product.name}" agregado al carrito`);
    };

    const handleSearchResult = (result: SearchResult): void => {
        setSearchResult(result);
    };

    return (
        <div className="bg-light min-vh-100">
            {/* Header */}
            <div className="bg-primary text-white py-5" style={{ background: 'var(--gradient-primary)' }}>
                <Container>
                    <Row>
                        <Col className="text-center">
                            <h1 className="display-4 fw-bold mb-3">
                                <i className="bi bi-controller me-3" style={{ color: 'var(--color-1)' }}></i>Catálogo de Juegos
                            </h1>
                            <p className="lead">Encuentra tu próximo juego favorito</p>
                        </Col>
                    </Row>
                </Container>
            </div>

            {/* Search + Results */}
            <SearchBar 
                products={products} 
                onSearchResult={handleSearchResult}
                placeholder="Buscar juegos por nombre, categoría o etiquetas..."
                showFilters={true}
                initialQuery={initialSearchTerm}
            />

            <Container className="py-4">
                <GameResults 
                    products={searchResult.products}
                    searchTerm={searchResult.searchTerm}
                    onGameSelect={handleGameSelect}
                />
            </Container>
        </div>
    );
};

export default Products;