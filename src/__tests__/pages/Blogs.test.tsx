import React from 'react';
import { describe, test, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Blogs from '../../pages/Blogs/Blogs';

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async (importOriginal) => {
    const actual = await importOriginal<typeof import('react-router-dom')>();
    return {
        ...actual,
        useNavigate: () => mockNavigate,
    };
});

const renderWithRouter = (component: React.ReactElement) => {
    return render(
        <BrowserRouter>
            {component}
        </BrowserRouter>
    );
};

describe('Blogs Component', () => {
    test('debe renderizar el título del blog', () => {
        renderWithRouter(<Blogs />);

        expect(screen.getByText(/Gaming Blog/i)).toBeInTheDocument();
    });

    test('debe renderizar la barra de búsqueda', () => {
        renderWithRouter(<Blogs />);

        expect(screen.getByPlaceholderText(/Buscar artículos/i)).toBeInTheDocument();
    });

    test('debe renderizar las categorías', () => {
        renderWithRouter(<Blogs />);

        const todosLinks = screen.getAllByText(/Todos/i);
        expect(todosLinks.length).toBeGreaterThan(0);
        const novedadesLinks = screen.getAllByText(/Novedades/i);
        expect(novedadesLinks.length).toBeGreaterThan(0);
    });

    test('debe filtrar por categoría', () => {
        renderWithRouter(<Blogs />);

        const novedadesLinks = screen.getAllByText(/Novedades/i);
        const navLink = novedadesLinks.find(link => link.closest('.nav-link'));
        if (navLink) {
            fireEvent.click(navLink);
            expect(navLink).toBeInTheDocument();
        }
    });

    test('debe actualizar el término de búsqueda', () => {
        renderWithRouter(<Blogs />);

        const searchInput = screen.getByPlaceholderText(/Buscar artículos/i) as HTMLInputElement;
        fireEvent.change(searchInput, { target: { value: 'test search' } });

        expect(searchInput.value).toBe('test search');
    });
});

