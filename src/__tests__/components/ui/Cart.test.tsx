import React from 'react';
import { describe, test, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Cart from '../../../components/ui/Cart/Cart';
import { CartItem } from '../../../types/Cart';
import { AuthProvider } from '../../../context/AuthContext';
import { CartProvider } from '../../../context/CartContext';
import { NotificationProvider } from '../../../components/ui/NotificationToast/NotificationToast';

// Mock de los servicios
vi.mock('../../../services/orderService', () => ({
    __esModule: true,
    default: {
        createOrderFromCart: vi.fn().mockResolvedValue({
            id: 1,
            userId: 1,
            fechaOrden: '2024-01-01',
            total: 100,
            estadoId: 1,
            estadoNombre: 'Completada',
            metodoPago: 'Tarjeta',
            detalles: []
        })
    }
}));

vi.mock('../../../services/libraryService', () => ({
    __esModule: true,
    default: {
        addMultipleToLibrary: vi.fn().mockResolvedValue(undefined)
    }
}));

// Wrapper para componentes que usan Router y Context
const renderWithProviders = (component: React.ReactElement) => {
    return render(
        <BrowserRouter>
            <AuthProvider>
                <CartProvider>
                    <NotificationProvider>
                        {component}
                    </NotificationProvider>
                </CartProvider>
            </AuthProvider>
        </BrowserRouter>
    );
};

// Mock de datos para las pruebas
const mockCartItems: CartItem[] = [
    {
        id: '1',
        name: 'Test Game 1',
        price: 29.99,
        discount: 10,
        image: 'test-image.jpg',
        category: 'Action',
        description: 'Test description',
        rating: 4.5,
        quantity: 2
    },
    {
        id: '2',
        name: 'Test Game 2',
        price: 49.99,
        discount: 0,
        image: 'test-image-2.jpg',
        category: 'RPG',
        description: 'Test description 2',
        rating: 5.0,
        quantity: 1
    }
];

describe('Cart Component - Pruebas de Renderizado', () => {
    
    // Prueba 1: Renderizado correcto del carrito vacío
    test('debe renderizar el carrito vacío correctamente', () => {
        const mockOnClose = vi.fn();
        const mockOnRemove = vi.fn();
        const mockOnClear = vi.fn();

        renderWithProviders(
            <Cart
                isOpen={true}
                onClose={mockOnClose}
                items={[]}
                count={0}
                totalPrice={0}
                onRemove={mockOnRemove}
                onClear={mockOnClear}
            />
        );

        // Verificar que se muestra el mensaje de carrito vacío
        expect(screen.getByText('Tu carrito está vacío')).toBeInTheDocument();
        expect(screen.getByText(/Agrega algunos juegos increíbles/)).toBeInTheDocument();
    });

    // Prueba 2: Renderizado condicional - mostrar items cuando hay productos
    test('debe renderizar todos los elementos cuando hay productos en el carrito', () => {
        const mockOnClose = vi.fn();
        const mockOnRemove = vi.fn();
        const mockOnClear = vi.fn();

        renderWithProviders(
            <Cart
                isOpen={true}
                onClose={mockOnClose}
                items={mockCartItems}
                count={3}
                totalPrice={89.97}
                onRemove={mockOnRemove}
                onClear={mockOnClear}
            />
        );

        // Verificar que se renderizan todos los items
        expect(screen.getByText('Test Game 1')).toBeInTheDocument();
        expect(screen.getByText('Test Game 2')).toBeInTheDocument();
        
        // Verificar que se muestra el total
        expect(screen.getByText(/Total: \$89\.97/)).toBeInTheDocument();
        
        // Verificar que se muestra la cantidad en el título
        expect(screen.getByText(/Mi Carrito \(3\)/)).toBeInTheDocument();
    });

    // Prueba 3: Renderizado condicional - mensaje de error no se muestra cuando no hay error
    test('no debe mostrar mensaje de error cuando el carrito está vacío (comportamiento normal)', () => {
        const mockOnClose = vi.fn();
        const mockOnRemove = vi.fn();
        const mockOnClear = vi.fn();

        renderWithProviders(
            <Cart
                isOpen={true}
                onClose={mockOnClose}
                items={[]}
                count={0}
                totalPrice={0}
                onRemove={mockOnRemove}
                onClear={mockOnClear}
            />
        );

        // Verificar que NO hay mensajes de error
        expect(screen.queryByText(/error/i)).not.toBeInTheDocument();
    });
});

describe('Cart Component - Pruebas de Propiedades (Props)', () => {
    
    // Prueba 4: Verificar que el componente recibe y utiliza las propiedades correctamente
    test('debe recibir y mostrar la propiedad count correctamente', () => {
        const mockOnClose = vi.fn();
        const mockOnRemove = vi.fn();
        const mockOnClear = vi.fn();

        renderWithProviders(
            <Cart
                isOpen={true}
                onClose={mockOnClose}
                items={mockCartItems}
                count={5}
                totalPrice={100}
                onRemove={mockOnRemove}
                onClear={mockOnClear}
            />
        );

        expect(screen.getByText(/Mi Carrito \(5\)/)).toBeInTheDocument();
    });

    // Prueba 5: Verificar que recibe y muestra totalPrice
    test('debe recibir y mostrar la propiedad totalPrice correctamente', () => {
        const mockOnClose = vi.fn();
        const mockOnRemove = vi.fn();
        const mockOnClear = vi.fn();

        renderWithProviders(
            <Cart
                isOpen={true}
                onClose={mockOnClose}
                items={mockCartItems}
                count={3}
                totalPrice={129.99}
                onRemove={mockOnRemove}
                onClear={mockOnClear}
            />
        );

        expect(screen.getByText(/Total: \$129\.99/)).toBeInTheDocument();
    });

    // Prueba 6: Verificar que recibe y muestra items
    test('debe recibir y renderizar la propiedad items correctamente', () => {
        const mockOnClose = vi.fn();
        const mockOnRemove = vi.fn();
        const mockOnClear = vi.fn();

        renderWithProviders(
            <Cart
                isOpen={true}
                onClose={mockOnClose}
                items={mockCartItems}
                count={3}
                totalPrice={89.97}
                onRemove={mockOnRemove}
                onClear={mockOnClear}
            />
        );

        // Verificar que ambos items se renderizan
        expect(screen.getByText('Test Game 1')).toBeInTheDocument();
        expect(screen.getByText('Test Game 2')).toBeInTheDocument();
    });
});

describe('Cart Component - Pruebas de Eventos', () => {
    
    // Prueba 7: Simulación de evento - clic en botón de cerrar
    test('debe llamar a onClose cuando se hace clic en el botón cerrar', () => {
        const mockOnClose = vi.fn();
        const mockOnRemove = vi.fn();
        const mockOnClear = vi.fn();

        renderWithProviders(
            <Cart
                isOpen={true}
                onClose={mockOnClose}
                items={mockCartItems}
                count={3}
                totalPrice={89.97}
                onRemove={mockOnRemove}
                onClear={mockOnClear}
            />
        );

        // Buscar y hacer clic en el botón de cerrar (el botón X del modal)
        const closeButton = screen.getByLabelText(/close/i) || screen.getByRole('button', { name: /close/i });
        if (closeButton) {
            fireEvent.click(closeButton);
            expect(mockOnClose).toHaveBeenCalledTimes(1);
        }
    });

    // Prueba 8: Simulación de evento - clic en botón eliminar item
    test('debe llamar a onRemove con el id correcto cuando se hace clic en eliminar', () => {
        const mockOnClose = vi.fn();
        const mockOnRemove = vi.fn();
        const mockOnClear = vi.fn();

        renderWithProviders(
            <Cart
                isOpen={true}
                onClose={mockOnClose}
                items={mockCartItems}
                count={3}
                totalPrice={89.97}
                onRemove={mockOnRemove}
                onClear={mockOnClear}
            />
        );

        // Buscar todos los botones que contienen el icono de basura
        const deleteButtons = screen.getAllByRole('button').filter((button: HTMLElement) => {
            const icon = button.querySelector('i.bi-trash');
            return icon !== null;
        });
        
        expect(deleteButtons.length).toBeGreaterThan(0);
        fireEvent.click(deleteButtons[0]);
        expect(mockOnRemove).toHaveBeenCalledWith('1');
    });

    // Prueba 9: Simulación de evento - clic en botón vaciar carrito
    test('debe llamar a onClear cuando se hace clic en vaciar carrito', () => {
        const mockOnClose = vi.fn();
        const mockOnRemove = vi.fn();
        const mockOnClear = vi.fn();

        renderWithProviders(
            <Cart
                isOpen={true}
                onClose={mockOnClose}
                items={mockCartItems}
                count={3}
                totalPrice={89.97}
                onRemove={mockOnRemove}
                onClear={mockOnClear}
            />
        );

        const clearButton = screen.getByText(/Vaciar Carrito/i);
        fireEvent.click(clearButton);
        expect(mockOnClear).toHaveBeenCalledTimes(1);
    });
});

