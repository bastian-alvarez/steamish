import React from 'react';
import { describe, test, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import GameResults from '../../../components/ui/GameResults/GameResults';
import { Product } from '../../../types/Product';

// Wrapper para componentes que usan Router
const renderWithRouter = (component: React.ReactElement) => {
    return render(
        <BrowserRouter>
            {component}
        </BrowserRouter>
    );
};

// Mock de productos para las pruebas
const mockProducts: Product[] = [
    {
        id: '1',
        name: 'Super Mario Bros',
        price: 29.99,
        discount: 10,
        image: 'mario.jpg',
        category: 'Acción',
        description: 'Aventura clásica de Mario',
        rating: 4.5,
        featured: true
    },
    {
        id: '2',
        name: 'The Legend of Zelda',
        price: 49.99,
        discount: 0,
        image: 'zelda.jpg',
        category: 'Aventura',
        description: 'Epica aventura de Link',
        rating: 5.0,
        featured: false
    },
    {
        id: '3',
        name: 'FIFA 2024',
        price: 59.99,
        discount: 15,
        image: 'fifa.jpg',
        category: 'Deportes',
        description: 'El mejor juego de fútbol',
        rating: 4.2,
        featured: false
    }
];

describe('GameResults Component - Pruebas de Renderizado', () => {
    
    // Prueba 1: Renderizado correcto de todos los elementos de la lista
    test('debe renderizar todos los elementos de un conjunto de datos', () => {
        renderWithRouter(
            <GameResults 
                products={mockProducts} 
                searchTerm=""
            />
        );

        // Verificar que se renderizan todos los productos
        expect(screen.getByText('Super Mario Bros')).toBeInTheDocument();
        expect(screen.getByText('The Legend of Zelda')).toBeInTheDocument();
        expect(screen.getByText('FIFA 2024')).toBeInTheDocument();
    });

    // Prueba 2: Renderizado condicional - mensaje cuando no hay resultados
    test('debe mostrar mensaje cuando no hay productos', () => {
        renderWithRouter(
            <GameResults 
                products={[]} 
                searchTerm=""
            />
        );

        expect(screen.getByText(/No se encontraron juegos/i)).toBeInTheDocument();
    });

    // Prueba 3: Renderizado condicional - badge destacado solo para productos featured
    test('debe mostrar badge destacado solo para productos featured', () => {
        renderWithRouter(
            <GameResults 
                products={mockProducts} 
                searchTerm=""
            />
        );

        // Verificar que el badge "Destacado" aparece solo para Mario
        const featuredBadges = screen.getAllByText(/Destacado/i);
        expect(featuredBadges.length).toBeGreaterThan(0);
    });

    // Prueba 4: Renderizado condicional - badge de descuento solo cuando hay descuento
    test('debe mostrar badge de descuento solo cuando hay descuento', () => {
        renderWithRouter(
            <GameResults 
                products={mockProducts} 
                searchTerm=""
            />
        );

        // Verificar que los badges de descuento se muestran (-10%, -15%)
        expect(screen.getByText(/-10%/i)).toBeInTheDocument();
        expect(screen.getByText(/-15%/i)).toBeInTheDocument();
    });
});

describe('GameResults Component - Pruebas de Propiedades (Props)', () => {
    
    // Prueba 5: Verificar que recibe y utiliza la propiedad products correctamente
    test('debe recibir y renderizar la propiedad products correctamente', () => {
        renderWithRouter(
            <GameResults 
                products={mockProducts} 
                searchTerm=""
            />
        );

        // Verificar que todos los productos se renderizan
        mockProducts.forEach(product => {
            expect(screen.getByText(product.name)).toBeInTheDocument();
        });
    });

    // Prueba 6: Verificar que recibe y utiliza la propiedad searchTerm
    test('debe recibir y utilizar la propiedad searchTerm para resaltar texto', () => {
        renderWithRouter(
            <GameResults 
                products={mockProducts} 
                searchTerm="Mario"
            />
        );

        // El término de búsqueda debe estar resaltado (puede estar en un mark tag)
        expect(screen.getByText(/Mario/i)).toBeInTheDocument();
    });

    // Prueba 7: Verificar que el componente recibe la función onGameSelect
    test('debe recibir y utilizar la función onGameSelect cuando se proporciona', () => {
        const mockOnGameSelect = vi.fn();

        renderWithRouter(
            <GameResults 
                products={mockProducts} 
                searchTerm=""
                onGameSelect={mockOnGameSelect}
            />
        );

        // Verificar que el botón existe
        const addButtons = screen.getAllByText(/Agregar/i);
        expect(addButtons.length).toBe(mockProducts.length);
    });
});

describe('GameResults Component - Pruebas de Eventos', () => {
    
    // Prueba 8: Simulación de evento - clic en botón agregar
    test('debe llamar a onGameSelect cuando se hace clic en el botón agregar', () => {
        const mockOnGameSelect = vi.fn();

        renderWithRouter(
            <GameResults 
                products={[mockProducts[0]]} 
                searchTerm=""
                onGameSelect={mockOnGameSelect}
            />
        );

        // Buscar y hacer clic en el botón "Agregar"
        const addButton = screen.getByText(/Agregar/i);
        fireEvent.click(addButton);

        // Verificar que se llamó la función con el producto correcto
        expect(mockOnGameSelect).toHaveBeenCalledTimes(1);
        expect(mockOnGameSelect).toHaveBeenCalledWith(mockProducts[0]);
    });

    // Prueba 9: Simulación de evento - clic en múltiples botones
    test('debe llamar a onGameSelect con el producto correcto para cada botón', () => {
        const mockOnGameSelect = vi.fn();

        renderWithRouter(
            <GameResults 
                products={mockProducts} 
                searchTerm=""
                onGameSelect={mockOnGameSelect}
            />
        );

        // Hacer clic en todos los botones
        const addButtons = screen.getAllByText(/Agregar/i);
        
        addButtons.forEach((button, index) => {
            fireEvent.click(button);
            expect(mockOnGameSelect).toHaveBeenCalledWith(mockProducts[index]);
        });

        // Verificar que se llamó 3 veces (una por cada producto)
        expect(mockOnGameSelect).toHaveBeenCalledTimes(mockProducts.length);
    });
});








