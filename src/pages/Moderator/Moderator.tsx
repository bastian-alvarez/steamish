import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Container, Row, Col, Card, Table, Badge, Button, Alert, Modal, Toast, ToastContainer } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';
import contactService from '../../services/contactService';
import { ContactMessage } from '../../types/Contact';
import { COLORS } from '../../utils/constants';

const Moderator: React.FC = () => {
    const { user } = useAuth();
    const [messages, setMessages] = useState<ContactMessage[]>([]);
    const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [filter, setFilter] = useState<'all' | 'unread'>('all');
    const [showNewMessageToast, setShowNewMessageToast] = useState(false);
    const [newMessageCount, setNewMessageCount] = useState(0);
    const previousMessageCountRef = useRef<number>(0);

    useEffect(() => {
        // Cargar mensajes al montar
        loadMessages();

        // Escuchar eventos de nuevos mensajes
        const handleMessageAdded = (event: Event) => {
            const customEvent = event as CustomEvent;
            loadMessages();
            
            // Mostrar notificación de nuevo mensaje
            if (customEvent.detail) {
                setNewMessageCount(prev => prev + 1);
                setShowNewMessageToast(true);
                setTimeout(() => setShowNewMessageToast(false), 5000);
            }
        };

        const handleMessageUpdated = () => {
            loadMessages();
        };

        window.addEventListener('contactMessageAdded', handleMessageAdded);
        window.addEventListener('contactMessageUpdated', handleMessageUpdated);

        // Verificar cambios cada 2 segundos (backup)
        const interval = setInterval(() => {
            const currentMessages = contactService.getMessages();
            const currentUnreadCount = currentMessages.filter(msg => !msg.read).length;
            
            // Si hay nuevos mensajes no leídos, actualizar
            if (currentUnreadCount !== previousMessageCountRef.current) {
                const newMessages = currentUnreadCount - previousMessageCountRef.current;
                if (newMessages > 0) {
                    setNewMessageCount(prev => prev + newMessages);
                    setShowNewMessageToast(true);
                    setTimeout(() => setShowNewMessageToast(false), 5000);
                }
                previousMessageCountRef.current = currentUnreadCount;
                loadMessages();
            }
        }, 2000);

        // Limpiar listeners al desmontar
        return () => {
            window.removeEventListener('contactMessageAdded', handleMessageAdded);
            window.removeEventListener('contactMessageUpdated', handleMessageUpdated);
            clearInterval(interval);
        };
    }, []);

    const loadMessages = () => {
        const allMessages = contactService.getMessages();
        setMessages(allMessages);
        // Actualizar referencia del contador
        const unreadCount = allMessages.filter(msg => !msg.read).length;
        previousMessageCountRef.current = unreadCount;
    };

    const filteredMessages = useMemo(() => {
        if (filter === 'unread') {
            return messages.filter(msg => !msg.read);
        }
        return messages;
    }, [messages, filter]);

    const unreadCount = useMemo(() => {
        return messages.filter(msg => !msg.read).length;
    }, [messages]);

    const handleViewMessage = (message: ContactMessage) => {
        setSelectedMessage(message);
        setShowModal(true);
        if (!message.read) {
            contactService.markAsRead(message.id);
            loadMessages();
        }
    };

    const handleDeleteMessage = (messageId: string) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar este mensaje?')) {
            contactService.deleteMessage(messageId);
            loadMessages();
            if (selectedMessage?.id === messageId) {
                setShowModal(false);
                setSelectedMessage(null);
            }
        }
    };

    const handleMarkAllAsRead = () => {
        contactService.markAllAsRead();
        loadMessages();
    };

    const sortedMessages = [...filteredMessages].sort((a, b) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    return (
        <div className="min-vh-100 bg-light">
            {/* Header */}
            <div className="bg-primary text-white py-4" style={{ background: COLORS.gradientPrimary }}>
                <Container>
                    <Row>
                        <Col>
                            <h1 className="display-5 fw-bold mb-2">
                                <i className="bi bi-shield-check me-3"></i>Panel Moderador
                            </h1>
                            <p className="lead mb-0">Gestiona los mensajes de contacto</p>
                        </Col>
                    </Row>
                </Container>
            </div>

            <Container className="py-5">
                {/* Estadísticas */}
                <Row className="mb-4">
                    <Col md={4}>
                        <Card className="border-0 shadow-sm">
                            <Card.Body className="text-center">
                                <i className="bi bi-envelope display-4 text-primary mb-3"></i>
                                <h3 className="fw-bold">{messages.length}</h3>
                                <p className="text-muted mb-0">Total Mensajes</p>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card className="border-0 shadow-sm">
                            <Card.Body className="text-center">
                                <i className="bi bi-envelope-exclamation display-4 text-warning mb-3"></i>
                                <h3 className="fw-bold">{unreadCount}</h3>
                                <p className="text-muted mb-0">No Leídos</p>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card className="border-0 shadow-sm">
                            <Card.Body className="text-center">
                                <i className="bi bi-envelope-check display-4 text-success mb-3"></i>
                                <h3 className="fw-bold">{messages.length - unreadCount}</h3>
                                <p className="text-muted mb-0">Leídos</p>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                {/* Filtros y acciones */}
                <Card className="border-0 shadow-sm mb-4">
                    <Card.Body>
                        <Row className="align-items-center">
                            <Col md={6}>
                                <div className="btn-group" role="group">
                                    <Button
                                        variant={filter === 'all' ? 'primary' : 'outline-primary'}
                                        onClick={() => setFilter('all')}
                                    >
                                        <i className="bi bi-list-ul me-2"></i>Todos
                                    </Button>
                                    <Button
                                        variant={filter === 'unread' ? 'primary' : 'outline-primary'}
                                        onClick={() => setFilter('unread')}
                                    >
                                        <i className="bi bi-envelope-exclamation me-2"></i>
                                        No Leídos {unreadCount > 0 && `(${unreadCount})`}
                                    </Button>
                                </div>
                            </Col>
                            <Col md={6} className="text-end">
                                {unreadCount > 0 && (
                                    <Button
                                        variant="success"
                                        onClick={handleMarkAllAsRead}
                                    >
                                        <i className="bi bi-check-all me-2"></i>Marcar Todos como Leídos
                                    </Button>
                                )}
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>

                {/* Lista de mensajes */}
                <Card className="border-0 shadow-sm">
                    <Card.Header className="bg-white">
                        <h4 className="mb-0">
                            <i className="bi bi-chat-left-text me-2"></i>
                            Mensajes de Contacto
                        </h4>
                    </Card.Header>
                    <Card.Body className="p-0">
                        {sortedMessages.length === 0 ? (
                            <div className="text-center py-5">
                                <i className="bi bi-inbox text-muted" style={{ fontSize: '4rem' }}></i>
                                <h4 className="mt-3 text-muted">No hay mensajes</h4>
                                <p className="text-muted">
                                    {filter === 'unread' 
                                        ? 'No hay mensajes sin leer' 
                                        : 'Aún no has recibido mensajes de contacto'}
                                </p>
                            </div>
                        ) : (
                            <Table hover responsive className="mb-0">
                                <thead className="table-light">
                                    <tr>
                                        <th>Estado</th>
                                        <th>Nombre</th>
                                        <th>Email</th>
                                        <th>Mensaje</th>
                                        <th>Fecha</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {sortedMessages.map((message) => (
                                        <tr key={message.id} className={!message.read ? 'table-warning' : ''}>
                                            <td>
                                                {message.read ? (
                                                    <Badge bg="success">
                                                        <i className="bi bi-check-circle me-1"></i>Leído
                                                    </Badge>
                                                ) : (
                                                    <Badge bg="warning">
                                                        <i className="bi bi-exclamation-circle me-1"></i>Nuevo
                                                    </Badge>
                                                )}
                                            </td>
                                            <td>
                                                <strong>{message.name}</strong>
                                            </td>
                                            <td>
                                                <a href={`mailto:${message.email}`} className="text-decoration-none">
                                                    {message.email}
                                                </a>
                                            </td>
                                            <td>
                                                <div style={{ 
                                                    maxWidth: '300px', 
                                                    overflow: 'hidden', 
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap'
                                                }}>
                                                    {message.message}
                                                </div>
                                            </td>
                                            <td>
                                                <small className="text-muted">
                                                    {new Date(message.createdAt).toLocaleString('es-ES', {
                                                        year: 'numeric',
                                                        month: 'short',
                                                        day: 'numeric',
                                                        hour: '2-digit',
                                                        minute: '2-digit'
                                                    })}
                                                </small>
                                            </td>
                                            <td>
                                                <Button
                                                    variant="info"
                                                    size="sm"
                                                    onClick={() => handleViewMessage(message)}
                                                    className="me-2"
                                                >
                                                    <i className="bi bi-eye me-1"></i>Ver
                                                </Button>
                                                <Button
                                                    variant="danger"
                                                    size="sm"
                                                    onClick={() => handleDeleteMessage(message.id)}
                                                >
                                                    <i className="bi bi-trash"></i>
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        )}
                    </Card.Body>
                </Card>
            </Container>

            {/* Toast de notificación de nuevo mensaje */}
            <ToastContainer position="top-end" className="p-3" style={{ zIndex: 9999 }}>
                <Toast 
                    show={showNewMessageToast} 
                    onClose={() => setShowNewMessageToast(false)}
                    delay={5000}
                    autohide
                    bg="info"
                    className="animate__animated animate__slideInRight"
                >
                    <Toast.Header>
                        <i className="bi bi-envelope-exclamation-fill me-2 text-info"></i>
                        <strong className="me-auto">¡Nuevo Mensaje!</strong>
                    </Toast.Header>
                    <Toast.Body className="text-white">
                        {newMessageCount === 1 
                            ? 'Has recibido un nuevo mensaje de contacto' 
                            : `Has recibido ${newMessageCount} nuevos mensajes de contacto`}
                    </Toast.Body>
                </Toast>
            </ToastContainer>

            {/* Modal para ver mensaje completo */}
            <Modal show={showModal} onHide={() => setShowModal(false)} centered size="lg">
                <Modal.Header closeButton style={{ background: COLORS.gradientPrimary, color: 'white' }}>
                    <Modal.Title>
                        <i className="bi bi-envelope me-2"></i>Mensaje de Contacto
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedMessage && (
                        <>
                            <Row className="mb-3">
                                <Col md={6}>
                                    <strong><i className="bi bi-person me-2"></i>Nombre:</strong>
                                    <p className="mb-0">{selectedMessage.name}</p>
                                </Col>
                                <Col md={6}>
                                    <strong><i className="bi bi-envelope me-2"></i>Email:</strong>
                                    <p className="mb-0">
                                        <a href={`mailto:${selectedMessage.email}`} className="text-decoration-none">
                                            {selectedMessage.email}
                                        </a>
                                    </p>
                                </Col>
                            </Row>
                            <Row className="mb-3">
                                <Col>
                                    <strong><i className="bi bi-calendar me-2"></i>Fecha:</strong>
                                    <p className="mb-0">
                                        {new Date(selectedMessage.createdAt).toLocaleString('es-ES', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </p>
                                </Col>
                            </Row>
                            <hr />
                            <div>
                                <strong><i className="bi bi-chat-left-text me-2"></i>Mensaje:</strong>
                                <div className="mt-2 p-3 bg-light rounded" style={{ whiteSpace: 'pre-wrap' }}>
                                    {selectedMessage.message}
                                </div>
                            </div>
                        </>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cerrar
                    </Button>
                    {selectedMessage && (
                        <Button
                            variant="danger"
                            onClick={() => {
                                if (selectedMessage) {
                                    handleDeleteMessage(selectedMessage.id);
                                }
                            }}
                        >
                            <i className="bi bi-trash me-2"></i>Eliminar Mensaje
                        </Button>
                    )}
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Moderator;

