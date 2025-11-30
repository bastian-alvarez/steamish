# 🎣 ¿Qué es useCallback?

## 📚 Definición

`useCallback` es un **Hook de React** que **memoriza** (guarda en memoria) una función y solo la recrea cuando sus dependencias cambian. Esto ayuda a optimizar el rendimiento de la aplicación.

---

## 🎯 ¿Para qué sirve?

1. **Evitar re-renderizados innecesarios**: Previene que componentes hijos se re-rendericen cuando no es necesario
2. **Optimización de performance**: Evita crear nuevas funciones en cada render
3. **Estabilidad de referencias**: Mantiene la misma referencia de función entre renders
4. **Optimización de efectos**: Útil para funciones que se pasan como dependencias a `useEffect`

---

## 🔍 ¿Cómo funciona?

### Sin `useCallback` (Problema):

```typescript
// ❌ Problema: Se crea una nueva función en cada render
const Component = () => {
    const handleClick = () => {
        console.log('Clicked');
    };
    
    // Cada vez que el componente se re-renderiza,
    // handleClick es una FUNCIÓN NUEVA diferente
    return <ChildComponent onClick={handleClick} />;
};
```

**Problema:** Cada vez que el componente padre se re-renderiza, `handleClick` es una función nueva, lo que causa que `ChildComponent` también se re-renderice innecesariamente.

---

### Con `useCallback` (Solución):

```typescript
// ✅ Solución: La función se memoriza y solo cambia si las dependencias cambian
const Component = () => {
    const handleClick = useCallback(() => {
        console.log('Clicked');
    }, []);  // Array de dependencias vacío = nunca cambia
    
    // handleClick es la MISMA función en cada render
    return <ChildComponent onClick={handleClick} />;
};
```

**Ventaja:** `handleClick` es la misma función en cada render, evitando re-renderizados innecesarios.

---

## 📝 Sintaxis

```typescript
const memoizedCallback = useCallback(
    () => {
        // Función que quieres memorizar
        doSomething(a, b);
    },
    [a, b]  // Array de dependencias
);
```

**Parámetros:**
1. **Función**: La función que quieres memorizar
2. **Dependencias**: Array de valores que, si cambian, recrean la función

**Regla:** Solo se recrea la función si alguna dependencia cambia.

---

## 💻 Ejemplos Reales del Proyecto

### Ejemplo 1: CartContext - `add` function

**Ubicación:** `src/context/CartContext.tsx`

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
}, []);  // ← Sin dependencias = función nunca cambia
```

**¿Para qué se usa?**
- ✅ Memoriza la función `add` para agregar productos al carrito
- ✅ Como no tiene dependencias `[]`, la función nunca cambia
- ✅ Esto evita que componentes que usan `add` se re-rendericen innecesariamente

**Uso:**
```typescript
const value = {
    add,  // ← Se pasa en el contexto
    remove,
    clear
};
```

---

### Ejemplo 2: CartContext - `remove` function

**Ubicación:** `src/context/CartContext.tsx`

```typescript
const remove = useCallback((productId: string) => {
    setItems(current => current.filter(item => item.id !== productId));
}, []);  // ← Sin dependencias
```

**¿Para qué se usa?**
- ✅ Memoriza la función para remover productos
- ✅ Función estable que no cambia entre renders

---

### Ejemplo 3: CartContext - `updateQuantity` function

**Ubicación:** `src/context/CartContext.tsx`

```typescript
const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
        remove(productId);
        return;
    }
    setItems(current =>
        current.map(item =>
            item.id === productId ? { ...item, quantity } : item
        )
    );
}, [remove]);  // ← Depende de `remove`
```

**¿Para qué se usa?**
- ✅ Memoriza la función para actualizar cantidad
- ✅ Tiene `remove` como dependencia, así que se recrea solo si `remove` cambia
- ✅ Como `remove` está memorizado sin dependencias, nunca cambia, así que `updateQuantity` tampoco cambia

---

### Ejemplo 4: AuthContext - `login` function

**Ubicación:** `src/context/AuthContext.tsx`

```typescript
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
}, []);  // ← Sin dependencias
```

**¿Para qué se usa?**
- ✅ Memoriza la función de login
- ✅ Función estable que se pasa en el contexto
- ✅ Evita re-renderizados innecesarios en componentes que usan `login`

---

### Ejemplo 5: AuthContext - `clearError` function

**Ubicación:** `src/context/AuthContext.tsx`

```typescript
const clearError = useCallback(() => {
    setError(null);
}, []);  // ← Sin dependencias
```

**¿Para qué se usa?**
- ✅ Memoriza la función para limpiar errores
- ✅ Función simple y estable

---

### Ejemplo 6: NotificationToast - `addToast` function

**Ubicación:** `src/components/NotificationToast/NotificationToast.tsx`

```typescript
const addToast = useCallback((message: string, variant: 'success' | 'danger' | 'warning' | 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, variant }]);
    
    // Auto-remover después de 3 segundos
    setTimeout(() => {
        setToasts(prev => prev.filter(toast => toast.id !== id));
    }, 3000);
}, []);  // ← Sin dependencias
```

**¿Para qué se usa?**
- ✅ Memoriza la función para agregar notificaciones
- ✅ Función estable que se usa en múltiples lugares

---

### Ejemplo 7: NotificationToast - `showSuccess` function

**Ubicación:** `src/components/NotificationToast/NotificationToast.tsx`

```typescript
const showSuccess = useCallback((message: string) => {
    addToast(message, 'success');
}, [addToast]);  // ← Depende de `addToast`
```

**¿Para qué se usa?**
- ✅ Memoriza la función para mostrar éxito
- ✅ Depende de `addToast`, pero como `addToast` está memorizado, nunca cambia
- ✅ Esto mantiene `showSuccess` estable también

---

### Ejemplo 8: SearchBar - `updateFilter` function

**Ubicación:** `src/components/SearchBar/SearchBar.tsx`

```typescript
const updateFilter = useCallback((updates: Partial<SearchFilters>) => {
    setFilters(prev => ({ ...prev, ...updates }));
}, []);  // ← Sin dependencias
```

**¿Para qué se usa?**
- ✅ Memoriza la función para actualizar filtros
- ✅ Función estable que se pasa a componentes hijos
- ✅ Evita re-renderizados innecesarios

---

### Ejemplo 9: SearchBar - `clearFilters` function

**Ubicación:** `src/components/SearchBar/SearchBar.tsx`

```typescript
const clearFilters = useCallback(() => {
    setFilters({ 
        query: '', 
        category: '', 
        minRating: 0,
        minPrice: undefined,
        maxPrice: undefined
    });
}, []);  // ← Sin dependencias
```

**¿Para qué se usa?**
- ✅ Memoriza la función para limpiar filtros
- ✅ Función estable

---

## 🎯 Cuándo usar useCallback

### ✅ SÍ usar useCallback cuando:

1. **Funciones pasadas a componentes hijos** (especialmente con `React.memo`)
   ```typescript
   const handleClick = useCallback(() => {
       // ...
   }, []);
   return <ChildComponent onClick={handleClick} />;
   ```

2. **Funciones como dependencias de useEffect**
   ```typescript
   const fetchData = useCallback(() => {
       // ...
   }, [userId]);
   
   useEffect(() => {
       fetchData();
   }, [fetchData]);
   ```

3. **Funciones en Contextos**
   ```typescript
   const value = {
       add: useCallback(() => {...}, []),
       remove: useCallback(() => {...}, [])
   };
   ```

4. **Funciones costosas de crear**

---

### ❌ NO usar useCallback cuando:

1. **Funciones simples que no se pasan a otros componentes**
   ```typescript
   // ❌ No necesario
   const handleClick = useCallback(() => {
       console.log('click');
   }, []);
   ```

2. **Funciones que cambian frecuentemente**
   ```typescript
   // ❌ Se recrea en cada render de todos modos
   const handleChange = useCallback((e) => {
       setValue(e.target.value);
   }, [value]);  // value cambia mucho
   ```

3. **Funciones que solo se usan una vez**

---

## 📊 Comparación: Con y Sin useCallback

### Sin useCallback:

```typescript
const Component = () => {
    const [count, setCount] = useState(0);
    
    // ❌ Nueva función en cada render
    const handleClick = () => {
        setCount(count + 1);
    };
    
    return <ExpensiveChild onClick={handleClick} />;
};
```

**Problema:** Cada vez que `count` cambia, `Component` se re-renderiza, crea una nueva función `handleClick`, y `ExpensiveChild` también se re-renderiza innecesariamente.

---

### Con useCallback:

```typescript
const Component = () => {
    const [count, setCount] = useState(0);
    
    // ✅ Misma función en cada render
    const handleClick = useCallback(() => {
        setCount(prev => prev + 1);  // ← Usa función actualizadora
    }, []);
    
    return <ExpensiveChild onClick={handleClick} />;
};
```

**Ventaja:** `handleClick` es la misma función, `ExpensiveChild` no se re-renderiza innecesariamente.

**Nota:** Usamos `setCount(prev => prev + 1)` para no depender de `count` en las dependencias.

---

## 🔑 Conceptos Clave

### 1. **Array de Dependencias Vacío `[]`**

```typescript
const fn = useCallback(() => {
    // ...
}, []);  // ← Nunca cambia
```

La función nunca cambia porque no tiene dependencias.

---

### 2. **Dependencias de Estado**

```typescript
const [name, setName] = useState('');

const fn = useCallback(() => {
    console.log(name);
}, [name]);  // ← Se recrea cuando `name` cambia
```

La función se recrea solo cuando `name` cambia.

---

### 3. **Dependencias de Funciones**

```typescript
const remove = useCallback(() => {...}, []);
const update = useCallback(() => {
    remove();  // ← Usa remove
}, [remove]);  // ← Depende de remove
```

`update` se recrea solo si `remove` cambia.

---

## 📚 Resumen

| Concepto | Descripción |
|----------|-------------|
| **Qué es** | Hook que memoriza funciones |
| **Para qué** | Evitar re-renderizados innecesarios, optimizar performance |
| **Cuándo usar** | Funciones pasadas a hijos, dependencias de useEffect, Contextos |
| **Sintaxis** | `useCallback(fn, [deps])` |
| **Ejemplos en proyecto** | CartContext, AuthContext, NotificationToast, SearchBar |

---

## ✅ Ventajas de useCallback

1. **Performance**: Evita re-renderizados innecesarios
2. **Estabilidad**: Mantiene referencias de funciones estables
3. **Optimización**: Útil en Contextos y componentes con muchos hijos
4. **Control**: Controlas cuándo se recrea la función

---

## 🎓 Conclusión

**useCallback** es un Hook que memoriza funciones para optimizar el rendimiento. Se usa principalmente cuando:
- ✅ Pasas funciones a componentes hijos
- ✅ Funciones en Contextos
- ✅ Funciones como dependencias de useEffect

**En el proyecto Steamish, se usa principalmente en Contextos (CartContext, AuthContext, NotificationToast) para mantener funciones estables y evitar re-renderizados innecesarios.**





