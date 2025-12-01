import React from 'react';
import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Footer from '../../../components/common/Footer/Footer';

const renderWithRouter = (component: React.ReactElement) => {
    return render(
        <BrowserRouter>
            {component}
        </BrowserRouter>
    );
};

describe('Footer Component', () => {
    test('debe renderizar el nombre de la marca', () => {
        renderWithRouter(<Footer />);

        const brandElements = screen.getAllByText(/Steamish Gaming/i);
        expect(brandElements.length).toBeGreaterThan(0);
        expect(brandElements[0]).toBeInTheDocument();
    });

    test('debe renderizar los enlaces de navegación', () => {
        renderWithRouter(<Footer />);

        expect(screen.getByText(/Productos/i)).toBeInTheDocument();
        expect(screen.getByText(/Blog/i)).toBeInTheDocument();
        expect(screen.getByText(/Nosotros/i)).toBeInTheDocument();
        expect(screen.getByText(/Contacto/i)).toBeInTheDocument();
    });

    test('debe renderizar los enlaces de soporte', () => {
        renderWithRouter(<Footer />);

        expect(screen.getByText(/Centro de ayuda/i)).toBeInTheDocument();
        expect(screen.getByText(/Política de reembolsos/i)).toBeInTheDocument();
    });

    test('debe renderizar el formulario de newsletter', () => {
        renderWithRouter(<Footer />);

        expect(screen.getByText(/Newsletter Gaming/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/gamer@ejemplo.com/i)).toBeInTheDocument();
    });

    test('debe renderizar el copyright', () => {
        renderWithRouter(<Footer />);

        expect(screen.getByText(/2025 Steamish Gaming Platform/i)).toBeInTheDocument();
    });

    test('debe renderizar los enlaces sociales', () => {
        renderWithRouter(<Footer />);

        // Los iconos sociales están presentes aunque no sean texto
        const socialLinks = screen.getAllByRole('link');
        expect(socialLinks.length).toBeGreaterThan(0);
    });
});

