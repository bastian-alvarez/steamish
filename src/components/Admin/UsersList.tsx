import React from 'react';
import { Modal, Button, Table, Badge, Alert } from 'react-bootstrap';
import { User } from '../../types/User';
import { UserRole } from '../../types/User';
import { COLORS } from '../../utils/constants';

interface UsersListProps {
    show: boolean;
    onHide: () => void;
    users: User[];
    onToggleUserStatus: (userId: string) => void;
}

// Componente con responsabilidad única: Lista y gestión de usuarios
const UsersList: React.FC<UsersListProps> = ({ show, onHide, users, onToggleUserStatus }) => {
    return (
        <Modal show={show} onHide={onHide} centered size="xl">
            <Modal.Header closeButton style={{ background: COLORS.gradientPrimary, color: 'white' }}>
                <Modal.Title><i className="bi bi-people me-2"></i>Gestionar Usuarios</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {users.length === 0 ? (
                    <Alert variant="info" className="text-center">
                        <i className="bi bi-info-circle me-2"></i>No hay usuarios en el sistema.
                    </Alert>
                ) : (
                    <Table hover responsive>
                        <thead>
                            <tr>
                                <th>Email</th>
                                <th>Username</th>
                                <th>Rol</th>
                                <th>Estado</th>
                                <th>Fecha de Registro</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user.id}>
                                    <td>
                                        <strong>{user.email}</strong>
                                    </td>
                                    <td>{user.username}</td>
                                    <td>
                                        {user.role === UserRole.ADMIN ? (
                                            <Badge bg="danger">Admin</Badge>
                                        ) : (
                                            <Badge bg="secondary">Usuario</Badge>
                                        )}
                                    </td>
                                    <td>
                                        {user.isActive ? (
                                            <Badge bg="success">
                                                <i className="bi bi-check-circle me-1"></i>Activo
                                            </Badge>
                                        ) : (
                                            <Badge bg="danger">
                                                <i className="bi bi-x-circle me-1"></i>Bloqueado
                                            </Badge>
                                        )}
                                    </td>
                                    <td>
                                        <small>{new Date(user.createdAt).toLocaleDateString('es-ES')}</small>
                                    </td>
                                    <td>
                                        {user.role !== UserRole.ADMIN && (
                                            <Button 
                                                variant={user.isActive ? "danger" : "success"} 
                                                size="sm" 
                                                onClick={() => onToggleUserStatus(user.id)}
                                            >
                                                <i className={`bi bi-${user.isActive ? 'lock' : 'unlock'} me-1`}></i>
                                                {user.isActive ? 'Bloquear' : 'Desbloquear'}
                                            </Button>
                                        )}
                                        {user.role === UserRole.ADMIN && (
                                            <small className="text-muted">No se puede bloquear</small>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>Cerrar</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default UsersList;





