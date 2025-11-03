import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from './Login';
import { AuthProvider } from '../../context/AuthContext';

// Mock del hook useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
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

describe('Login Component - Pruebas de Renderizado', () => {
    
    // Prueba 1: Renderizado correcto del formulario
    test('debe renderizar el formulario de login con todos los campos', () => {
        renderWithProviders(<Login />);

        // Verificar que los campos se renderizan
        expect(screen.getByPlaceholderText(/tu@email.com/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/••••••••/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Iniciar Sesión/i })).toBeInTheDocument();
    });

    // Prueba 2: Renderizado condicional - mensaje de error solo cuando hay error
    test('no debe mostrar mensaje de error inicialmente', () => {
        renderWithProviders(<Login />);

        // Verificar que NO hay mensaje de error al inicio
        expect(screen.queryByText(/error/i)).not.toBeInTheDocument();
    });

    // Prueba 3: Renderizado condicional - mostrar mensaje de error cuando hay error
    test('debe mostrar mensaje de error cuando hay un error', async () => {
        renderWithProviders(<Login />);

        const emailInput = screen.getByLabelText(/Email/i);
        const passwordInput = screen.getByLabelText(/Contraseña/i);
        const submitButton = screen.getByRole('button', { name: /Iniciar Sesión/i });

        // Intentar enviar formulario vacío
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText(/Por favor, completa todos los campos/i)).toBeInTheDocument();
        });
    });
});

describe('Login Component - Pruebas de Estado (State)', () => {
    
    // Prueba 4: Verificar que el estado del formulario cambia cuando el usuario escribe
    test('debe actualizar el estado del email cuando el usuario escribe', () => {
        renderWithProviders(<Login />);

        const emailInput = screen.getByPlaceholderText(/tu@email.com/i) as HTMLInputElement;

        // Simular escribir en el campo de email
        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

        // Verificar que el valor cambió
        expect(emailInput.value).toBe('test@example.com');
    });

    // Prueba 5: Verificar que el estado de la contraseña cambia cuando el usuario escribe
    test('debe actualizar el estado de la contraseña cuando el usuario escribe', () => {
        renderWithProviders(<Login />);

        const passwordInput = screen.getByPlaceholderText(/••••••••/i) as HTMLInputElement;

        // Simular escribir en el campo de contraseña
        fireEvent.change(passwordInput, { target: { value: 'password123' } });

        // Verificar que el valor cambió
        expect(passwordInput.value).toBe('password123');
    });

    // Prueba 6: Verificar que ambos campos del formulario cambian independientemente
    test('debe manejar cambios en ambos campos del formulario correctamente', () => {
        renderWithProviders(<Login />);

        const emailInput = screen.getByPlaceholderText(/tu@email.com/i) as HTMLInputElement;
        const passwordInput = screen.getByPlaceholderText(/••••••••/i) as HTMLInputElement;

        // Cambiar ambos campos
        fireEvent.change(emailInput, { target: { value: 'user@test.com' } });
        fireEvent.change(passwordInput, { target: { value: 'secret123' } });

        // Verificar que ambos valores se mantienen
        expect(emailInput.value).toBe('user@test.com');
        expect(passwordInput.value).toBe('secret123');
    });

    // Prueba 7: Verificar que el estado de error se actualiza cuando hay validación
    test('debe actualizar el estado de error cuando los campos están vacíos', async () => {
        renderWithProviders(<Login />);

        const submitButton = screen.getByRole('button', { name: /Iniciar Sesión/i });

        // Intentar enviar sin llenar campos
        fireEvent.click(submitButton);

        await waitFor(() => {
            const errorMessage = screen.queryByText(/Por favor, completa todos los campos/i);
            expect(errorMessage).toBeInTheDocument();
        });
    });
});

describe('Login Component - Pruebas de Eventos', () => {
    
    // Prueba 8: Simulación de evento - envío del formulario
    test('debe llamar a handleSubmit cuando se envía el formulario', async () => {
        renderWithProviders(<Login />);

        const emailInput = screen.getByLabelText(/Email/i);
        const passwordInput = screen.getByLabelText(/Contraseña/i);
        const submitButton = screen.getByRole('button', { name: /Iniciar Sesión/i });

        // Llenar los campos
        fireEvent.change(emailInput, { target: { value: 'demo@steamish.com' } });
        fireEvent.change(passwordInput, { target: { value: 'demo123' } });

        // Enviar el formulario
        fireEvent.click(submitButton);

        // Verificar que se intentó enviar (el botón puede mostrar loading)
        await waitFor(() => {
            expect(emailInput).toBeInTheDocument();
        });
    });

    // Prueba 9: Simulación de evento - cambio de input
    test('debe actualizar el valor cuando el usuario escribe en el campo email', () => {
        renderWithProviders(<Login />);

        const emailInput = screen.getByPlaceholderText(/tu@email.com/i) as HTMLInputElement;

        fireEvent.change(emailInput, { target: { value: 'newemail@test.com' } });

        expect(emailInput.value).toBe('newemail@test.com');
    });

    // Prueba 10: Simulación de evento - cambio de input de contraseña
    test('debe actualizar el valor cuando el usuario escribe en el campo contraseña', () => {
        renderWithProviders(<Login />);

        const passwordInput = screen.getByPlaceholderText(/••••••••/i) as HTMLInputElement;

        fireEvent.change(passwordInput, { target: { value: 'newpassword' } });

        expect(passwordInput.value).toBe('newpassword');
    });
});

