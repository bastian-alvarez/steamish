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

const App: React.FC = () => {
    return (
        <ProductProvider>
            <CartProvider>
                <Router>
                    <div className="d-flex flex-column min-vh-100">
                        <Header />
                        <main className="flex-grow-1">
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/productos" element={<Products />} />
                                <Route path="/blogs" element={<Blogs />} />
                                <Route path="/nosotros" element={<About />} />
                                <Route path="/contacto" element={<Contact />} />
                                <Route path="/login" element={<Login />} />
                                <Route path="/registro" element={<Register />} />
                                <Route path="/admin" element={<Admin />} />
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