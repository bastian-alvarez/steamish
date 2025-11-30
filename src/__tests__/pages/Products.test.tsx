import React from 'react';
import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Products from '../../pages/Products/Products';
import { ProductProvider } from '../../context/ProductContext';
import { CartProvider } from '../../context/CartContext';
import { AuthProvider } from '../../context/AuthContext';
import { NotificationProvider } from '../../components/ui/NotificationToast/NotificationToast';

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

describe('Products Component', () => {
    test('debe renderizar el título del catálogo', () => {
        renderWithProviders(<Products />);

        expect(screen.getByText(/Catálogo de Juegos/i)).toBeInTheDocument();
    });

    test('debe renderizar la barra de búsqueda', () => {
        renderWithProviders(<Products />);

        expect(screen.getByPlaceholderText(/Buscar juegos por nombre/i)).toBeInTheDocument();
    });

    test('debe renderizar el componente GameResults', () => {
        renderWithProviders(<Products />);

        // Verificar que el componente SearchBar está presente
        expect(screen.getByPlaceholderText(/Buscar juegos por nombre/i)).toBeInTheDocument();
    });
});

