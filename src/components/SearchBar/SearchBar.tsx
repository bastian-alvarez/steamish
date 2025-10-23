import React, { useState, useEffect, useCallback } from 'react';
import { Form, InputGroup, Button, Badge, Container, Row, Col } from 'react-bootstrap';
import { Product, SearchFilters, SearchResult } from '../../types/Product';

// 🔍 INTERFACE PARA PROPS DEL COMPONENTE
interface SearchBarProps {
    products: Product[];
    onSearchResult: (result: SearchResult) => void;
    placeholder?: string;
    showFilters?: boolean;
    initialQuery?: string;
}

// 🎮 DATOS DE EJEMPLO PARA DEMOSTRACIÓN
const SAMPLE_PRODUCTS: Product[] = [
    {
        id: '1',
        name: 'Cyber Adventure 2077',
        price: 59.99,
        image: '',
        rating: 4.9,
        discount: 0,
        category: 'Acción',
        description: 'Un mundo futurista lleno de acción y aventuras épicas',
        tags: ['Acción', 'RPG', 'Futurista', 'Aventura'],
        featured: true
    },
    {
        id: '2',
        name: 'Mystic Realms',
        price: 49.99,
        image: '',
        rating: 4.8,
        discount: 10,
        category: 'Aventura',
        description: 'Explora mundos mágicos en este increíble juego de aventuras',
        tags: ['Aventura', 'Magia', 'Fantasía', 'Exploración'],
        featured: true
    },
    {
        id: '3',
        name: 'Space Odyssey',
        price: 39.99,
        image: '',
        rating: 4.7,
        discount: 5,
        category: 'Simulación',
        description: 'Vive la experiencia definitiva del espacio',
        tags: ['Simulación', 'Espacio', 'Ciencia Ficción'],
        featured: true
    },
    {
        id: '4',
        name: 'Racing Thunder',
        price: 29.99,
        image: '',
        rating: 4.5,
        discount: 15,
        category: 'Carreras',
        description: 'Velocidad extrema en las mejores pistas del mundo',
        tags: ['Carreras', 'Velocidad', 'Competición'],
        featured: false
    },
    {
        id: '5',
        name: 'Medieval Kingdom',
        price: 44.99,
        image: '',
        rating: 4.6,
        discount: 0,
        category: 'Estrategia',
        description: 'Construye tu reino medieval y conquista territorios',
        tags: ['Estrategia', 'Medieval', 'Construcción', 'Guerra'],
        featured: false
    }
];

const SearchBar: React.FC<SearchBarProps> = ({ 
    products = SAMPLE_PRODUCTS, 
    onSearchResult, 
    placeholder = "Buscar juegos por nombre...",
    showFilters = true,
    initialQuery = ''
}) => {
    // 🎯 ESTADOS CON INTERFACES TIPADAS
    const [filters, setFilters] = useState<SearchFilters>({
        query: initialQuery,
        category: '',
        minRating: 0
    });
    
    const [searchResult, setSearchResult] = useState<SearchResult>({
        products: products,
        totalCount: products.length,
        filteredCount: products.length,
        searchTerm: ''
    });

    // 🔍 FUNCIÓN DE BÚSQUEDA PRINCIPAL
    const performSearch = useCallback((currentFilters: SearchFilters): SearchResult => {
        let filteredProducts = [...products];

        // Filtrar por nombre
        if (currentFilters.query.trim()) {
            filteredProducts = filteredProducts.filter(product =>
                product.name.toLowerCase().includes(currentFilters.query.toLowerCase()) ||
                product.description.toLowerCase().includes(currentFilters.query.toLowerCase()) ||
                product.tags.some(tag => tag.toLowerCase().includes(currentFilters.query.toLowerCase()))
            );
        }

        // Filtrar por categoría
        if (currentFilters.category) {
            filteredProducts = filteredProducts.filter(product =>
                product.category === currentFilters.category
            );
        }

        // Filtrar por rating mínimo
        if (currentFilters.minRating && currentFilters.minRating > 0) {
            filteredProducts = filteredProducts.filter(product =>
                product.rating >= currentFilters.minRating!
            );
        }

        // Filtrar por rango de precios
        if (currentFilters.minPrice) {
            filteredProducts = filteredProducts.filter(product =>
                product.price >= currentFilters.minPrice!
            );
        }

        if (currentFilters.maxPrice) {
            filteredProducts = filteredProducts.filter(product =>
                product.price <= currentFilters.maxPrice!
            );
        }

        return {
            products: filteredProducts,
            totalCount: products.length,
            filteredCount: filteredProducts.length,
            searchTerm: currentFilters.query
        };
    }, [products]);

    // 🎯 MANEJADOR DE CAMBIOS EN BÚSQUEDA
    const handleSearchChange = (query: string): void => {
        const newFilters: SearchFilters = { ...filters, query };
        setFilters(newFilters);
        
        const result = performSearch(newFilters);
        setSearchResult(result);
        onSearchResult(result);
    };

    // 🏷️ MANEJADOR DE FILTROS
    const handleFilterChange = (filterType: keyof SearchFilters, value: any): void => {
        const newFilters: SearchFilters = { ...filters, [filterType]: value };
        setFilters(newFilters);
        
        const result = performSearch(newFilters);
        setSearchResult(result);
        onSearchResult(result);
    };

    // 🧹 LIMPIAR FILTROS
    const clearFilters = (): void => {
        const defaultFilters: SearchFilters = { query: '', category: '', minRating: 0 };
        setFilters(defaultFilters);
        
        const result = performSearch(defaultFilters);
        setSearchResult(result);
        onSearchResult(result);
    };

    // 📋 OBTENER CATEGORÍAS ÚNICAS
    const getUniqueCategories = (): string[] => {
        return Array.from(new Set(products.map(product => product.category)));
    };

    // 🎨 EFECTO DE INICIALIZACIÓN
    useEffect(() => {
        const initialResult = performSearch(filters);
        setSearchResult(initialResult);
        onSearchResult(initialResult);
    }, [filters, onSearchResult, performSearch]);

    // 🔍 EFECTO PARA MANEJAR BÚSQUEDA INICIAL
    useEffect(() => {
        if (initialQuery) {
            const newFilters: SearchFilters = { ...filters, query: initialQuery };
            setFilters(newFilters);
            const result = performSearch(newFilters);
            setSearchResult(result);
            onSearchResult(result);
        }
    }, [initialQuery, filters, onSearchResult, performSearch]);

    return (
        <Container fluid className="py-4" style={{ backgroundColor: '#f8f9fa' }}>
            <Row className="justify-content-center">
                <Col xl={10} lg={11}>
                    {/* 🔍 BARRA DE BÚSQUEDA PRINCIPAL */}
                    <div className="mb-4">
                        <InputGroup size="lg" className="shadow-sm">
                            <InputGroup.Text className="bg-primary text-white border-primary">
                                <i className="bi bi-search"></i>
                            </InputGroup.Text>
                            <Form.Control
                                type="text"
                                placeholder={placeholder}
                                value={filters.query}
                                onChange={(e) => handleSearchChange(e.target.value)}
                                className="border-primary"
                                style={{ fontSize: '1.1rem' }}
                            />
                            {filters.query && (
                                <Button 
                                    variant="outline-primary" 
                                    onClick={() => handleSearchChange('')}
                                    className="border-primary"
                                >
                                    <i className="bi bi-x-lg"></i>
                                </Button>
                            )}
                        </InputGroup>
                    </div>

                    {/* 🎛️ FILTROS AVANZADOS */}
                    {showFilters && (
                        <Row className="mb-4">
                            <Col md={3} className="mb-2">
                                <Form.Select
                                    value={filters.category || ''}
                                    onChange={(e) => handleFilterChange('category', e.target.value)}
                                    className="border-info"
                                >
                                    <option value="">Todas las categorías</option>
                                    {getUniqueCategories().map(category => (
                                        <option key={category} value={category}>
                                            {category}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Col>
                            
                            <Col md={3} className="mb-2">
                                <Form.Select
                                    value={filters.minRating || 0}
                                    onChange={(e) => handleFilterChange('minRating', Number(e.target.value))}
                                    className="border-info"
                                >
                                    <option value={0}>Cualquier rating</option>
                                    <option value={4.5}>4.5+ estrellas</option>
                                    <option value={4.0}>4.0+ estrellas</option>
                                    <option value={3.5}>3.5+ estrellas</option>
                                </Form.Select>
                            </Col>
                            
                            <Col md={3} className="mb-2">
                                <InputGroup>
                                    <InputGroup.Text className="bg-info text-white">$</InputGroup.Text>
                                    <Form.Control
                                        type="number"
                                        placeholder="Precio mín"
                                        value={filters.minPrice || ''}
                                        onChange={(e) => handleFilterChange('minPrice', e.target.value ? Number(e.target.value) : undefined)}
                                        className="border-info"
                                    />
                                </InputGroup>
                            </Col>
                            
                            <Col md={3} className="mb-2">
                                <Button 
                                    variant="outline-primary" 
                                    onClick={clearFilters}
                                    className="w-100"
                                >
                                    <i className="bi bi-arrow-counterclockwise me-2"></i>
                                    Limpiar filtros
                                </Button>
                            </Col>
                        </Row>
                    )}

                    {/* 📊 RESULTADOS DE BÚSQUEDA */}
                    <Row className="align-items-center">
                        <Col md={8}>
                            <div className="d-flex align-items-center gap-3">
                                <Badge bg="primary" className="fs-6 px-3 py-2">
                                    <i className="bi bi-grid-3x3-gap me-2"></i>
                                    {searchResult.filteredCount} juegos encontrados
                                </Badge>
                                
                                {filters.query && (
                                    <Badge bg="info" className="fs-6 px-3 py-2">
                                        <i className="bi bi-search me-2"></i>
                                        "{filters.query}"
                                    </Badge>
                                )}
                                
                                {filters.category && (
                                    <Badge bg="secondary" className="fs-6 px-3 py-2">
                                        <i className="bi bi-tag me-2"></i>
                                        {filters.category}
                                    </Badge>
                                )}
                            </div>
                        </Col>
                        
                        <Col md={4} className="text-md-end mt-2 mt-md-0">
                            <small className="text-muted">
                                de {searchResult.totalCount} juegos totales
                            </small>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
};

export default SearchBar;