# 📋 ERS V2 - Especificación de Requerimientos del Sistema
## Steamish - Plataforma de Venta de Videojuegos

**Versión**: 2.0  
**Fecha**: Enero 2025  
**Proyecto**: Steamish Gaming Platform

---

## 📑 Índice

1. [Introducción](#introducción)
2. [Propósito del Documento](#propósito-del-documento)
3. [Alcance del Proyecto](#alcance-del-proyecto)
4. [Definiciones y Abreviaciones](#definiciones-y-abreviaciones)
5. [Requerimientos Funcionales](#requerimientos-funcionales)
6. [Requerimientos No Funcionales](#requerimientos-no-funcionales)
7. [Arquitectura del Sistema](#arquitectura-del-sistema)
8. [Herramientas y Tecnologías](#herramientas-y-tecnologías)
9. [Interfaces y Propuestas](#interfaces-y-propuestas)
10. [Casos de Uso Principales](#casos-de-uso-principales)
11. [Referencias y Documentación Relacionada](#referencias-y-documentación-relacionada)
12. [Glosario de Términos](#glosario-de-términos)
13. [Conclusiones](#conclusiones)

---

## 1. Introducción

### 1.1 Propósito del Documento

Este documento describe los requerimientos del sistema para **Steamish**, una plataforma web de venta de videojuegos desarrollada con React y TypeScript. El documento ha sido actualizado (V2) para incluir las mejoras implementadas en la segunda iteración del proyecto, específicamente la implementación de pruebas unitarias y mejoras en la arquitectura.

### 1.2 Alcance del Proyecto

**Steamish** es una plataforma e-commerce especializada en videojuegos que permite a los usuarios:
- Explorar un catálogo de videojuegos
- Buscar y filtrar productos
- Agregar juegos al carrito de compras
- Realizar procesos de autenticación y registro
- Acceder a un panel de administración (roles restringidos)

### 1.3 Audiencia

Este documento está dirigido a:
- Equipo de desarrollo
- Docentes evaluadores
- Stakeholders del proyecto
- Desarrolladores que trabajarán en futuras iteraciones

---

## 2. Propósito del Documento

Este ERS V2 actualiza la especificación original con:
- ✅ Implementación completa de pruebas unitarias
- ✅ Mejoras en la arquitectura con interfaces TypeScript
- ✅ Optimización del uso de Context API y useState
- ✅ Protección de rutas administrativas
- ✅ Integración de imágenes reales de videojuegos

---

## 3. Alcance del Proyecto

### 3.1 Objetivos

Desarrollar una plataforma web moderna y funcional que:
1. Presente un catálogo atractivo de videojuegos
2. Permita búsqueda y filtrado eficiente
3. Gestione un carrito de compras funcional
4. Implemente autenticación de usuarios
5. Proporcione acceso restringido para administradores

### 3.2 Restricciones

- **Frontend**: React 18.2.0 con TypeScript
- **Backend**: Simulado con localStorage (sin backend real)
- **Testing**: Jest + React Testing Library
- **UI Framework**: Bootstrap 5 + React Bootstrap

---

## 4. Definiciones y Abreviaciones

- **ERS**: Especificación de Requerimientos del Sistema
- **UI/UX**: Interfaz de Usuario / Experiencia de Usuario
- **API**: Application Programming Interface
- **CRUD**: Create, Read, Update, Delete
- **RPG**: Role-Playing Game
- **CDN**: Content Delivery Network

---

## 5. Requerimientos Funcionales

### 5.1 Gestión de Usuarios

#### RF-001: Registro de Usuario
- **Descripción**: Los usuarios pueden crear una nueva cuenta
- **Prioridad**: Alta
- **Entrada**: Email, username, password
- **Salida**: Cuenta creada, usuario logueado automáticamente
- **Estado**: ✅ Implementado

#### RF-002: Inicio de Sesión
- **Descripción**: Los usuarios pueden iniciar sesión con email y contraseña
- **Prioridad**: Alta
- **Entrada**: Email, password
- **Salida**: Sesión iniciada, acceso a funciones de usuario
- **Estado**: ✅ Implementado
- **Credenciales Demo**: `demo@steamish.com` / `demo123`

#### RF-003: Cierre de Sesión
- **Descripción**: Los usuarios pueden cerrar su sesión
- **Prioridad**: Media
- **Estado**: ✅ Implementado

#### RF-004: Roles de Usuario
- **Descripción**: Sistema de roles (USER, ADMIN)
- **Prioridad**: Alta
- **Estados**:
  - USER: Usuario normal con acceso completo excepto admin
  - ADMIN: Acceso total incluyendo panel de administración
- **Estado**: ✅ Implementado

### 5.2 Catálogo de Productos

#### RF-005: Visualización de Productos
- **Descripción**: Mostrar catálogo completo de videojuegos
- **Prioridad**: Alta
- **Características**:
  - Lista de juegos con imágenes reales
  - Información: nombre, precio, rating, descuentos
  - Categorías y tags
- **Estado**: ✅ Implementado

#### RF-006: Búsqueda de Productos
- **Descripción**: Buscar juegos por nombre, categoría o etiquetas
- **Prioridad**: Alta
- **Funcionalidades**:
  - Búsqueda en tiempo real
  - Resaltado de términos encontrados
  - Filtros por categoría, precio, rating
- **Estado**: ✅ Implementado

#### RF-007: Productos Destacados
- **Descripción**: Mostrar juegos destacados en página principal
- **Prioridad**: Media
- **Estado**: ✅ Implementado

### 5.3 Carrito de Compras

#### RF-008: Agregar al Carrito
- **Descripción**: Agregar productos al carrito
- **Prioridad**: Alta
- **Funcionalidades**:
  - Incrementar cantidad si el producto ya existe
  - Actualizar contador del carrito
- **Estado**: ✅ Implementado con useState

#### RF-009: Gestionar Carrito
- **Descripción**: Ver, modificar y eliminar items del carrito
- **Prioridad**: Alta
- **Funcionalidades**:
  - Ver items agregados
  - Remover productos individuales
  - Vaciar carrito completo
  - Calcular total con descuentos
- **Estado**: ✅ Implementado

#### RF-010: Cálculo de Precios
- **Descripción**: Calcular total considerando descuentos y cantidades
- **Prioridad**: Alta
- **Estado**: ✅ Implementado

### 5.4 Panel de Administración

#### RF-011: Acceso Restringido
- **Descripción**: Panel solo accesible para usuarios ADMIN
- **Prioridad**: Alta
- **Características**:
  - Ruta `/admin` protegida
  - Enlace no visible en navegación pública
  - Redirección si usuario no es admin
- **Estado**: ✅ Implementado
- **Credenciales Admin**: `admin@steamish.com` / `admin123`

#### RF-012: Gestión Administrativa
- **Descripción**: Funcionalidades administrativas (CRUD productos, usuarios)
- **Prioridad**: Media
- **Estado**: ⚠️ Parcialmente implementado (estructura base)

### 5.5 Navegación

#### RF-013: Rutas Públicas
- **Descripción**: Páginas accesibles sin autenticación
- **Rutas**:
  - `/` - Página de inicio
  - `/productos` - Catálogo completo
  - `/blogs` - Blog de noticias
  - `/nosotros` - Información de la empresa
  - `/contacto` - Formulario de contacto
- **Estado**: ✅ Implementado

#### RF-014: Rutas Protegidas
- **Descripción**: Rutas que requieren autenticación
- **Rutas**:
  - `/login` - Inicio de sesión
  - `/registro` - Registro de usuario
  - `/admin` - Panel administrativo (requiere rol ADMIN)
- **Estado**: ✅ Implementado

---

## 6. Requerimientos No Funcionales

### 6.1 Rendimiento

#### RNF-001: Tiempo de Carga
- **Descripción**: La aplicación debe cargar en menos de 3 segundos
- **Prioridad**: Media
- **Estado**: ✅ Cumplido

#### RNF-002: Optimización de Imágenes
- **Descripción**: Imágenes optimizadas desde CDN
- **Prioridad**: Media
- **Estado**: ✅ Implementado (PlayStation CDN)

### 6.2 Usabilidad

#### RNF-003: Diseño Responsive
- **Descripción**: Funcional en dispositivos móviles, tablets y desktop
- **Prioridad**: Alta
- **Estado**: ✅ Implementado (Bootstrap responsive)

#### RNF-004: Accesibilidad
- **Descripción**: Navegación intuitiva y clara
- **Prioridad**: Media
- **Estado**: ✅ Implementado

### 6.3 Seguridad

#### RNF-005: Protección de Rutas
- **Descripción**: Rutas administrativas protegidas
- **Prioridad**: Alta
- **Estado**: ✅ Implementado

#### RNF-006: Validación de Formularios
- **Descripción**: Validación en cliente de formularios
- **Prioridad**: Alta
- **Estado**: ✅ Implementado

### 6.4 Mantenibilidad

#### RNF-007: Código Tipado
- **Descripción**: Uso extensivo de TypeScript e interfaces
- **Prioridad**: Alta
- **Estado**: ✅ Implementado

#### RNF-008: Pruebas Unitarias
- **Descripción**: Cobertura de pruebas unitarias
- **Prioridad**: Alta
- **Estado**: ✅ Implementado
- **Cobertura**: 27.64% statements, 44 pruebas unitarias

#### RNF-009: Documentación
- **Descripción**: Código documentado y documentación técnica
- **Prioridad**: Media
- **Estado**: ✅ Implementado

---

## 7. Arquitectura del Sistema

### 7.1 Arquitectura Frontend

```
┌─────────────────────────────────────┐
│         React Application           │
├─────────────────────────────────────┤
│  Components Layer                   │
│  ├── Header                         │
│  ├── Footer                         │
│  ├── Cart                           │
│  ├── GameResults                    │
│  └── SearchBar                      │
├─────────────────────────────────────┤
│  Pages Layer                        │
│  ├── Home                           │
│  ├── Products                       │
│  ├── Login                          │
│  ├── Register                       │
│  └── Admin                          │
├─────────────────────────────────────┤
│  Context Layer (State Management)   │
│  ├── AuthContext                    │
│  ├── ProductContext                 │
│  └── CartContext (useState)         │
├─────────────────────────────────────┤
│  Services Layer                     │
│  ├── authService                    │
│  └── productService                 │
├─────────────────────────────────────┤
│  Types Layer (Interfaces)           │
│  ├── Product                        │
│  ├── User                           │
│  ├── Cart                           │
│  └── Component                      │
└─────────────────────────────────────┘
```

### 7.2 Patrones de Diseño

- **Component Pattern**: Componentes funcionales reutilizables
- **Context Pattern**: Manejo de estado global
- **Service Pattern**: Lógica de negocio separada
- **Hook Pattern**: Custom hooks para lógica reutilizable

### 7.3 Flujo de Datos

```
Usuario → Component → Context → Service → LocalStorage
                                      ↓
                              State Update
                                      ↓
                              Component Re-render
```

---

## 8. Herramientas y Tecnologías

### 8.1 Frontend

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| React | 18.2.0 | Framework principal |
| TypeScript | 4.9.5 | Tipado estático |
| React Router DOM | 6.8.0 | Enrutamiento |
| React Bootstrap | 2.10.10 | Componentes UI |
| Bootstrap | 5.3.8 | Framework CSS |
| Bootstrap Icons | 1.13.1 | Iconografía |

### 8.2 Testing

| Herramienta | Versión | Propósito |
|-------------|---------|-----------|
| Jest | Incluido en CRA | Framework de testing |
| React Testing Library | Última | Testing de componentes |
| @testing-library/jest-dom | Última | Matchers DOM |
| @testing-library/user-event | Última | Simulación de eventos |

### 8.3 Desarrollo

| Herramienta | Propósito |
|-------------|-----------|
| Create React App | Configuración inicial |
| npm | Gestión de dependencias |
| Git | Control de versiones |
| Visual Studio Code | IDE recomendado |

---

## 9. Interfaces y Propuestas

### 9.1 Estructura del Proyecto

```
steamish-react-app/
├── public/              # Archivos públicos estáticos
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/      # Componentes reutilizables
│   │   ├── Cart/        # Componente del carrito
│   │   ├── Header/      # Encabezado de navegación
│   │   ├── Footer/      # Pie de página
│   │   ├── SearchBar/   # Barra de búsqueda
│   │   ├── GameResults/ # Resultados de búsqueda
│   │   └── ProtectedRoute/ # Ruta protegida
│   ├── pages/           # Páginas principales
│   │   ├── Home/        # Página de inicio
│   │   ├── Products/    # Catálogo de productos
│   │   ├── Login/       # Inicio de sesión
│   │   ├── Register/    # Registro de usuario
│   │   ├── Admin/       # Panel administrativo
│   │   ├── About/       # Página "Nosotros"
│   │   ├── Blogs/       # Blog
│   │   └── Contact/     # Contacto
│   ├── context/         # Contextos de React (estado global)
│   │   ├── AuthContext.tsx    # Autenticación
│   │   ├── ProductContext.tsx # Productos
│   │   └── CartContext.tsx    # Carrito
│   ├── services/        # Servicios y lógica de negocio
│   │   ├── authService.ts     # Servicio de autenticación
│   │   └── productService.ts  # Servicio de productos
│   ├── types/           # Interfaces TypeScript
│   │   ├── Product.ts
│   │   ├── User.ts
│   │   ├── Cart.ts
│   │   └── Component.ts
│   ├── utils/           # Utilidades y constantes
│   │   ├── constants.ts
│   │   └── helpers.ts
│   ├── mock-data/       # Datos de prueba
│   │   └── juegosMocks.ts
│   ├── styles/          # Estilos personalizados
│   │   └── colors.css
│   ├── App.tsx          # Componente raíz
│   └── index.tsx        # Punto de entrada
├── docs/                # Documentación
│   ├── ERS_V2.md
│   ├── COBERTURA_TESTING.md
│   └── DOCUMENTACION_COMPLETA.md
└── package.json         # Dependencias del proyecto
```

### 9.2 Interfaces TypeScript Principales

```typescript
// Product
interface Product {
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

// User
interface User {
    id: string;
    username: string;
    email: string;
    password: string;
    role: UserRole;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

// Cart
interface CartItem extends Product {
    quantity: number;
}
```

### 9.3 Instalación y Ejecución

#### Requisitos Previos
- **Node.js**: Versión 16 o superior
- **npm**: Gestor de paquetes (incluido con Node.js)

#### Pasos de Instalación
1. Clonar o descargar el proyecto
2. Navegar a la carpeta del proyecto: `cd steamish-react-app`
3. Instalar dependencias: `npm install`
4. Iniciar servidor de desarrollo: `npm start`
5. Abrir navegador en `http://localhost:3000`

#### Scripts Disponibles
- `npm start`: Inicia servidor de desarrollo
- `npm run build`: Compila para producción
- `npm test`: Ejecuta pruebas unitarias
- `npm test -- --coverage`: Ejecuta pruebas con cobertura

### 9.4 Propuesta de Mejoras Futuras

#### Corto Plazo
1. ✅ Integración de imágenes reales - COMPLETADO
2. ⚠️ Aumentar cobertura de pruebas a 50%+
3. ⚠️ Implementar pruebas de integración

#### Mediano Plazo
4. Implementar backend real (Node.js + Express)
5. Conexión a base de datos (MongoDB/PostgreSQL)
6. Sistema de pagos real
7. Panel administrativo completo

#### Largo Plazo
8. Autenticación con JWT
9. Sistema de reviews y ratings de usuarios
10. Wishlist de usuarios
11. Sistema de recomendaciones

---

## 10. Casos de Uso Principales

### 10.1 UC-001: Explorar Catálogo
**Actor**: Usuario no autenticado  
**Precondiciones**: Navegador web funcionando  
**Flujo Principal**:
1. Usuario accede a `/productos`
2. Sistema muestra lista de juegos con imágenes
3. Usuario puede buscar por nombre, categoría o etiquetas
4. Usuario puede filtrar por categoría, precio y rating
5. Usuario puede ver detalles de cada juego (precio, rating, descuentos)
**Postcondiciones**: Usuario visualiza catálogo completo

### 10.2 UC-002: Agregar al Carrito
**Actor**: Usuario (autenticado o no)  
**Precondiciones**: Usuario está en página de productos  
**Flujo Principal**:
1. Usuario navega por productos
2. Usuario hace clic en botón "Agregar al Carrito"
3. Sistema agrega producto al carrito (o incrementa cantidad si ya existe)
4. Sistema actualiza contador del carrito en el header
5. Sistema calcula precio total con descuentos aplicados
**Postcondiciones**: Producto agregado al carrito, contador actualizado

### 10.3 UC-003: Autenticación
**Actor**: Usuario  
**Precondiciones**: Usuario tiene cuenta creada  
**Flujo Principal**:
1. Usuario accede a `/login`
2. Usuario ingresa email y contraseña
3. Sistema valida credenciales contra localStorage
4. Si válido: Sistema crea sesión y redirige a inicio
5. Si inválido: Sistema muestra mensaje de error
6. Sesión se mantiene en localStorage
**Flujo Alternativo**:
- 3a. Credenciales inválidas → Mostrar error, permitir reintento
- 3b. Usuario inactivo → Mostrar error específico
**Postcondiciones**: Usuario autenticado o mensaje de error mostrado

### 10.4 UC-004: Registro de Usuario
**Actor**: Usuario nuevo  
**Precondiciones**: Usuario no tiene cuenta  
**Flujo Principal**:
1. Usuario accede a `/registro`
2. Usuario completa formulario (username, email, password, confirmPassword)
3. Sistema valida:
   - Campos requeridos completos
   - Contraseñas coinciden
   - Contraseña mínimo 6 caracteres
   - Email único
   - Username único
4. Si válido: Sistema crea usuario y autentica automáticamente
5. Sistema redirige a página de inicio
**Flujo Alternativo**:
- 3a. Validación falla → Mostrar error específico
- 3b. Email/Username duplicado → Mostrar error
**Postcondiciones**: Usuario registrado y autenticado

### 10.5 UC-005: Acceso Admin
**Actor**: Usuario con rol ADMIN  
**Precondiciones**: Usuario autenticado con rol ADMIN  
**Flujo Principal**:
1. Admin se autentica con credenciales admin (`admin@steamish.com` / `admin123`)
2. Admin navega directamente a `/admin` (URL manual o bookmark)
3. Sistema verifica rol del usuario
4. Si es ADMIN: Muestra panel administrativo
5. Si no es ADMIN: Muestra mensaje "Acceso Denegado"
**Flujo Alternativo**:
- 2a. Usuario normal intenta acceder → Redirige a login o muestra error
- 2b. Usuario no autenticado → Redirige a `/login`
**Postcondiciones**: Panel admin visible o acceso denegado

### 10.6 UC-006: Gestionar Carrito
**Actor**: Usuario con productos en carrito  
**Precondiciones**: Carrito tiene al menos un producto  
**Flujo Principal**:
1. Usuario hace clic en botón "Carrito" en header
2. Sistema muestra modal con productos del carrito
3. Usuario puede:
   - Ver lista de productos con cantidades
   - Ver precio total calculado
   - Remover productos individuales
   - Vaciar carrito completo
4. Sistema actualiza totales en tiempo real
**Postcondiciones**: Carrito actualizado según acciones del usuario

---

## 11. Referencias y Documentación Relacionada

### Documentos del Proyecto
- **DOCUMENTACION_COMPLETA.md**: Documentación técnica detallada sobre Bootstrap, UseContext, UseState, Interfaces y Validaciones
- **COBERTURA_TESTING.md**: Documentación completa sobre estrategia de testing, pruebas implementadas y cobertura de código
- **README.md**: Guía de instalación y uso del proyecto

### Referencias Externas
- [React Documentation](https://react.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Bootstrap Documentation](https://getbootstrap.com/docs/5.3/)
- [React Router Documentation](https://reactrouter.com/)
- [React Testing Library](https://testing-library.com/react/)

## 12. Glosario de Términos

- **SPA (Single Page Application)**: Aplicación web que carga una sola página HTML y actualiza dinámicamente el contenido
- **Context API**: API de React para compartir estado entre componentes sin prop drilling
- **Hook**: Función especial de React que permite usar estado y otras características
- **useState**: Hook de React para manejar estado local en componentes funcionales
- **useContext**: Hook de React para acceder a valores de Context
- **TypeScript**: Superset de JavaScript que añade tipado estático
- **Interface**: Contrato que define la estructura de un objeto en TypeScript
- **localStorage**: API del navegador para almacenar datos localmente
- **Prop Drilling**: Pasar props a través de múltiples componentes intermedios
- **Protected Route**: Ruta que requiere autenticación o permisos específicos para acceder

## 13. Conclusiones

Este ERS V2 documenta el estado actual del proyecto Steamish, incluyendo todas las mejoras implementadas en la segunda iteración. El sistema cumple con los requerimientos principales de funcionalidad, manteniendo un código limpio, tipado y con pruebas unitarias implementadas.

### Resumen de Estado
- ✅ **Funcionalidad Core**: Completamente implementada
- ✅ **Autenticación**: Sistema completo con roles
- ✅ **Carrito de Compras**: Funcional con cálculo de precios
- ✅ **Búsqueda y Filtros**: Implementado con optimización
- ✅ **Rutas Protegidas**: Sistema de protección implementado
- ✅ **Testing**: 44 pruebas unitarias implementadas
- ✅ **Documentación**: Completa y actualizada

**Estado General**: ✅ Funcional y listo para demostración

### Próximos Pasos Recomendados
1. Aumentar cobertura de pruebas a 50%+
2. Implementar pruebas de integración
3. Completar funcionalidades del panel administrativo
4. Implementar backend real con base de datos
5. Agregar sistema de pagos real

---

**Documento generado por**: Equipo de Desarrollo Steamish  
**Última actualización**: Enero 2025  
**Versión**: 2.0  
**Revisión**: Final




