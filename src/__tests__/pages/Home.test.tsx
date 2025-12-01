import React from 'react';
import { describe, test, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Home from '../../pages/Home/Home';
import { ProductProvider } from '../../context/ProductContext';
import { CartProvider } from '../../context/CartContext';
import { AuthProvider } from '../../context/AuthContext';
import { NotificationProvider } from '../../components/ui/NotificationToast/NotificationToast';

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async (importOriginal) => {
    const actual = await importOriginal<typeof import('react-router-dom')>();
    return {
        ...actual,
        useNavigate: () => mockNavigate,
    };
});

const renderWithProviders = (component: React.ReactElement) => {
    return render(
        <BrowserRouter>
            <AuthProvider>
                <ProductProvider>
                    <CartProvider>
                        <NotificationProvider>
                            {component}
                        </NotificationProvider>
                    </CartProvider>
                </ProductProvider>
            </AuthProvider>
        </BrowserRouter>
    );
};

describe('Home Component', () => {
    test('debe renderizar el título principal', () => {
        renderWithProviders(<Home />);

        expect(screen.getByText(/Descubre Juegos/i)).toBeInTheDocument();
    });

    test('debe renderizar la sección de juegos destacados', () => {
        renderWithProviders(<Home />);

        expect(screen.getByText(/Juegos Destacados/i)).toBeInTheDocument();
    });

    test('debe renderizar botones de navegación', () => {
        renderWithProviders(<Home />);

        expect(screen.getByText(/Explorar Juegos/i)).toBeInTheDocument();
        expect(screen.getByText(/Conocer Más/i)).toBeInTheDocument();
    });

    test('debe renderizar la tarjeta premium', () => {
        renderWithProviders(<Home />);

        expect(screen.getByText(/Juegos Premium/i)).toBeInTheDocument();
    });
});

