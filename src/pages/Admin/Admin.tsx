import React, { useState, useMemo } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useProducts } from '../../context/ProductContext';
import { COLORS } from '../../utils/constants';
import authService from '../../services/authService';
import { Product } from '../../types/Product';
import AdminStats from '../../components/Admin/AdminStats';
import QuickActions from '../../components/Admin/QuickActions';
import NewGameForm from '../../components/Admin/NewGameForm';
import GamesList from '../../components/Admin/GamesList';
import UsersList from '../../components/Admin/UsersList';

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
        if (!formData.name.trim()) {
            setFormError('El nombre del juego es requerido');
            return false;
        }
        if (!formData.description.trim()) {
            setFormError('La descripción es requerida');
            return false;
        }
        if (!formData.category) {
            setFormError('Debes seleccionar una categoría');
            return false;
        }
        const price = parseFloat(formData.price);
        if (isNaN(price) || price < 0) {
            setFormError('El precio debe ser un número válido mayor o igual a 0');
            return false;
        }
        const rating = parseFloat(formData.rating);
        if (isNaN(rating) || rating < 0 || rating > 5) {
            setFormError('El rating debe estar entre 0 y 5');
            return false;
        }
        if (!formData.image.trim()) {
            setFormError('La URL de la imagen es requerida');
            return false;
        }
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
                <AdminStats stats={adminStats} />

                <Row>
                    <Col>
                        <h2 className="mb-4" style={{ color: COLORS.color4 }}>
                            <i className="bi bi-lightning me-2"></i>Acciones Rápidas
                        </h2>
                        <QuickActions actions={quickActions} />
                    </Col>
                </Row>
            </Container>

            <NewGameForm
                show={modals.newGame}
                onHide={() => setModals({ ...modals, newGame: false })}
                formData={formData}
                formError={formError}
                categories={categories}
                formFields={formFields}
                onUpdateForm={updateForm}
                onSubmit={handleSubmit}
                onCancel={() => setModals({ ...modals, newGame: false })}
            />

            <GamesList
                show={modals.gamesList}
                onHide={() => setModals({ ...modals, gamesList: false })}
                games={allGames}
                onDelete={handleDelete}
            />

            <UsersList
                show={modals.usersList}
                onHide={() => setModals({ ...modals, usersList: false })}
                users={users}
                onToggleUserStatus={handleToggleUserStatus}
            />

            <style>{`.hover-effect:hover { transform: translateY(-3px); transition: all 0.3s ease; }`}</style>
        </div>
    );
};

export default Admin;
