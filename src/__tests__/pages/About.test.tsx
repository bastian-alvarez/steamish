import React from 'react';
import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import About from '../../pages/About/About';

const renderWithRouter = (component: React.ReactElement) => {
    return render(
        <BrowserRouter>
            {component}
        </BrowserRouter>
    );
};

describe('About Component', () => {
    test('debe renderizar el título principal', () => {
        renderWithRouter(<About />);

        expect(screen.getByText(/Sobre Nosotros/i)).toBeInTheDocument();
    });

    test('debe renderizar las estadísticas', () => {
        renderWithRouter(<About />);

        expect(screen.getByText(/Juegos Disponibles/i)).toBeInTheDocument();
        expect(screen.getByText(/Usuarios Activos/i)).toBeInTheDocument();
    });

    test('debe renderizar la sección de misión y visión', () => {
        renderWithRouter(<About />);

        expect(screen.getByText(/Nuestra Misión/i)).toBeInTheDocument();
        expect(screen.getByText(/Nuestra Visión/i)).toBeInTheDocument();
    });

    test('debe renderizar los valores', () => {
        renderWithRouter(<About />);

        expect(screen.getByText(/Calidad Premium/i)).toBeInTheDocument();
        expect(screen.getByText(/Comunidad Global/i)).toBeInTheDocument();
    });
});

