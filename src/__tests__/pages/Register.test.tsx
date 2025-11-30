import React from 'react';
import { describe, test, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Register from '../../pages/Register/Register';
import { AuthProvider } from '../../context/AuthContext';

const mockNavigate = vi.fn();
vi.mock('react-router-dom', () => ({
    ...vi.importActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));

vi.mock('../../services/authService', () => ({
    __esModule: true,
    default: {
        register: vi.fn().mockResolvedValue({
            id: 1,
            email: 'test@test.com',
            name: 'Test User',
            role: 'user',
            token: 'mock-token'
        }),
        getCurrentUser: vi.fn().mockReturnValue(null)
    }
}));

const renderWithProviders = (component: React.ReactElement) => {
    return render(
        <BrowserRouter>
            <AuthProvider>
                {component}
            </AuthProvider>
        </BrowserRouter>
    );
};

describe('Register Component', () => {
    test('debe renderizar el formulario de registro con todos los campos', () => {
        renderWithProviders(<Register />);

        expect(screen.getByPlaceholderText(/GamerPro123/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/tu@email.com/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Contraseña/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Confirmar/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Crear Mi Cuenta/i })).toBeInTheDocument();
    });

    test('debe actualizar el estado cuando el usuario escribe en los campos', () => {
        renderWithProviders(<Register />);

        const usernameInput = screen.getByPlaceholderText(/GamerPro123/i) as HTMLInputElement;
        const emailInput = screen.getByPlaceholderText(/tu@email.com/i) as HTMLInputElement;

        fireEvent.change(usernameInput, { target: { value: 'testuser' } });
        fireEvent.change(emailInput, { target: { value: 'test@test.com' } });

        expect(usernameInput.value).toBe('testuser');
        expect(emailInput.value).toBe('test@test.com');
    });

    test('debe mostrar error cuando las contraseñas no coinciden', async () => {
        renderWithProviders(<Register />);

        const passwordInput = screen.getByLabelText(/Contraseña/i);
        const confirmPasswordInput = screen.getByLabelText(/Confirmar/i);
        const submitButton = screen.getByRole('button', { name: /Crear Mi Cuenta/i });

        fireEvent.change(passwordInput, { target: { value: 'password123' } });
        fireEvent.change(confirmPasswordInput, { target: { value: 'password456' } });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText(/Las contraseñas no coinciden/i)).toBeInTheDocument();
        });
    });

    test('debe mostrar error cuando la contraseña es muy corta', async () => {
        renderWithProviders(<Register />);

        const passwordInput = screen.getByLabelText(/Contraseña/i);
        const confirmPasswordInput = screen.getByLabelText(/Confirmar/i);
        const submitButton = screen.getByRole('button', { name: /Crear Mi Cuenta/i });

        fireEvent.change(passwordInput, { target: { value: '123' } });
        fireEvent.change(confirmPasswordInput, { target: { value: '123' } });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText(/La contraseña debe tener al menos 6 caracteres/i)).toBeInTheDocument();
        });
    });

    test('debe mostrar link para iniciar sesión', () => {
        renderWithProviders(<Register />);

        expect(screen.getByText(/¿Ya tienes cuenta?/i)).toBeInTheDocument();
        expect(screen.getByText(/Iniciar sesión aquí/i)).toBeInTheDocument();
    });
});

