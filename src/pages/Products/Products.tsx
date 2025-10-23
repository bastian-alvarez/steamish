import React, { useState, useEffect } from 'react';
import { useProducts } from '../../context/ProductContext';
import { useCart } from '../../context/CartContext';
import { useLocation } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import SearchBar from '../../components/SearchBar/SearchBar';
import GameResults from '../../components/GameResults/GameResults';
import { Product, SearchResult } from '../../types/Product';

const Products: React.FC = () => {
    // 🎯 ESTADOS TIPADOS CON INTERFACES
    const products = useProducts();
    const { add } = useCart();
    const location = useLocation();
    const [searchResult, setSearchResult] = useState<SearchResult>({
        products: [],
        totalCount: 0,
        filteredCount: 0,
        searchTerm: ''
    });
    const [initialSearchTerm, setInitialSearchTerm] = useState<string>('');

    // 🔍 DETECTAR PARÁMETROS DE BÚSQUEDA EN LA URL
    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchParam = urlParams.get('search');
        if (searchParam) {
            setInitialSearchTerm(searchParam);
        }
    }, [location.search]);

    // 🎮 MANEJADOR DE SELECCIÓN DE JUEGO
    const handleGameSelect = (product: Product): void => {
        add(product);
        // Aquí podrías agregar notificaciones o feedback visual
        console.log(`Juego "${product.name}" agregado al carrito`);
    };

    // 🔍 MANEJADOR DE RESULTADOS DE BÚSQUEDA
    const handleSearchResult = (result: SearchResult): void => {
        setSearchResult(result);
    };

    return (
        <div className="bg-light min-vh-100">
            {/* 🎯 HEADER DE LA PÁGINA */}
            <div className="bg-primary text-white py-5">
                <Container>
                    <Row>
                        <Col className="text-center">
                            <h1 className="display-4 fw-bold mb-3">
                                <i className="bi bi-controller text-info me-3"></i>
                                Catálogo de Juegos
                            </h1>
                            <p className="lead">Encuentra tu próximo juego favorito</p>
                        </Col>
                    </Row>
                </Container>
            </div>

            {/* 🔍 BARRA DE BÚSQUEDA */}
            <SearchBar 
                products={products} 
                onSearchResult={handleSearchResult}
                placeholder="Buscar juegos por nombre, categoría o etiquetas..."
                showFilters={true}
                initialQuery={initialSearchTerm}
            />

            {/* 🎮 RESULTADOS DE BÚSQUEDA */}
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