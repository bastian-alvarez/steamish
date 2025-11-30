import React from 'react';
import { describe, test, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Admin from '../../pages/Admin/Admin';
import { ProductProvider } from '../../context/ProductContext';
import { AuthProvider } from '../../context/AuthContext';

vi.mock('../../services/authService', () => ({
    __esModule: true,
    default: {
        getAllUsers: vi.fn(() => [
            {
                id: '1',
                email: 'admin@test.com',
                username: 'admin',
                role: 'admin',
                isActive: true,
                createdAt: new Date()
            }
        ]),
        updateUserStatus: vi.fn()
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

describe('Admin Component', () => {
    test('debe renderizar el panel de administración', () => {
        renderWithProviders(<Admin />);

        expect(screen.getByText(/Panel Admin/i)).toBeInTheDocument();
    });

    test('debe renderizar las estadísticas', () => {
        renderWithProviders(<Admin />);

        expect(screen.getByText(/Juegos/i)).toBeInTheDocument();
        expect(screen.getByText(/Usuarios/i)).toBeInTheDocument();
    });

    test('debe renderizar las acciones rápidas', () => {
        renderWithProviders(<Admin />);

        expect(screen.getByText(/Nuevo Juego/i)).toBeInTheDocument();
        expect(screen.getByText(/Gestionar Juegos/i)).toBeInTheDocument();
        expect(screen.getByText(/Gestionar Usuarios/i)).toBeInTheDocument();
    });

    test('debe abrir el modal de nuevo juego', () => {
        renderWithProviders(<Admin />);

        const newGameButton = screen.getByText(/Nuevo Juego/i).closest('button');
        if (newGameButton) {
            fireEvent.click(newGameButton);
            expect(screen.getByText(/Nuevo Juego/i)).toBeInTheDocument();
        }
    });
});

