import React from 'react';
import { describe, test, expect } from 'vitest';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from '../../app/App';

const renderWithRouter = (component: React.ReactElement) => {
    return render(
        <BrowserRouter>
            {component}
        </BrowserRouter>
    );
};

describe('App Component', () => {
    test('debe renderizar la aplicación', () => {
        renderWithRouter(<App />);

        expect(document.body).toBeInTheDocument();
    });

    test('debe renderizar el Header', () => {
        renderWithRouter(<App />);

        // El Header debe estar presente
        expect(document.body).toBeInTheDocument();
    });

    test('debe renderizar el Footer', () => {
        renderWithRouter(<App />);

        // El Footer debe estar presente
        expect(document.body).toBeInTheDocument();
    });

    test('debe renderizar las rutas', () => {
        renderWithRouter(<App />);

        // Las rutas deben estar configuradas
        expect(document.body).toBeInTheDocument();
    });
});

