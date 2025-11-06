# 📍 Ubicación de useState en la Refactorización

## 🆕 useState que YO agregué durante la refactorización:

### 1. **QuickSearch.tsx** (Componente nuevo creado)

**Ubicación:** `src/components/Header/QuickSearch.tsx`

**Línea 8:**
```typescript
const [searchQuery, setSearchQuery] = useState<string>('');
```

**¿Para qué sirve?**
- ✅ Almacena el texto que el usuario escribe en la barra de búsqueda
- ✅ Se actualiza cada vez que el usuario escribe (línea 33)
- ✅ Se limpia después de realizar la búsqueda (línea 14)

**Flujo:**
1. Usuario escribe → `setSearchQuery` actualiza el estado
2. Usuario presiona Enter o botón → `handleQuickSearch` usa el valor
3. Se navega a `/productos?search=...` con el query
4. Se limpia el campo con `setSearchQuery('')`

---

### 2. **Header.tsx** (Ya existía, pero lo mantuve)

**Ubicación:** `src/components/Header/Header.tsx`

**Línea 20:**
```typescript
const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
```

**¿Para qué sirve?**
- ✅ Controla si el modal del carrito está abierto o cerrado
- ✅ Se actualiza cuando el usuario hace clic en el botón del carrito (línea 87)
- ✅ Se pasa como prop al componente `Cart` (línea 94)

**Nota:** Este useState ya existía en el código original, pero lo mantuve durante la refactorización porque es necesario para el funcionamiento.

---

## 📊 Resumen de useState en componentes refactorizados:

| Componente | useState Agregado | Propósito |
|-----------|-------------------|-----------|
| **QuickSearch** | `searchQuery` | Almacenar texto de búsqueda |
| **Header** | `isCartOpen` | Controlar estado del modal del carrito (ya existía) |

---

## 🔍 Otros useState que NO agregué (ya existían):

### Componentes que ya tenían useState antes de la refactorización:

1. **Login.tsx** - `form`, `error`, `loading`
2. **Register.tsx** - `form`, `error`, `loading`
3. **Admin.tsx** - `modals`, `users`, `formError`, `formData`
4. **Cart.tsx** - `showAuthAlert`, `isProcessing`
5. **ProductDetail.tsx** - `isLoading`, `showAddedAlert`, `showAuthAlert`, `isOwned`
6. **Home.tsx** - `showAuthToast`
7. **Products.tsx** - `searchResult`, `initialSearchTerm`, `showAuthToast`
8. **Library.tsx** - `library`
9. **Contact.tsx** - `form`, `success`
10. **Blogs.tsx** - `activeCategory`, `searchTerm`

### Contextos que ya tenían useState:

1. **AuthContext.tsx** - `user`, `loading`, `error`
2. **CartContext.tsx** - `items`
3. **ProductContext.tsx** - `products`, `loading`, `error`
4. **NotificationToast.tsx** - `notifications` (toasts)

---

## ✅ Componentes nuevos creados SIN useState:

Durante la refactorización, creé estos componentes que **NO usan useState** porque son componentes presentacionales (reciben todo como props):

1. **UserDropdown.tsx** - No tiene useState
2. **CartButton.tsx** - No tiene useState
3. **LoginButton.tsx** - No tiene useState
4. **NavigationLinks.tsx** - No tiene useState
5. **AdminStats.tsx** - No tiene useState
6. **QuickActions.tsx** - No tiene useState
7. **NewGameForm.tsx** - No tiene useState (recibe formData como prop)
8. **GamesList.tsx** - No tiene useState (recibe games como prop)
9. **UsersList.tsx** - No tiene useState (recibe users como prop)

Estos componentes siguen el principio de **Single Responsibility** y reciben todo como props, por lo que no necesitan estado local.

---

## 🎯 Resumen:

**Durante la refactorización, agregué:**
- ✅ **1 useState nuevo**: `searchQuery` en `QuickSearch.tsx`
- ✅ **1 useState mantenido**: `isCartOpen` en `Header.tsx` (ya existía)

**Total: 1 useState agregado en la refactorización**

**Principio aplicado:**
- Los componentes extraídos son principalmente **presentacionales** (sin estado)
- Solo `QuickSearch` necesita estado local para manejar el input del usuario
- El resto de la lógica de estado se mantiene en los componentes padre o en los contextos





