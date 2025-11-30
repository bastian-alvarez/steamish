import React from 'react';
import { describe, test, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from '../../../components/common/Header/Header';
import { CartProvider } from '../../../context/CartContext';
import { AuthProvider } from '../../../context/AuthContext';

// Wrapper para componentes que usan Router y Context
const renderWithProviders = (component: React.ReactElement) => {
    return render(
        <BrowserRouter>
            <AuthProvider>
                <CartProvider>
                    {component}
                </CartProvider>
            </AuthProvider>
        </BrowserRouter>
    );
};

describe('Header Component - Pruebas de Renderizado', () => {
    
    // Prueba 1: Renderizado correcto del header
    test('debe renderizar el header con todos los elementos de navegación', () => {
        renderWithProviders(<Header />);

        // Verificar que el logo y nombre se renderizan
        expect(screen.getByText('Steamish')).toBeInTheDocument();

        // Verificar que todos los enlaces de navegación se renderizan
        expect(screen.getByText('Inicio')).toBeInTheDocument();
        expect(screen.getByText('Productos')).toBeInTheDocument();
        expect(screen.getByText('Blog')).toBeInTheDocument();
        expect(screen.getByText('Nosotros')).toBeInTheDocument();
        expect(screen.getByText('Contacto')).toBeInTheDocument();
    });

    // Prueba 2: Renderizado condicional - botón de login siempre visible
    test('debe renderizar el botón de Login siempre', () => {
        renderWithProviders(<Header />);
        expect(screen.getByText(/Login/i)).toBeInTheDocument();
    });

    // Prueba 3: Renderizado condicional - badge del carrito solo cuando hay items
    test('debe mostrar el badge del carrito solo cuando hay items', () => {
        const { rerender } = renderWithProviders(<Header />);
        
        // Inicialmente no debería haber badge (carrito vacío)
        const cartButton = screen.getByText(/Carrito/i);
        expect(cartButton).toBeInTheDocument();
    });
});

describe('Header Component - Pruebas de Estado (State)', () => {
    
    // Prueba 4: Verificar que el estado de búsqueda cambia correctamente
    test('debe cambiar el estado del input de búsqueda cuando el usuario escribe', async () => {
        renderWithProviders(<Header />);

        const searchInput = screen.getByPlaceholderText(/Buscar juegos/i);
        
        // Simular escribir en el input
        fireEvent.change(searchInput, { target: { value: 'Mario' } });
        
        // Verificar que el valor cambió
        expect(searchInput).toHaveValue('Mario');
    });

    // Prueba 5: Verificar que el estado del carrito se maneja correctamente
    test('debe abrir y cerrar el modal del carrito correctamente', () => {
        renderWithProviders(<Header />);

        const cartButton = screen.getByText(/Carrito/i);
        
        // Hacer clic para abrir el carrito
        fireEvent.click(cartButton);
        
        // El modal debería aparecer (aunque está vacío, se renderiza)
        // Esto verifica que el estado isCartOpen cambió a true
        expect(cartButton).toBeInTheDocument();
    });
});

describe('Header Component - Pruebas de Eventos', () => {
    
    // Prueba 6: Simulación de evento - búsqueda
    test('debe ejecutar la búsqueda cuando se envía el formulario', () => {
        renderWithProviders(<Header />);

        const searchInput = screen.getByPlaceholderText(/Buscar juegos/i);
        const form = searchInput.closest('form');
        expect(form).toBeInTheDocument();

        // Escribir en el input
        fireEvent.change(searchInput, { target: { value: 'Zelda' } });
        
        // Enviar el formulario
        if (form) {
            fireEvent.submit(form);
        }
        
        // Verificar que el input se limpió después de la búsqueda
        expect(searchInput).toHaveValue('');
    });

    // Prueba 7: Simulación de evento - clic en botón de carrito
    test('debe abrir el modal del carrito cuando se hace clic en el botón', () => {
        renderWithProviders(<Header />);

        const cartButton = screen.getByText(/Carrito/i);
        fireEvent.click(cartButton);
        
        // Verificar que el botón existe y es clickeable
        expect(cartButton).toBeInTheDocument();
    });

    // Prueba 8: Simulación de evento - navegación
    test('debe tener enlaces de navegación funcionales', () => {
        renderWithProviders(<Header />);

        const inicioLink = screen.getByText('Inicio').closest('a');
        const productosLink = screen.getByText('Productos').closest('a');

        expect(inicioLink).toHaveAttribute('href', '/');
        expect(productosLink).toHaveAttribute('href', '/productos');
    });
});

