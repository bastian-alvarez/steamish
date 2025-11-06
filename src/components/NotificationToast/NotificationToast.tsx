import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';

interface NotificationContextType {
    showSuccess: (message: string) => void;
    showError: (message: string) => void;
    showWarning: (message: string) => void;
    showInfo: (message: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

interface ToastMessage {
    id: number;
    message: string;
    variant: 'success' | 'danger' | 'warning' | 'info';
}

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [toasts, setToasts] = useState<ToastMessage[]>([]);

    const addToast = useCallback((message: string, variant: 'success' | 'danger' | 'warning' | 'info') => {
        const id = Date.now();
        setToasts(prev => [...prev, { id, message, variant }]);
        
        // Auto-remover después de 3 segundos
        setTimeout(() => {
            setToasts(prev => prev.filter(toast => toast.id !== id));
        }, 3000);
    }, []);

    const showSuccess = useCallback((message: string) => {
        addToast(message, 'success');
    }, [addToast]);

    const showError = useCallback((message: string) => {
        addToast(message, 'danger');
    }, [addToast]);

    const showWarning = useCallback((message: string) => {
        addToast(message, 'warning');
    }, [addToast]);

    const showInfo = useCallback((message: string) => {
        addToast(message, 'info');
    }, [addToast]);

    const removeToast = useCallback((id: number) => {
        setToasts(prev => prev.filter(toast => toast.id !== id));
    }, []);

    const value: NotificationContextType = {
        showSuccess,
        showError,
        showWarning,
        showInfo
    };

    return (
        <NotificationContext.Provider value={value}>
            {children}
            <ToastContainer position="top-end" className="p-3" style={{ zIndex: 9999 }}>
                {toasts.map(toast => (
                    <Toast
                        key={toast.id}
                        onClose={() => removeToast(toast.id)}
                        show={true}
                        delay={3000}
                        autohide
                        bg={toast.variant}
                    >
                        <Toast.Header>
                            <i className={`bi bi-${toast.variant === 'success' ? 'check-circle' : toast.variant === 'danger' ? 'exclamation-circle' : toast.variant === 'warning' ? 'exclamation-triangle' : 'info-circle'} me-2`}></i>
                            <strong className="me-auto">
                                {toast.variant === 'success' ? 'Éxito' : toast.variant === 'danger' ? 'Error' : toast.variant === 'warning' ? 'Advertencia' : 'Información'}
                            </strong>
                        </Toast.Header>
                        <Toast.Body className="text-white">
                            {toast.message}
                        </Toast.Body>
                    </Toast>
                ))}
            </ToastContainer>
        </NotificationContext.Provider>
    );
};

export const useNotification = (): NotificationContextType => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error('useNotification debe ser usado dentro de un NotificationProvider');
    }
    return context;
};

