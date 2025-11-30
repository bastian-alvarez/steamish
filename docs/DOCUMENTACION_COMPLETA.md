# 📚 Documentación Completa del Proyecto Steamish

## 🎯 Índice
1. [Arquitectura General](#arquitectura-general)
2. [Bootstrap - Uso y Configuración](#bootstrap-uso-y-configuración)
3. [UseContext - Gestión de Estado Global](#usecontext-gestión-de-estado-global)
4. [UseState - Estado Local de Componentes](#usestate-estado-local-de-componentes)
5. [Interfaces TypeScript - Definición y Uso](#interfaces-typescript-definición-y-uso)
6. [Validaciones - Implementación y Patrones](#validaciones-implementación-y-patrones)
7. [Flujo de Datos y Comunicación](#flujo-de-datos-y-comunicación)
8. [Ejemplos Prácticos](#ejemplos-prácticos)

---

## 🏗️ Arquitectura General

### Estructura del Proyecto

El proyecto **Steamish** es una aplicación React TypeScript que implementa una tienda de videojuegos. Sigue una arquitectura modular basada en:

- **Context API**: Para gestión de estado global (Auth, Cart, Products)
- **React Router**: Para navegación entre páginas
- **Bootstrap**: Para estilos y componentes UI
- **TypeScript**: Para tipado estático y mejor desarrollo

### Jerarquía de Componentes

```
App (Componente raíz)
├── AuthProvider (Context de autenticación)
│   └── ProductProvider (Context de productos)
│       └── CartProvider (Context del carrito)
│           └── Router (React Router)
│               ├── Header (Componente global)
│               ├── Routes (Rutas públicas)
│               │   ├── Home
│               │   ├── Products
│               │   ├── Login
│               │   └── Register
│               └── ProtectedRoute (Rutas protegidas)
│                   └── Admin
```

---

## 🎨 Bootstrap - Uso y Configuración

### Configuración Inicial

Bootstrap se importa en `index.tsx`:

```typescript
// src/index.tsx
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
```

**Explicación técnica:**
- `bootstrap/dist/css/bootstrap.min.css`: Importa el sistema de grid, componentes base (botones, cards, modals, etc.)
- `bootstrap-icons`: Biblioteca de iconos compatible con Bootstrap

### Componentes Bootstrap Utilizados

#### 1. **Navbar** (Header.tsx)

```typescript
<Navbar expand="lg" className="shadow-sm">
  <Container>
    <Navbar.Brand>Steamish</Navbar.Brand>
    <Navbar.Toggle />
    <Navbar.Collapse>
      <Nav>
        {/* Items de navegación */}
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>
```

**Técnicas Bootstrap aplicadas:**
- `expand="lg"`: El menú se colapsa en pantallas pequeñas y se expande en `lg` (≥992px)
- `Container`: Wrapper responsivo que centra contenido y aplica padding
- `shadow-sm`: Sombra sutil para elevación visual

#### 2. **Modal** (Cart.tsx)

```typescript
<Modal show={isOpen} onHide={onClose} centered size="lg">
  <Modal.Header closeButton>
    <Modal.Title>Mi Carrito</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    {/* Contenido del carrito */}
  </Modal.Body>
  <Modal.Footer>
    {/* Acciones */}
  </Modal.Footer>
</Modal>
```

**Props técnicas:**
- `show={isOpen}`: Controla la visibilidad basado en estado React
- `centered`: Centra el modal verticalmente
- `size="lg"`: Tamaño grande del modal
- `closeButton`: Botón de cierre automático en el header

#### 3. **Cards** (Home.tsx, GameResults.tsx)

```typescript
<Card className="h-100 border-0 shadow-sm">
  <Card.Img variant="top" src={image} />
  <Card.Body>
    <Card.Title>Juego</Card.Title>
    <Card.Text>Descripción</Card.Text>
  </Card.Body>
</Card>
```

**Clases Bootstrap importantes:**
- `h-100`: Altura completa para alinear cards en grid
- `border-0`: Sin borde para diseño moderno
- `shadow-sm`: Sombra sutil
- `variant="top"`: Imagen en la parte superior

#### 4. **Form** (Login.tsx, Register.tsx)

```typescript
<Form onSubmit={handleSubmit}>
  <Form.Group className="mb-3">
    <Form.Label>Email</Form.Label>
    <Form.Control 
      type="email" 
      value={email}
      onChange={handleChange}
      required
    />
  </Form.Group>
  <Button type="submit" variant="primary">Enviar</Button>
</Form>
```

**Sistema de formularios Bootstrap:**
- `Form.Group`: Agrupa label y control con espaciado
- `Form.Control`: Input estilizado con Bootstrap
- `required`: Validación HTML5 nativa
- `variant="primary"`: Estilo del botón

#### 5. **Grid System** (Row/Col)

```typescript
<Container>
  <Row className="g-4">
    <Col lg={4} md={6} xs={12}>
      {/* Contenido */}
    </Col>
  </Row>
</Container>
```

**Breakpoints Bootstrap:**
- `xs`: <576px (móviles)
- `sm`: ≥576px
- `md`: ≥768px (tablets)
- `lg`: ≥992px (desktop)
- `xl`: ≥1200px
- `xxl`: ≥1400px

**Clases útiles:**
- `g-4`: Gap (espaciado) de 1.5rem entre columnas
- `lg={4}`: 4/12 del ancho en pantallas `lg` y mayores

### Personalización de Bootstrap

El proyecto personaliza Bootstrap mediante:

1. **Variables CSS personalizadas** (`colors.css`):
```css
:root {
  --color-4: #4b4c9b;
  --gradient-primary: linear-gradient(135deg, var(--color-4) 0%, var(--color-5) 100%);
}
```

2. **Override de clases Bootstrap**:
```css
.bg-primary {
  background-color: var(--primary) !important;
}
```

3. **Estilos inline combinados con clases Bootstrap**:
```typescript
<Button 
  variant="primary"
  style={{ background: 'var(--gradient-primary)' }}
>
```

---

## 🔄 UseContext - Gestión de Estado Global

### Concepto Técnico

`useContext` es un Hook de React que permite acceder al valor de un Context sin prop drilling (pasar props a través de múltiples componentes).

### Arquitectura de Contexts

El proyecto implementa **tres Contexts principales** que se anidan jerárquicamente:

#### 1. **AuthContext** - Autenticación de Usuarios

**Ubicación:** `src/context/AuthContext.tsx`

**Interfaz del Context:**
```typescript
export interface AuthContextType {
    user: User | null;              // Usuario actual autenticado
    loading: boolean;                // Estado de carga
    error: string | null;            // Mensajes de error
    login: (email: string, password: string) => Promise<void>;
    register: (username: string, email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    isAuthenticated: boolean;        // Computado: user !== null
    isAdmin: boolean;                // Computado: user?.role === 'admin'
    clearError: () => void;
}
```

**Implementación técnica:**

```typescript
// 1. Creación del Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 2. Provider Component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    // Estados locales usando useState
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // useEffect para cargar usuario al montar
    useEffect(() => {
        loadCurrentUser();
    }, []);

    // Función de login usando useCallback para optimización
    const login = useCallback(async (email: string, password: string): Promise<void> => {
        try {
            setLoading(true);
            setError(null);
            const userData = await authService.login({ email, password });
            setUser(userData);  // Actualiza el estado global
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error al iniciar sesión');
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    // Valor del Context que se comparte
    const value: AuthContextType = {
        user,
        loading,
        error,
        login,
        register,
        logout,
        isAuthenticated: user !== null,  // Valor computado
        isAdmin: user?.role === UserRole.ADMIN,  // Valor computado
        clearError
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

// 3. Custom Hook para usar el Context
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth debe ser usado dentro de un AuthProvider');
    }
    return context;
};
```

**Uso en componentes:**

```typescript
// En Login.tsx
const Login: React.FC = () => {
    const { login, error, clearError } = useAuth();  // Acceso al Context
    
    const handleSubmit = async (e: React.FormEvent) => {
        await login(email, password);  // Usa la función del Context
    };
};
```

**Ventajas técnicas:**
- **Evita prop drilling**: No necesitas pasar `user`, `login`, etc. por cada componente
- **Estado centralizado**: Un solo lugar para la lógica de autenticación
- **Reutilización**: Cualquier componente puede acceder con `useAuth()`
- **Type safety**: TypeScript valida que el Context se use correctamente

#### 2. **CartContext** - Carrito de Compras

**Ubicación:** `src/context/CartContext.tsx`

**Interfaz del Context:**
```typescript
interface CartContextType extends CartHook {
    items: CartItem[];              // Productos en el carrito
    count: number;                   // Cantidad total de items
    totalPrice: number;              // Precio total calculado
    add: (product: Product) => void;
    remove: (productId: string) => void;
    clear: () => void;
    updateQuantity: (productId: string, quantity: number) => void;
}
```

**Implementación técnica:**

```typescript
export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    // Estado del carrito usando useState
    const [items, setItems] = useState<CartItem[]>([]);

    // Función para agregar producto
    const add = useCallback((product: Product) => {
        setItems(current => {
            // Busca si el producto ya existe
            const existing = current.find(item => item.id === product.id);
            if (existing) {
                // Si existe, incrementa la cantidad (inmutabilidad)
                return current.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            // Si no existe, lo agrega con cantidad 1
            return [...current, { ...product, quantity: 1 }];
        });
    }, []);

    // Función para remover producto
    const remove = useCallback((productId: string) => {
        setItems(current => current.filter(item => item.id !== productId));
    }, []);

    // Calcular total de items usando useMemo (optimización)
    const count = useMemo(() => {
        return items.reduce((total, item) => total + item.quantity, 0);
    }, [items]);

    // Calcular precio total con descuentos usando useMemo
    const totalPrice = useMemo(() => {
        return items.reduce((total, item) => {
            const price = item.discount > 0
                ? item.price * (1 - item.discount / 100)  // Aplica descuento
                : item.price;
            return total + (price * item.quantity);
        }, 0);
    }, [items]);

    const value: CartContextType = {
        items,
        count,
        totalPrice,
        add,
        remove,
        clear,
        updateQuantity
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};
```

**Patrones importantes:**
- **Inmutabilidad**: `setItems(current => [...current, newItem])` en lugar de mutar directamente
- **useMemo**: Para cálculos costosos que solo se recalculan cuando `items` cambia
- **useCallback**: Para funciones que se pasan como props y evitar re-renders innecesarios

**Uso en componentes:**

```typescript
// En Header.tsx
const Header: React.FC = () => {
    const cart = useCart();  // Acceso al Context del carrito
    
    return (
        <Button onClick={() => setIsCartOpen(true)}>
            Carrito
            {cart.count > 0 && <Badge>{cart.count}</Badge>}  // Muestra cantidad
        </Button>
    );
};

// En Products.tsx
const Products: React.FC = () => {
    const cart = useCart();
    
    const handleGameSelect = (product: Product) => {
        cart.add(product);  // Agrega al carrito global
    };
};
```

#### 3. **ProductContext** - Catálogo de Productos

**Ubicación:** `src/context/ProductContext.tsx`

**Implementación:**

```typescript
export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Carga productos al montar el componente
    useEffect(() => {
        loadProducts();
    }, []);

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

    // Productos destacados (computado)
    const featuredProducts = products.filter(p => p.featured);

    // Funciones auxiliares
    const getProductById = (id: string): Product | undefined => {
        return products.find(p => p.id === id);
    };

    const getProductsByCategory = (category: string): Product[] => {
        return products.filter(p => p.category === category);
    };

    const value: ProductContextType = {
        products,
        loading,
        error,
        featuredProducts,
        getProductById,
        getProductsByCategory,
        refreshProducts: loadProducts
    };

    return (
        <ProductContext.Provider value={value}>
            {children}
        </ProductContext.Provider>
    );
};
```

### Anidación de Providers

En `App.tsx`, los Providers se anidan para crear el contexto global:

```typescript
<AuthProvider>          {/* Nivel 1: Autenticación */}
    <ProductProvider>   {/* Nivel 2: Productos */}
        <CartProvider>  {/* Nivel 3: Carrito */}
            <Router>
                {/* Componentes que pueden usar todos los Contexts */}
            </Router>
        </CartProvider>
    </ProductProvider>
</AuthProvider>
```

**Orden técnico:**
- `AuthProvider` debe estar en el nivel superior porque otros contexts pueden necesitar información de autenticación
- `CartProvider` puede necesitar productos, por eso está después de `ProductProvider`
- `Router` necesita acceso a todos los contexts para rutas protegidas

---

## 📊 UseState - Estado Local de Componentes

### Concepto Técnico

`useState` es un Hook de React que permite agregar estado local a componentes funcionales. Retorna un array con el valor del estado y una función para actualizarlo.

### Patrones de Uso en el Proyecto

#### 1. **Estado Simple** (Header.tsx)

```typescript
const Header: React.FC = () => {
    const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>('');

    return (
        <Button onClick={() => setIsCartOpen(!isCartOpen)}>
            Abrir Carrito
        </Button>
    );
};
```

**Explicación:**
- `isCartOpen`: Estado booleano que controla la visibilidad del Modal del carrito
- `setIsCartOpen`: Función para actualizar el estado
- `useState<boolean>(false)`: TypeScript infiere el tipo y el valor inicial es `false`

#### 2. **Estado de Objeto** (Login.tsx)

```typescript
const Login: React.FC = () => {
    const [form, setForm] = useState<LoginCredentials>({ 
        email: '', 
        password: '' 
    });

    // Actualización inmutable del objeto
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm(prev => ({ 
            ...prev,  // Spread operator: copia todas las propiedades
            [e.target.name]: e.target.value  // Actualiza solo la propiedad cambiada
        }));
    };

    return (
        <Form.Control
            name="email"
            value={form.email}
            onChange={handleChange}
        />
    );
};
```

**Técnicas aplicadas:**
- **Spread operator (`...prev`)**: Copia todas las propiedades del objeto anterior
- **Computed property name (`[e.target.name]`)**: Actualiza dinámicamente la propiedad correcta
- **Inmutabilidad**: No muta el objeto directamente, crea uno nuevo

#### 3. **Estado Múltiple** (Register.tsx)

```typescript
const Register: React.FC = () => {
    const [form, setForm] = useState<RegisterForm>({ 
        username: '', 
        email: '', 
        password: '', 
        confirmPassword: '' 
    });
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);  // Inicia carga
        
        try {
            await register(form.username, form.email, form.password);
        } catch (err) {
            setError(err.message);  // Maneja error
        } finally {
            setLoading(false);  // Finaliza carga (siempre se ejecuta)
        }
    };
};
```

**Estados independientes:**
- `form`: Datos del formulario
- `error`: Mensajes de error
- `loading`: Estado de carga para deshabilitar botones

#### 4. **Estado con Efectos Secundarios** (Products.tsx)

```typescript
const Products: React.FC = () => {
    const [searchResult, setSearchResult] = useState<SearchResult>({
        products: [],
        totalCount: 0,
        filteredCount: 0,
        searchTerm: ''
    });
    const [initialSearchTerm, setInitialSearchTerm] = useState<string>('');

    // Sincroniza con URL params
    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchParam = urlParams.get('search');
        if (searchParam) setInitialSearchTerm(searchParam);
    }, [location.search]);  // Se ejecuta cuando cambia la URL
};
```

**useEffect explicado:**
- Se ejecuta después del render
- `[location.search]`: Dependencia - solo se ejecuta cuando cambia la búsqueda en la URL
- Útil para sincronizar estado con URL (bookmarkeable URLs)

#### 5. **Estado con Validación** (Register.tsx)

```typescript
const [form, setForm] = useState<RegisterForm>({ 
    username: '', 
    email: '', 
    password: '', 
    confirmPassword: '' 
});

const handleSubmit = async (e: React.FormEvent) => {
    // Validaciones antes de enviar
    if (form.password !== form.confirmPassword) {
        setError('Las contraseñas no coinciden');
        return;  // Detiene el envío
    }
    
    if (form.password.length < 6) {
        setError('La contraseña debe tener al menos 6 caracteres');
        return;
    }

    // Si pasa validaciones, continúa
    await register(form.username, form.email, form.password);
};
```

### Buenas Prácticas con useState

1. **Inmutabilidad**: Siempre crear nuevos objetos/arrays
   ```typescript
   // ❌ Malo
   items.push(newItem);
   
   // ✅ Bueno
   setItems([...items, newItem]);
   ```

2. **Functional updates**: Usar función cuando el nuevo valor depende del anterior
   ```typescript
   // ✅ Correcto
   setCount(prev => prev + 1);
   ```

3. **Tipado explícito**: Especificar el tipo en useState
   ```typescript
   const [user, setUser] = useState<User | null>(null);
   ```

---

## 🔷 Interfaces TypeScript - Definición y Uso

### Concepto Técnico

Las **interfaces** en TypeScript definen la estructura (forma) de objetos. Proporcionan:
- **Type safety**: El compilador verifica que los objetos cumplan con la estructura
- **Autocompletado**: El IDE sugiere propiedades disponibles
- **Documentación**: Sirven como documentación del código

### Interfaces del Proyecto

#### 1. **Interfaces de Dominio** (Tipos de Negocio)

**Product** (`src/types/Product.ts`):
```typescript
export interface Product {
    id: string;              // Identificador único
    name: string;            // Nombre del juego
    price: number;           // Precio en dólares
    image: string;           // URL de la imagen
    rating: number;          // Calificación (0-5)
    discount: number;        // Porcentaje de descuento (0-100)
    category: string;        // Categoría del juego
    description: string;    // Descripción detallada
    tags: string[];         // Array de etiquetas
    featured: boolean;       // Si es destacado
}
```

**Uso:**
```typescript
const game: Product = {
    id: '1',
    name: 'Cyberpunk 2077',
    price: 59.99,
    image: 'https://...',
    rating: 4.2,
    discount: 15,
    category: 'Acción',
    description: '...',
    tags: ['Acción', 'RPG'],
    featured: true
};
```

**User** (`src/types/User.ts`):
```typescript
export interface User {
    id: string;
    username: string;
    email: string;
    password: string;         // En producción, esto NO debería estar aquí
    firstName?: string;      // Opcional (el ? indica que puede ser undefined)
    lastName?: string;
    avatar?: string;
    role: UserRole;          // Enum (ver más abajo)
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export enum UserRole {
    USER = 'user',
    ADMIN = 'admin',
    MODERATOR = 'moderator'
}
```

**Características técnicas:**
- `?`: Propiedades opcionales
- `enum`: Conjunto de constantes nombradas
- `Date`: Tipo de fecha de JavaScript

**CartItem** (`src/types/Cart.ts`):
```typescript
export interface CartItem extends Product {  // Extiende Product
    quantity: number;  // Agrega cantidad al Product base
}
```

**Técnica de herencia:**
- `extends Product`: Hereda todas las propiedades de `Product`
- Agrega `quantity` adicional
- Evita duplicación de código

#### 2. **Interfaces de Props de Componentes**

**CartProps** (`src/types/Component.ts`):
```typescript
export interface CartProps {
    isOpen: boolean;
    onClose: () => void;
    items: CartItem[];
    count: number;
    totalPrice: number;
    onRemove: (productId: string) => void;
    onClear: () => void;
}
```

**Uso en componente:**
```typescript
const Cart: React.FC<CartProps> = ({ 
    isOpen, 
    onClose, 
    items, 
    count, 
    totalPrice, 
    onRemove, 
    onClear 
}) => {
    // TypeScript valida que todas las props estén presentes
    return <Modal show={isOpen}>...</Modal>;
};
```

**Ventajas:**
- **Autocompletado**: Al usar `<Cart />`, el IDE sugiere las props requeridas
- **Validación**: TypeScript error si falta una prop requerida
- **Documentación**: Las props están documentadas en la interfaz

**SearchBarProps**:
```typescript
export interface SearchBarProps {
    products: Product[];
    onSearchResult: (result: SearchResult) => void;
    placeholder?: string;        // Opcional
    showFilters?: boolean;       // Opcional
    initialQuery?: string;        // Opcional
}
```

**Uso:**
```typescript
<SearchBar 
    products={products}
    onSearchResult={handleResult}
    placeholder="Buscar..."
    showFilters={true}
/>
```

#### 3. **Interfaces de Context**

**AuthContextType** (ya visto en UseContext):
```typescript
export interface AuthContextType {
    user: User | null;
    loading: boolean;
    error: string | null;
    login: (email: string, password: string) => Promise<void>;
    // ...
}
```

**Garantiza que el Context tenga la estructura correcta.**

#### 4. **Interfaces de Formularios**

**LoginCredentials**:
```typescript
export interface LoginCredentials {
    email: string;
    password: string;
}

// Uso en estado
const [form, setForm] = useState<LoginCredentials>({ 
    email: '', 
    password: '' 
});
```

**RegisterForm** (extiende RegisterData):
```typescript
interface RegisterForm extends RegisterData {
    confirmPassword: string;  // Agrega campo de confirmación
}
```

#### 5. **Interfaces de Búsqueda**

**SearchFilters**:
```typescript
export interface SearchFilters {
    query: string;
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    minRating?: number;
    tags?: string[];
}
```

**SearchResult**:
```typescript
export interface SearchResult {
    products: Product[];
    totalCount: number;
    filteredCount: number;
    searchTerm: string;
}
```

### Patrones Avanzados de Interfaces

#### 1. **Union Types** (Tipos Unión)
```typescript
type Status = 'loading' | 'success' | 'error';
```

#### 2. **Generic Interfaces**
```typescript
interface ApiResponse<T> {
    data: T;
    status: number;
}

const userResponse: ApiResponse<User> = {
    data: user,
    status: 200
};
```

#### 3. **Index Signatures**
```typescript
interface CategoryColors {
    [key: string]: string;  // Cualquier string como clave, string como valor
}

const colors: CategoryColors = {
    'Acción': 'danger',
    'Aventura': 'success'
};
```

---

## ✅ Validaciones - Implementación y Patrones

### Tipos de Validaciones en el Proyecto

#### 1. **Validaciones de Formularios** (Login.tsx, Register.tsx)

**Validación en el cliente antes de enviar:**

```typescript
// Register.tsx
const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    clearError();
    setError('');

    // Validación 1: Campos requeridos
    if (!form.username || !form.email || !form.password) {
        setError('Por favor, completa todos los campos.');
        return;  // Detiene la ejecución
    }

    // Validación 2: Coincidencia de contraseñas
    if (form.password !== form.confirmPassword) {
        setError('Las contraseñas no coinciden');
        return;
    }

    // Validación 3: Longitud mínima de contraseña
    if (form.password.length < 6) {
        setError('La contraseña debe tener al menos 6 caracteres');
        return;
    }

    // Validación 4: Formato de email (básico)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
        setError('El email no tiene un formato válido');
        return;
    }

    // Si pasa todas las validaciones, procede
    try {
        setLoading(true);
        await register(form.username, form.email, form.password);
        navigate('/');
    } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al registrar');
    } finally {
        setLoading(false);
    }
};
```

**Patrones de validación:**
- **Early return**: Si falla una validación, retorna inmediatamente
- **Mensajes específicos**: Cada validación tiene su mensaje de error
- **Regex**: Para validar formato de email
- **Try-catch**: Para manejar errores del servicio

**Validación HTML5 nativa:**
```typescript
<Form.Control
    type="email"           // Valida formato de email
    required              // Campo requerido
    placeholder="Email"
    value={form.email}
    onChange={handleChange}
/>
```

**Técnicas:**
- `type="email"`: El navegador valida automáticamente el formato
- `required`: El navegador previene el envío si está vacío
- Validación visual: Bootstrap muestra estados de error

#### 2. **Validaciones en el Servicio** (authService.ts)

**Validaciones del lado del servicio:**

```typescript
async login(credentials: LoginCredentials): Promise<User> {
    // Simulación de delay de API
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const users = this.getStoredUsers();
    
    // Validación: Usuario existe
    const user = users.find(
        u => u.email === credentials.email && 
             u.password === credentials.password
    );

    if (!user) {
        throw new Error('Credenciales inválidas');  // Lanza error
    }

    // Validación: Usuario activo
    if (!user.isActive) {
        throw new Error('Usuario inactivo');
    }

    return user;
}

async register(data: RegisterData): Promise<User> {
    const users = this.getStoredUsers();
    
    // Validación: Email único
    if (users.some(u => u.email === data.email)) {
        throw new Error('El email ya está registrado');
    }

    // Validación: Username único
    if (users.some(u => u.username === data.username)) {
        throw new Error('El nombre de usuario ya existe');
    }

    // Si pasa validaciones, crea el usuario
    const newUser: User = { /* ... */ };
    users.push(newUser);
    localStorage.setItem('steamish_users', JSON.stringify(users));
    
    return newUser;
}
```

**Técnicas:**
- **Throw Error**: Lanza excepciones que se capturan en el componente
- **Validación de unicidad**: Verifica que no existan duplicados
- **Validación de estado**: Verifica que el usuario esté activo

#### 3. **Validaciones de Rutas Protegidas** (ProtectedRoute.tsx)

```typescript
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
    children, 
    requireAdmin = false 
}) => {
    const { isAuthenticated, isAdmin, loading } = useAuth();

    // Validación 1: Estado de carga
    if (loading) {
        return <Spinner />;  // Muestra spinner mientras carga
    }

    // Validación 2: Autenticación requerida
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;  // Redirige al login
    }

    // Validación 3: Permisos de admin
    if (requireAdmin && !isAdmin) {
        return (
            <Alert variant="danger">
                No tienes permisos de administrador
            </Alert>
        );
    }

    // Si pasa todas las validaciones, muestra el componente
    return children;
};
```

**Flujo de validación:**
1. Verifica si está cargando → muestra spinner
2. Verifica autenticación → redirige si no está autenticado
3. Verifica permisos → muestra error si no tiene permisos
4. Renderiza el componente protegido

#### 4. **Validaciones de Búsqueda** (SearchBar.tsx)

```typescript
const searchResult = useMemo((): SearchResult => {
    const filtered = products.filter(product => {
        // Validación de query: búsqueda en nombre, descripción y tags
        const matchesQuery = !filters.query || 
            product.name.toLowerCase().includes(filters.query.toLowerCase()) ||
            product.description.toLowerCase().includes(filters.query.toLowerCase()) ||
            product.tags?.some(tag => tag.toLowerCase().includes(filters.query.toLowerCase()));
        
        // Validación de categoría
        const matchesCategory = !filters.category || product.category === filters.category;
        
        // Validación de rating mínimo
        const matchesRating = !filters.minRating || product.rating >= filters.minRating;
        
        // Validación de rango de precio
        const matchesPrice = (!filters.minPrice || product.price >= filters.minPrice) &&
                           (!filters.maxPrice || product.price <= filters.maxPrice);
        
        // Todos los filtros deben cumplirse (AND lógico)
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

**Técnicas:**
- **Filtrado múltiple**: Combina varios criterios con operadores lógicos
- **useMemo**: Optimiza el cálculo para que solo se ejecute cuando cambian las dependencias
- **Case-insensitive**: `toLowerCase()` para búsqueda sin importar mayúsculas
- **Optional chaining**: `product.tags?.some()` maneja casos donde `tags` puede ser undefined

#### 5. **Validaciones de Tipo TypeScript**

TypeScript valida tipos en tiempo de compilación:

```typescript
// ❌ Error: falta la propiedad 'price'
const product: Product = {
    id: '1',
    name: 'Juego'
    // Falta 'price', 'image', etc.
};

// ✅ Correcto: todas las propiedades requeridas están presentes
const product: Product = {
    id: '1',
    name: 'Juego',
    price: 59.99,
    image: 'https://...',
    rating: 4.5,
    discount: 0,
    category: 'Acción',
    description: '...',
    tags: [],
    featured: false
};
```

### Patrones de Validación Recomendados

1. **Validación en capas:**
   - Cliente (formulario) → Validación rápida y UX
   - Servicio → Validación de negocio y seguridad
   - Backend (en producción) → Validación final

2. **Mensajes de error claros:**
   ```typescript
   // ❌ Malo
   setError('Error');
   
   // ✅ Bueno
   setError('La contraseña debe tener al menos 6 caracteres');
   ```

3. **Validación temprana:**
   ```typescript
   // Valida antes de hacer llamadas costosas (API, cálculos)
   if (!form.email) {
       setError('Email requerido');
       return;
   }
   ```

---

## 🔄 Flujo de Datos y Comunicación

### Flujo de Datos en el Proyecto

```
┌─────────────────┐
│   Usuario       │
│  (Interacción)  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Componente     │
│  (useState)     │  ← Estado local
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   Context       │
│  (useContext)   │  ← Estado global
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   Service       │
│  (Lógica)       │  ← Lógica de negocio
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  localStorage   │
│  (Persistencia) │  ← Almacenamiento
└─────────────────┘
```

### Ejemplo Completo: Agregar Producto al Carrito

1. **Usuario hace clic en "Agregar al Carrito"** (Home.tsx)
   ```typescript
   <Button onClick={() => handleAddToCart(game)}>
       Agregar al Carrito
   </Button>
   ```

2. **Componente llama a la función local** (Home.tsx)
   ```typescript
   const handleAddToCart = (game: Product): void => {
       cart.add(game);  // Usa el Context del carrito
   };
   ```

3. **Context actualiza el estado** (CartContext.tsx)
   ```typescript
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

4. **Todos los componentes que usan el Context se actualizan automáticamente**
   - Header muestra el badge con la nueva cantidad
   - Cart muestra el nuevo producto si está abierto

### Comunicación entre Componentes

#### 1. **Props (Padre → Hijo)**
```typescript
// Padre
<Cart 
    isOpen={isCartOpen}
    items={cart.items}
    onClose={() => setIsCartOpen(false)}
/>

// Hijo
const Cart: React.FC<CartProps> = ({ isOpen, items, onClose }) => {
    return <Modal show={isOpen} onHide={onClose}>...</Modal>;
};
```

#### 2. **Context (Global)**
```typescript
// Cualquier componente puede acceder
const cart = useCart();
const { user } = useAuth();
```

#### 3. **Callbacks (Hijo → Padre)**
```typescript
// Padre
const handleSearch = (result: SearchResult) => {
    setSearchResult(result);
};

// Hijo
<SearchBar onSearchResult={handleSearch} />
```

---

## 💡 Ejemplos Prácticos

### Ejemplo 1: Login Completo

**Flujo completo de login:**

```typescript
// 1. Usuario ingresa datos
const [form, setForm] = useState<LoginCredentials>({ 
    email: '', 
    password: '' 
});

// 2. Validación al enviar
const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validación local
    if (!form.email || !form.password) {
        setError('Completa todos los campos');
        return;
    }
    
    // 3. Llamada al Context
    try {
        await login(form.email, form.password);
        navigate('/');  // Redirige si es exitoso
    } catch (err) {
        setError(err.message);  // Muestra error
    }
};

// 4. Context llama al servicio
const login = async (email: string, password: string) => {
    const userData = await authService.login({ email, password });
    setUser(userData);  // Actualiza estado global
};

// 5. Servicio valida y retorna
async login(credentials: LoginCredentials): Promise<User> {
    const user = users.find(/* ... */);
    if (!user) throw new Error('Credenciales inválidas');
    return user;
}
```

### Ejemplo 2: Búsqueda de Productos

**Búsqueda con filtros:**

```typescript
// 1. Estado de filtros
const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    category: '',
    minRating: 0
});

// 2. Búsqueda optimizada con useMemo
const searchResult = useMemo(() => {
    const filtered = products.filter(product => {
        const matchesQuery = !filters.query || 
            product.name.toLowerCase().includes(filters.query.toLowerCase());
        const matchesCategory = !filters.category || 
            product.category === filters.category;
        const matchesRating = !filters.minRating || 
            product.rating >= filters.minRating;
        
        return matchesQuery && matchesCategory && matchesRating;
    });
    
    return {
        products: filtered,
        totalCount: products.length,
        filteredCount: filtered.length,
        searchTerm: filters.query
    };
}, [products, filters]);

// 3. Actualiza resultados cuando cambian los filtros
useEffect(() => {
    onSearchResult(searchResult);
}, [searchResult, onSearchResult]);
```

### Ejemplo 3: Carrito de Compras

**Agregar, actualizar y calcular totales:**

```typescript
// 1. Estado del carrito
const [items, setItems] = useState<CartItem[]>([]);

// 2. Agregar producto
const add = (product: Product) => {
    setItems(current => {
        const existing = current.find(item => item.id === product.id);
        if (existing) {
            // Incrementa cantidad (inmutabilidad)
            return current.map(item =>
                item.id === product.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            );
        }
        // Agrega nuevo producto
        return [...current, { ...product, quantity: 1 }];
    });
};

// 3. Calcular total (optimizado)
const totalPrice = useMemo(() => {
    return items.reduce((total, item) => {
        const price = item.discount > 0
            ? item.price * (1 - item.discount / 100)
            : item.price;
        return total + (price * item.quantity);
    }, 0);
}, [items]);
```

---

## 📝 Resumen de Conceptos Clave

### Bootstrap
- **Grid System**: Row/Col para layouts responsivos
- **Componentes**: Navbar, Modal, Card, Form, Button
- **Personalización**: Variables CSS y override de clases
- **Responsive**: Breakpoints (xs, sm, md, lg, xl, xxl)

### UseContext
- **Estado global**: Compartido entre componentes
- **Providers anidados**: AuthProvider → ProductProvider → CartProvider
- **Custom Hooks**: `useAuth()`, `useCart()`, `useProducts()`
- **Optimización**: `useMemo`, `useCallback`

### UseState
- **Estado local**: Por componente
- **Inmutabilidad**: Siempre crear nuevos objetos/arrays
- **Functional updates**: `setState(prev => prev + 1)`
- **Tipado**: `useState<Type>(initialValue)`

### Interfaces
- **Type safety**: Validación en tiempo de compilación
- **Documentación**: Estructura clara de datos
- **Extends**: Herencia de interfaces
- **Opcionales**: `prop?: Type`

### Validaciones
- **Cliente**: Validación rápida en formularios
- **Servicio**: Validación de negocio
- **Rutas**: ProtectedRoute para autenticación
- **TypeScript**: Validación de tipos en compilación

---

## 🎓 Conclusión

Este proyecto demuestra una arquitectura moderna de React con:
- **Separación de responsabilidades**: Contexts, Services, Components
- **Type safety**: TypeScript en todo el proyecto
- **UI consistente**: Bootstrap para diseño profesional
- **Estado global eficiente**: Context API sin librerías externas
- **Validaciones robustas**: Múltiples capas de validación

**Próximos pasos sugeridos:**
- Implementar tests unitarios con Jest/React Testing Library
- Agregar validación de formularios con React Hook Form
- Implementar persistencia del carrito en localStorage
- Agregar manejo de errores más robusto
- Implementar paginación en la búsqueda de productos

---

**Documentación creada el:** 2024  
**Versión del proyecto:** 1.0.0  
**Stack tecnológico:** React 18, TypeScript 4.9, Bootstrap 5.3, React Router 6.8

