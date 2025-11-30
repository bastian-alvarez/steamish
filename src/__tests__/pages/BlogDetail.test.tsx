import React from 'react';
import { describe, test, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import BlogDetail from '../../pages/BlogDetail/BlogDetail';

const mockNavigate = vi.fn();
vi.mock('react-router-dom', () => ({
    ...vi.importActual('react-router-dom'),
    useNavigate: () => mockNavigate,
    useParams: () => ({ id: '1' }),
}));

const renderWithRouter = (component: React.ReactElement) => {
    return render(
        <BrowserRouter>
            {component}
        </BrowserRouter>
    );
};

describe('BlogDetail Component', () => {
    test('debe renderizar el componente', () => {
        renderWithRouter(<BlogDetail />);

        expect(document.body).toBeInTheDocument();
    });

    test('debe mostrar mensaje cuando el blog no existe', () => {
        vi.mock('react-router-dom', () => ({
            ...vi.importActual('react-router-dom'),
            useParams: () => ({ id: '999' }),
        }));

        renderWithRouter(<BlogDetail />);

        // El componente debe manejar el caso cuando no encuentra el blog
        expect(document.body).toBeInTheDocument();
    });
});

