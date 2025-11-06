import React from 'react';
import { Modal, Button, Table, Badge, Alert } from 'react-bootstrap';
import { Product } from '../../types/Product';
import { COLORS } from '../../utils/constants';

interface GamesListProps {
    show: boolean;
    onHide: () => void;
    games: Product[];
    onDelete: (id: string) => void;
}

// Componente con responsabilidad única: Lista y gestión de juegos
const GamesList: React.FC<GamesListProps> = ({ show, onHide, games, onDelete }) => {
    return (
        <Modal show={show} onHide={onHide} centered size="xl">
            <Modal.Header closeButton style={{ background: COLORS.gradientPrimary, color: 'white' }}>
                <Modal.Title><i className="bi bi-list-ul me-2"></i>Gestionar Juegos</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {games.length === 0 ? (
                    <Alert variant="info" className="text-center">
                        <i className="bi bi-info-circle me-2"></i>No hay juegos en el sistema. Agrega un nuevo juego para comenzar.
                    </Alert>
                ) : (
                    <Table hover responsive>
                        <thead>
                            <tr>
                                <th>Imagen</th>
                                <th>Nombre</th>
                                <th>Categoría</th>
                                <th>Precio</th>
                                <th>Rating</th>
                                <th>Tipo</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {games.map(game => (
                                <tr key={game.id}>
                                    <td>
                                        <img src={game.image} alt={game.name} className="img-fluid"
                                            style={{ width: '60px', height: '40px', objectFit: 'cover', borderRadius: '4px' }}
                                            onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/60x40/4d4d80/ffffff?text=Game'; }} />
                                    </td>
                                    <td>
                                        <strong>{game.name}</strong>
                                        {game.featured && <Badge bg="info" className="ms-2">Destacado</Badge>}
                                    </td>
                                    <td><Badge bg="secondary">{game.category}</Badge></td>
                                    <td>
                                        ${game.price.toFixed(2)}
                                        {game.discount > 0 && <small className="text-danger ms-1">(-{game.discount}%)</small>}
                                    </td>
                                    <td><span className="fw-bold">{game.rating}</span> <i className="bi bi-star-fill text-warning ms-1"></i></td>
                                    <td>{game.id.startsWith('custom_') ? <Badge bg="success">Personalizado</Badge> : <Badge bg="primary">Inicial</Badge>}</td>
                                    <td>
                                        <Button variant="danger" size="sm" onClick={() => onDelete(game.id)}>
                                            <i className="bi bi-trash me-1"></i>Eliminar
                                        </Button>
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

export default GamesList;





