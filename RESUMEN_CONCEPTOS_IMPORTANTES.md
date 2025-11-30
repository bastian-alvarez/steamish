# 📚 Resumen de Conceptos Importantes - Steamish

## 1. 🛣️ React Router DOM - Rutas

### Instalación:
```bash
npm i react-router-dom
```

**En el proyecto:** Ya está instalado en `package.json`:
```json
"react-router-dom": "^6.8.0"
```

### ¿Qué es?
Librería de React para manejar navegación y rutas en aplicaciones de una sola página (SPA).

### ¿Para qué sirve?
- ✅ Navegar entre páginas sin recargar
- ✅ Crear URLs amigables (ej: `/productos`, `/login`)
- ✅ Manejar parámetros de URL (ej: `/productos/:id`)
- ✅ Proteger rutas (requieren autenticación)

### Ejemplo en el proyecto (`App.tsx`):
```typescript
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

<Router>
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productos" element={<Products />} />
        <Route path="/productos/:id" element={<ProductDetail />} />
        <Route path="/login" element={<Login />} />
    </Routes>
</Router>
```

---

## 2. 🔀 useRoutes (No se usa en el proyecto, pero existe)

### ¿Qué es?
Hook alternativo a `<Routes>` para definir rutas de forma declarativa.

### Sintaxis:
```typescript
const routes = useRoutes([
    { path: '/', element: <Home /> },
    { path: '/productos', element: <Products /> },
]);
```

### Nota:
El proyecto usa `<Routes>` y `<Route>` en lugar de `useRoutes`.

---

## 3. 🧭 useNavigate

### ¿Qué es?
Hook de React Router para navegar programáticamente (cambiar de página desde código).

### Sintaxis:
```typescript
const navigate = useNavigate();
navigate('/ruta');  // Navega a la ruta
```

### Ejemplos en el proyecto:

#### Login.tsx:
```typescript
const navigate = useNavigate();

// Después de login exitoso
if (user?.role === UserRole.ADMIN) {
    navigate('/admin');  // Navega al admin
} else {
    navigate('/');  // Navega al inicio
}
```

#### Products.tsx:
```typescript
const navigate = useNavigate();

// Si no está autenticado, redirigir al login
setTimeout(() => {
    navigate('/login');
}, 2000);
```

#### QuickSearch.tsx:
```typescript
const navigate = useNavigate();

// Buscar productos
if (searchQuery.trim()) {
    navigate(`/productos?search=${encodeURIComponent(searchQuery.trim())}`);
}
```

### ¿Para qué sirve?
- ✅ Redirigir después de acciones (login, logout, compra)
- ✅ Navegar desde código JavaScript
- ✅ Pasar parámetros de búsqueda en la URL

---

## 4. 📍 useLocation

### ¿Qué es?
Hook de React Router para obtener información de la URL actual.

### Sintaxis:
```typescript
const location = useLocation();
// location.pathname  → "/productos"
// location.search    → "?search=mario"
// location.hash      → "#section"
```

### Ejemplo en el proyecto (`Products.tsx`):
```typescript
const location = useLocation();

// Detectar parámetros de búsqueda en la URL
useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchParam = urlParams.get('search');
    if (searchParam) setInitialSearchTerm(searchParam);
}, [location.search]);
```

### ¿Para qué sirve?
- ✅ Leer parámetros de búsqueda de la URL (`?search=mario`)
- ✅ Detectar en qué página estás
- ✅ Mantener estado en la URL

---

## 5. 🎣 useCallback

### ¿Qué es?
Hook de React que memoriza funciones para evitar re-renderizados innecesarios.

### Sintaxis:
```typescript
const memoizedFunction = useCallback(
    () => {
        // función
    },
    [dependencias]  // Array de dependencias
);
```

### Ejemplos en el proyecto:

#### CartContext.tsx:
```typescript
const add = useCallback((product: Product) => {
    setItems(current => {
        // lógica para agregar
    });
}, []);  // Sin dependencias = función nunca cambia
```

#### AuthContext.tsx:
```typescript
const login = useCallback(async (email: string, password: string) => {
    // lógica de login
}, []);  // Sin dependencias
```

#### NotificationToast.tsx:
```typescript
const showSuccess = useCallback((message: string) => {
    addToast(message, 'success');
}, [addToast]);  // Depende de addToast
```

### ¿Para qué sirve?
- ✅ Optimizar performance (evitar re-renderizados)
- ✅ Funciones estables en Contextos
- ✅ Funciones pasadas a componentes hijos
- ✅ Dependencias de useEffect

---

## 6. 🛠️ Helpers

### ¿Qué es?
Funciones reutilizables que realizan tareas comunes.

### Ubicación en el proyecto:
- **Globales:** `src/utils/helpers.ts`
- **Locales:** Dentro de componentes

### Ejemplos en el proyecto:

#### helpers.ts (Globales):
```typescript
export const formatCurrency = (amount: number) => `$${amount.toFixed(2)}`;
export const calculateTotal = (items) => items.reduce(...);
export const isEmpty = (obj: object) => Object.keys(obj).length === 0;
```

#### Locales (dentro de componentes):
```typescript
// ProductDetail.tsx
const getCategoryColor = (category: string): string => {
    const colors = {
        'Acción': 'danger',
        'Aventura': 'success',
        // ...
    };
    return colors[category] || 'dark';
};

// Footer.tsx
const createLink = (to: string, label: string) => ({ to, label });
```

### ¿Para qué sirven?
- ✅ Evitar código repetido (DRY)
- ✅ Organizar código
- ✅ Facilitar mantenimiento
- ✅ Hacer el código más legible

---

## 7. ✅ Validaciones

### ¿Qué son?
Verificaciones que aseguran que los datos sean correctos antes de procesarlos.

### Tipos de validaciones en el proyecto:

#### 1. Validaciones de Formularios (Frontend):

**Login.tsx:**
```typescript
if (!form.email || !form.password) {
    setError('Por favor, completa todos los campos.');
    return;
}
```

**Register.tsx:**
```typescript
if (form.password !== form.confirmPassword) {
    setError('Las contraseñas no coinciden');
    return;
}
if (form.password.length < 6) {
    setError('La contraseña debe tener al menos 6 caracteres');
    return;
}
```

**Admin.tsx:**
```typescript
const validateForm = (): boolean => {
    if (!formData.name.trim()) return setFormError('El nombre es requerido'), false;
    if (!formData.description.trim()) return setFormError('La descripción es requerida'), false;
    const price = parseFloat(formData.price);
    if (isNaN(price) || price < 0) return setFormError('Precio inválido'), false;
    const rating = parseFloat(formData.rating);
    if (isNaN(rating) || rating < 0 || rating > 5) return setFormError('Rating inválido'), false;
    return true;
};
```

#### 2. Validaciones HTML5 (Nativas):
```typescript
<Form.Control
    type="email"  // Valida formato de email
    required      // Campo requerido
    min={0}       // Valor mínimo
    max={5}       // Valor máximo
/>
```

#### 3. Validaciones en Servicios:

**authService.ts:**
```typescript
// Validar credenciales
if (!user) {
    throw new Error('Credenciales inválidas');
}

// Validar usuario bloqueado
if (!user.isActive) {
    throw new Error('Tu cuenta ha sido bloqueada');
}

// Validar email duplicado
if (users.some(u => u.email === data.email)) {
    throw new Error('El email ya está registrado');
}
```

#### 4. Validaciones de Rutas:

**ProtectedRoute.tsx:**
```typescript
if (!isAuthenticated) {
    return <Navigate to="/login" />;
}
if (requireAdmin && !isAdmin) {
    return <AccesoDenegado />;
}
```

### ¿Para qué sirven?
- ✅ Seguridad: Prevenir datos incorrectos
- ✅ UX: Feedback inmediato al usuario
- ✅ Datos limpios: Asegurar datos correctos en el sistema
- ✅ Prevención de errores

---

## 8. 📘 TypeScript (Tipado)

### ¿Qué es?
Superset de JavaScript que añade tipos estáticos. Ayuda a detectar errores antes de ejecutar el código.

### En el proyecto:
TypeScript está instalado: `"typescript": "^4.9.5"`

### Tipos e Interfaces en el proyecto:

#### 1. Interfaces de Tipos:

**types/User.ts:**
```typescript
export interface User {
    id: string;
    username: string;
    email: string;
    password: string;
    role: UserRole;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface LoginCredentials {
    email: string;
    password: string;
}
```

**types/Product.ts:**
```typescript
export interface Product {
    id: string;
    name: string;
    price: number;
    rating: number;
    category: string;
    image: string;
    description: string;
    discount?: number;
    tags?: string[];
    featured?: boolean;
}
```

**types/Cart.ts:**
```typescript
export interface CartItem extends Product {
    quantity: number;
}
```

#### 2. Tipos en Componentes:

**Login.tsx:**
```typescript
const [form, setForm] = useState<LoginCredentials>({ 
    email: '', 
    password: '' 
});
```

**Admin.tsx:**
```typescript
const [formData, setFormData] = useState<AdminFormData>({
    name: '', 
    description: '', 
    price: '', 
    // ...
});
```

#### 3. Tipos en Funciones:

**helpers.ts:**
```typescript
export const formatCurrency = (amount: number): string => 
    `$${amount.toFixed(2)}`;
```

**CartContext.tsx:**
```typescript
const add = useCallback((product: Product): void => {
    // ...
}, []);
```

#### 4. Tipos en Props:

**Component.ts:**
```typescript
export interface CartProps {
    isOpen: boolean;
    onClose: () => void;
    items: CartItem[];
    count: number;
    totalPrice: number;
    onRemove: (id: string) => void;
    onClear: () => void;
}
```

### Ventajas de TypeScript:
- ✅ **Autocompletado**: El editor sugiere propiedades disponibles
- ✅ **Detección de errores**: Encuentra errores antes de ejecutar
- ✅ **Documentación**: Los tipos documentan el código
- ✅ **Refactorización segura**: Cambios más seguros
- ✅ **Mejor mantenimiento**: Código más fácil de mantener

---

## 📊 Resumen de Conceptos

| Concepto | ¿Qué es? | ¿Dónde se usa? |
|----------|----------|----------------|
| **React Router DOM** | Librería de navegación | `App.tsx`, rutas |
| **useNavigate** | Navegar programáticamente | Login, Products, Cart |
| **useLocation** | Información de URL | Products (búsqueda) |
| **useCallback** | Memorizar funciones | Contextos (Cart, Auth) |
| **Helpers** | Funciones reutilizables | `utils/helpers.ts`, componentes |
| **Validaciones** | Verificar datos | Formularios, servicios, rutas |
| **TypeScript** | Tipado estático | Todo el proyecto |

---

## 🎯 Flujo de Conceptos

### Ejemplo completo (Login):
```typescript
// 1. TypeScript - Tipos
interface LoginCredentials {
    email: string;
    password: string;
}

// 2. useState - Estado del formulario
const [form, setForm] = useState<LoginCredentials>({ email: '', password: '' });

// 3. Validación - Verificar campos
if (!form.email || !form.password) {
    setError('Completa todos los campos');
    return;
}

// 4. useNavigate - Redirigir después de login
const navigate = useNavigate();
navigate('/admin');  // o '/'

// 5. useCallback - Función memorizada (en AuthContext)
const login = useCallback(async (email, password) => {
    // ...
}, []);
```

---

## ✅ Ventajas de Usar Estos Conceptos

1. **React Router DOM**: Navegación fluida, URLs amigables
2. **useNavigate**: Control total sobre la navegación
3. **useLocation**: Acceso a información de la URL
4. **useCallback**: Optimización de performance
5. **Helpers**: Código reutilizable y organizado
6. **Validaciones**: Datos seguros y correctos
7. **TypeScript**: Código más seguro y mantenible

---

## 🎓 Conclusión

Estos conceptos trabajan juntos para crear una aplicación React robusta:
- **React Router DOM** maneja la navegación
- **useNavigate/useLocation** dan control sobre las rutas
- **useCallback** optimiza el rendimiento
- **Helpers** organizan el código
- **Validaciones** aseguran datos correctos
- **TypeScript** proporciona seguridad de tipos

**Todos están implementados y funcionando en el proyecto Steamish.**





