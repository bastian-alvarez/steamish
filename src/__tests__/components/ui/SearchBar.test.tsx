import React from 'react';
import { describe, test, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import SearchBar from '../../../components/ui/SearchBar/SearchBar';
import { Product } from '../../../types/Product';

const mockProducts: Product[] = [
    {
        id: '1',
        name: 'Test Game 1',
        price: 59.99,
        category: 'Action',
        rating: 4.5,
        discount: 0,
        image: 'test1.jpg',
        description: 'Test description 1',
        tags: ['Action', 'Adventure'],
        featured: true
    },
    {
        id: '2',
        name: 'Test Game 2',
        price: 49.99,
        category: 'Adventure',
        rating: 4.8,
        discount: 10,
        image: 'test2.jpg',
        description: 'Test description 2',
        tags: ['Adventure', 'RPG'],
        featured: false
    }
];

const mockOnSearchResult = vi.fn();

const renderWithRouter = (component: React.ReactElement) => {
    return render(
        <BrowserRouter>
            {component}
        </BrowserRouter>
    );
};

describe('SearchBar Component', () => {
    test('debe renderizar la barra de búsqueda', () => {
        renderWithRouter(
            <SearchBar 
                products={mockProducts} 
                onSearchResult={mockOnSearchResult}
            />
        );

        expect(screen.getByPlaceholderText(/Buscar juegos por nombre/i)).toBeInTheDocument();
    });

    test('debe actualizar el término de búsqueda', () => {
        renderWithRouter(
            <SearchBar 
                products={mockProducts} 
                onSearchResult={mockOnSearchResult}
            />
        );

        const searchInput = screen.getByPlaceholderText(/Buscar juegos por nombre/i) as HTMLInputElement;
        fireEvent.change(searchInput, { target: { value: 'Test' } });

        expect(searchInput.value).toBe('Test');
    });

    test('debe filtrar por categoría', () => {
        renderWithRouter(
            <SearchBar 
                products={mockProducts} 
                onSearchResult={mockOnSearchResult}
                showFilters={true}
            />
        );

        const categorySelect = screen.getByText(/Todas las categorías/i);
        expect(categorySelect).toBeInTheDocument();
    });

    test('debe mostrar el botón de limpiar filtros', () => {
        renderWithRouter(
            <SearchBar 
                products={mockProducts} 
                onSearchResult={mockOnSearchResult}
                showFilters={true}
            />
        );

        expect(screen.getByText(/Limpiar filtros/i)).toBeInTheDocument();
    });

    test('debe llamar a onSearchResult cuando cambia la búsqueda', () => {
        renderWithRouter(
            <SearchBar 
                products={mockProducts} 
                onSearchResult={mockOnSearchResult}
            />
        );

        const searchInput = screen.getByPlaceholderText(/Buscar juegos por nombre/i);
        fireEvent.change(searchInput, { target: { value: 'Test' } });

        // onSearchResult debe ser llamado cuando cambia la búsqueda
        expect(mockOnSearchResult).toHaveBeenCalled();
    });
});

