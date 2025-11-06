# 🛠️ ¿Qué son los Helpers?

## 📚 Definición

**Helpers** (o funciones auxiliares/utilitarias) son **funciones reutilizables** que realizan tareas específicas y comunes en diferentes partes de la aplicación. Son como "herramientas" que ayudan a simplificar el código y evitar repetir la misma lógica.

---

## 🎯 ¿Para qué sirven?

1. **Reutilización**: Evitar escribir el mismo código varias veces
2. **Organización**: Mantener el código limpio y organizado
3. **Mantenibilidad**: Si necesitas cambiar algo, solo lo cambias en un lugar
4. **Legibilidad**: El código es más fácil de entender
5. **Testing**: Es más fácil probar funciones pequeñas y específicas

---

## 📁 Helpers en el Proyecto Steamish

### 1. **Helpers Globales** (Archivo: `src/utils/helpers.ts`)

Estos helpers están en un archivo separado y pueden usarse en cualquier parte del proyecto:

```typescript
// src/utils/helpers.ts
export const formatCurrency = (amount: number) => `$${amount.toFixed(2)}`;
export const calculateTotal = (items: { price: number; quantity: number }[]) => 
    items.reduce((total, item) => total + item.price * item.quantity, 0);
export const isEmpty = (obj: object) => Object.keys(obj).length === 0;
```

**Ejemplos de uso:**

#### `formatCurrency` - Formatear moneda
```typescript
formatCurrency(59.99)  // → "$59.99"
formatCurrency(100)    // → "$100.00"
```

#### `calculateTotal` - Calcular total
```typescript
const items = [
    { price: 10, quantity: 2 },
    { price: 5, quantity: 3 }
];
calculateTotal(items)  // → 35 (10*2 + 5*3)
```

#### `isEmpty` - Verificar si un objeto está vacío
```typescript
isEmpty({})           // → true
isEmpty({ name: 'test' })  // → false
```

---

### 2. **Helpers Locales** (Dentro de componentes)

Estos helpers están dentro de componentes específicos y se usan solo en ese componente:

#### **Ejemplo 1: `getCategoryColor`** (en varios componentes)

**Ubicación:** `src/pages/ProductDetail/ProductDetail.tsx`

```typescript
const getCategoryColor = (category: string): string => {
    const colors: Record<string, string> = {
        'Acción': 'danger',
        'Aventura': 'success',
        'Simulación': 'info',
        'Carreras': 'warning',
        'Estrategia': 'primary',
        'RPG': 'secondary',
        'Deportes': 'warning',
        'Battle Royale': 'danger',
        'MOBA': 'primary'
    };
    return colors[category] || 'dark';
};
```

**¿Para qué sirve?**
- ✅ Recibe una categoría (ej: "Acción")
- ✅ Devuelve el color correspondiente (ej: "danger")
- ✅ Se usa para mostrar badges con colores diferentes

**Uso:**
```typescript
<Badge bg={getCategoryColor(product.category)}>
    {product.category}
</Badge>
```

---

#### **Ejemplo 2: `renderStars`** (en ProductDetail)

**Ubicación:** `src/pages/ProductDetail/ProductDetail.tsx`

```typescript
const renderStars = (rating: number): JSX.Element[] => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
        stars.push(
            <i key={i} className="bi bi-star-fill text-warning fs-5"></i>
        );
    }

    if (hasHalfStar) {
        stars.push(
            <i key="half" className="bi bi-star-half text-warning fs-5"></i>
        );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        stars.push(
            <i key={`empty-${i}`} className="bi bi-star text-muted fs-5"></i>
        );
    }

    return stars;
};
```

**¿Para qué sirve?**
- ✅ Recibe un rating (ej: 4.5)
- ✅ Devuelve un array de iconos de estrellas
- ✅ Muestra estrellas llenas, medias y vacías

**Uso:**
```typescript
{renderStars(product.rating)}  // Muestra ⭐⭐⭐⭐½
```

---

#### **Ejemplo 3: `getCategoryVariant`** (en Blogs)

**Ubicación:** `src/pages/Blogs/Blogs.tsx`

```typescript
const getCategoryVariant = (category: string) => ({
    'Novedades': 'primary', 
    'Tutoriales': 'info', 
    'Tecnología': 'success',
    'Reviews': 'warning', 
    'eSports': 'danger', 
    'Arte': 'secondary'
}[category] || 'secondary');
```

**¿Para qué sirve?**
- ✅ Recibe una categoría de blog
- ✅ Devuelve la variante de color para Bootstrap
- ✅ Similar a `getCategoryColor` pero para blogs

---

#### **Ejemplo 4: `createLink` y `createSocial`** (en Footer)

**Ubicación:** `src/components/Footer/Footer.tsx`

```typescript
const createLink = (to: string, label: string) => ({ to, label });
const createSocial = (href: string, icon: string) => ({ href, icon });
```

**¿Para qué sirven?**
- ✅ Simplifican la creación de objetos
- ✅ Hacen el código más legible
- ✅ Evitan repetir la estructura del objeto

**Uso:**
```typescript
const navLinks = [
    createLink('/productos', 'Productos'),
    createLink('/blogs', 'Blog'),
    createLink('/nosotros', 'Nosotros'),
];
```

---

## 📊 Comparación: Con y Sin Helpers

### ❌ Sin Helper (Código repetido):

```typescript
// En ProductDetail.tsx
const categoryColor1 = product.category === 'Acción' ? 'danger' : 
                       product.category === 'Aventura' ? 'success' : 'info';

// En Library.tsx
const categoryColor2 = game.category === 'Acción' ? 'danger' : 
                       game.category === 'Aventura' ? 'success' : 'info';

// En GameResults.tsx
const categoryColor3 = product.category === 'Acción' ? 'danger' : 
                       product.category === 'Aventura' ? 'success' : 'info';
```

**Problema:** Código repetido 3 veces, si cambias algo tienes que cambiarlo en 3 lugares.

---

### ✅ Con Helper (Código reutilizable):

```typescript
// En helpers.ts (o en un componente compartido)
const getCategoryColor = (category: string): string => {
    const colors: Record<string, string> = {
        'Acción': 'danger',
        'Aventura': 'success',
        // ...
    };
    return colors[category] || 'dark';
};

// Uso en cualquier componente
<Badge bg={getCategoryColor(product.category)}>
```

**Ventaja:** Una sola función, si cambias algo solo lo cambias en un lugar.

---

## 🎯 Tipos de Helpers

### 1. **Helpers de Formato**
- `formatCurrency`: Formatea números como moneda
- `formatDate`: Formatea fechas
- `formatPhone`: Formatea números de teléfono

### 2. **Helpers de Validación**
- `isEmpty`: Verifica si un objeto está vacío
- `isEmail`: Valida formato de email
- `isValidPassword`: Valida contraseña

### 3. **Helpers de Transformación**
- `getCategoryColor`: Obtiene color de categoría
- `renderStars`: Renderiza estrellas
- `calculateTotal`: Calcula totales

### 4. **Helpers de Creación**
- `createLink`: Crea objetos de enlace
- `createSocial`: Crea objetos de redes sociales

---

## 📝 Cuándo Crear un Helper

### ✅ SÍ crear un helper cuando:
1. **Código repetido**: La misma lógica aparece en 2+ lugares
2. **Lógica compleja**: Una función que hace algo complicado
3. **Reutilizable**: Puede usarse en diferentes componentes
4. **Testeable**: Es fácil de probar de forma independiente

### ❌ NO crear un helper cuando:
1. **Código único**: Solo se usa en un lugar
2. **Lógica simple**: Una línea de código simple
3. **Específico del componente**: Solo tiene sentido en ese componente

---

## 🔧 Ejemplo de Refactorización: Crear un Helper

### Antes (Código repetido):

```typescript
// En ProductDetail.tsx
const categoryColor = product.category === 'Acción' ? 'danger' : 
                     product.category === 'Aventura' ? 'success' : 'info';

// En Library.tsx  
const categoryColor = game.category === 'Acción' ? 'danger' : 
                     game.category === 'Aventura' ? 'success' : 'info';
```

### Después (Con helper):

```typescript
// En utils/helpers.ts
export const getCategoryColor = (category: string): string => {
    const colors: Record<string, string> = {
        'Acción': 'danger',
        'Aventura': 'success',
        'Simulación': 'info',
        'Carreras': 'warning',
        'Estrategia': 'primary',
        'RPG': 'secondary',
        'Deportes': 'warning',
        'Battle Royale': 'danger',
        'MOBA': 'primary'
    };
    return colors[category] || 'dark';
};

// En cualquier componente
import { getCategoryColor } from '../../utils/helpers';
<Badge bg={getCategoryColor(product.category)}>
```

---

## 📚 Resumen

| Característica | Descripción |
|---------------|-------------|
| **Qué son** | Funciones reutilizables que realizan tareas comunes |
| **Dónde están** | En `utils/helpers.ts` (globales) o dentro de componentes (locales) |
| **Para qué** | Evitar código repetido, organizar código, facilitar mantenimiento |
| **Ejemplos** | `formatCurrency`, `getCategoryColor`, `renderStars`, `calculateTotal` |

---

## ✅ Ventajas de Usar Helpers

1. **DRY (Don't Repeat Yourself)**: No repites código
2. **Mantenibilidad**: Cambios en un solo lugar
3. **Legibilidad**: Código más fácil de entender
4. **Testabilidad**: Fácil de probar
5. **Organización**: Código más estructurado

---

## 🎓 Conclusión

Los **helpers** son funciones pequeñas y específicas que ayudan a:
- ✅ Simplificar el código
- ✅ Evitar repetición
- ✅ Mejorar la organización
- ✅ Facilitar el mantenimiento

**Son como "herramientas" que puedes usar una y otra vez en diferentes partes de tu aplicación.**





