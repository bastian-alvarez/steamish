# 💾 Uso de localStorage en el Proyecto

## ✅ SÍ, usamos localStorage

El proyecto usa `localStorage` para **persistir datos** en el navegador del usuario. Esto permite que los datos se mantengan incluso después de cerrar el navegador.

---

## 📍 ¿Dónde se usa localStorage?

### 1. **AuthService** - Autenticación y Usuarios
**Ubicación:** `src/services/authService.ts`

### 2. **LibraryService** - Bibliotecas de Juegos
**Ubicación:** `src/services/libraryService.ts`

### 3. **ProductService** - Productos Personalizados
**Ubicación:** `src/services/productService.ts`

---

## 🔐 1. AuthService - localStorage

### Claves usadas:
- `'steamish_user'` - Usuario actual logueado
- `'steamish_users'` - Lista de todos los usuarios registrados

### Ejemplos de uso:

#### Guardar usuario actual (Login):
```typescript
// Guardar usuario actual
localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
```

**Línea 43:** Después de login exitoso, guarda el usuario en `'steamish_user'`

#### Obtener usuario actual:
```typescript
// Obtener usuario actual del localStorage
getCurrentUser(): User | null {
    const userJson = localStorage.getItem(this.STORAGE_KEY);
    if (!userJson) return null;
    
    try {
        const user = JSON.parse(userJson);
        return {
            ...user,
            createdAt: new Date(user.createdAt),
            updatedAt: new Date(user.updatedAt)
        };
    } catch {
        return null;
    }
}
```

**Línea 9:** Lee el usuario del localStorage para mantener la sesión activa

#### Guardar usuarios registrados:
```typescript
// Guardar nuevo usuario
users.push(newUser);
localStorage.setItem('steamish_users', JSON.stringify(users));
```

**Línea 79:** Guarda todos los usuarios en `'steamish_users'`

#### Eliminar usuario (Logout):
```typescript
// Logout
async logout(): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 200));
    localStorage.removeItem(this.STORAGE_KEY);
}
```

**Línea 90:** Elimina el usuario actual del localStorage al hacer logout

#### Usuarios por defecto:
```typescript
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
    // ... más usuarios
];
localStorage.setItem('steamish_users', JSON.stringify(defaultUsers));
```

**Línea 153:** Crea usuarios por defecto si no existen

---

## 📚 2. LibraryService - localStorage

### Clave usada:
- `'steamish_library_{userId}'` - Biblioteca de juegos de cada usuario

### Ejemplos de uso:

#### Obtener biblioteca de un usuario:
```typescript
getLibrary(userId: string): Product[] {
    const libraryJson = localStorage.getItem(`${this.STORAGE_KEY}_${userId}`);
    if (!libraryJson) return [];
    
    try {
        return JSON.parse(libraryJson);
    } catch {
        return [];
    }
}
```

**Línea 9:** Lee la biblioteca del usuario desde localStorage

#### Agregar juego a la biblioteca:
```typescript
addToLibrary(userId: string, product: Product): void {
    const library = this.getLibrary(userId);
    const exists = library.some(item => item.id === product.id);
    
    if (!exists) {
        library.push(product);
        localStorage.setItem(`${this.STORAGE_KEY}_${userId}`, JSON.stringify(library));
    }
}
```

**Línea 26:** Guarda el juego en la biblioteca del usuario

#### Agregar múltiples juegos (Compra):
```typescript
addMultipleToLibrary(userId: string, products: Product[]): void {
    const library = this.getLibrary(userId);
    products.forEach(product => {
        const exists = library.some(item => item.id === product.id);
        if (!exists) {
            library.push(product);
        }
    });
    localStorage.setItem(`${this.STORAGE_KEY}_${userId}`, JSON.stringify(library));
}
```

**Línea 39:** Guarda múltiples juegos después de una compra

---

## 🎮 3. ProductService - localStorage

### Claves usadas:
- `'steamish_custom_products'` - Productos agregados por el admin
- `'steamish_deleted_games'` - IDs de juegos eliminados

### Ejemplos de uso:

#### Obtener productos personalizados:
```typescript
const customJson = localStorage.getItem(STORAGE_KEY);
```

**Línea 241:** Lee productos agregados por el admin

#### Guardar productos personalizados:
```typescript
localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
```

**Línea 263:** Guarda productos agregados por el admin

#### Guardar juegos eliminados:
```typescript
localStorage.setItem(DELETED_GAMES_KEY, JSON.stringify(ids));
```

**Línea 268:** Guarda IDs de juegos eliminados para no mostrarlos

---

## 📊 Resumen de Claves de localStorage

| Clave | ¿Qué guarda? | Servicio |
|-------|--------------|----------|
| `'steamish_user'` | Usuario actual logueado | AuthService |
| `'steamish_users'` | Todos los usuarios registrados | AuthService |
| `'steamish_library_{userId}'` | Biblioteca de juegos del usuario | LibraryService |
| `'steamish_custom_products'` | Productos agregados por admin | ProductService |
| `'steamish_deleted_games'` | IDs de juegos eliminados | ProductService |

---

## 🎯 ¿Para qué se usa localStorage?

### 1. **Persistir Sesión de Usuario**
- ✅ Mantener al usuario logueado después de cerrar el navegador
- ✅ No necesita volver a iniciar sesión cada vez

### 2. **Guardar Usuarios Registrados**
- ✅ Almacenar todos los usuarios del sistema
- ✅ Simular una base de datos

### 3. **Guardar Bibliotecas de Juegos**
- ✅ Cada usuario tiene su propia biblioteca
- ✅ Los juegos comprados se guardan permanentemente

### 4. **Guardar Productos Personalizados**
- ✅ Productos agregados por el admin se guardan
- ✅ Persisten después de recargar la página

### 5. **Guardar Juegos Eliminados**
- ✅ Recordar qué juegos fueron eliminados
- ✅ No mostrarlos en el catálogo

---

## 💻 Métodos de localStorage Usados

### 1. **setItem** - Guardar datos
```typescript
localStorage.setItem('clave', JSON.stringify(datos));
```

### 2. **getItem** - Leer datos
```typescript
const datos = localStorage.getItem('clave');
const objeto = JSON.parse(datos);
```

### 3. **removeItem** - Eliminar datos
```typescript
localStorage.removeItem('clave');
```

---

## 🔍 Ejemplos Reales del Código

### Ejemplo 1: Guardar usuario después de login
```typescript
// authService.ts - Línea 43
localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
```

### Ejemplo 2: Leer usuario al cargar la app
```typescript
// authService.ts - Línea 9
const userJson = localStorage.getItem(this.STORAGE_KEY);
```

### Ejemplo 3: Guardar biblioteca después de compra
```typescript
// libraryService.ts - Línea 39
localStorage.setItem(`${this.STORAGE_KEY}_${userId}`, JSON.stringify(library));
```

### Ejemplo 4: Eliminar sesión al hacer logout
```typescript
// authService.ts - Línea 90
localStorage.removeItem(this.STORAGE_KEY);
```

---

## ⚠️ Limitaciones de localStorage

1. **Solo strings**: Debe convertir objetos a JSON
2. **Límite de tamaño**: ~5-10MB dependiendo del navegador
3. **Solo en el navegador**: No se sincroniza entre dispositivos
4. **No es seguro**: No guardar información sensible sin encriptar

---

## ✅ Ventajas de usar localStorage

1. **Persistencia**: Los datos se mantienen después de cerrar el navegador
2. **Rápido**: Acceso inmediato sin necesidad de servidor
3. **Simple**: Fácil de usar (setItem, getItem, removeItem)
4. **Simula backend**: Perfecto para prototipos y proyectos sin backend

---

## 🎓 Conclusión

**SÍ, el proyecto usa localStorage extensivamente para:**

1. ✅ **Autenticación**: Guardar sesión de usuario
2. ✅ **Usuarios**: Almacenar todos los usuarios registrados
3. ✅ **Bibliotecas**: Guardar juegos comprados por usuario
4. ✅ **Productos**: Guardar productos agregados por admin
5. ✅ **Eliminados**: Recordar juegos eliminados

**localStorage actúa como una "base de datos" local en el navegador, permitiendo que la aplicación funcione sin un backend real.**





