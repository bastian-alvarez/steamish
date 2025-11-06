# 📚 ¿Para qué se usa useState en el código?

## 🎯 ¿Qué es useState?

`useState` es un **Hook de React** que permite agregar **estado local** a componentes funcionales. El estado es información que puede cambiar con el tiempo y que afecta lo que se muestra en pantalla.

---

## 🎨 Casos de Uso de useState en el Proyecto

### 1. **📝 Manejar Formularios** (Valores de Inputs)

**Ubicación:** `src/pages/Login/Login.tsx`, `src/pages/Register/Register.tsx`, `src/pages/Contact/Contact.tsx`

```typescript
// Login.tsx
const [form, setForm] = useState<LoginCredentials>({ email: '', password: '' });
```

**¿Para qué sirve?**
- ✅ Almacena los valores que el usuario escribe en los campos del formulario
- ✅ Se actualiza cada vez que el usuario escribe algo
- ✅ Permite controlar el valor del input

**Ejemplo de uso:**
```typescript
<Form.Control
    value={form.email}  // ← Muestra el valor del estado
    onChange={(e) => setForm(prev => ({ ...prev, email: e.target.value }))}  // ← Actualiza el estado
/>
```

**Flujo:**
1. Usuario escribe "test@email.com" en el campo email
2. `onChange` detecta el cambio
3. `setForm` actualiza el estado con el nuevo valor
4. El componente se re-renderiza
5. El input muestra el nuevo valor

---

### 2. **🚨 Manejar Errores y Mensajes**

**Ubicación:** `src/pages/Login/Login.tsx`, `src/pages/Register/Register.tsx`, `src/pages/Admin/Admin.tsx`

```typescript
// Login.tsx
const [error, setError] = useState<string>('');
```

**¿Para qué sirve?**
- ✅ Almacena mensajes de error que se muestran al usuario
- ✅ Se actualiza cuando ocurre un error
- ✅ Permite mostrar/ocultar mensajes de error

**Ejemplo de uso:**
```typescript
// Cuando hay un error
setError('Credenciales inválidas');

// Mostrar el error
{error && <Alert variant="danger">{error}</Alert>}
```

**Flujo:**
1. Usuario intenta iniciar sesión con credenciales incorrectas
2. `setError('Credenciales inválidas')` actualiza el estado
3. El componente se re-renderiza
4. Aparece el mensaje de error en pantalla

---

### 3. **⏳ Manejar Estados de Carga (Loading)**

**Ubicación:** `src/pages/Login/Login.tsx`, `src/pages/Register/Register.tsx`, `src/pages/ProductDetail/ProductDetail.tsx`

```typescript
// Login.tsx
const [loading, setLoading] = useState<boolean>(false);
```

**¿Para qué sirve?**
- ✅ Indica si una operación está en proceso (cargando)
- ✅ Muestra spinners o mensajes de "cargando..."
- ✅ Deshabilita botones mientras se procesa

**Ejemplo de uso:**
```typescript
// Iniciar carga
setLoading(true);
try {
    await login(email, password);
} finally {
    setLoading(false);  // Terminar carga
}

// Mostrar estado
<Button disabled={loading}>
    {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
</Button>
```

**Flujo:**
1. Usuario hace clic en "Iniciar Sesión"
2. `setLoading(true)` → muestra "Iniciando sesión..."
3. Se ejecuta el login
4. `setLoading(false)` → vuelve a mostrar "Iniciar Sesión"

---

### 4. **📦 Manejar Estado de Modales/Dialogs**

**Ubicación:** `src/components/Header/Header.tsx`, `src/pages/Admin/Admin.tsx`

```typescript
// Header.tsx - Controlar si el carrito está abierto
const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
```

**¿Para qué sirve?**
- ✅ Controla si un modal está abierto o cerrado
- ✅ Permite abrir/cerrar modales dinámicamente

**Ejemplo de uso:**
```typescript
// Abrir modal
<Button onClick={() => setIsCartOpen(true)}>Ver Carrito</Button>

// Cerrar modal
<Modal show={isCartOpen} onHide={() => setIsCartOpen(false)}>
    {/* Contenido del modal */}
</Modal>
```

**Flujo:**
1. Usuario hace clic en el botón del carrito
2. `setIsCartOpen(true)` → modal se abre
3. Usuario hace clic en cerrar
4. `setIsCartOpen(false)` → modal se cierra

---

### 5. **🔍 Manejar Búsquedas y Filtros**

**Ubicación:** `src/components/Header/QuickSearch.tsx`, `src/components/SearchBar/SearchBar.tsx`

```typescript
// QuickSearch.tsx
const [searchQuery, setSearchQuery] = useState<string>('');
```

**¿Para qué sirve?**
- ✅ Almacena el texto que el usuario escribe para buscar
- ✅ Se actualiza en tiempo real mientras el usuario escribe
- ✅ Permite realizar búsquedas dinámicas

**Ejemplo de uso:**
```typescript
// Usuario escribe
<Form.Control
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
/>

// Buscar
if (searchQuery.trim()) {
    navigate(`/productos?search=${searchQuery}`);
}
```

**Flujo:**
1. Usuario escribe "Mario" en la búsqueda
2. `setSearchQuery` actualiza el estado con cada letra
3. Usuario presiona Enter
4. Se navega a la página de productos con el término de búsqueda

---

### 6. **📊 Manejar Datos de Listas y Arrays**

**Ubicación:** `src/context/CartContext.tsx`, `src/pages/Library/Library.tsx`

```typescript
// CartContext.tsx - Items en el carrito
const [items, setItems] = useState<CartItem[]>([]);
```

**¿Para qué sirve?**
- ✅ Almacena listas de elementos (productos, usuarios, juegos)
- ✅ Permite agregar, eliminar, modificar elementos
- ✅ Se actualiza cuando cambia la lista

**Ejemplo de uso:**
```typescript
// Agregar producto
const add = (product: Product) => {
    setItems(current => [...current, { ...product, quantity: 1 }]);
};

// Eliminar producto
const remove = (id: string) => {
    setItems(current => current.filter(item => item.id !== id));
};
```

**Flujo:**
1. Usuario agrega un producto al carrito
2. `setItems` agrega el producto al array
3. El componente se re-renderiza
4. El carrito muestra el nuevo producto

---

### 7. **🎨 Manejar Estados Visuales (UI)**

**Ubicación:** `src/pages/ProductDetail/ProductDetail.tsx`, `src/components/Cart/Cart.tsx`

```typescript
// ProductDetail.tsx
const [isLoading, setIsLoading] = useState<boolean>(true);
const [showAddedAlert, setShowAddedAlert] = useState<boolean>(false);
```

**¿Para qué sirve?**
- ✅ Controla qué se muestra en pantalla (spinners, alertas, mensajes)
- ✅ Permite mostrar/ocultar elementos
- ✅ Mejora la experiencia del usuario

**Ejemplo de uso:**
```typescript
// Mostrar spinner mientras carga
{isLoading && <Spinner />}

// Mostrar alerta de éxito
{showAddedAlert && <Alert>¡Producto agregado!</Alert>}
```

**Flujo:**
1. Página carga → `isLoading = true` → muestra spinner
2. Datos cargan → `setIsLoading(false)` → muestra contenido
3. Usuario agrega producto → `setShowAddedAlert(true)` → muestra alerta
4. Después de 3 segundos → `setShowAddedAlert(false)` → oculta alerta

---

### 8. **🗂️ Manejar Estado de Componentes Complejos**

**Ubicación:** `src/pages/Admin/Admin.tsx`

```typescript
// Admin.tsx - Controlar qué modales están abiertos
const [modals, setModals] = useState({ 
    newGame: false, 
    gamesList: false, 
    usersList: false 
});
```

**¿Para qué sirve?**
- ✅ Controla múltiples estados relacionados
- ✅ Permite manejar varios modales/dialogs
- ✅ Organiza el estado de forma estructurada

**Ejemplo de uso:**
```typescript
// Abrir modal de nuevo juego
setModals({ ...modals, newGame: true });

// Cerrar modal de nuevo juego
setModals({ ...modals, newGame: false });

// Mostrar modal
<Modal show={modals.newGame}>
    {/* Contenido */}
</Modal>
```

**Flujo:**
1. Admin hace clic en "Nuevo Juego"
2. `setModals` actualiza solo `newGame: true`
3. Solo el modal de nuevo juego se abre
4. Los otros modales permanecen cerrados

---

## 📊 Resumen de Casos de Uso

| Caso de Uso | Ejemplo | Archivo |
|------------|---------|---------|
| **Formularios** | `form`, `formData` | Login.tsx, Register.tsx, Admin.tsx |
| **Errores** | `error`, `formError` | Login.tsx, Register.tsx, Admin.tsx |
| **Loading** | `loading`, `isLoading` | Login.tsx, ProductDetail.tsx |
| **Modales** | `isCartOpen`, `modals` | Header.tsx, Admin.tsx |
| **Búsquedas** | `searchQuery`, `searchTerm` | QuickSearch.tsx, SearchBar.tsx |
| **Listas** | `items`, `library`, `users` | CartContext.tsx, Library.tsx |
| **UI/Alertas** | `showAddedAlert`, `showAuthAlert` | ProductDetail.tsx, Cart.tsx |
| **Filtros** | `activeCategory`, `filters` | Blogs.tsx, SearchBar.tsx |

---

## 🎯 ¿Por qué usar useState?

### ✅ Ventajas:

1. **Reactividad**: Cuando el estado cambia, React automáticamente re-renderiza el componente
2. **Simplicidad**: Es fácil de entender y usar
3. **Local**: Cada componente tiene su propio estado
4. **Performance**: React solo actualiza lo que cambió

### 📝 Ejemplo Completo:

```typescript
// 1. Declarar el estado
const [count, setCount] = useState(0);

// 2. Mostrar el estado
<p>Contador: {count}</p>

// 3. Actualizar el estado
<Button onClick={() => setCount(count + 1)}>
    Incrementar
</Button>

// Cuando el usuario hace clic:
// 1. setCount(1) actualiza el estado
// 2. React detecta el cambio
// 3. Re-renderiza el componente
// 4. El usuario ve "Contador: 1"
```

---

## 🔄 Flujo General de useState

```
1. Usuario realiza una acción (click, escribir, etc.)
   ↓
2. Se ejecuta una función que llama a setState
   ↓
3. React actualiza el estado
   ↓
4. React detecta que el estado cambió
   ↓
5. React re-renderiza el componente
   ↓
6. El usuario ve la actualización en pantalla
```

---

## 💡 Reglas Importantes

1. **No mutar directamente**: `count = 5` ❌ → `setCount(5)` ✅
2. **Usar función para actualizaciones basadas en estado anterior**: 
   ```typescript
   setCount(prev => prev + 1)  // ✅ Correcto
   setCount(count + 1)  // ✅ También correcto, pero puede tener problemas
   ```
3. **Estado local vs Context**: 
   - `useState` → Estado local del componente
   - `Context` → Estado global compartido

---

## 🎓 Conclusión

**useState se usa para:**
- 📝 Almacenar valores que cambian (formularios, búsquedas)
- 🎨 Controlar qué se muestra (modales, alertas, spinners)
- 📦 Manejar listas de datos (carrito, biblioteca, productos)
- ⏳ Gestionar estados de carga y errores
- 🔍 Manejar filtros y búsquedas

**Sin useState, los componentes serían estáticos y no podrían cambiar lo que muestran al usuario.**





