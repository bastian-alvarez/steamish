import React from 'react';
import { describe, test, expect } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { NotificationProvider, useNotification } from '../../../components/ui/NotificationToast/NotificationToast';

const TestComponent = () => {
    const { showSuccess, showError, showWarning, showInfo } = useNotification();

    return (
        <div>
            <button onClick={() => showSuccess('Success message')}>Show Success</button>
            <button onClick={() => showError('Error message')}>Show Error</button>
            <button onClick={() => showWarning('Warning message')}>Show Warning</button>
            <button onClick={() => showInfo('Info message')}>Show Info</button>
        </div>
    );
};

const renderWithProvider = (component: React.ReactElement) => {
    return render(
        <NotificationProvider>
            {component}
        </NotificationProvider>
    );
};

describe('NotificationToast Component', () => {
    test('debe renderizar el provider', () => {
        renderWithProvider(<TestComponent />);

        expect(screen.getByText(/Show Success/i)).toBeInTheDocument();
    });

    test('debe mostrar notificación de éxito', async () => {
        renderWithProvider(<TestComponent />);

        const successButton = screen.getByText(/Show Success/i);
        fireEvent.click(successButton);

        await waitFor(() => {
            expect(screen.getByText(/Success message/i)).toBeInTheDocument();
        });
    });

    test('debe mostrar notificación de error', async () => {
        renderWithProvider(<TestComponent />);

        const errorButton = screen.getByText(/Show Error/i);
        fireEvent.click(errorButton);

        await waitFor(() => {
            expect(screen.getByText(/Error message/i)).toBeInTheDocument();
        });
    });

    test('debe mostrar notificación de advertencia', async () => {
        renderWithProvider(<TestComponent />);

        const warningButton = screen.getByText(/Show Warning/i);
        fireEvent.click(warningButton);

        await waitFor(() => {
            expect(screen.getByText(/Warning message/i)).toBeInTheDocument();
        });
    });

    test('debe mostrar notificación de información', async () => {
        renderWithProvider(<TestComponent />);

        const infoButton = screen.getByText(/Show Info/i);
        fireEvent.click(infoButton);

        await waitFor(() => {
            expect(screen.getByText(/Info message/i)).toBeInTheDocument();
        });
    });
});

