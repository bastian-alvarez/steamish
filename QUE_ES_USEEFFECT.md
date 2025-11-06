# ⚡ ¿Qué es useEffect?

## 📚 Definición

`useEffect` es un **Hook de React** que permite ejecutar código **después de que el componente se renderiza** o cuando ciertas dependencias cambian. Es como un "efecto secundario" que ocurre después del render.

---

## 🎯 ¿Para qué sirve?

1. **Cargar datos** cuando el componente se monta
2. **Actualizar el DOM** después del render
3. **Suscribirse a eventos** o servicios
4. **Limpiar recursos** cuando el componente se desmonta
5. **Reaccionar a cambios** en props o estado

---

## 📝 Sintaxis

```typescript
useEffect(() => {
    // Código que se ejecuta
    // (efecto secundario)
    
    return () => {
        // Función de limpieza (opcional)
        // Se ejecuta cuando el componente se desmonta
        // o antes de que el efecto se ejecute de nuevo
    };
}, [dependencias]);  // Array de dependencias
```

**Parámetros:**
1. **Función**: El código que se ejecuta
2. **Dependencias**: Array de valores que, si cambian, vuelven a ejecutar el efecto

---

## 🔍 Tipos de useEffect

### 1. **Sin dependencias `[]`** - Se ejecuta UNA VEZ al montar

```typescript
useEffect(() => {
    // Se ejecuta solo cuando el componente se monta
}, []);  // ← Array vacío
```

### 2. **Con dependencias `[deps]`** - Se ejecuta cuando cambian las dependencias

```typescript
useEffect(() => {
    // Se ejecuta cuando 'value' cambia
}, [value]);  // ← Dependencias
```

### 3. **Sin array** - Se ejecuta en CADA render (⚠️ Cuidado)

```typescript
useEffect(() => {
    // Se ejecuta en cada render (puede causar loops infinitos)
});  // ← Sin array de dependencias
```

---

## 💻 Ejemplos Reales del Proyecto

### Ejemplo 1: Cargar datos al montar (AuthContext)

**Ubicación:** `src/context/AuthContext.tsx`

```typescript
// Cargar usuario al montar
useEffect(() => {
    loadCurrentUser();
}, []);  // ← Array vacío = solo al montar
```

**¿Para qué sirve?**
- ✅ Se ejecuta UNA VEZ cuando el componente se monta
- ✅ Carga el usuario actual del localStorage
- ✅ Verifica si hay una sesión activa

**Flujo:**
1. Componente se monta
2. `useEffect` se ejecuta
3. Llama a `loadCurrentUser()`
4. Carga el usuario del localStorage

---

### Ejemplo 2: Cargar productos al montar (ProductContext)

**Ubicación:** `src/context/ProductContext.tsx`

```typescript
// Cargar productos al montar
useEffect(() => {
    loadProducts();
}, []);  // ← Solo al montar
```

**¿Para qué sirve?**
- ✅ Carga todos los productos cuando el contexto se inicializa
- ✅ Se ejecuta una sola vez al montar
- ✅ Prepara los datos para toda la aplicación

---

### Ejemplo 3: Detectar cambios en la URL (Products)

**Ubicación:** `src/pages/Products/Products.tsx`

```typescript
// URL search params detection
useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchParam = urlParams.get('search');
    if (searchParam) setInitialSearchTerm(searchParam);
}, [location.search]);  // ← Se ejecuta cuando location.search cambia
```

**¿Para qué sirve?**
- ✅ Detecta parámetros de búsqueda en la URL (`?search=mario`)
- ✅ Se ejecuta cuando `location.search` cambia
- ✅ Actualiza el término de búsqueda inicial

**Flujo:**
1. Usuario navega a `/productos?search=mario`
2. `location.search` cambia
3. `useEffect` se ejecuta
4. Lee el parámetro `search` de la URL
5. Actualiza `initialSearchTerm` con "mario"

---

### Ejemplo 4: Inicializar resultados de búsqueda (Products)

**Ubicación:** `src/pages/Products/Products.tsx`

```typescript
// Inicializar con todos los productos al cargar
useEffect(() => {
    if (products.length > 0 && searchResult.products.length === 0 && !initialSearchTerm) {
        setSearchResult({
            products: products,
            totalCount: products.length,
            filteredCount: products.length,
            searchTerm: ''
        });
    }
}, [products, searchResult.products.length, initialSearchTerm]);
```

**¿Para qué sirve?**
- ✅ Inicializa los resultados de búsqueda con todos los productos
- ✅ Se ejecuta cuando `products`, `searchResult.products.length` o `initialSearchTerm` cambian
- ✅ Solo si no hay resultados y no hay término de búsqueda inicial

---

### Ejemplo 5: Verificar si el juego está en la biblioteca (ProductDetail)

**Ubicación:** `src/pages/ProductDetail/ProductDetail.tsx`

```typescript
// Verificar si el juego ya está en la biblioteca
useEffect(() => {
    if (user && product) {
        const owned = libraryService.isInLibrary(user.id, product.id);
        setIsOwned(owned);
    }
}, [user, product]);  // ← Se ejecuta cuando user o product cambian
```

**¿Para qué sirve?**
- ✅ Verifica si el usuario ya tiene el juego en su biblioteca
- ✅ Se ejecuta cuando `user` o `product` cambian
- ✅ Actualiza el estado `isOwned` (si el juego es propiedad del usuario)

**Flujo:**
1. Usuario ve el detalle de un producto
2. Si hay `user` y `product`, verifica en la biblioteca
3. Actualiza `isOwned` (true/false)
4. Muestra "Ya en tu Biblioteca" si es true

---

### Ejemplo 6: Loader de carga (ProductDetail)

**Ubicación:** `src/pages/ProductDetail/ProductDetail.tsx`

```typescript
// Loader de carga por 1 segundo
useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
        setIsLoading(false);
    }, 1000); // 1 segundo

    return () => clearTimeout(timer);  // ← Función de limpieza
}, [id]);  // ← Se ejecuta cuando el id cambia
```

**¿Para qué sirve?**
- ✅ Muestra un spinner de carga por 1 segundo
- ✅ Se ejecuta cuando el `id` del producto cambia
- ✅ Limpia el timer cuando el componente se desmonta o el `id` cambia

**Función de limpieza:**
- `return () => clearTimeout(timer)` evita memory leaks
- Se ejecuta antes de que el efecto se ejecute de nuevo
- Cancela el timer si el componente se desmonta antes de que termine

---

### Ejemplo 7: Cargar biblioteca del usuario (Library)

**Ubicación:** `src/pages/Library/Library.tsx`

```typescript
useEffect(() => {
    if (!isAuthenticated || !user) {
        navigate('/login');
        return;
    }

    const userLibrary = libraryService.getLibrary(user.id);
    setLibrary(userLibrary);
}, [user, isAuthenticated, navigate]);
```

**¿Para qué sirve?**
- ✅ Verifica si el usuario está autenticado
- ✅ Si no está autenticado, redirige al login
- ✅ Si está autenticado, carga su biblioteca de juegos
- ✅ Se ejecuta cuando `user`, `isAuthenticated` o `navigate` cambian

**Flujo:**
1. Usuario accede a `/biblioteca`
2. `useEffect` verifica autenticación
3. Si no está autenticado → redirige a `/login`
4. Si está autenticado → carga la biblioteca del usuario

---

### Ejemplo 8: Notificar cambios de búsqueda (SearchBar)

**Ubicación:** `src/components/SearchBar/SearchBar.tsx`

```typescript
// Efecto para notificar cambios
useEffect(() => {
    onSearchResult(searchResult);
}, [searchResult, onSearchResult]);
```

**¿Para qué sirve?**
- ✅ Notifica al componente padre cuando los resultados de búsqueda cambian
- ✅ Se ejecuta cuando `searchResult` o `onSearchResult` cambian
- ✅ Permite que el padre reaccione a los cambios de búsqueda

---

## 🎯 Casos de Uso Comunes

### 1. **Cargar datos al montar**
```typescript
useEffect(() => {
    fetchData();
}, []);  // Solo al montar
```

### 2. **Reaccionar a cambios de props/estado**
```typescript
useEffect(() => {
    // Hacer algo cuando 'value' cambia
}, [value]);  // Cuando value cambia
```

### 3. **Limpiar recursos (timers, suscripciones)**
```typescript
useEffect(() => {
    const timer = setTimeout(() => {
        // ...
    }, 1000);
    
    return () => clearTimeout(timer);  // Limpiar
}, []);
```

### 4. **Suscribirse y desuscribirse**
```typescript
useEffect(() => {
    const subscription = subscribe();
    
    return () => {
        subscription.unsubscribe();  // Desuscribirse
    };
}, []);
```

---

## ⚠️ Errores Comunes

### 1. **Loop infinito (sin dependencias)**
```typescript
// ❌ MAL - Se ejecuta en cada render
useEffect(() => {
    setCount(count + 1);  // Causa loop infinito
});
```

### 2. **Faltan dependencias**
```typescript
// ❌ MAL - Falta 'count' en dependencias
useEffect(() => {
    console.log(count);
}, []);  // Debería ser [count]
```

### 3. **Dependencias innecesarias**
```typescript
// ❌ MAL - 'setState' no necesita estar en dependencias
useEffect(() => {
    setCount(5);
}, [setCount]);  // setState es estable, no necesita estar
```

---

## ✅ Buenas Prácticas

### 1. **Siempre incluir dependencias correctas**
```typescript
// ✅ BIEN
useEffect(() => {
    // usa 'value'
}, [value]);  // Incluye 'value'
```

### 2. **Limpiar recursos**
```typescript
// ✅ BIEN
useEffect(() => {
    const timer = setTimeout(() => {}, 1000);
    return () => clearTimeout(timer);
}, []);
```

### 3. **Usar función de actualización para setState**
```typescript
// ✅ BIEN - No necesita 'count' en dependencias
useEffect(() => {
    setCount(prev => prev + 1);
}, []);
```

---

## 📊 Resumen de Ejemplos en el Proyecto

| Archivo | useEffect | ¿Para qué? |
|---------|-----------|------------|
| **AuthContext.tsx** | `[]` | Cargar usuario al montar |
| **ProductContext.tsx** | `[]` | Cargar productos al montar |
| **Products.tsx** | `[location.search]` | Detectar parámetros URL |
| **Products.tsx** | `[products, ...]` | Inicializar resultados |
| **ProductDetail.tsx** | `[user, product]` | Verificar biblioteca |
| **ProductDetail.tsx** | `[id]` | Loader de carga |
| **Library.tsx** | `[user, isAuthenticated]` | Cargar biblioteca |
| **SearchBar.tsx** | `[searchResult]` | Notificar cambios |

---

## 🎓 Conclusión

**useEffect** es un Hook que permite:
- ✅ Ejecutar código después del render
- ✅ Cargar datos al montar
- ✅ Reaccionar a cambios
- ✅ Limpiar recursos

**En el proyecto Steamish se usa para:**
- Cargar datos (usuarios, productos)
- Detectar cambios en la URL
- Verificar estado (biblioteca, autenticación)
- Mostrar loaders
- Notificar cambios a componentes padres

**Es uno de los Hooks más importantes de React para manejar efectos secundarios.**





