import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Form, InputGroup, Button, Badge, Container, Row, Col } from 'react-bootstrap';
import { Product, SearchFilters, SearchResult } from '../../types/Product';

interface SearchBarProps {
    products: Product[];
    onSearchResult: (result: SearchResult) => void;
    placeholder?: string;
    showFilters?: boolean;
    initialQuery?: string;
}

// 🎮 Datos simplificados con factory function
const createSampleProduct = (id: string, name: string, price: number, category: string, rating: number, discount = 0): Product => ({
    id, name, price, category, rating, discount, featured: discount === 0,
    image: '', description: `${name} - Descripción del juego`, tags: [category, 'Gaming']
});

const SAMPLE_PRODUCTS: Product[] = [
    createSampleProduct('1', 'Cyber Adventure 2077', 59.99, 'Acción', 4.9),
    createSampleProduct('2', 'Mystic Realms', 49.99, 'Aventura', 4.8, 10),
    createSampleProduct('3', 'Space Odyssey', 39.99, 'Simulación', 4.7, 5),
    createSampleProduct('4', 'Racing Thunder', 29.99, 'Carreras', 4.5, 15),
    createSampleProduct('5', 'Medieval Kingdom', 44.99, 'Estrategia', 4.6)
];

const SearchBar: React.FC<SearchBarProps> = ({ 
    products = SAMPLE_PRODUCTS, 
    onSearchResult, 
    placeholder = "Buscar juegos por nombre...",
    showFilters = true,
    initialQuery = ''
}) => {
    const [filters, setFilters] = useState<SearchFilters>({
        query: initialQuery, category: '', minRating: 0
    });

    // 🔍 Búsqueda optimizada con useMemo
    const searchResult = useMemo((): SearchResult => {
        const filtered = products.filter(product => {
            const matchesQuery = !filters.query || 
                product.name.toLowerCase().includes(filters.query.toLowerCase()) ||
                product.description.toLowerCase().includes(filters.query.toLowerCase()) ||
                product.tags?.some(tag => tag.toLowerCase().includes(filters.query.toLowerCase()));
            
            const matchesCategory = !filters.category || product.category === filters.category;
            const matchesRating = !filters.minRating || product.rating >= filters.minRating;
            const matchesPrice = (!filters.minPrice || product.price >= filters.minPrice) &&
                               (!filters.maxPrice || product.price <= filters.maxPrice);
            
            return matchesQuery && matchesCategory && matchesRating && matchesPrice;
        });

        return {
            products: filtered,
            totalCount: products.length,
            filteredCount: filtered.length,
            searchTerm: filters.query
        };
    }, [products, filters]);

    // 🎯 Actualizadores de filtros simplificados
    const updateFilter = useCallback((updates: Partial<SearchFilters>) => {
        setFilters(prev => ({ ...prev, ...updates }));
    }, []);

    const clearFilters = useCallback(() => {
        setFilters({ query: '', category: '', minRating: 0 });
    }, []);

    const categories = useMemo(() => 
        Array.from(new Set(products.map(p => p.category))), [products]
    );

    // 📡 Efecto para notificar cambios
    useEffect(() => {
        onSearchResult(searchResult);
    }, [searchResult, onSearchResult]);

    return (
        <Container fluid className="py-4" style={{ backgroundColor: '#f8f9fa' }}>
            <Row className="justify-content-center">
                <Col xl={10} lg={11}>
                    {/* 🔍 Barra de búsqueda principal */}
                    <div className="mb-4">
                        <InputGroup size="lg" className="shadow-sm">
                            <InputGroup.Text className="bg-primary text-white border-primary">
                                <i className="bi bi-search"></i>
                            </InputGroup.Text>
                            <Form.Control
                                type="text"
                                placeholder={placeholder}
                                value={filters.query}
                                onChange={(e) => updateFilter({ query: e.target.value })}
                                className="border-primary"
                                style={{ fontSize: '1.1rem' }}
                            />
                            {filters.query && (
                                <Button 
                                    variant="outline-primary" 
                                    onClick={() => updateFilter({ query: '' })}
                                    className="border-primary"
                                >
                                    <i className="bi bi-x-lg"></i>
                                </Button>
                            )}
                        </InputGroup>
                    </div>

                    {/* 🎛️ Filtros compactos */}
                    {showFilters && (
                        <Row className="mb-4">
                            <Col md={3} className="mb-2">
                                <Form.Select
                                    value={filters.category || ''}
                                    onChange={(e) => updateFilter({ category: e.target.value })}
                                    className="border-info"
                                >
                                    <option value="">Todas las categorías</option>
                                    {categories.map(category => (
                                        <option key={category} value={category}>{category}</option>
                                    ))}
                                </Form.Select>
                            </Col>
                            
                            <Col md={3} className="mb-2">
                                <Form.Select
                                    value={filters.minRating || 0}
                                    onChange={(e) => updateFilter({ minRating: Number(e.target.value) })}
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
                                        onChange={(e) => updateFilter({ minPrice: e.target.value ? Number(e.target.value) : undefined })}
                                        className="border-info"
                                    />
                                </InputGroup>
                            </Col>
                            
                            <Col md={3} className="mb-2">
                                <Button variant="outline-primary" onClick={clearFilters} className="w-100">
                                    <i className="bi bi-arrow-counterclockwise me-2"></i>Limpiar filtros
                                </Button>
                            </Col>
                        </Row>
                    )}

                    {/* 📊 Resultados compactos */}
                    <Row className="align-items-center">
                        <Col md={8}>
                            <div className="d-flex align-items-center gap-3">
                                <Badge bg="primary" className="fs-6 px-3 py-2">
                                    <i className="bi bi-grid-3x3-gap me-2"></i>{searchResult.filteredCount} juegos encontrados
                                </Badge>
                                
                                {filters.query && (
                                    <Badge bg="info" className="fs-6 px-3 py-2">
                                        <i className="bi bi-search me-2"></i>"{filters.query}"
                                    </Badge>
                                )}
                                
                                {filters.category && (
                                    <Badge bg="secondary" className="fs-6 px-3 py-2">
                                        <i className="bi bi-tag me-2"></i>{filters.category}
                                    </Badge>
                                )}
                            </div>
                        </Col>
                        
                        <Col md={4} className="text-md-end mt-2 mt-md-0">
                            <small className="text-muted">de {searchResult.totalCount} juegos totales</small>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
};

export default SearchBar;