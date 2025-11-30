import React from 'react';
import { describe, test, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ProductDetail from '../../pages/ProductDetail/ProductDetail';
import { ProductProvider } from '../../context/ProductContext';
import { CartProvider } from '../../context/CartContext';
import { AuthProvider } from '../../context/AuthContext';
import { NotificationProvider } from '../../components/ui/NotificationToast/NotificationToast';

const mockNavigate = vi.fn();
vi.mock('react-router-dom', () => ({
    ...vi.importActual('react-router-dom'),
    useNavigate: () => mockNavigate,
    useParams: () => ({ id: '1' }),
}));

vi.mock('../../services/productService', () => ({
    __esModule: true,
    default: {
        getProductById: vi.fn().mockResolvedValue({
            id: '1',
            name: 'Test Game',
            price: 59.99,
            description: 'Test Description',
            image: 'test.jpg',
            rating: 4.5,
            category: 'Action'
        })
    }
}));

vi.mock('../../services/libraryService', () => ({
    __esModule: true,
    default: {
        isInLibrary: vi.fn().mockResolvedValue(false)
    }
}));

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

describe('ProductDetail Component', () => {
    test('debe mostrar spinner mientras carga', () => {
        renderWithProviders(<ProductDetail />);

        // El componente puede mostrar un spinner mientras carga
        expect(screen.getByRole('status') || screen.queryByText(/Cargando/i)).toBeTruthy();
    });

    test('debe renderizar el componente', () => {
        renderWithProviders(<ProductDetail />);

        expect(screen.getByRole('main') || document.body).toBeInTheDocument();
    });
});

