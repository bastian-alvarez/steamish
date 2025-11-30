import React, { useState, useEffect } from 'react';
import { useProducts } from '../../context/ProductContext';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../components/ui/NotificationToast/NotificationToast';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Toast, ToastContainer } from 'react-bootstrap';
import SearchBar from '../../components/ui/SearchBar/SearchBar';
import GameResults from '../../components/ui/GameResults/GameResults';
import { Product, SearchResult } from '../../types/Product';
import { COLORS } from '../../config/constants';

// Products con useState para el carrito y mejor uso de interfaces
const Products: React.FC = () => {
    const { products, loading, error } = useProducts();
    const cart = useCart();
    const { isAuthenticated } = useAuth();
    const { showSuccess, showWarning } = useNotification();
    const location = useLocation();
    const navigate = useNavigate();
    const [searchResult, setSearchResult] = useState<SearchResult>({
        products: [],
        totalCount: 0,
        filteredCount: 0,
        searchTerm: ''
    });
    const [initialSearchTerm, setInitialSearchTerm] = useState<string>('');
    const [showAuthToast, setShowAuthToast] = useState(false);

    // URL search params detection
    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchParam = urlParams.get('search');
        if (searchParam) setInitialSearchTerm(searchParam);
    }, [location.search]);

    // Event handlers
    const handleGameSelect = (product: Product): void => {
        // Verificar si el usuario está autenticado
        if (!isAuthenticated) {
            showWarning('Debes iniciar sesión para agregar productos al carrito');
            setShowAuthToast(true);
            setTimeout(() => {
                navigate('/login');
            }, 2000);
            return;
        }
        
        cart.add(product);
        showSuccess(`¡${product.name} agregado al carrito!`);
    };

    const handleSearchResult = (result: SearchResult): void => {
        setSearchResult(result);
    };

    // 🔄 Inicializar con todos los productos al cargar
    useEffect(() => {
        if (products.length > 0 && searchResult.products.length === 0 && !initialSearchTerm) {
            setSearchResult({
                products: products,
                totalCount: products.length,
                filteredCount: products.length,
                searchTerm: ''
            });
        }
    }, [products, searchResult.products.length, initialSearchTerm]);

    return (
        <div className="bg-light min-vh-100">
            {/* Header */}
            <div className="bg-primary text-white py-5" style={{ background: COLORS.gradientPrimary }}>
                <Container>
                    <Row>
                        <Col className="text-center">
                            <h1 className="display-4 fw-bold mb-3 text-white">
                                <i className="bi bi-controller me-3"></i>Catálogo de Juegos
                            </h1>
                            <p className="lead text-white">Encuentra tu próximo juego favorito</p>
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
                {loading ? (
                    <div className="text-center py-5">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Cargando juegos...</span>
                        </div>
                        <p className="mt-3 text-muted">Cargando juegos desde la base de datos...</p>
                    </div>
                ) : error ? (
                    <div className="alert alert-warning" role="alert">
                        <i className="bi bi-exclamation-triangle me-2"></i>
                        <strong>Advertencia:</strong> {error}
                        <br />
                        <small>Verifica que el microservicio game-catalog-service esté corriendo en el puerto 3002.</small>
                    </div>
                ) : products.length === 0 ? (
                    <div className="text-center py-5">
                        <i className="bi bi-inbox display-1 text-muted"></i>
                        <h3 className="mt-3 text-muted">No hay juegos disponibles</h3>
                        <p className="text-muted">No se encontraron juegos en la base de datos.</p>
                    </div>
                ) : (
                    <GameResults 
                        products={searchResult.products.length > 0 ? searchResult.products : products}
                        searchTerm={searchResult.searchTerm}
                        onGameSelect={handleGameSelect}
                    />
                )}
            </Container>

            {/* Toast para mostrar mensaje de autenticación requerida */}
            <ToastContainer position="top-end" className="p-3" style={{ zIndex: 9999 }}>
                <Toast 
                    show={showAuthToast} 
                    onClose={() => setShowAuthToast(false)} 
                    delay={3000} 
                    autohide
                    bg="warning"
                >
                    <Toast.Header>
                        <i className="bi bi-exclamation-triangle me-2"></i>
                        <strong className="me-auto">Autenticación requerida</strong>
                    </Toast.Header>
                    <Toast.Body>
                        Debes iniciar sesión para agregar productos al carrito. Redirigiendo...
                    </Toast.Body>
                </Toast>
            </ToastContainer>
        </div>
    );
};

export default Products;
