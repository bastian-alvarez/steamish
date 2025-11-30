import React from 'react';
import { describe, test, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Contact from '../../pages/Contact/Contact';

const renderWithRouter = (component: React.ReactElement) => {
    return render(
        <BrowserRouter>
            {component}
        </BrowserRouter>
    );
};

describe('Contact Component', () => {
    test('debe renderizar el título', () => {
        renderWithRouter(<Contact />);

        expect(screen.getByText(/Hablemos/i)).toBeInTheDocument();
    });

    test('debe renderizar el formulario de contacto', () => {
        renderWithRouter(<Contact />);

        expect(screen.getByPlaceholderText(/Tu nombre/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/tu@email.com/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Tu mensaje/i)).toBeInTheDocument();
    });

    test('debe actualizar los campos del formulario', () => {
        renderWithRouter(<Contact />);

        const nameInput = screen.getByPlaceholderText(/Tu nombre/i) as HTMLInputElement;
        const emailInput = screen.getByPlaceholderText(/tu@email.com/i) as HTMLInputElement;

        fireEvent.change(nameInput, { target: { value: 'Test User' } });
        fireEvent.change(emailInput, { target: { value: 'test@test.com' } });

        expect(nameInput.value).toBe('Test User');
        expect(emailInput.value).toBe('test@test.com');
    });

    test('debe enviar el formulario correctamente', async () => {
        const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
        renderWithRouter(<Contact />);

        const nameInput = screen.getByPlaceholderText(/Tu nombre/i);
        const emailInput = screen.getByPlaceholderText(/tu@email.com/i);
        const messageInput = screen.getByPlaceholderText(/Tu mensaje/i);
        const submitButton = screen.getByRole('button', { name: /Enviar Mensaje/i });

        fireEvent.change(nameInput, { target: { value: 'Test User' } });
        fireEvent.change(emailInput, { target: { value: 'test@test.com' } });
        fireEvent.change(messageInput, { target: { value: 'Test message' } });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText(/Mensaje enviado con éxito/i)).toBeInTheDocument();
        });

        consoleSpy.mockRestore();
    });

    test('debe mostrar información de contacto', () => {
        renderWithRouter(<Contact />);

        expect(screen.getByText(/hello@steamish.com/i)).toBeInTheDocument();
    });
});

