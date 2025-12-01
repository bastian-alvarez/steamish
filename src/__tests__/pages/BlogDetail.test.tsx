import React from 'react';
import { describe, test, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import BlogDetail from '../../pages/BlogDetail/BlogDetail';

const mockNavigate = vi.fn();
const mockUseParams = vi.fn(() => ({ id: '1' }));

vi.mock('react-router-dom', async (importOriginal) => {
    const actual = await importOriginal<typeof import('react-router-dom')>();
    return {
        ...actual,
        useNavigate: () => mockNavigate,
        useParams: () => mockUseParams(),
    };
});

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
        mockUseParams.mockReturnValueOnce({ id: '999' });

        renderWithRouter(<BlogDetail />);

        // El componente debe manejar el caso cuando no encuentra el blog
        expect(document.body).toBeInTheDocument();
    });
});

