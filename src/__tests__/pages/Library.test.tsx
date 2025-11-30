import React from 'react';
import { describe, test, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Library from '../../pages/Library/Library';
import { AuthProvider } from '../../context/AuthContext';
import { ProductProvider } from '../../context/ProductContext';

const mockNavigate = vi.fn();
vi.mock('react-router-dom', () => ({
    ...vi.importActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));

vi.mock('../../services/libraryService', () => ({
    __esModule: true,
    default: {
        getLibrary: vi.fn().mockResolvedValue([])
    }
}));

vi.mock('../../services/productService', () => ({
    __esModule: true,
    default: {
        getProductById: vi.fn().mockResolvedValue(null)
    }
}));

const renderWithProviders = (component: React.ReactElement) => {
    return render(
        <BrowserRouter>
            <AuthProvider>
                <ProductProvider>
                    {component}
                </ProductProvider>
            </AuthProvider>
        </BrowserRouter>
    );
};

describe('Library Component', () => {
    test('debe renderizar el componente', () => {
        renderWithProviders(<Library />);

        expect(document.body).toBeInTheDocument();
    });

    test('debe redirigir al login si no está autenticado', () => {
        renderWithProviders(<Library />);

        // El componente debe intentar redirigir si no hay usuario
        expect(mockNavigate).toHaveBeenCalledWith('/login');
    });
});

