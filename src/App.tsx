import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ProductProvider } from './context/ProductContext';
import { CartProvider } from './context/CartContext';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import Products from './pages/Products/Products';
import Blogs from './pages/Blogs/Blogs';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Admin from './pages/Admin/Admin';

// 🎯 App Simplificado - Estructura Limpia
const App: React.FC = () => {
    const routes = [
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
        <ProductProvider>
            <CartProvider>
                <Router>
                    <div className="d-flex flex-column min-vh-100">
                        <Header />
                        <main className="flex-grow-1">
                            <Routes>
                                {routes.map(({ path, component: Component }) => (
                                    <Route key={path} path={path} element={<Component />} />
                                ))}
                            </Routes>
                        </main>
                        <Footer />
                    </div>
                </Router>
            </CartProvider>
        </ProductProvider>
    );
};

export default App;