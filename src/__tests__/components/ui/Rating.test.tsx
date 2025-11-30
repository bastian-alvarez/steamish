import React from 'react';
import { describe, test, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Rating from '../../../components/ui/Rating/Rating';
import { AuthProvider } from '../../../context/AuthContext';
import { NotificationProvider } from '../../../components/ui/NotificationToast/NotificationToast';
import ratingService from '../../../services/ratingService';

// Mock del servicio de ratings
vi.mock('../../../services/ratingService', () => ({
    default: {
        getGameRating: vi.fn(),
        getUserRating: vi.fn(),
        createOrUpdateRating: vi.fn()
    }
}));

const renderWithProviders = (component: React.ReactElement) => {
    return render(
        <BrowserRouter>
            <AuthProvider>
                <NotificationProvider>
                    {component}
                </NotificationProvider>
            </AuthProvider>
        </BrowserRouter>
    );
};

describe('Rating Component', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    test('debe renderizar el componente', () => {
        vi.mocked(ratingService.getGameRating).mockResolvedValue({
            juegoId: 1,
            averageRating: 0,
            ratingCount: 0
        });

        renderWithProviders(<Rating juegoId={1} />);

        expect(screen.getByText(/Calificación/i)).toBeInTheDocument();
    });

    test('debe mostrar el rating promedio del juego', async () => {
        vi.mocked(ratingService.getGameRating).mockResolvedValue({
            juegoId: 1,
            averageRating: 4.5,
            ratingCount: 10
        });

        renderWithProviders(<Rating juegoId={1} />);

        await waitFor(() => {
            expect(screen.getByText('4.5')).toBeInTheDocument();
            expect(screen.getByText(/10 calificaciones/i)).toBeInTheDocument();
        });
    });

    test('debe mostrar "Sin calificaciones" cuando no hay ratings', async () => {
        vi.mocked(ratingService.getGameRating).mockResolvedValue({
            juegoId: 1,
            averageRating: 0,
            ratingCount: 0
        });

        renderWithProviders(<Rating juegoId={1} />);

        await waitFor(() => {
            expect(screen.getByText(/Sin calificaciones/i)).toBeInTheDocument();
        });
    });

    test('debe mostrar alerta si no está autenticado', async () => {
        vi.mocked(ratingService.getGameRating).mockResolvedValue({
            juegoId: 1,
            averageRating: 4.5,
            ratingCount: 10
        });

        renderWithProviders(<Rating juegoId={1} />);

        await waitFor(() => {
            expect(screen.getByText(/Inicia sesión/i)).toBeInTheDocument();
        });
    });

    test('debe cargar el rating del usuario si está autenticado', async () => {
        const mockUser = {
            id: 1,
            email: 'test@test.com',
            name: 'Test User',
            role: 'user',
            token: 'mock-token'
        };

        localStorage.setItem('user', JSON.stringify(mockUser));
        localStorage.setItem('token', 'mock-token');

        vi.mocked(ratingService.getGameRating).mockResolvedValue({
            juegoId: 1,
            averageRating: 4.5,
            ratingCount: 10
        });

        vi.mocked(ratingService.getUserRating).mockResolvedValue({
            id: 1,
            juegoId: 1,
            usuarioId: 1,
            calificacion: 5,
            fechaCreacion: '2024-01-01'
        });

        renderWithProviders(<Rating juegoId={1} />);

        await waitFor(() => {
            expect(ratingService.getUserRating).toHaveBeenCalledWith(1, 1);
        });

        localStorage.clear();
    });

    test('debe permitir calificar cuando el usuario está autenticado', async () => {
        const mockUser = {
            id: 1,
            email: 'test@test.com',
            name: 'Test User',
            role: 'user',
            token: 'mock-token'
        };

        localStorage.setItem('user', JSON.stringify(mockUser));
        localStorage.setItem('token', 'mock-token');

        vi.mocked(ratingService.getGameRating).mockResolvedValue({
            juegoId: 1,
            averageRating: 0,
            ratingCount: 0
        });

        vi.mocked(ratingService.getUserRating).mockResolvedValue(null);
        vi.mocked(ratingService.createOrUpdateRating).mockResolvedValue({
            id: 1,
            juegoId: 1,
            usuarioId: 1,
            calificacion: 5,
            fechaCreacion: '2024-01-01'
        });

        renderWithProviders(<Rating juegoId={1} />);

        await waitFor(() => {
            expect(screen.getByText(/Califica este juego/i)).toBeInTheDocument();
        });

        // Buscar las estrellas interactivas
        const stars = screen.getAllByRole('generic').filter(el => 
            el.className.includes('bi-star')
        );

        if (stars.length > 0) {
            fireEvent.click(stars[0]);

            await waitFor(() => {
                expect(ratingService.createOrUpdateRating).toHaveBeenCalled();
            });
        }

        localStorage.clear();
    });

    test('debe llamar a onRatingUpdate cuando se actualiza el rating', async () => {
        const mockOnRatingUpdate = vi.fn();

        vi.mocked(ratingService.getGameRating).mockResolvedValue({
            juegoId: 1,
            averageRating: 4.5,
            ratingCount: 10
        });

        renderWithProviders(<Rating juegoId={1} onRatingUpdate={mockOnRatingUpdate} />);

        await waitFor(() => {
            expect(mockOnRatingUpdate).toHaveBeenCalledWith({
                juegoId: 1,
                averageRating: 4.5,
                ratingCount: 10
            });
        });
    });

    test('debe mostrar el rating del usuario si ya calificó', async () => {
        const mockUser = {
            id: 1,
            email: 'test@test.com',
            name: 'Test User',
            role: 'user',
            token: 'mock-token'
        };

        localStorage.setItem('user', JSON.stringify(mockUser));
        localStorage.setItem('token', 'mock-token');

        vi.mocked(ratingService.getGameRating).mockResolvedValue({
            juegoId: 1,
            averageRating: 4.5,
            ratingCount: 10
        });

        vi.mocked(ratingService.getUserRating).mockResolvedValue({
            id: 1,
            juegoId: 1,
            usuarioId: 1,
            calificacion: 5,
            fechaCreacion: '2024-01-01'
        });

        renderWithProviders(<Rating juegoId={1} />);

        await waitFor(() => {
            expect(screen.getByText(/Tu Calificación/i)).toBeInTheDocument();
        });

        localStorage.clear();
    });
});

