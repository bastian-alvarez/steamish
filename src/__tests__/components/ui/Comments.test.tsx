import React from 'react';
import { describe, test, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Comments from '../../../components/ui/Comments/Comments';
import { AuthProvider } from '../../../context/AuthContext';
import { NotificationProvider } from '../../../components/ui/NotificationToast/NotificationToast';
import commentService from '../../../services/commentService';

// Mock del servicio de comentarios
vi.mock('../../../services/commentService', () => ({
    default: {
        getCommentsByGame: vi.fn(),
        createComment: vi.fn(),
        deleteComment: vi.fn()
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

describe('Comments Component', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    test('debe renderizar el componente', () => {
        vi.mocked(commentService.getCommentsByGame).mockResolvedValue([]);

        renderWithProviders(<Comments juegoId={1} />);

        expect(screen.getByText(/Comentarios/i)).toBeInTheDocument();
    });

    test('debe cargar comentarios al montar', async () => {
        const mockComments = [
            {
                id: 1,
                juegoId: 1,
                usuarioId: 1,
                usuarioNombre: 'User 1',
                contenido: 'Test comment',
                fechaCreacion: '2024-01-01T00:00:00',
                oculto: false
            }
        ];

        vi.mocked(commentService.getCommentsByGame).mockResolvedValue(mockComments);

        renderWithProviders(<Comments juegoId={1} />);

        await waitFor(() => {
            expect(screen.getByText('Test comment')).toBeInTheDocument();
        });
    });

    test('debe mostrar mensaje cuando no hay comentarios', async () => {
        vi.mocked(commentService.getCommentsByGame).mockResolvedValue([]);

        renderWithProviders(<Comments juegoId={1} />);

        await waitFor(() => {
            expect(screen.getByText(/Aún no hay comentarios/i)).toBeInTheDocument();
        });
    });

    test('debe mostrar spinner mientras carga', () => {
        vi.mocked(commentService.getCommentsByGame).mockImplementation(() => new Promise(() => {}));

        renderWithProviders(<Comments juegoId={1} />);

        expect(screen.getByText(/Cargando comentarios/i)).toBeInTheDocument();
    });

    test('debe mostrar alerta si no está autenticado', () => {
        vi.mocked(commentService.getCommentsByGame).mockResolvedValue([]);

        renderWithProviders(<Comments juegoId={1} />);

        expect(screen.getByText(/Inicia sesión/i)).toBeInTheDocument();
    });

    test('debe crear un comentario cuando el usuario está autenticado', async () => {
        const mockUser = {
            id: 1,
            email: 'test@test.com',
            name: 'Test User',
            role: 'user',
            token: 'mock-token'
        };

        localStorage.setItem('user', JSON.stringify(mockUser));
        localStorage.setItem('token', 'mock-token');

        const mockNewComment = {
            id: 2,
            juegoId: 1,
            usuarioId: 1,
            usuarioNombre: 'Test User',
            contenido: 'New comment',
            fechaCreacion: '2024-01-02T00:00:00',
            oculto: false
        };

        vi.mocked(commentService.getCommentsByGame).mockResolvedValue([]);
        vi.mocked(commentService.createComment).mockResolvedValue(mockNewComment);

        renderWithProviders(<Comments juegoId={1} />);

        await waitFor(() => {
            const textarea = screen.getByPlaceholderText(/Comparte tu opinión/i);
            expect(textarea).toBeInTheDocument();
        });

        const textarea = screen.getByPlaceholderText(/Comparte tu opinión/i);
        const submitButton = screen.getByText(/Publicar Comentario/i);

        fireEvent.change(textarea, { target: { value: 'New comment' } });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(commentService.createComment).toHaveBeenCalledWith({
                juegoId: 1,
                usuarioId: 1,
                usuarioNombre: 'Test User',
                contenido: 'New comment'
            });
        });

        localStorage.clear();
    });

    test('debe mostrar error si el comentario está vacío', async () => {
        const mockUser = {
            id: 1,
            email: 'test@test.com',
            name: 'Test User',
            role: 'user',
            token: 'mock-token'
        };

        localStorage.setItem('user', JSON.stringify(mockUser));
        localStorage.setItem('token', 'mock-token');

        vi.mocked(commentService.getCommentsByGame).mockResolvedValue([]);

        renderWithProviders(<Comments juegoId={1} />);

        await waitFor(() => {
            const submitButton = screen.getByText(/Publicar Comentario/i);
            expect(submitButton).toBeInTheDocument();
        });

        const submitButton = screen.getByText(/Publicar Comentario/i);
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText(/El comentario no puede estar vacío/i)).toBeInTheDocument();
        });

        localStorage.clear();
    });

    test('debe eliminar un comentario cuando el usuario es el autor', async () => {
        const mockUser = {
            id: 1,
            email: 'test@test.com',
            name: 'Test User',
            role: 'user',
            token: 'mock-token'
        };

        localStorage.setItem('user', JSON.stringify(mockUser));
        localStorage.setItem('token', 'mock-token');

        const mockComments = [
            {
                id: 1,
                juegoId: 1,
                usuarioId: 1,
                usuarioNombre: 'Test User',
                contenido: 'My comment',
                fechaCreacion: '2024-01-01T00:00:00',
                oculto: false
            }
        ];

        vi.mocked(commentService.getCommentsByGame).mockResolvedValue(mockComments);
        vi.mocked(commentService.deleteComment).mockResolvedValue(true);

        // Mock de window.confirm
        window.confirm = vi.fn(() => true);

        renderWithProviders(<Comments juegoId={1} />);

        await waitFor(() => {
            expect(screen.getByText('My comment')).toBeInTheDocument();
        });

        const deleteButton = screen.getByRole('button', { name: '' });
        fireEvent.click(deleteButton);

        await waitFor(() => {
            expect(commentService.deleteComment).toHaveBeenCalledWith(1);
        });

        localStorage.clear();
    });
});

