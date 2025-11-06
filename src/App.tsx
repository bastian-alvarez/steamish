import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ProductProvider } from './context/ProductContext';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { NotificationProvider } from './components/NotificationToast/NotificationToast';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Home from './pages/Home/Home';
import Products from './pages/Products/Products';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import Blogs from './pages/Blogs/Blogs';
import BlogDetail from './pages/BlogDetail/BlogDetail';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Admin from './pages/Admin/Admin';
import Library from './pages/Library/Library';
import Moderator from './pages/Moderator/Moderator';

// Interfaces para rutas
interface RouteConfig {
    path: string;
    component: React.ComponentType;
}

// App con mejor uso de interfaces y useContext
const App: React.FC = () => {
    const routes: RouteConfig[] = [
        { path: '/', component: Home },
        { path: '/productos', component: Products },
        { path: '/blogs', component: Blogs },
        { path: '/nosotros', component: About },
        { path: '/contacto', component: Contact },
        { path: '/login', component: Login },
        { path: '/registro', component: Register },
        { path: '/admin', component: Admin }
    ];

    return (
        <AuthProvider>
            <ProductProvider>
                <CartProvider>
                    <NotificationProvider>
                        <Router>
                            <div className="d-flex flex-column min-vh-100">
                                <Header />
                            <main className="flex-grow-1">
                                <Routes>
                                    {routes
                                        .filter(route => route.path !== '/admin') // Filtrar admin de rutas públicas
                                        .map(({ path, component: Component }) => (
                                            <Route key={path} path={path} element={<Component />} />
                                        ))}
                                {/* Ruta para detalle de blog */}
                                <Route path="/blogs/:id" element={<BlogDetail />} />
                                {/* Ruta para detalle de producto */}
                                <Route path="/productos/:id" element={<ProductDetail />} />
                                {/* Ruta protegida para Biblioteca */}
                                <Route 
                                    path="/biblioteca" 
                                    element={
                                        <ProtectedRoute>
                                            <Library />
                                        </ProtectedRoute>
                                    } 
                                />
                                {/* Ruta protegida para Admin - solo accesible con credenciales de admin */}
                                    <Route 
                                        path="/admin" 
                                        element={
                                            <ProtectedRoute requireAdmin={true}>
                                                <Admin />
                                            </ProtectedRoute>
                                        } 
                                    />
                                {/* Ruta protegida para Moderador - solo accesible con credenciales de moderador */}
                                    <Route 
                                        path="/moderator" 
                                        element={
                                            <ProtectedRoute requireModerator={true}>
                                                <Moderator />
                                            </ProtectedRoute>
                                        } 
                                    />
                                </Routes>
                            </main>
                                <Footer />
                            </div>
                        </Router>
                    </NotificationProvider>
                </CartProvider>
            </ProductProvider>
        </AuthProvider>
    );
};

export default App;