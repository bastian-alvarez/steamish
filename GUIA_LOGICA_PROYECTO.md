# Guía Completa de Lógica del Proyecto Steamish

## Índice
1. [Arquitectura General](#arquitectura-general)
2. [Interfaces TypeScript](#interfaces-typescript)
3. [useContext - Gestión de Estado Global](#usecontext---gestión-de-estado-global)
4. [useState - Gestión de Estado Local](#usestate---gestión-de-estado-local)
5. [Bootstrap - Sistema de Diseño](#bootstrap---sistema-de-diseño)
6. [Flujos de Datos](#flujos-de-datos)
7. [Componentes Principales](#componentes-principales)
8. [Servicios y Persistencia](#servicios-y-persistencia)

---

## Arquitectura General

El proyecto Steamish está estructurado como una **Single Page Application (SPA)** usando React con TypeScript. La arquitectura sigue el patrón de **separación de responsabilidades**:

```
steamish/
├── src/
│   ├── components/       # Componentes reutilizables
│   ├── pages/           # Páginas/vistas principales
│   ├── context/         # Contextos de React (estado global)
│   ├── services/        # Lógica de negocio y servicios
│   ├── types/           # Definiciones de interfaces TypeScript
│   ├── utils/           # Utilidades y constantes
│   └── mock-data/       # Datos de prueba
```

### Estructura de Providers

El archivo `App.tsx` envuelve toda la aplicación con los providers necesarios:

```20:37:steamish/src/App.tsx
// Interfaces para rutas
interface RouteConfig {
    path: string;
    component: React.ComponentType;
}

// App con mejor uso de interfaces y useContext
const App: React.FC = () => {
    const routes: RouteConfig[] = [
        { path: '/', component: Home },
        { path: '/productos', component: Products },
        { path: '/blogs', component: Blogs },
        { path: '/nosotros', component: About },
        { path: '/contacto', component: Contact },
        { path: '/login', component: Login },
        { path: '/registro', component: Register },
        { path: '/admin', component: Admin }
    ];
```

**Jerarquía de Providers:**
```40:73:steamish/src/App.tsx
    return (
        <AuthProvider>
            <ProductProvider>
                <CartProvider>
                    <Router>
                        <div className="d-flex flex-column min-vh-100">
                            <Header />
                        <main className="flex-grow-1">
                            <Routes>
                                {routes
                                    .filter(route => route.path !== '/admin') // Filtrar admin de rutas públicas
                                    .map(({ path, component: Component }) => (
                                        <Route key={path} path={path} element={<Component />} />
                                    ))}
                                {/* Ruta para detalle de blog */}
                                <Route path="/blogs/:id" element={<BlogDetail />} />
                                {/* Ruta para detalle de producto */}
                                <Route path="/productos/:id" element={<ProductDetail />} />
                                {/* Ruta protegida para Admin - solo accesible con credenciales de admin */}
                                <Route 
                                    path="/admin" 
                                    element={
                                        <ProtectedRoute requireAdmin={true}>
                                            <Admin />
                                        </ProtectedRoute>
                                    } 
                                />
                            </Routes>
                        </main>
                            <Footer />
                        </div>
                    </Router>
                </CartProvider>
            </ProductProvider>
        </AuthProvider>
    );
```

**Explicación:**
- `AuthProvider`: Proporciona contexto de autenticación (usuario logueado, funciones de login/logout)
- `ProductProvider`: Proporciona contexto de productos (lista de juegos, funciones CRUD)
- `CartProvider`: Proporciona contexto del carrito (items, total, funciones de agregar/remover)
- Los providers se anidan porque cada uno puede necesitar acceso al anterior (ej: Cart necesita Products)

---

## Interfaces TypeScript

Las interfaces en TypeScript definen la **estructura de datos** que se espera. Son esenciales para garantizar tipo seguro y autocompletado.

### 1. Interface Product (Producto/Juego)

```2:13:steamish/src/types/Product.ts
export interface Product {
    id: string;
    name: string;
    price: number;
    image: string;
    rating: number;
    discount: number;
    category: string;
    description: string;
    tags: string[];
    featured: boolean;
}
```

**Ejemplo de uso:**
```typescript
// Crear un producto
const nuevoJuego: Product = {
    id: '1',
    name: 'Cyberpunk 2077',
    price: 59.99,
    image: 'https://...',
    rating: 4.2,
    discount: 15,
    category: 'Acción',
    description: 'Un RPG de acción...',
    tags: ['Acción', 'RPG', 'Futurista'],
    featured: true
};

// TypeScript validará que todos los campos estén presentes y sean del tipo correcto
```

### 2. Interface CartItem (Item del Carrito)

```4:6:steamish/src/types/Cart.ts
export interface CartItem extends Product {
    quantity: number;
}
```

**Explicación:**
- `CartItem` **extiende** `Product`, lo que significa que tiene todas las propiedades de `Product` más `quantity`
- Esto evita duplicar código y garantiza consistencia

**Ejemplo de uso:**
```typescript
// CartItem automáticamente tiene todas las propiedades de Product
const itemEnCarrito: CartItem = {
    id: '1',
    name: 'Cyberpunk 2077',
    price: 59.99,
    // ... todas las propiedades de Product
    quantity: 2  // Propiedad adicional
};
```

### 3. Interface SearchFilters (Filtros de Búsqueda)

```16:23:steamish/src/types/Product.ts
export interface SearchFilters {
    query: string;
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    minRating?: number;
    tags?: string[];
}
```

**Explicación:**
- El símbolo `?` indica que el campo es **opcional**
- `query` es obligatorio, pero `category`, `minPrice`, etc. son opcionales

**Ejemplo de uso:**
```typescript
// Búsqueda solo por texto
const filtros1: SearchFilters = {
    query: 'cyberpunk'
};

// Búsqueda con múltiples filtros
const filtros2: SearchFilters = {
    query: 'acción',
    category: 'Acción',
    minRating: 4.0,
    minPrice: 20,
    maxPrice: 60
};
```

### 4. Interface User (Usuario)

```1:13:steamish/src/types/User.ts
export interface User {
    id: string;
    username: string;
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
    avatar?: string;
    role: UserRole;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
```

**Enum UserRole:**
```15:19:steamish/src/types/User.ts
export enum UserRole {
    USER = 'user',
    ADMIN = 'admin',
    MODERATOR = 'moderator'
}
```

**Ejemplo de uso:**
```typescript
// Usuario normal
const usuario: User = {
    id: 'user_1',
    username: 'demo',
    email: 'demo@steamish.com',
    password: 'demo123',
    role: UserRole.USER,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
};

// Usuario administrador
const admin: User = {
    id: 'admin_1',
    username: 'admin',
    email: 'admin@steamish.com',
    password: 'admin123',
    role: UserRole.ADMIN,  // Enum usado aquí
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
};
```

### 5. Interface para Props de Componentes

```7:22:steamish/src/types/Component.ts
export interface CartProps {
    isOpen: boolean;
    onClose: () => void;
    items: CartItem[];
    count: number;
    totalPrice: number;
    onRemove: (productId: string) => void;
    onClear: () => void;
}

export interface GameResultsProps {
    products: Product[];
    searchTerm: string;
    onGameSelect?: (product: Product) => void;
}
```

**Explicación:**
- `onGameSelect?` - El `?` indica que es opcional
- `() => void` - Indica una función que no retorna nada
- `(productId: string) => void` - Indica una función que recibe un string y no retorna nada

**Ejemplo de uso:**
```typescript
// Componente que recibe CartProps
const Cart: React.FC<CartProps> = ({ 
    isOpen, 
    onClose, 
    items, 
    count, 
    totalPrice, 
    onRemove, 
    onClear 
}) => {
    // TypeScript garantiza que estos props existan y sean del tipo correcto
    return (
        <Modal show={isOpen} onHide={onClose}>
            {/* ... */}
        </Modal>
    );
};
```

---

## useContext - Gestión de Estado Global

`useContext` permite compartir estado entre múltiples componentes sin necesidad de pasar props manualmente. Steamish usa **3 contextos principales**.

### 1. CartContext (Contexto del Carrito)

**Definición del Contexto:**
```7:9:steamish/src/context/CartContext.tsx
interface CartContextType extends CartHook {}
const CartContext = createContext<CartContextType | undefined>(undefined);
```

**Provider con useState:**
```12:28:steamish/src/context/CartContext.tsx
export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [items, setItems] = useState<CartItem[]>([]);

    // Agregar producto al carrito
    const add = useCallback((product: Product) => {
        setItems(current => {
            const existing = current.find(item => item.id === product.id);
            if (existing) {
                return current.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...current, { ...product, quantity: 1 }];
        });
    }, []);
```

**Explicación detallada:**
1. **`useState<CartItem[]>([])`**: Crea un estado local que almacena un array de `CartItem`
2. **`add` function**: 
   - Usa `useCallback` para evitar recrear la función en cada render
   - `setItems(current => ...)`: Usa la forma funcional de `setState` para acceder al estado actual
   - Busca si el producto ya existe en el carrito
   - Si existe: incrementa la cantidad
   - Si no existe: agrega el producto con cantidad 1

**Valores calculados con useMemo:**
```54:66:steamish/src/context/CartContext.tsx
    // Calcular total de items
    const count = useMemo(() => {
        return items.reduce((total, item) => total + item.quantity, 0);
    }, [items]);

    // Calcular precio total
    const totalPrice = useMemo(() => {
        return items.reduce((total, item) => {
            const price = item.discount > 0
                ? item.price * (1 - item.discount / 100)
                : item.price;
            return total + (price * item.quantity);
        }, 0);
    }, [items]);
```

**Explicación:**
- `useMemo`: Solo recalcula cuando `items` cambia (optimización)
- `count`: Suma todas las cantidades de los items
- `totalPrice`: Calcula el precio total considerando descuentos

**Valor del Contexto:**
```68:76:steamish/src/context/CartContext.tsx
    const value: CartContextType = {
        items,
        count,
        totalPrice,
        add,
        remove,
        clear,
        updateQuantity
    };
```

**Hook personalizado:**
```86:92:steamish/src/context/CartContext.tsx
export const useCart = (): CartHook => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart debe ser usado dentro de un CartProvider');
    }
    return context;
};
```

**Ejemplo de uso en un componente:**
```typescript
// En cualquier componente hijo de CartProvider
const Header: React.FC = () => {
    const cart = useCart();  // Accede al contexto
    
    return (
        <Button onClick={() => setIsCartOpen(true)}>
            Carrito ({cart.count})  {/* Usa el count calculado */}
        </Button>
    );
};
```

### 2. ProductContext (Contexto de Productos)

**Provider con múltiples estados:**
```21:24:steamish/src/context/ProductContext.tsx
export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
```

**Carga inicial con useEffect:**
```26:29:steamish/src/context/ProductContext.tsx
    // Cargar productos al montar
    useEffect(() => {
        loadProducts();
    }, []);
```

**Función de carga:**
```31:42:steamish/src/context/ProductContext.tsx
    const loadProducts = () => {
        try {
            setLoading(true);
            setError(null);
            const loadedProducts = productService.getAllProducts();
            setProducts(loadedProducts);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error al cargar productos');
        } finally {
            setLoading(false);
        }
    };
```

**Valores derivados:**
```44:55:steamish/src/context/ProductContext.tsx
    // Productos destacados
    const featuredProducts = products.filter(p => p.featured);

    // Obtener producto por ID
    const getProductById = (id: string): Product | undefined => {
        return products.find(p => p.id === id);
    };

    // Obtener productos por categoría
    const getProductsByCategory = (category: string): Product[] => {
        return products.filter(p => p.category === category);
    };
```

**Funciones CRUD:**
```65:76:steamish/src/context/ProductContext.tsx
        addProduct: (product: Omit<Product, 'id'>) => {
            const newProduct = productService.addProduct(product);
            loadProducts();
            return newProduct;
        },
        deleteProduct: (id: string) => {
            const deleted = productService.deleteProduct(id);
            if (deleted) {
                loadProducts();
            }
            return deleted;
        }
```

**Ejemplo de uso:**
```typescript
// En el componente Admin
const Admin: React.FC = () => {
    const { products, addProduct, deleteProduct } = useProducts();
    
    const handleAddGame = () => {
        addProduct({
            name: 'Nuevo Juego',
            price: 49.99,
            // ... otros campos
        });
        // Los productos se actualizan automáticamente en todos los componentes
    };
};
```

### 3. AuthContext (Contexto de Autenticación)

**Estados de autenticación:**
```22:24:steamish/src/context/AuthContext.tsx
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
```

**Función de login:**
```44:58:steamish/src/context/AuthContext.tsx
    const login = useCallback(async (email: string, password: string): Promise<User> => {
        try {
            setLoading(true);
            setError(null);
            const userData = await authService.login({ email, password });
            setUser(userData);
            return userData;
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Error al iniciar sesión';
            setError(errorMessage);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);
```

**Valores derivados:**
```100:102:steamish/src/context/AuthContext.tsx
        isAuthenticated: user !== null,
        isAdmin: user?.role === UserRole.ADMIN,
        clearError
```

**Ejemplo de uso:**
```typescript
// En Login.tsx
const Login: React.FC = () => {
    const { login, error } = useAuth();
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const user = await login(email, password);
            if (user.role === UserRole.ADMIN) {
                navigate('/admin');
            }
        } catch (err) {
            // Error manejado automáticamente por el contexto
        }
    };
};
```

---

## useState - Gestión de Estado Local

`useState` es el hook más básico para manejar estado local en componentes. Cada componente puede tener múltiples estados independientes.

### Ejemplo 1: Header con múltiples estados

```10:14:steamish/src/components/Header/Header.tsx
const Header: React.FC = () => {
    const cart = useCart();
    const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const navigate = useNavigate();
```

**Explicación:**
- `isCartOpen`: Estado booleano para controlar si el modal del carrito está abierto
- `searchQuery`: Estado string para almacenar el texto de búsqueda

**Uso:**
```typescript
// Abrir/cerrar carrito
<Button onClick={() => setIsCartOpen(!isCartOpen)}>
    Carrito
</Button>

// Actualizar búsqueda
<Form.Control
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
/>
```

### Ejemplo 2: Admin con estado de formulario

```37:42:steamish/src/pages/Admin/Admin.tsx
    const { products, addProduct, deleteProduct, refreshProducts } = useProducts();
    const [modals, setModals] = useState({ newGame: false, config: false, reports: false, gamesList: false });
    const [formError, setFormError] = useState('');
    const [formData, setFormData] = useState<AdminFormData>({
        name: '', description: '', price: '', category: '', rating: '',
        discount: '0', image: '', tags: '', featured: false
    });
```

**Explicación:**
- `modals`: Objeto que agrupa múltiples estados booleanos (patrón común)
- `formData`: Objeto que almacena todos los campos del formulario
- `formError`: String para mensajes de error

**Actualización de estado anidado:**
```67:68:steamish/src/pages/Admin/Admin.tsx
    const updateForm = (field: keyof AdminFormData, value: string | boolean) => 
        setFormData({ ...formData, [field]: value });
```

**Explicación:**
- `{ ...formData }`: Crea una copia del objeto anterior (inmutabilidad)
- `[field]: value`: Actualiza solo el campo específico usando notación de corchetes

**Ejemplo de uso:**
```typescript
// Actualizar un campo específico
<Form.Control
    value={formData.name}
    onChange={(e) => updateForm('name', e.target.value)}
/>

// Actualizar estado booleano
<Form.Check
    checked={formData.featured}
    onChange={(e) => updateForm('featured', e.target.checked)}
/>
```

### Ejemplo 3: SearchBar con estado de filtros

```35:41:steamish/src/components/SearchBar/SearchBar.tsx
    const [filters, setFilters] = useState<SearchFilters>({
        query: initialQuery, 
        category: '', 
        minRating: 0,
        minPrice: undefined,
        maxPrice: undefined
    });
```

**Actualización parcial de estado:**
```74:76:steamish/src/components/SearchBar/SearchBar.tsx
    const updateFilter = useCallback((updates: Partial<SearchFilters>) => {
        setFilters(prev => ({ ...prev, ...updates }));
    }, []);
```

**Explicación:**
- `Partial<SearchFilters>`: Hace que todos los campos sean opcionales temporalmente
- `prev => ({ ...prev, ...updates })`: Actualiza solo los campos especificados

**Ejemplo de uso:**
```typescript
// Actualizar solo la categoría
updateFilter({ category: 'Acción' });

// Actualizar múltiples campos
updateFilter({ 
    category: 'Acción',
    minRating: 4.0,
    minPrice: 20
});
```

### Ejemplo 4: ProductDetail con estado de carga

```13:25:steamish/src/pages/ProductDetail/ProductDetail.tsx
    const [isLoading, setIsLoading] = useState<boolean>(true);
    
    const product = id ? getProductById(id) : undefined;

    // Loader de carga por 1 segundo
    useEffect(() => {
        setIsLoading(true);
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000); // 1 segundo

        return () => clearTimeout(timer);
    }, [id]);
```

**Explicación:**
- `isLoading`: Controla si se muestra el spinner de carga
- `useEffect`: Se ejecuta cuando cambia el `id` del producto
- `setTimeout`: Simula una carga de 1 segundo
- `return () => clearTimeout(timer)`: Limpia el timer si el componente se desmonta antes

**Renderizado condicional:**
```120:122:steamish/src/pages/ProductDetail/ProductDetail.tsx
    if (isLoading) {
        return <LoadingSpinner />;
    }
```

---

## Bootstrap - Sistema de Diseño

Bootstrap proporciona componentes pre-estilizados y un sistema de grid responsive. Steamish usa Bootstrap 5 con componentes de `react-bootstrap`.

### Sistema de Grid (Container, Row, Col)

**Ejemplo: Layout de 3 columnas**
```210:362:steamish/src/pages/Home/Home.tsx
                    <Row className="g-4">
                        {featuredGames.map(game => (
                            <Col key={game.id} lg={4} md={6}>
                                <Card 
                                    className="h-100 border-0 shadow-sm position-relative" 
                                    style={{ 
                                    borderRadius: '20px',
                                    overflow: 'hidden',
                                    transition: 'all 0.3s ease',
                                        backgroundColor: 'white',
                                        cursor: 'pointer'
                                }}
```

**Explicación:**
- `Container`: Contenedor principal con padding horizontal
- `Row`: Fila que contiene columnas
- `Col lg={4} md={6}`: 
  - En pantallas grandes (lg): 4 de 12 columnas = 33% (3 columnas)
  - En pantallas medianas (md): 6 de 12 columnas = 50% (2 columnas)
  - En móviles: 100% (1 columna por defecto)

### Componentes Bootstrap

#### 1. Card (Tarjeta)

```162:172:steamish/src/pages/Admin/Admin.tsx
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
```

**Clases Bootstrap usadas:**
- `border-0`: Sin bordes
- `shadow-sm`: Sombra pequeña
- `h-100`: Altura completa (para igualar alturas)
- `text-center`: Texto centrado
- `p-4`: Padding de 4 unidades
- `rounded-circle`: Forma circular
- `d-inline-flex`: Display inline-flex
- `mb-3`: Margin bottom de 3 unidades

#### 2. Modal (Ventana Modal)

```208:251:steamish/src/pages/Admin/Admin.tsx
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
                                            <Form.Select value={formData[field] as string} onChange={(e) => updateFilter({ category: e.target.value || undefined })}
```

**Explicación:**
- `show={modals.newGame}`: Controla si el modal está visible
- `centered`: Centra el modal verticalmente
- `size="lg"`: Tamaño grande
- `onHide`: Función que se ejecuta al cerrar

#### 3. Form (Formulario)

```67:85:steamish/src/pages/Login/Login.tsx
                                <Form onSubmit={handleSubmit}>
                                    {[
                                        { field: 'email', icon: 'envelope', label: 'Email', type: 'email', placeholder: 'tu@email.com' },
                                        { field: 'password', icon: 'lock', label: 'Contraseña', type: 'password', placeholder: '••••••••' }
                                    ].map(({ field, icon, label, type, placeholder }) => (
                                        <div key={field} className="mb-3">
                                            <Form.Label className="fw-bold text-primary">
                                                <i className={`bi bi-${icon} me-2`}></i>{label}
                                            </Form.Label>
                                            <Form.Control
                                                type={type}
                                                placeholder={placeholder}
                                                value={form[field as keyof typeof form]}
                                                onChange={(e) => setForm(prev => ({ ...prev, [field]: e.target.value }))}
                                                className="border-2"
                                                style={{ borderColor: '#0d6efd' }}
                                                required
                                            />
                                        </div>
                                    ))}
```

**Componentes del Form:**
- `Form`: Contenedor del formulario
- `Form.Label`: Etiqueta del campo
- `Form.Control`: Input/textarea/select
- `Form.Select`: Select dropdown
- `Form.Check`: Checkbox

#### 4. Badge (Etiqueta)

```199:201:steamish/src/components/SearchBar/SearchBar.tsx
                                <Badge bg="primary" className="fs-6 px-3 py-2">
                                    <i className="bi bi-joystick me-2"></i>{searchResult.filteredCount} juegos encontrados
                                </Badge>
```

**Variantes de Badge:**
- `bg="primary"`: Color primario (azul)
- `bg="danger"`: Color peligro (rojo)
- `bg="success"`: Color éxito (verde)
- `bg="warning"`: Color advertencia (amarillo)
- `bg="info"`: Color información (cyan)
- `bg="secondary"`: Color secundario (gris)

#### 5. Button (Botón)

```335:356:steamish/src/pages/Home/Home.tsx
                                            <Button 
                                                variant="primary" 
                                                className="w-100 fw-bold rounded-3 py-3"
                                                onClick={(e) => handleAddToCart(e, game)}
                                                style={{ 
                                                    background: COLORS.gradientPrimary, 
                                                    border: 'none',
                                                    color: 'white',
                                                    fontSize: '1rem',
                                                    transition: 'all 0.3s ease'
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.transform = 'translateY(-3px)';
                                                    e.currentTarget.style.boxShadow = '0 8px 20px rgba(28, 31, 59, 0.35)';
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.transform = 'translateY(0)';
                                                    e.currentTarget.style.boxShadow = 'none';
                                                }}
                                            >
                                                <i className="bi bi-cart-plus me-2"></i>Agregar al Carrito
                                            </Button>
```

**Variantes:**
- `variant="primary"`: Botón azul
- `variant="outline-primary"`: Botón con borde azul
- `variant="danger"`: Botón rojo
- `size="sm"`: Botón pequeño
- `size="lg"`: Botón grande
- `className="w-100"`: Ancho completo

#### 6. Table (Tabla)

```263:302:steamish/src/pages/Admin/Admin.tsx
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
```

**Clases:**
- `hover`: Efecto hover en filas
- `responsive`: Tabla responsive (se hace scroll horizontal en móviles)

### Utilidades Bootstrap

**Espaciado:**
- `m-1` a `m-5`: Margin
- `p-1` a `p-5`: Padding
- `mb-3`: Margin bottom
- `mt-4`: Margin top
- `ms-2`: Margin start (izquierda en LTR)
- `me-2`: Margin end (derecha en LTR)

**Display:**
- `d-none`: Ocultar
- `d-flex`: Display flex
- `d-block`: Display block
- `d-inline-flex`: Display inline-flex

**Texto:**
- `text-center`: Centrar texto
- `text-muted`: Texto gris
- `fw-bold`: Font weight bold
- `fs-6`: Font size 6

**Flexbox:**
- `justify-content-center`: Centrar horizontalmente
- `align-items-center`: Centrar verticalmente
- `flex-column`: Columna vertical

---

## Flujos de Datos

### Flujo 1: Agregar Producto al Carrito

```
1. Usuario hace clic en "Agregar al Carrito"
   ↓
2. Componente llama a cart.add(product)
   ↓
3. CartContext.add() actualiza el estado items
   ↓
4. useMemo recalcula count y totalPrice
   ↓
5. Todos los componentes que usan useCart() se actualizan automáticamente
   ↓
6. Header muestra el nuevo count en el badge
```

**Código real:**
```typescript
// En GameResults.tsx
<Button onClick={() => onGameSelect?.(product)}>
    Agregar
</Button>

// En Products.tsx
const handleGameSelect = (product: Product): void => {
    cart.add(product);  // Usa el contexto
};

// En CartContext.tsx
const add = useCallback((product: Product) => {
    setItems(current => {
        const existing = current.find(item => item.id === product.id);
        if (existing) {
            return current.map(item =>
                item.id === product.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            );
        }
        return [...current, { ...product, quantity: 1 }];
    });
}, []);
```

### Flujo 2: Búsqueda y Filtrado

```
1. Usuario escribe en SearchBar
   ↓
2. updateFilter() actualiza el estado filters
   ↓
3. useMemo recalcula searchResult basado en filters
   ↓
4. useEffect notifica al componente padre con onSearchResult()
   ↓
5. Products.tsx actualiza su estado searchResult
   ↓
6. GameResults recibe los productos filtrados y los renderiza
```

**Código real:**
```43:71:steamish/src/components/SearchBar/SearchBar.tsx
    // Búsqueda optimizada con useMemo
    const searchResult = useMemo((): SearchResult => {
        const filtered = products.filter(product => {
            // Búsqueda por texto (nombre, descripción, tags)
            const matchesQuery = !filters.query || 
                product.name.toLowerCase().includes(filters.query.toLowerCase()) ||
                product.description.toLowerCase().includes(filters.query.toLowerCase()) ||
                product.tags?.some(tag => tag.toLowerCase().includes(filters.query.toLowerCase()));
            
            // Filtro por categoría
            const matchesCategory = !filters.category || product.category === filters.category;
            
            // Filtro por rating mínimo
            const matchesRating = !filters.minRating || product.rating >= filters.minRating;
            
            // Filtro por precio (mínimo y máximo)
            const matchesPrice = (!filters.minPrice || product.price >= filters.minPrice) &&
                               (!filters.maxPrice || product.price <= filters.maxPrice);
            
            return matchesQuery && matchesCategory && matchesRating && matchesPrice;
        });

        return {
            products: filtered,
            totalCount: products.length,
            filteredCount: filtered.length,
            searchTerm: filters.query
        };
    }, [products, filters]);
```

### Flujo 3: Autenticación y Redirección

```
1. Usuario ingresa credenciales en Login.tsx
   ↓
2. Login llama a auth.login(email, password)
   ↓
3. AuthContext ejecuta authService.login()
   ↓
4. authService valida credenciales y guarda en localStorage
   ↓
5. AuthContext actualiza el estado user
   ↓
6. Login recibe el User y verifica user.role
   ↓
7. Si es ADMIN → navega a /admin
   Si es USER → navega a /
   ↓
8. ProtectedRoute verifica isAuthenticated e isAdmin
   ↓
9. Si pasa validaciones → muestra Admin
   Si no → redirige a /login o muestra error
```

**Código real:**
```16:41:steamish/src/pages/Login/Login.tsx
    const handleSubmit = async (e: React.FormEvent): Promise<void> => {
        e.preventDefault();
        clearError();
        setError('');
        
        if (!form.email || !form.password) {
            setError('Por favor, completa todos los campos.');
            return;
        }

        try {
            setLoading(true);
            const user = await login(form.email, form.password);
            
            // Redirigir según el rol del usuario
            if (user?.role === UserRole.ADMIN) {
                navigate('/admin');
            } else {
                navigate('/');
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error al iniciar sesión');
        } finally {
            setLoading(false);
        }
    };
```

---

## Componentes Principales

### 1. Header (Navegación Principal)

**Responsabilidades:**
- Mostrar navegación
- Búsqueda rápida
- Contador del carrito
- Menú de usuario

**Estados locales:**
```11:14:steamish/src/components/Header/Header.tsx
    const cart = useCart();
    const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const navigate = useNavigate();
```

**Búsqueda rápida:**
```25:31:steamish/src/components/Header/Header.tsx
    const handleQuickSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/productos?search=${encodeURIComponent(searchQuery.trim())}`);
            setSearchQuery('');
        }
    };
```

### 2. SearchBar (Búsqueda y Filtrado)

**Props con Interface:**
```6:12:steamish/src/components/SearchBar/SearchBar.tsx
interface SearchBarProps {
    products: Product[];
    onSearchResult: (result: SearchResult) => void;
    placeholder?: string;
    showFilters?: boolean;
    initialQuery?: string;
}
```

**Lógica de filtrado:**
- Usa `useMemo` para optimizar cálculos
- Filtra por: texto, categoría, rating, precio
- Notifica cambios al padre mediante `onSearchResult`

### 3. GameResults (Resultados de Juegos)

**Props:**
```8:12:steamish/src/components/GameResults/GameResults.tsx
interface GameResultsProps {
    products: Product[];
    searchTerm: string;
    onGameSelect?: (product: Product) => void;
}
```

**Funcionalidades:**
- Renderiza grid de productos
- Resalta términos de búsqueda
- Cards clickeables para ver detalles
- Botón "Agregar" que no propaga el click del card

**Prevención de propagación:**
```227:242:steamish/src/components/GameResults/GameResults.tsx
                                <ButtonGroup onClick={(e) => e.stopPropagation()}>
                                <Button 
                                    variant="primary" 
                                    size="sm"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onGameSelect?.(product);
                                        }}
                                    className="fw-bold"
                                        style={{ background: COLORS.gradientPrimary, borderColor: COLORS.color4, color: 'white' }}
                                        disabled={product.price === 0}
                                >
                                    <i className="bi bi-cart-plus me-1"></i>
                                        {product.price === 0 ? 'Gratis' : 'Agregar'}
                                </Button>
                                </ButtonGroup>
```

### 4. Admin (Panel de Administración)

**Estados múltiples:**
```37:42:steamish/src/pages/Admin/Admin.tsx
    const { products, addProduct, deleteProduct, refreshProducts } = useProducts();
    const [modals, setModals] = useState({ newGame: false, config: false, reports: false, gamesList: false });
    const [formError, setFormError] = useState('');
    const [formData, setFormData] = useState<AdminFormData>({
        name: '', description: '', price: '', category: '', rating: '',
        discount: '0', image: '', tags: '', featured: false
    });
```

**Estadísticas calculadas:**
```47:53:steamish/src/pages/Admin/Admin.tsx
    const stats = useMemo(() => {
        const users = authService.getAllUsers();
        return {
            games: products.length.toLocaleString('es-ES'),
            users: users.length.toLocaleString('es-ES')
        };
    }, [products]);
```

**Validación de formulario:**
```75:85:steamish/src/pages/Admin/Admin.tsx
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
```

---

## Servicios y Persistencia

### ¿Qué es localStorage?

`localStorage` es una API del navegador que permite **almacenar datos localmente en el navegador del usuario**. Los datos persisten incluso después de cerrar el navegador.

**Características importantes:**
- Almacena solo **strings** (se debe usar `JSON.stringify()` y `JSON.parse()`)
- Persiste entre sesiones del navegador
- Es específico del dominio (cada sitio web tiene su propio localStorage)
- Capacidad aproximada de 5-10MB
- Síncrono (no requiere async/await)

**Métodos principales:**
```typescript
// Guardar datos
localStorage.setItem('clave', 'valor');

// Leer datos
const valor = localStorage.getItem('clave');

// Eliminar un dato específico
localStorage.removeItem('clave');

// Limpiar todo el localStorage
localStorage.clear();
```

### productService (Gestión de Productos)

Steamish usa **2 claves diferentes** en localStorage para manejar productos:

**Claves de almacenamiento:**
```4:5:steamish/src/services/productService.ts
const STORAGE_KEY = 'steamish_custom_products';
const DELETED_GAMES_KEY = 'steamish_deleted_games';
```

**Explicación:**
- `steamish_custom_products`: Almacena productos creados por el usuario (agregados desde el admin)
- `steamish_deleted_games`: Almacena IDs de juegos iniciales que fueron eliminados (no se eliminan físicamente)

#### Funciones Helper para localStorage

**1. Obtener productos personalizados:**
```239:248:steamish/src/services/productService.ts
// Obtener productos personalizados del localStorage
const getCustomProducts = (): Product[] => {
    const customJson = localStorage.getItem(STORAGE_KEY);
    if (!customJson) return [];
    try {
        return JSON.parse(customJson);
    } catch {
        return [];
    }
};
```

**Explicación detallada:**
1. `localStorage.getItem(STORAGE_KEY)`: Intenta obtener el string almacenado
2. `if (!customJson) return []`: Si no existe, retorna array vacío (primera vez)
3. `try/catch`: Maneja errores de parsing (por si el JSON está corrupto)
4. `JSON.parse(customJson)`: Convierte el string JSON a objeto JavaScript
5. Si hay error: retorna array vacío (fallback seguro)

**2. Guardar productos personalizados:**
```261:264:steamish/src/services/productService.ts
// Guardar productos personalizados en localStorage
const saveCustomProducts = (products: Product[]): void => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
};
```

**Explicación:**
- `JSON.stringify(products)`: Convierte el array de productos a string JSON
- `localStorage.setItem()`: Guarda el string en localStorage
- Si ya existe una clave, se sobrescribe automáticamente

**3. Obtener IDs de juegos eliminados:**
```250:259:steamish/src/services/productService.ts
// Obtener IDs de juegos eliminados
const getDeletedGamesIds = (): string[] => {
    const deletedJson = localStorage.getItem(DELETED_GAMES_KEY);
    if (!deletedJson) return [];
    try {
        return JSON.parse(deletedJson);
    } catch {
        return [];
    }
};
```

**4. Guardar IDs de juegos eliminados:**
```266:269:steamish/src/services/productService.ts
// Guardar IDs de juegos eliminados
const saveDeletedGamesIds = (ids: string[]): void => {
    localStorage.setItem(DELETED_GAMES_KEY, JSON.stringify(ids));
};
```

#### Lógica de Obtener Todos los Productos

```274:280:steamish/src/services/productService.ts
    getAllProducts: (): Product[] => {
        const customProducts = getCustomProducts();
        const deletedIds = getDeletedGamesIds();
        // Filtrar juegos iniciales que no han sido eliminados
        const activeDefaultGames = defaultGames.filter(game => !deletedIds.includes(game.id));
        return [...activeDefaultGames, ...customProducts];
    },
```

**Flujo paso a paso:**
1. **Lee productos personalizados** del localStorage (`getCustomProducts()`)
2. **Lee IDs eliminados** del localStorage (`getDeletedGamesIds()`)
3. **Filtra juegos iniciales**: Excluye los que están en `deletedIds`
4. **Combina**: Junta juegos iniciales activos + productos personalizados
5. **Retorna**: Array completo de productos disponibles

**Ejemplo práctico:**
```typescript
// Estado inicial:
// - defaultGames: [19 juegos iniciales]
// - localStorage vacío

// Usuario elimina "Cyberpunk 2077" (id: '1')
// → deletedIds = ['1']
// → activeDefaultGames = [18 juegos restantes]

// Usuario agrega "Nuevo Juego" desde admin
// → customProducts = [{ id: 'custom_1234567890', name: 'Nuevo Juego', ... }]

// getAllProducts() retorna:
// → [18 juegos iniciales + 1 juego personalizado]
```

#### Agregar Producto

```283:293:steamish/src/services/productService.ts
    addProduct: (product: Omit<Product, 'id'>): Product => {
        const customProducts = getCustomProducts();
        const newId = `custom_${Date.now()}`;
        const newProduct: Product = {
            ...product,
            id: newId
        };
        customProducts.push(newProduct);
        saveCustomProducts(customProducts);
        return newProduct;
    },
```

**Flujo detallado:**
1. **Lee productos existentes**: Obtiene array actual de productos personalizados
2. **Genera ID único**: `custom_${Date.now()}` usa timestamp como ID
3. **Crea nuevo producto**: Combina datos recibidos con el ID generado
4. **Agrega al array**: `push()` añade el producto al array
5. **Guarda en localStorage**: `saveCustomProducts()` persiste el cambio
6. **Retorna**: Devuelve el producto creado con su ID

**Por qué `Omit<Product, 'id'>`:**
- El usuario no debe proporcionar el ID
- El servicio genera un ID único automáticamente
- TypeScript fuerza que el ID no esté en los datos de entrada

#### Eliminar Producto

```296:317:steamish/src/services/productService.ts
    deleteProduct: (id: string): boolean => {
        const deletedIds = getDeletedGamesIds();
        
        // Si es un juego personalizado, eliminarlo directamente
        if (id.startsWith('custom_')) {
            const customProducts = getCustomProducts();
            const index = customProducts.findIndex(p => p.id === id);
            if (index !== -1) {
                customProducts.splice(index, 1);
                saveCustomProducts(customProducts);
                return true;
            }
        } else {
            // Si es un juego inicial, agregarlo a la lista de eliminados
            if (!deletedIds.includes(id)) {
                deletedIds.push(id);
                saveDeletedGamesIds(deletedIds);
                return true;
            }
        }
        return false;
    },
```

**Dos estrategias diferentes:**

**Estrategia 1: Juegos Personalizados (eliminación física)**
- Si `id.startsWith('custom_')` → Es un juego creado por el usuario
- Se elimina del array `customProducts`
- Se guarda el array actualizado en localStorage
- **Ventaja**: No ocupa espacio innecesario

**Estrategia 2: Juegos Iniciales (eliminación lógica)**
- Si NO empieza con `custom_` → Es un juego inicial del sistema
- No se elimina físicamente (sigue en `defaultGames`)
- Se agrega su ID a `deletedIds`
- Se guarda `deletedIds` en localStorage
- **Ventaja**: Permite "restaurar" juegos eliminados más fácilmente

**Ejemplo:**
```typescript
// Eliminar juego personalizado
deleteProduct('custom_1234567890')
// → Se elimina del array customProducts
// → localStorage['steamish_custom_products'] se actualiza

// Eliminar juego inicial
deleteProduct('1') // Cyberpunk 2077
// → Se agrega '1' a deletedIds
// → localStorage['steamish_deleted_games'] = ['1']
// → Cyberpunk 2077 sigue en defaultGames, pero se filtra en getAllProducts()
```

### authService (Gestión de Autenticación)

El servicio de autenticación usa **2 claves** en localStorage:

**Claves de almacenamiento:**
```5:5:steamish/src/services/authService.ts
    private readonly STORAGE_KEY = 'steamish_user';
```

Y también usa:
- `'steamish_users'`: Lista completa de todos los usuarios registrados

#### Inicialización de Usuarios por Defecto

```98:127:steamish/src/services/authService.ts
    // Obtener usuarios almacenados
    private getStoredUsers(): User[] {
        const usersJson = localStorage.getItem('steamish_users');
        if (!usersJson) {
            // Usuarios por defecto
            const defaultUsers: User[] = [
                {
                    id: 'admin_1',
                    username: 'admin',
                    email: 'admin@steamish.com',
                    password: 'admin123',
                    role: UserRole.ADMIN,
                    isActive: true,
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    id: 'user_1',
                    username: 'demo',
                    email: 'demo@steamish.com',
                    password: 'demo123',
                    role: UserRole.USER,
                    isActive: true,
                    createdAt: new Date(),
                    updatedAt: new Date()
                }
            ];
            localStorage.setItem('steamish_users', JSON.stringify(defaultUsers));
            return defaultUsers;
        }

        try {
            return JSON.parse(usersJson).map((user: any) => ({
                ...user,
                createdAt: new Date(user.createdAt),
                updatedAt: new Date(user.updatedAt)
            }));
        } catch {
            return [];
        }
    }
```

**Lógica de inicialización:**
1. **Verifica si existe** `steamish_users` en localStorage
2. **Si NO existe** (primera vez):
   - Crea array con 2 usuarios por defecto (admin y demo)
   - Los guarda en localStorage
   - Los retorna
3. **Si existe**:
   - Lee el JSON del localStorage
   - Parsea el JSON a array de usuarios
   - **Convierte fechas**: `createdAt` y `updatedAt` de string a `Date` (importante porque JSON no preserva objetos Date)
   - Retorna el array

**Problema con fechas y JSON:**
- `JSON.stringify()` convierte `Date` a string: `"2025-11-05T12:00:00.000Z"`
- `JSON.parse()` NO convierte automáticamente strings a `Date`
- Por eso se hace manualmente: `new Date(user.createdAt)`

#### Login y Persistencia de Sesión

```25:45:steamish/src/services/authService.ts
    async login(credentials: LoginCredentials): Promise<User> {
        // Simulación de API call
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const users = this.getStoredUsers();
        const user = users.find(
            u => u.email === credentials.email && u.password === credentials.password
        );

        if (!user) {
            throw new Error('Credenciales inválidas');
        }

        if (!user.isActive) {
            throw new Error('Usuario inactivo');
        }

        // Guardar usuario actual
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
        return user;
    }
```

**Flujo de login:**
1. **Simula delay**: `setTimeout(500)` simula llamada a API
2. **Obtiene usuarios**: Lee todos los usuarios de localStorage
3. **Busca coincidencia**: Compara email y password
4. **Validaciones**:
   - Si no encuentra usuario → Error
   - Si usuario inactivo → Error
5. **Guarda sesión**: `localStorage.setItem('steamish_user', ...)` guarda el usuario actual
6. **Retorna**: Devuelve el objeto User completo

**¿Por qué guardar el usuario actual?**
- `AuthContext` lee `steamish_user` al cargar la app
- Si existe, el usuario está "logueado" automáticamente
- Permite persistir la sesión entre recargas de página

#### Registro de Nuevo Usuario

```48:85:steamish/src/services/authService.ts
    async register(data: RegisterData): Promise<User> {
        // Simulación de API call
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const users = this.getStoredUsers();
        
        // Verificar si el email ya existe
        if (users.some(u => u.email === data.email)) {
            throw new Error('El email ya está registrado');
        }

        // Verificar si el username ya existe
        if (users.some(u => u.username === data.username)) {
            throw new Error('El nombre de usuario ya existe');
        }

        const newUser: User = {
            id: `user_${Date.now()}`,
            username: data.username,
            email: data.email,
            password: data.password,
            firstName: data.firstName,
            lastName: data.lastName,
            role: UserRole.USER,
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date()
        };

        // Guardar nuevo usuario
        users.push(newUser);
        localStorage.setItem('steamish_users', JSON.stringify(users));
        
        // Guardar usuario actual
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(newUser));
        
        return newUser;
    }
```

**Flujo de registro:**
1. **Obtiene usuarios existentes**: Lee el array completo
2. **Validaciones de duplicados**:
   - Verifica si el email ya existe
   - Verifica si el username ya existe
   - Si existe alguno → Error
3. **Crea nuevo usuario**:
   - Genera ID único: `user_${Date.now()}`
   - Asigna `role: UserRole.USER` (siempre usuario normal)
   - Establece `isActive: true`
   - Crea fechas actuales
4. **Actualiza localStorage**:
   - Agrega el nuevo usuario al array
   - Guarda el array completo en `steamish_users`
   - Guarda el usuario actual en `steamish_user` (auto-login)
5. **Retorna**: El nuevo usuario creado

#### Logout y Limpieza

```87:91:steamish/src/services/authService.ts
    // Logout
    async logout(): Promise<void> {
        await new Promise(resolve => setTimeout(resolve, 200));
        localStorage.removeItem(this.STORAGE_KEY);
    }
```

**Flujo de logout:**
1. Simula delay
2. **Elimina sesión**: `localStorage.removeItem('steamish_user')`
3. **NOTA**: NO elimina `steamish_users` (la lista de usuarios se mantiene)

### Resumen de Claves de localStorage en Steamish

| Clave | Contenido | Cuándo se usa | Ejemplo |
|-------|-----------|---------------|---------|
| `steamish_custom_products` | Array de productos creados por el usuario | Agregar/eliminar productos personalizados | `[{id: 'custom_123', name: 'Mi Juego', ...}]` |
| `steamish_deleted_games` | Array de IDs de juegos eliminados | Marcar juegos iniciales como eliminados | `['1', '5', '12']` |
| `steamish_user` | Objeto User del usuario actual | Mantener sesión activa | `{id: 'user_1', username: 'demo', ...}` |
| `steamish_users` | Array completo de todos los usuarios | Registro, login, estadísticas admin | `[{id: 'admin_1', ...}, {id: 'user_1', ...}]` |

### Flujo Completo de Persistencia

**Ejemplo: Agregar un juego desde Admin**

```
1. Usuario completa formulario en Admin.tsx
   ↓
2. Admin llama a addProduct() del ProductContext
   ↓
3. ProductContext llama a productService.addProduct()
   ↓
4. productService:
   - Lee getCustomProducts() → Obtiene array actual
   - Genera ID único → custom_1234567890
   - Crea nuevo producto con ID
   - Agrega al array → customProducts.push()
   - Guarda en localStorage → saveCustomProducts()
   ↓
5. ProductContext llama a refreshProducts()
   ↓
6. getAllProducts() combina:
   - Juegos iniciales (filtrados por deletedIds)
   - Productos personalizados (del localStorage)
   ↓
7. Estado global se actualiza
   ↓
8. Todos los componentes que usan useProducts() se re-renderizan
   ↓
9. El nuevo juego aparece en el catálogo
```

**Ejemplo: Login y Persistencia de Sesión**

```
1. Usuario ingresa credenciales en Login.tsx
   ↓
2. Login llama a auth.login()
   ↓
3. authService.login():
   - Lee getStoredUsers() → Array completo de usuarios
   - Busca coincidencia por email/password
   - Valida usuario activo
   - Guarda en localStorage['steamish_user']
   ↓
4. AuthContext actualiza estado user
   ↓
5. Usuario recarga la página
   ↓
6. AuthContext useEffect ejecuta loadCurrentUser()
   ↓
7. authService.getCurrentUser():
   - Lee localStorage['steamish_user']
   - Si existe → Usuario sigue logueado
   - Si no existe → Usuario no está logueado
   ↓
8. ProtectedRoute verifica isAuthenticated
   ↓
9. Si está logueado → Acceso permitido
   Si no → Redirige a /login
```

### Buenas Prácticas Implementadas

1. **Manejo de errores**: Todos los `JSON.parse()` están en try/catch
2. **Valores por defecto**: Si no existe la clave, retorna array vacío
3. **Tipado fuerte**: TypeScript garantiza tipos correctos
4. **Inmutabilidad**: Siempre se crean nuevos arrays/objetos antes de guardar
5. **Separación de responsabilidades**: Funciones helper para cada operación
6. **Nombres descriptivos**: Claves claras y consistentes
7. **Conversión de tipos**: Fechas se convierten correctamente al leer

### Limitaciones de localStorage

**Consideraciones importantes:**
- **Solo almacena strings**: Requiere `JSON.stringify()`/`parse()`
- **No es seguro para datos sensibles**: No debe usarse para passwords reales (en este proyecto es solo demo)
- **Limitado a ~5-10MB**: Puede llenarse con muchos datos
- **Síncrono**: Puede bloquear el hilo principal si hay muchos datos
- **Específico del dominio**: No se comparte entre diferentes sitios
- **Puede ser borrado**: El usuario puede limpiar localStorage manualmente

**Para producción**: Se recomienda usar una API backend real con base de datos.

---

## Resumen de Conceptos Clave

### Interfaces TypeScript
- **Definen estructura de datos** con tipos específicos
- **Garantizan tipo seguro** en tiempo de compilación
- **Proporcionan autocompletado** en el IDE
- **Ejemplo**: `Product`, `CartItem`, `User`, `SearchFilters`

### useContext
- **Comparte estado global** entre componentes
- **Evita prop drilling** (pasar props manualmente)
- **3 contextos principales**: Cart, Product, Auth
- **Hooks personalizados**: `useCart()`, `useProducts()`, `useAuth()`

### useState
- **Maneja estado local** en componentes
- **Puede ser primitivo** (string, number, boolean) o **objeto**
- **Actualización funcional**: `setState(prev => ...)` para acceso al estado anterior
- **Inmutabilidad**: Siempre crear nuevos objetos/arrays, no mutar directamente

### Bootstrap
- **Sistema de grid**: Container → Row → Col
- **Componentes pre-estilizados**: Card, Modal, Form, Button, Badge, Table
- **Utilidades**: Espaciado (m-, p-), Display (d-flex), Texto (text-center)
- **Responsive**: Breakpoints lg, md, sm

### Flujos de Datos
- **Unidireccional**: Props hacia abajo, eventos hacia arriba
- **Contexto**: Estado global accesible desde cualquier componente
- **LocalStorage**: Persistencia de datos entre sesiones
- **React Router**: Navegación y rutas dinámicas

---

## Conclusión

Este proyecto demuestra el uso efectivo de:
- **TypeScript**: Para seguridad de tipos y mejor experiencia de desarrollo
- **React Hooks**: useState, useContext, useEffect, useMemo, useCallback
- **Bootstrap**: Para UI consistente y responsive
- **Arquitectura escalable**: Separación de responsabilidades, servicios, contextos

Cada concepto está implementado con ejemplos reales del código, facilitando el entendimiento y la mantenibilidad del proyecto.

