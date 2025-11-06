import React, { useState, useMemo } from 'react';
import { Container, Row, Col, Card, Button, Modal, Alert, Form, Table, Badge } from 'react-bootstrap';
import { useProducts } from '../../context/ProductContext';
import { COLORS } from '../../utils/constants';
import authService from '../../services/authService';
import { Product } from '../../types/Product';
import { UserRole } from '../../types/User';

interface AdminFormData {
    name: string;
    description: string;
    price: string;
    category: string;
    rating: string;
    discount: string;
    image: string;
    tags: string;
    featured: boolean;
}

interface AdminStat {
    icon: string;
    title: string;
    count: string;
    color: string;
}

interface QuickAction {
    icon: string;
    title: string;
    desc: string;
    color: string;
    action: () => void;
}

const Admin: React.FC = () => {
    const { products, addProduct, deleteProduct, refreshProducts } = useProducts();
    const [modals, setModals] = useState({ newGame: false, gamesList: false, usersList: false });
    const [users, setUsers] = useState(authService.getAllUsers());
    const [formError, setFormError] = useState('');
    const [formData, setFormData] = useState<AdminFormData>({
        name: '', description: '', price: '', category: '', rating: '',
        discount: '0', image: '', tags: '', featured: false
    });

    const categories = ['Acción', 'Aventura', 'Simulación', 'Deportes', 'Battle Royale', 'Estrategia', 'MOBA', 'Carreras'];
    const allGames = useMemo(() => products, [products]);

    const stats = useMemo(() => {
        const users = authService.getAllUsers();
        return {
            games: products.length.toLocaleString('es-ES'),
            users: users.length.toLocaleString('es-ES')
        };
    }, [products]);

    const adminStats: AdminStat[] = [
        { icon: 'controller', title: 'Juegos', count: stats.games, color: 'primary' },
        { icon: 'people', title: 'Usuarios', count: stats.users, color: 'info' }
    ];

    const quickActions: QuickAction[] = [
        { icon: 'plus-circle', title: 'Nuevo Juego', desc: 'Agregar producto', color: 'primary', action: () => setModals({ ...modals, newGame: true }) },
        { icon: 'list-ul', title: 'Gestionar Juegos', desc: 'Ver y eliminar', color: 'warning', action: () => setModals({ ...modals, gamesList: true }) },
        { icon: 'people', title: 'Gestionar Usuarios', desc: 'Bloquear y desbloquear', color: 'danger', action: () => {
            setUsers(authService.getAllUsers());
            setModals({ ...modals, usersList: true });
        }}
    ];

    const updateForm = (field: keyof AdminFormData, value: string | boolean) => 
        setFormData({ ...formData, [field]: value });

    const resetForm = () => setFormData({
        name: '', description: '', price: '', category: '', rating: '',
        discount: '0', image: '', tags: '', featured: false
    });

    const validateForm = (): boolean => {
        if (!formData.name.trim()) return setFormError('El nombre del juego es requerido'), false;
        if (!formData.description.trim()) return setFormError('La descripción es requerida'), false;
        if (!formData.category) return setFormError('Debes seleccionar una categoría'), false;
        const price = parseFloat(formData.price);
        if (isNaN(price) || price < 0) return setFormError('El precio debe ser un número válido mayor o igual a 0'), false;
        const rating = parseFloat(formData.rating);
        if (isNaN(rating) || rating < 0 || rating > 5) return setFormError('El rating debe estar entre 0 y 5'), false;
        if (!formData.image.trim()) return setFormError('La URL de la imagen es requerida'), false;
        return true;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setFormError('');
        if (!validateForm()) return;

        const tagsArray = formData.tags.trim()
            ? formData.tags.split(',').map(t => t.trim()).filter(t => t)
            : [formData.category];

        const newProduct: Omit<Product, 'id'> = {
            name: formData.name.trim(),
            description: formData.description.trim(),
            price: parseFloat(formData.price),
            category: formData.category,
            rating: parseFloat(formData.rating),
            discount: parseInt(formData.discount) || 0,
            image: formData.image.trim(),
            tags: tagsArray,
            featured: formData.featured
        };

        try {
            addProduct(newProduct);
            resetForm();
            setModals({ ...modals, newGame: false });
            refreshProducts();
            alert('¡Juego agregado exitosamente!');
        } catch {
            setFormError('Error al guardar el juego. Intenta nuevamente.');
        }
    };

    const handleDelete = (id: string) => {
        const game = products.find(p => p.id === id);
        const gameName = game?.name || 'este juego';
        if (window.confirm(`¿Estás seguro de que deseas eliminar "${gameName}" del sistema?\n\nEsta acción no se puede deshacer.`)) {
            if (deleteProduct(id)) {
                refreshProducts();
                alert(`"${gameName}" ha sido eliminado exitosamente del sistema.`);
            } else {
                alert('Error al eliminar el juego. Intenta nuevamente.');
            }
        }
    };

    const handleToggleUserStatus = (userId: string) => {
        const user = users.find(u => u.id === userId);
        if (!user) return;

        const newStatus = !user.isActive;
        const statusText = newStatus ? 'desbloqueado' : 'bloqueado';
        
        if (window.confirm(`¿Estás seguro de que deseas ${statusText === 'bloqueado' ? 'bloquear' : 'desbloquear'} al usuario "${user.username}"?\n\n${newStatus ? 'El usuario podrá iniciar sesión nuevamente.' : 'El usuario no podrá iniciar sesión hasta que sea desbloqueado.'}`)) {
            authService.updateUserStatus(userId, newStatus);
            setUsers(authService.getAllUsers());
            alert(`Usuario "${user.username}" ha sido ${statusText} exitosamente.`);
        }
    };

    const formFields = [
        { field: 'name' as keyof AdminFormData, icon: 'tag', label: 'Nombre del Juego', type: 'text', placeholder: 'Ej: Super Mario Bros', required: true, cols: 12 },
        { field: 'description' as keyof AdminFormData, icon: 'card-text', label: 'Descripción', type: 'textarea', placeholder: 'Descripción detallada del juego...', required: true, cols: 12 },
        { field: 'price' as keyof AdminFormData, icon: 'currency-dollar', label: 'Precio ($)', type: 'number', placeholder: '0.00', required: true, cols: 4 },
        { field: 'category' as keyof AdminFormData, icon: 'grid-3x3-gap', label: 'Categoría', type: 'select', placeholder: '', required: true, cols: 4 },
        { field: 'rating' as keyof AdminFormData, icon: 'star', label: 'Rating (0-5)', type: 'number', placeholder: '4.5', required: true, cols: 4 },
        { field: 'discount' as keyof AdminFormData, icon: 'percent', label: 'Descuento (%)', type: 'number', placeholder: '0', required: false, cols: 4 },
        { field: 'image' as keyof AdminFormData, icon: 'image', label: 'URL de la Imagen', type: 'url', placeholder: 'https://ejemplo.com/imagen.jpg', required: true, cols: 8 },
        { field: 'tags' as keyof AdminFormData, icon: 'tags', label: 'Tags (separados por comas)', type: 'text', placeholder: 'Ej: Acción, RPG, Multijugador', required: false, cols: 12 }
    ];

    return (
        <div className="min-vh-100 bg-light">
            <div className="bg-primary text-white py-4" style={{ background: COLORS.gradientPrimary }}>
                <Container>
                    <Row>
                        <Col>
                            <h1 className="display-5 fw-bold mb-2">
                                <i className="bi bi-shield-check me-3"></i>Panel Admin
                            </h1>
                            <p className="lead mb-0">Gestiona tu plataforma gaming</p>
                        </Col>
                    </Row>
                </Container>
            </div>

            <Container className="py-5">
                <Row className="g-4 mb-5 justify-content-center">
                    {adminStats.map(stat => (
                        <Col key={stat.title} lg={3} md={6}>
                            <Card className="border-0 shadow-sm h-100">
                                <Card.Body className="text-center p-4">
                                    <div className={`bg-${stat.color} text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3`} 
                                         style={{ width: '60px', height: '60px' }}>
                                        <i className={`bi bi-${stat.icon} fs-4`}></i>
                                    </div>
                                    <h3 className={`text-${stat.color} fw-bold`}>{stat.count}</h3>
                                    <p className="text-muted mb-0">{stat.title}</p>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>

                <Row>
                    <Col>
                        <h2 className="mb-4" style={{ color: COLORS.color4 }}>
                            <i className="bi bi-lightning me-2"></i>Acciones Rápidas
                        </h2>
                        <Row className="g-4 justify-content-center">
                            {quickActions.map(action => (
                                <Col key={action.title} lg={3} md={6}>
                                    <Card className="border-0 shadow-sm h-100 hover-effect">
                                        <Card.Body className="p-4">
                                            <div className="d-flex align-items-center mb-3">
                                                <div className={`bg-${action.color} text-white rounded-3 d-flex align-items-center justify-content-center me-3`} 
                                                     style={{ width: '50px', height: '50px' }}>
                                                    <i className={`bi bi-${action.icon}`}></i>
                                                </div>
                                                <div>
                                                    <Card.Title className={`h5 text-${action.color} mb-1`}>{action.title}</Card.Title>
                                                    <small className="text-muted">{action.desc}</small>
                                                </div>
                                            </div>
                                            <Button variant={action.color} size="sm" className="w-100" onClick={action.action}>
                                                Acceder <i className="bi bi-arrow-right ms-1"></i>
                                            </Button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </Col>
                </Row>
            </Container>

            <Modal show={modals.newGame} onHide={() => setModals({ ...modals, newGame: false })} centered size="lg">
                <Modal.Header closeButton style={{ background: COLORS.gradientPrimary, color: 'white' }}>
                    <Modal.Title><i className="bi bi-plus-circle me-2"></i>Nuevo Juego</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleSubmit}>
                    <Modal.Body>
                        {formError && <Alert variant="danger" className="mb-3"><i className="bi bi-exclamation-circle me-2"></i>{formError}</Alert>}
                        <Row className="g-3">
                            {formFields.map(({ field, icon, label, type, placeholder, required, cols }) => (
                                <Col key={field} md={cols}>
                                    <Form.Group>
                                        <Form.Label className="fw-bold"><i className={`bi bi-${icon} me-2`}></i>{label} {required && '*'}</Form.Label>
                                        {type === 'textarea' ? (
                                            <Form.Control as="textarea" rows={3} value={formData[field] as string} 
                                                onChange={(e) => updateForm(field, e.target.value)} placeholder={placeholder} required={required} />
                                        ) : type === 'select' ? (
                                            <Form.Select value={formData[field] as string} onChange={(e) => updateForm(field, e.target.value)} required={required}>
                                                <option value="">Selecciona una categoría</option>
                                                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                                            </Form.Select>
                                        ) : (
                                            <Form.Control type={type} value={formData[field] as string} 
                                                onChange={(e) => updateForm(field, e.target.value)} placeholder={placeholder} 
                                                required={required} step={type === 'number' && field === 'price' ? '0.01' : field === 'rating' ? '0.1' : '1'}
                                                min={type === 'number' ? (field === 'rating' ? '0' : '0') : undefined}
                                                max={type === 'number' && field === 'rating' ? '5' : field === 'discount' ? '100' : undefined} />
                                        )}
                                        {field === 'image' && <Form.Text className="text-muted">Ingresa la URL completa de la imagen del juego</Form.Text>}
                                        {field === 'tags' && <Form.Text className="text-muted">Si no especificas tags, se usará la categoría como tag principal</Form.Text>}
                                    </Form.Group>
                                </Col>
                            ))}
                            <Col md={12}>
                                <Form.Check type="checkbox" label="Marcar como juego destacado"
                                    checked={formData.featured} onChange={(e) => updateForm('featured', e.target.checked)} />
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setModals({ ...modals, newGame: false })}>Cancelar</Button>
                        <Button variant="primary" type="submit"><i className="bi bi-save me-2"></i>Guardar Juego</Button>
                    </Modal.Footer>
                </Form>
            </Modal>

            <Modal show={modals.gamesList} onHide={() => setModals({ ...modals, gamesList: false })} centered size="xl">
                <Modal.Header closeButton style={{ background: COLORS.gradientPrimary, color: 'white' }}>
                    <Modal.Title><i className="bi bi-list-ul me-2"></i>Gestionar Juegos</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {allGames.length === 0 ? (
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
                                {allGames.map(game => (
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
                                            <Button variant="danger" size="sm" onClick={() => handleDelete(game.id)}>
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
                    <Button variant="secondary" onClick={() => setModals({ ...modals, gamesList: false })}>Cerrar</Button>
                </Modal.Footer>
            </Modal>

            <Modal show={modals.usersList} onHide={() => setModals({ ...modals, usersList: false })} centered size="xl">
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
                                                    onClick={() => handleToggleUserStatus(user.id)}
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
                    <Button variant="secondary" onClick={() => setModals({ ...modals, usersList: false })}>Cerrar</Button>
                </Modal.Footer>
            </Modal>

            <style>{`.hover-effect:hover { transform: translateY(-3px); transition: all 0.3s ease; }`}</style>
        </div>
    );
};

export default Admin;
