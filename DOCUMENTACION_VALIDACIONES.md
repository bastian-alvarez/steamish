# 📋 Documentación de Validaciones - Steamish

## 📍 Ubicación de las Validaciones

Las validaciones en el proyecto están implementadas en **3 niveles principales**:

1. **Validaciones del Lado del Cliente (Frontend)** - En componentes React
2. **Validaciones de Servicios** - En `authService.ts`
3. **Validaciones de Rutas** - En `ProtectedRoute.tsx`

---

## 🔐 1. VALIDACIONES DE AUTENTICACIÓN

### 📂 Ubicación: `src/pages/Login/Login.tsx`

#### Validaciones del Formulario de Login:

```typescript
// Validación 1: Campos requeridos
if (!form.email || !form.password) {
    setError('Por favor, completa todos los campos.');
    return;
}
```

**Qué valida:**
- ✅ Verifica que los campos email y password no estén vacíos
- ✅ Muestra mensaje de error si falta algún campo

**Cómo funciona:**
- Antes de enviar el formulario, verifica que ambos campos tengan valor
- Si falta alguno, muestra un mensaje de error y detiene el proceso

---

### 📂 Ubicación: `src/pages/Register/Register.tsx`

#### Validación 1: Coincidencia de Contraseñas

```typescript
if (form.password !== form.confirmPassword) {
    setError('Las contraseñas no coinciden');
    return;
}
```

**Qué valida:**
- ✅ Verifica que la contraseña y la confirmación sean iguales
- ✅ Previene errores de escritura al crear la cuenta

**Cómo funciona:**
- Compara los valores de `password` y `confirmPassword`
- Si no coinciden, muestra error y detiene el registro

#### Validación 2: Longitud Mínima de Contraseña

```typescript
if (form.password.length < 6) {
    setError('La contraseña debe tener al menos 6 caracteres');
    return;
}
```

**Qué valida:**
- ✅ Verifica que la contraseña tenga al menos 6 caracteres
- ✅ Mejora la seguridad de las cuentas

**Cómo funciona:**
- Cuenta los caracteres de la contraseña
- Si tiene menos de 6, muestra error y detiene el registro

#### Validación HTML5 (Campos Requeridos)

```typescript
<Form.Control
    type={type}
    placeholder={placeholder}
    value={form[field]}
    required  // ← Validación HTML5
/>
```

**Qué valida:**
- ✅ Validación nativa del navegador
- ✅ Previene que se envíe el formulario vacío

---

### 📂 Ubicación: `src/services/authService.ts`

#### Validación 1: Credenciales Válidas (Login)

```typescript
const user = users.find(
    u => u.email === credentials.email && u.password === credentials.password
);

if (!user) {
    throw new Error('Credenciales inválidas');
}
```

**Qué valida:**
- ✅ Verifica que el email y contraseña existan en el sistema
- ✅ Confirma que coincidan con un usuario registrado

**Cómo funciona:**
- Busca un usuario con el email proporcionado
- Verifica que la contraseña coincida
- Si no encuentra coincidencia, lanza error

#### Validación 2: Usuario Bloqueado

```typescript
if (!user.isActive) {
    throw new Error('Tu cuenta ha sido bloqueada. Contacta al administrador para más información.');
}
```

**Qué valida:**
- ✅ Verifica que el usuario esté activo (no bloqueado)
- ✅ Previene que usuarios bloqueados inicien sesión

**Cómo funciona:**
- Revisa la propiedad `isActive` del usuario
- Si es `false`, lanza error con mensaje explicativo

#### Validación 3: Email Duplicado (Registro)

```typescript
if (users.some(u => u.email === data.email)) {
    throw new Error('El email ya está registrado');
}
```

**Qué valida:**
- ✅ Verifica que el email no esté ya registrado
- ✅ Previene duplicados de cuentas

**Cómo funciona:**
- Busca si ya existe un usuario con ese email
- Si existe, lanza error antes de crear la cuenta

#### Validación 4: Username Duplicado (Registro)

```typescript
if (users.some(u => u.username === data.username)) {
    throw new Error('El nombre de usuario ya existe');
}
```

**Qué valida:**
- ✅ Verifica que el username no esté ya en uso
- ✅ Previene nombres de usuario duplicados

**Cómo funciona:**
- Busca si ya existe un usuario con ese username
- Si existe, lanza error antes de crear la cuenta

---

## 🛡️ 2. VALIDACIONES DE RUTAS PROTEGIDAS

### 📂 Ubicación: `src/components/ProtectedRoute/ProtectedRoute.tsx`

#### Validación 1: Autenticación Requerida

```typescript
if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
}
```

**Qué valida:**
- ✅ Verifica que el usuario esté autenticado
- ✅ Protege rutas que requieren estar logueado

**Cómo funciona:**
- Revisa el estado de autenticación del contexto
- Si no está autenticado, redirige al login
- Se usa para proteger `/biblioteca` y otras rutas privadas

#### Validación 2: Permisos de Administrador

```typescript
if (requireAdmin && !isAdmin) {
    // Muestra pantalla de acceso denegado
    return <AccesoDenegado />;
}
```

**Qué valida:**
- ✅ Verifica que el usuario tenga rol de administrador
- ✅ Protege rutas administrativas como `/admin`

**Cómo funciona:**
- Si la ruta requiere admin (`requireAdmin={true}`)
- Verifica que el usuario tenga rol `ADMIN`
- Si no es admin, muestra pantalla de acceso denegado

#### Validación 3: Estado de Carga

```typescript
if (loading) {
    return <Spinner />; // Muestra spinner mientras carga
}
```

**Qué valida:**
- ✅ Espera a que termine la verificación de autenticación
- ✅ Previene redirecciones incorrectas

**Cómo funciona:**
- Muestra un spinner mientras se verifica la autenticación
- Solo después de cargar, realiza las validaciones

---

## 🎮 3. VALIDACIONES DEL PANEL DE ADMINISTRACIÓN

### 📂 Ubicación: `src/pages/Admin/Admin.tsx`

#### Validación 1: Nombre del Juego Requerido

```typescript
if (!formData.name.trim()) {
    setFormError('El nombre del juego es requerido');
    return false;
}
```

**Qué valida:**
- ✅ Verifica que el nombre del juego no esté vacío
- ✅ Elimina espacios en blanco con `trim()`

**Cómo funciona:**
- Verifica que el campo `name` tenga contenido después de eliminar espacios
- Si está vacío, muestra error y retorna `false`

#### Validación 2: Descripción Requerida

```typescript
if (!formData.description.trim()) {
    setFormError('La descripción es requerida');
    return false;
}
```

**Qué valida:**
- ✅ Verifica que la descripción no esté vacía
- ✅ Asegura que el juego tenga información

**Cómo funciona:**
- Verifica que el campo `description` tenga contenido
- Si está vacío, muestra error

#### Validación 3: Categoría Requerida

```typescript
if (!formData.category) {
    setFormError('Debes seleccionar una categoría');
    return false;
}
```

**Qué valida:**
- ✅ Verifica que se haya seleccionado una categoría
- ✅ Asegura clasificación del juego

**Cómo funciona:**
- Verifica que el campo `category` tenga un valor
- Si está vacío, muestra error

#### Validación 4: Precio Válido

```typescript
const price = parseFloat(formData.price);
if (isNaN(price) || price < 0) {
    setFormError('El precio debe ser un número válido mayor o igual a 0');
    return false;
}
```

**Qué valida:**
- ✅ Verifica que el precio sea un número válido
- ✅ Verifica que el precio no sea negativo
- ✅ Acepta precios de 0 (gratis)

**Cómo funciona:**
- Intenta convertir el string a número con `parseFloat()`
- Verifica que no sea `NaN` (Not a Number)
- Verifica que sea mayor o igual a 0

#### Validación 5: Rating Válido (0-5)

```typescript
const rating = parseFloat(formData.rating);
if (isNaN(rating) || rating < 0 || rating > 5) {
    setFormError('El rating debe estar entre 0 y 5');
    return false;
}
```

**Qué valida:**
- ✅ Verifica que el rating sea un número válido
- ✅ Verifica que esté entre 0 y 5 (rango válido)
- ✅ Asegura calificaciones realistas

**Cómo funciona:**
- Intenta convertir el string a número
- Verifica que esté en el rango [0, 5]
- Si está fuera del rango, muestra error

#### Validación 6: URL de Imagen Requerida

```typescript
if (!formData.image.trim()) {
    setFormError('La URL de la imagen es requerida');
    return false;
}
```

**Qué valida:**
- ✅ Verifica que se proporcione una URL de imagen
- ✅ Asegura que el juego tenga imagen

**Cómo funciona:**
- Verifica que el campo `image` tenga contenido
- Si está vacío, muestra error

#### Validación HTML5 (Campos Requeridos)

```typescript
<Form.Control
    type="number"
    required={required}  // ← Validación HTML5
    min={0}  // ← Valor mínimo
    max={5}  // ← Valor máximo (para rating)
    step="0.1"  // ← Incremento permitido
/>
```

**Qué valida:**
- ✅ Validación nativa del navegador
- ✅ Valores mínimos y máximos
- ✅ Formato de números decimales

---

## 📧 4. VALIDACIONES DEL FORMULARIO DE CONTACTO

### 📂 Ubicación: `src/pages/Contact/Contact.tsx`

#### Validación HTML5 (Campos Requeridos)

```typescript
<Form.Control
    type="email"  // ← Validación de formato email
    required  // ← Campo requerido
/>
```

**Qué valida:**
- ✅ Formato de email válido (nativo del navegador)
- ✅ Campos requeridos (name, email, message)

**Cómo funciona:**
- El navegador valida automáticamente el formato del email
- No permite enviar el formulario si falta algún campo requerido

---

## 🔍 5. VALIDACIONES DE BÚSQUEDA

### 📂 Ubicación: `src/components/Header/QuickSearch.tsx`

#### Validación: Query de Búsqueda

```typescript
if (searchQuery.trim()) {
    navigate(`/productos?search=${encodeURIComponent(searchQuery.trim())}`);
}
```

**Qué valida:**
- ✅ Verifica que haya texto de búsqueda antes de navegar
- ✅ Elimina espacios en blanco con `trim()`

**Cómo funciona:**
- Solo realiza la búsqueda si hay texto (después de eliminar espacios)
- Codifica el texto para URL segura con `encodeURIComponent()`

---

## 📊 Resumen de Validaciones por Tipo

| Tipo de Validación | Ubicación | Cantidad |
|-------------------|-----------|----------|
| **Autenticación** | Login.tsx, Register.tsx, authService.ts | 6 validaciones |
| **Rutas Protegidas** | ProtectedRoute.tsx | 3 validaciones |
| **Panel Admin** | Admin.tsx | 6 validaciones |
| **Contacto** | Contact.tsx | 2 validaciones |
| **Búsqueda** | QuickSearch.tsx | 1 validación |
| **HTML5 Nativo** | Todos los formularios | Múltiples |

**Total: ~18 validaciones implementadas**

---

## 🎯 Tipos de Validación Utilizados

### 1. **Validación en Cliente (Frontend)**
- ✅ Validaciones inmediatas antes de enviar
- ✅ Feedback visual al usuario
- ✅ Previene envíos incorrectos

### 2. **Validación HTML5**
- ✅ Validación nativa del navegador
- ✅ Campos `required`, `type="email"`, `min`, `max`
- ✅ No requiere JavaScript

### 3. **Validación en Servicios**
- ✅ Validación de datos en la capa de servicios
- ✅ Verificación de existencia de datos
- ✅ Validación de estado de usuarios

### 4. **Validación de Rutas**
- ✅ Protección de acceso a páginas
- ✅ Verificación de permisos
- ✅ Redirección automática

---

## 💡 Cómo Explicar las Validaciones

### Para Login:
1. **Validación de campos vacíos**: "Verificamos que ambos campos estén llenos"
2. **Validación de credenciales**: "Buscamos un usuario con ese email y contraseña"
3. **Validación de usuario activo**: "Verificamos que la cuenta no esté bloqueada"

### Para Registro:
1. **Validación de contraseñas**: "Comparamos que ambas contraseñas coincidan"
2. **Validación de longitud**: "Verificamos que la contraseña tenga al menos 6 caracteres"
3. **Validación de duplicados**: "Verificamos que el email y username no existan ya"

### Para Admin:
1. **Validación de campos requeridos**: "Verificamos que los campos obligatorios estén llenos"
2. **Validación de tipos**: "Verificamos que los números sean válidos"
3. **Validación de rangos**: "Verificamos que el rating esté entre 0 y 5"

### Para Rutas:
1. **Validación de autenticación**: "Verificamos que el usuario esté logueado"
2. **Validación de permisos**: "Verificamos que el usuario sea administrador"

---

## ✅ Ventajas de Nuestras Validaciones

1. **Seguridad**: Previene acceso no autorizado
2. **UX Mejorada**: Feedback inmediato al usuario
3. **Datos Limpios**: Asegura datos correctos en el sistema
4. **Mantenibilidad**: Validaciones centralizadas y reutilizables
5. **Doble Validación**: Cliente + Servicio (aunque el servicio es simulado)

---

## 🔧 Mejoras Futuras Sugeridas

1. **Validación de formato de email más estricta** (regex)
2. **Validación de fortaleza de contraseña** (mayúsculas, números, símbolos)
3. **Validación de URL de imagen** (verificar que sea una URL válida)
4. **Validación en tiempo real** (mientras el usuario escribe)
5. **Validación de tamaño de archivo** (si se implementa subida de imágenes)





