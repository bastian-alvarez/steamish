# 🎮 Steamish - Plataforma de Venta de Videojuegos

Proyecto full stack de página web para venta de videojuegos desarrollado con React y TypeScript.

## 📋 Requisitos Previos

Antes de ejecutar el proyecto, asegúrate de tener instalado:

- **Node.js** (versión 16 o superior)
- **npm** (viene incluido con Node.js)

### 🔧 Instalación de Node.js

Si no tienes Node.js instalado:

1. Visita [nodejs.org](https://nodejs.org/)
2. Descarga la versión LTS (Long Term Support)
3. Ejecuta el instalador y sigue las instrucciones
4. Verifica la instalación ejecutando en tu terminal:
   ```bash
   node --version
   npm --version
   ```

## 🚀 Instalación y Ejecución

### 1. Instalar dependencias

Desde la carpeta del proyecto, ejecuta:

```bash
cd steamish
npm install
```

Este comando instalará todas las dependencias necesarias del proyecto.

### 2. Iniciar el servidor de desarrollo

```bash
npm start
```

El proyecto se abrirá automáticamente en tu navegador en `http://localhost:3000`

### 3. Compilar para producción

```bash
npm run build
```

## 🎯 Funcionalidades

### Autenticación
- **Login**: Iniciar sesión con credenciales
  - Demo: `demo@steamish.com` / `demo123`
  - Admin: `admin@steamish.com` / `admin123` (solo para acceso al panel de administración)
- **Registro**: Crear nueva cuenta de usuario
- **Logout**: Cerrar sesión

### Panel de Administración
- **Acceso restringido**: Solo accesible para usuarios con rol de administrador
- **Ruta protegida**: `/admin` no aparece en la navegación y requiere autenticación como admin
- **Credenciales de admin**: 
  - Email: `admin@steamish.com`
  - Password: `admin123`
- Si intentas acceder sin ser admin, verás un mensaje de "Acceso Denegado"

### Carrito de Compras
- Agregar productos al carrito
- Ver cantidad total de items
- Remover productos individuales
- Vaciar carrito completo
- Cálculo automático del precio total con descuentos

### Catálogo de Productos
- Búsqueda de juegos por nombre, categoría o etiquetas
- Filtros por categoría, precio y rating
- Visualización de productos destacados
- Detalles de cada juego (precio, rating, descuentos)

### Navegación
- Página de inicio con juegos destacados
- Catálogo completo de productos
- Páginas informativas (Nosotros, Blog, Contacto)
- Panel de administración

## 🛠️ Tecnologías Utilizadas

- **React 18.2.0** - Librería de JavaScript para interfaces
- **TypeScript 4.9.5** - Superset de JavaScript con tipado estático
- **React Router DOM 6.8.0** - Enrutamiento
- **React Bootstrap 2.10.10** - Componentes UI
- **Bootstrap 5.3.8** - Framework CSS
- **Bootstrap Icons** - Iconos
- **Animate.css** - Animaciones

## 📁 Estructura del Proyecto

```
steamish/
├── public/           # Archivos públicos
├── src/
│   ├── components/   # Componentes reutilizables
│   │   ├── Cart/     # Componente del carrito
│   │   ├── Header/   # Encabezado
│   │   ├── Footer/   # Pie de página
│   │   └── ...
│   ├── context/      # Contextos de React
│   │   ├── AuthContext.tsx    # Autenticación
│   │   ├── ProductContext.tsx # Productos
│   │   └── CartContext.tsx    # Carrito (usa useState)
│   ├── pages/        # Páginas principales
│   │   ├── Home/     # Página de inicio
│   │   ├── Products/ # Catálogo
│   │   ├── Login/    # Login
│   │   └── ...
│   ├── services/     # Servicios
│   │   ├── authService.ts     # Servicio de autenticación
│   │   └── productService.ts  # Servicio de productos
│   ├── types/        # Interfaces TypeScript
│   │   ├── Product.ts
│   │   ├── User.ts
│   │   ├── Cart.ts
│   │   └── Component.ts
│   └── utils/        # Utilidades
└── package.json
```

## 🔑 Características Técnicas

- **Uso extensivo de Interfaces TypeScript**: Todo el código está tipado
- **useState para el carrito**: El carrito usa useState internamente en CartContext
- **useContext optimizado**: AuthContext y ProductContext con manejo de estado mejorado
- **LocalStorage**: Persistencia de usuarios y sesiones
- **Componentes funcionales**: Uso de hooks de React

## 🐛 Solución de Problemas

### Error: "npm no se reconoce"
- Asegúrate de tener Node.js instalado
- Reinicia tu terminal después de instalar Node.js
- Verifica que Node.js esté en el PATH del sistema

### Error: "Puerto 3000 en uso"
- Cierra otras aplicaciones que usen el puerto 3000
- O cambia el puerto: `PORT=3001 npm start`

### Error de compilación
- Elimina `node_modules` y `package-lock.json`
- Ejecuta `npm install` nuevamente

## 📝 Scripts Disponibles

- `npm start` - Inicia el servidor de desarrollo
- `npm run build` - Compila para producción
- `npm test` - Ejecuta las pruebas
- `npm run eject` - Expone la configuración de Create React App

## 👨‍💻 Desarrollo

Este proyecto fue desarrollado como parte de un curso Full Stack II, implementando:
- Arquitectura de componentes React
- Manejo de estado con Context API y useState
- Tipado fuerte con TypeScript
- Diseño responsive con Bootstrap
- Gestión de rutas con React Router

---

**Nota**: Este es un proyecto de demostración. Las credenciales de usuario se almacenan localmente en el navegador.
