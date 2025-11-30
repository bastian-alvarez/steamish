import React, { useState, useMemo, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Modal, Alert, Form, Table, Badge } from 'react-bootstrap';
import { useProducts } from '../../context/ProductContext';
import { COLORS } from '../../config/constants';
import authService from '../../services/authService';
import adminService from '../../services/adminService';
import orderService from '../../services/orderService';
import { Product } from '../../types/Product';
import { UserRole } from '../../types/User';
import { Order } from '../../types/Order';

interface AdminFormData {
    name: string;
    description: string;
    price: string;
    category: string;
    categoriaId: string;
    generoId: string;
    rating: string;
    discount: string;
    image: string;
    tags: string;
    featured: boolean;
    desarrollador: string;
    fechaLanzamiento: string;
    stock: string;
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
    const { products, addProduct, updateProduct, deleteProduct, refreshProducts, getCategories, getGenres } = useProducts();
    const [modals, setModals] = useState({ newGame: false, gamesList: false, usersList: false, ordersList: false, editGame: false });
    const [users, setUsers] = useState<any[]>([]);
    const [orders, setOrders] = useState<Order[]>([]);
    const [loadingUsers, setLoadingUsers] = useState(false);
    const [loadingOrders, setLoadingOrders] = useState(false);
    const [formError, setFormError] = useState('');
    const [editingGame, setEditingGame] = useState<Product | null>(null);
    const [formData, setFormData] = useState<AdminFormData>({
        name: '', description: '', price: '', category: '', categoriaId: '', generoId: '', rating: '',
        discount: '0', image: '', tags: '', featured: false, desarrollador: '',
        fechaLanzamiento: new Date().getFullYear().toString(), stock: '0'
    });
    const [categories, setCategories] = useState<any[]>([]);
    const [genres, setGenres] = useState<any[]>([]);
    const [loadingCategories, setLoadingCategories] = useState(false);

    // Cargar categorías y géneros al abrir el modal
    React.useEffect(() => {
        if (modals.newGame && categories.length === 0) {
            loadCategoriesAndGenres();
        }
    }, [modals.newGame]);

    const loadCategoriesAndGenres = async () => {
        setLoadingCategories(true);
        try {
            const [cats, gens] = await Promise.all([getCategories(), getGenres()]);
            setCategories(cats);
            setGenres(gens);
        } catch (error) {
            console.error('Error al cargar categorías y géneros:', error);
        } finally {
            setLoadingCategories(false);
        }
    };

    // Cargar usuarios desde el API
    const loadUsers = async () => {
        setLoadingUsers(true);
        try {
            const loadedUsers = await adminService.getAllUsers();
            setUsers(loadedUsers);
        } catch (error) {
            console.error('Error al cargar usuarios:', error);
            setUsers([]);
        } finally {
            setLoadingUsers(false);
        }
    };

    // Cargar órdenes desde el API
    const loadOrders = async () => {
        setLoadingOrders(true);
        try {
            const loadedOrders = await orderService.getAllOrders();
            setOrders(loadedOrders);
        } catch (error) {
            console.error('Error al cargar órdenes:', error);
            setOrders([]);
        } finally {
            setLoadingOrders(false);
        }
    };

    // Cargar datos iniciales al montar el componente
    useEffect(() => {
        loadUsers();
        loadOrders();
        refreshProducts();
    }, []);

    // Cargar usuarios cuando se abre el modal
    useEffect(() => {
        if (modals.usersList && users.length === 0) {
            loadUsers();
        }
    }, [modals.usersList]);

    // Cargar órdenes cuando se abre el modal
    useEffect(() => {
        if (modals.ordersList && orders.length === 0) {
            loadOrders();
        }
    }, [modals.ordersList]);

    const allGames = useMemo(() => products, [products]);

    const stats = useMemo(() => {
        const totalOrders = orders.reduce((sum, order) => sum + (order.total || 0), 0);
        return {
            games: products.length.toLocaleString('es-ES'),
            users: users.length.toLocaleString('es-ES'),
            orders: orders.length.toLocaleString('es-ES'),
            revenue: totalOrders.toLocaleString('es-ES', { style: 'currency', currency: 'USD' })
        };
    }, [products, users, orders]);

    const adminStats: AdminStat[] = [
        { icon: 'controller', title: 'Juegos', count: stats.games, color: 'primary' },
        { icon: 'people', title: 'Usuarios', count: stats.users, color: 'info' },
        { icon: 'cart', title: 'Órdenes', count: stats.orders, color: 'success' }
    ];

    const quickActions: QuickAction[] = [
        { icon: 'plus-circle', title: 'Nuevo Juego', desc: 'Agregar producto', color: 'primary', action: () => setModals({ ...modals, newGame: true }) },
        { icon: 'list-ul', title: 'Gestionar Juegos', desc: 'Ver y editar', color: 'warning', action: () => setModals({ ...modals, gamesList: true }) },
        { icon: 'people', title: 'Gestionar Usuarios', desc: 'Bloquear y desbloquear', color: 'danger', action: async () => {
            await loadUsers();
            setModals({ ...modals, usersList: true });
        }},
        { icon: 'cart', title: 'Ver Órdenes', desc: 'Todas las compras', color: 'success', action: async () => {
            await loadOrders();
            setModals({ ...modals, ordersList: true });
        }}
    ];

    const updateForm = (field: keyof AdminFormData, value: string | boolean) => 
        setFormData({ ...formData, [field]: value });

    const resetForm = () => setFormData({
        name: '', description: '', price: '', category: '', categoriaId: '', generoId: '', rating: '',
        discount: '0', image: '', tags: '', featured: false, desarrollador: '',
        fechaLanzamiento: new Date().getFullYear().toString(), stock: '0'
    });

    const validateForm = (): boolean => {
        if (!formData.name.trim()) return setFormError('El nombre del juego es requerido'), false;
        if (!formData.description.trim()) return setFormError('La descripción es requerida'), false;
        if (!formData.categoriaId) return setFormError('Debes seleccionar una categoría'), false;
        if (!formData.generoId) return setFormError('Debes seleccionar un género'), false;
        if (!formData.desarrollador.trim()) return setFormError('El desarrollador es requerido'), false;
        if (!formData.fechaLanzamiento.trim()) return setFormError('La fecha de lanzamiento es requerida'), false;
        const price = parseFloat(formData.price);
        if (isNaN(price) || price < 0) return setFormError('El precio debe ser un número válido mayor o igual a 0'), false;
        const stock = parseInt(formData.stock);
        if (isNaN(stock) || stock < 0) return setFormError('El stock debe ser un número válido mayor o igual a 0'), false;
        // El rating solo es obligatorio al crear un nuevo juego
        if (!editingGame) {
            const rating = parseFloat(formData.rating);
            if (isNaN(rating) || rating < 0 || rating > 5) return setFormError('El rating debe estar entre 0 y 5'), false;
        }
        if (!formData.image.trim()) return setFormError('La URL de la imagen es requerida'), false;
        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormError('');
        if (!validateForm()) return;

        const tagsArray = formData.tags.trim()
            ? formData.tags.split(',').map(t => t.trim()).filter(t => t)
            : [formData.category];

        if (editingGame) {
            // Actualizar juego existente
            try {
                await updateProduct(editingGame.id!, {
                    name: formData.name.trim(),
                    nombre: formData.name.trim(),
                    description: formData.description.trim(),
                    descripcion: formData.description.trim(),
                    price: parseFloat(formData.price),
                    precio: parseFloat(formData.price),
                    categoriaId: parseInt(formData.categoriaId),
                    generoId: parseInt(formData.generoId),
                    discount: parseInt(formData.discount) || 0,
                    descuento: parseInt(formData.discount) || 0,
                    image: formData.image.trim(),
                    imagenUrl: formData.image.trim(),
                    desarrollador: formData.desarrollador.trim(),
                    fechaLanzamiento: formData.fechaLanzamiento.trim(),
                    stock: parseInt(formData.stock) || 0,
                    activo: true
                });
                resetForm();
                setEditingGame(null);
                setModals({ ...modals, editGame: false, gamesList: false });
                alert('¡Juego actualizado exitosamente!');
            } catch (error) {
                const errorMessage = error instanceof Error ? error.message : 'Error al actualizar el juego. Intenta nuevamente.';
                setFormError(errorMessage);
            }
        } else {
            // Crear nuevo juego
            const newProduct: Omit<Product, 'id'> = {
                name: formData.name.trim(),
                nombre: formData.name.trim(),
                description: formData.description.trim(),
                descripcion: formData.description.trim(),
                price: parseFloat(formData.price),
                precio: parseFloat(formData.price),
                category: formData.category,
                categoriaId: parseInt(formData.categoriaId),
                generoId: parseInt(formData.generoId),
                rating: parseFloat(formData.rating),
                discount: parseInt(formData.discount) || 0,
                descuento: parseInt(formData.discount) || 0,
                image: formData.image.trim(),
                imagenUrl: formData.image.trim(),
                tags: tagsArray,
                featured: formData.featured,
                desarrollador: formData.desarrollador.trim(),
                fechaLanzamiento: formData.fechaLanzamiento.trim(),
                stock: parseInt(formData.stock) || 0,
                activo: true
            };

            try {
                await addProduct(newProduct);
                resetForm();
                setModals({ ...modals, newGame: false });
                await refreshProducts();
                alert('¡Juego agregado exitosamente!');
            } catch (error) {
                const errorMessage = error instanceof Error ? error.message : 'Error al guardar el juego. Intenta nuevamente.';
                setFormError(errorMessage);
            }
        }
    };

    const handleEdit = async (game: Product) => {
        setEditingGame(game);
        await loadCategoriesAndGenres();
        setFormData({
            name: game.name || '',
            description: game.description || '',
            price: (game.price || game.precio || 0).toString(),
            category: game.category || '',
            categoriaId: game.categoriaId?.toString() || '',
            generoId: game.generoId?.toString() || '',
            rating: (game.rating || 0).toString(),
            discount: (game.discount || game.descuento || 0).toString(),
            image: game.image || game.imagenUrl || '',
            tags: (game.tags || []).join(', '),
            featured: game.featured || false,
            desarrollador: game.desarrollador || '',
            fechaLanzamiento: game.fechaLanzamiento || new Date().getFullYear().toString(),
            stock: (game.stock || 0).toString()
        });
        setModals({ ...modals, editGame: true, gamesList: false });
    };

    const handleDelete = async (id: string | number) => {
        const idStr = String(id);
        const game = products.find(p => String(p.id) === idStr || p.id === id);
        const gameName = game?.name || 'este juego';
        if (window.confirm(`¿Estás seguro de que deseas eliminar "${gameName}" del sistema?\n\nEsta acción no se puede deshacer.`)) {
            try {
                const deleted = await deleteProduct(idStr);
                if (deleted) {
                    await refreshProducts();
                    alert(`"${gameName}" ha sido eliminado exitosamente del sistema.`);
                } else {
                    alert('Error al eliminar el juego. Intenta nuevamente.');
                }
            } catch (error) {
                const errorMessage = error instanceof Error ? error.message : 'Error al eliminar el juego. Intenta nuevamente.';
                alert(errorMessage);
            }
        }
    };

    const handleToggleUserStatus = async (userId: string | number) => {
        const userIdNum = typeof userId === 'string' ? parseInt(userId) : userId;
        const user = users.find(u => u.id === userIdNum || u.id?.toString() === userId?.toString());
        if (!user) return;

        const newStatus = !user.isActive;
        const statusText = newStatus ? 'desbloqueado' : 'bloqueado';
        
        if (window.confirm(`¿Estás seguro de que deseas ${statusText === 'bloqueado' ? 'bloquear' : 'desbloquear'} al usuario "${user.name || user.username}"?\n\n${newStatus ? 'El usuario podrá iniciar sesión nuevamente.' : 'El usuario no podrá iniciar sesión hasta que sea desbloqueado.'}`)) {
            try {
                if (newStatus) {
                    await adminService.unblockUser(userIdNum);
                } else {
                    await adminService.blockUser(userIdNum);
                }
                await loadUsers();
                alert(`Usuario "${user.name || user.username}" ha sido ${statusText} exitosamente.`);
            } catch (error) {
                const errorMessage = error instanceof Error ? error.message : 'Error al cambiar el estado del usuario';
                alert(errorMessage);
            }
        }
    };

    const formFields = [
        { field: 'name' as keyof AdminFormData, icon: 'tag', label: 'Nombre del Juego', type: 'text', placeholder: 'Ej: Super Mario Bros', required: true, cols: 12 },
        { field: 'description' as keyof AdminFormData, icon: 'card-text', label: 'Descripción', type: 'textarea', placeholder: 'Descripción detallada del juego...', required: true, cols: 12 },
        { field: 'price' as keyof AdminFormData, icon: 'currency-dollar', label: 'Precio ($)', type: 'number', placeholder: '0.00', required: true, cols: 4 },
        { field: 'categoriaId' as keyof AdminFormData, icon: 'grid-3x3-gap', label: 'Categoría', type: 'select-category', placeholder: '', required: true, cols: 4 },
        { field: 'generoId' as keyof AdminFormData, icon: 'bookmark', label: 'Género', type: 'select-genre', placeholder: '', required: true, cols: 4 },
        { field: 'rating' as keyof AdminFormData, icon: 'star', label: 'Rating (0-5)', type: 'number', placeholder: '4.5', required: true, cols: 4 },
        { field: 'discount' as keyof AdminFormData, icon: 'percent', label: 'Descuento (%)', type: 'number', placeholder: '0', required: false, cols: 4 },
        { field: 'stock' as keyof AdminFormData, icon: 'box', label: 'Stock', type: 'number', placeholder: '0', required: true, cols: 4 },
        { field: 'desarrollador' as keyof AdminFormData, icon: 'building', label: 'Desarrollador', type: 'text', placeholder: 'Ej: Nintendo', required: true, cols: 6 },
        { field: 'fechaLanzamiento' as keyof AdminFormData, icon: 'calendar', label: 'Año de Lanzamiento', type: 'text', placeholder: '2024', required: true, cols: 6 },
        { field: 'image' as keyof AdminFormData, icon: 'image', label: 'URL de la Imagen', type: 'url', placeholder: 'https://ejemplo.com/imagen.jpg', required: true, cols: 12 },
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

            <Modal show={modals.newGame || modals.editGame} onHide={() => {
                resetForm();
                setEditingGame(null);
                setModals({ ...modals, newGame: false, editGame: false });
            }} centered size="lg">
                <Modal.Header closeButton style={{ background: COLORS.gradientPrimary, color: 'white' }}>
                    <Modal.Title>
                        <i className={`bi bi-${editingGame ? 'pencil' : 'plus-circle'} me-2`}></i>
                        {editingGame ? 'Editar Juego' : 'Nuevo Juego'}
                    </Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleSubmit}>
                    <Modal.Body>
                        {formError && <Alert variant="danger" className="mb-3"><i className="bi bi-exclamation-circle me-2"></i>{formError}</Alert>}
                        <Row className="g-3">
                            {formFields.map(({ field, icon, label, type, placeholder, required, cols }) => {
                                // El rating solo es requerido al crear un nuevo juego
                                const isFieldRequired = field === 'rating' ? (required && !editingGame) : required;
                                const isFieldDisabled = field === 'rating' && editingGame;
                                return (
                                    <Col key={field} md={cols}>
                                        <Form.Group>
                                            <Form.Label className="fw-bold">
                                                <i className={`bi bi-${icon} me-2`}></i>{label} {isFieldRequired && '*'}
                                                {isFieldDisabled && <small className="text-muted ms-2">(Calculado automáticamente)</small>}
                                            </Form.Label>
                                            {type === 'textarea' ? (
                                                <Form.Control as="textarea" rows={3} value={formData[field] as string} 
                                                    onChange={(e) => updateForm(field, e.target.value)} placeholder={placeholder} required={isFieldRequired} />
                                            ) : type === 'select-category' ? (
                                                <Form.Select value={formData[field] as string} onChange={(e) => updateForm(field, e.target.value)} required={isFieldRequired} disabled={loadingCategories}>
                                                    <option value="">{loadingCategories ? 'Cargando...' : 'Selecciona una categoría'}</option>
                                                    {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.nombre || cat.name}</option>)}
                                                </Form.Select>
                                            ) : type === 'select-genre' ? (
                                                <Form.Select value={formData[field] as string} onChange={(e) => updateForm(field, e.target.value)} required={isFieldRequired} disabled={loadingCategories}>
                                                    <option value="">{loadingCategories ? 'Cargando...' : 'Selecciona un género'}</option>
                                                    {genres.map(gen => <option key={gen.id} value={gen.id}>{gen.nombre || gen.name}</option>)}
                                                </Form.Select>
                                            ) : (
                                                <Form.Control type={type} value={formData[field] as string} 
                                                    onChange={(e) => updateForm(field, e.target.value)} placeholder={placeholder} 
                                                    required={isFieldRequired} disabled={isFieldDisabled}
                                                    step={type === 'number' && field === 'price' ? '0.01' : field === 'rating' ? '0.1' : '1'}
                                                    min={type === 'number' ? (field === 'rating' ? '0' : '0') : undefined}
                                                    max={type === 'number' && field === 'rating' ? '5' : field === 'discount' ? '100' : undefined} />
                                            )}
                                            {field === 'image' && <Form.Text className="text-muted">Ingresa la URL completa de la imagen del juego</Form.Text>}
                                            {field === 'tags' && <Form.Text className="text-muted">Si no especificas tags, se usará la categoría como tag principal</Form.Text>}
                                        </Form.Group>
                                    </Col>
                                );
                            })}
                            <Col md={12}>
                                <Form.Check type="checkbox" label="Marcar como juego destacado"
                                    checked={formData.featured} onChange={(e) => updateForm('featured', e.target.checked)} />
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => {
                            resetForm();
                            setEditingGame(null);
                            setModals({ ...modals, newGame: false, editGame: false });
                        }}>Cancelar</Button>
                        <Button variant="primary" type="submit">
                            <i className={`bi bi-${editingGame ? 'check' : 'save'} me-2`}></i>
                            {editingGame ? 'Actualizar Juego' : 'Guardar Juego'}
                        </Button>
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
                                    <tr key={String(game.id)}>
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
                                            ${((game.price ?? game.precio ?? 0).toFixed(2))}
                                            {(game.discount ?? 0) > 0 && <small className="text-danger ms-1">(-{game.discount}%)</small>}
                                        </td>
                                        <td><span className="fw-bold">{game.rating}</span> <i className="bi bi-star-fill text-warning ms-1"></i></td>
                                        <td>{String(game.id).startsWith('custom_') ? <Badge bg="success">Personalizado</Badge> : <Badge bg="primary">Inicial</Badge>}</td>
                                        <td>
                                            <Button variant="primary" size="sm" className="me-2" onClick={() => handleEdit(game)}>
                                                <i className="bi bi-pencil me-1"></i>Editar
                                            </Button>
                                            <Button variant="danger" size="sm" onClick={() => handleDelete(String(game.id))}>
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
                    {loadingUsers ? (
                        <div className="text-center py-5">
                            <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Cargando...</span>
                            </div>
                            <p className="mt-3 text-muted">Cargando usuarios...</p>
                        </div>
                    ) : users.length === 0 ? (
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

            <Modal show={modals.ordersList} onHide={() => setModals({ ...modals, ordersList: false })} centered size="xl">
                <Modal.Header closeButton style={{ background: COLORS.gradientPrimary, color: 'white' }}>
                    <Modal.Title><i className="bi bi-cart me-2"></i>Gestionar Órdenes</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {loadingOrders ? (
                        <div className="text-center py-5">
                            <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Cargando...</span>
                            </div>
                            <p className="mt-3 text-muted">Cargando órdenes...</p>
                        </div>
                    ) : orders.length === 0 ? (
                        <Alert variant="info" className="text-center">
                            <i className="bi bi-info-circle me-2"></i>No hay órdenes en el sistema.
                        </Alert>
                    ) : (
                        <Table hover responsive>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Usuario ID</th>
                                    <th>Fecha</th>
                                    <th>Total</th>
                                    <th>Estado</th>
                                    <th>Método de Pago</th>
                                    <th>Detalles</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map(order => (
                                    <tr key={order.id}>
                                        <td><strong>#{order.id}</strong></td>
                                        <td>{order.userId}</td>
                                        <td>
                                            <small>{new Date(order.fechaOrden).toLocaleDateString('es-ES', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}</small>
                                        </td>
                                        <td>
                                            <strong className="text-success">
                                                ${(order.total || 0).toFixed(2)}
                                            </strong>
                                        </td>
                                        <td>
                                            <Badge bg={
                                                order.estadoNombre === 'Completada' ? 'success' :
                                                order.estadoNombre === 'Pendiente' ? 'warning' :
                                                order.estadoNombre === 'Cancelada' ? 'danger' : 'secondary'
                                            }>
                                                {order.estadoNombre || 'Desconocido'}
                                            </Badge>
                                        </td>
                                        <td>{order.metodoPago || 'N/A'}</td>
                                        <td>
                                            <small>
                                                {order.detalles?.length || 0} {order.detalles?.length === 1 ? 'item' : 'items'}
                                            </small>
                                            {order.detalles && order.detalles.length > 0 && (
                                                <div className="mt-1">
                                                    {order.detalles.slice(0, 2).map((detail, idx) => (
                                                        <div key={idx} className="text-muted small">
                                                            {detail.juegoNombre} x{detail.cantidad}
                                                        </div>
                                                    ))}
                                                    {order.detalles.length > 2 && (
                                                        <div className="text-muted small">+{order.detalles.length - 2} más</div>
                                                    )}
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setModals({ ...modals, ordersList: false })}>Cerrar</Button>
                </Modal.Footer>
            </Modal>

            <style>{`.hover-effect:hover { transform: translateY(-3px); transition: all 0.3s ease; }`}</style>
        </div>
    );
};

export default Admin;
