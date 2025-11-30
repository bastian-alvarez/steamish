// Constants Simplificados
export const APP = {
    name: "Steamish",
    version: "1.0.0",
    currency: "$"
} as const;

// Paleta de Colores Steamish - Sin CSS, solo TypeScript
// Estos son los colores oficiales de la paleta del tema
export const COLORS = {
    // Colores base de la paleta
    color1: '#1c1f3b',
    color2: '#282c4d',
    color3: '#3c3f68',
    color4: '#4d4d80',
    color5: '#606271',
    
    // Colores semánticos (basados en la paleta base)
    primary: '#4d4d80',      // color4 - Color principal
    primaryDark: '#1c1f3b',  // color1 - Color oscuro
    primaryLight: '#3c3f68', // color3 - Color claro
    secondary: '#282c4d',    // color2 - Color secundario
    accent: '#606271',        // color5 - Color de acento
    
    // Colores de texto
    textPrimary: '#ffffff',
    textSecondary: 'rgba(255, 255, 255, 0.9)',
    textLight: 'rgba(255, 255, 255, 0.85)',
    textMuted: 'rgba(255, 255, 255, 0.7)',
    
    // Gradientes (usando los colores de la paleta)
    gradientPrimary: 'linear-gradient(135deg, #4d4d80 0%, #1c1f3b 100%)', // color4 -> color1
    gradientLight: 'linear-gradient(135deg, #282c4d 0%, #3c3f68 100%)',   // color2 -> color3
    gradientAccent: 'linear-gradient(135deg, #3c3f68 0%, #4d4d80 100%)'   // color3 -> color4
} as const;

// Detectar si estamos en modo desarrollo con proxy o en producción/ngrok
// El proxy está activo por defecto en desarrollo, a menos que se especifiquen URLs explícitas
const useProxy = process.env.REACT_APP_USE_PROXY !== 'false' && 
                 (process.env.NODE_ENV === 'development' && !process.env.REACT_APP_AUTH_SERVICE_URL);

export const API = {
    baseUrl: process.env.REACT_APP_API_URL || (useProxy ? "" : "http://localhost:3001"),
    timeout: 10000,
    // Microservicios - Usar rutas relativas (vacío) si el proxy está activo, sino usar URLs completas
    // Los servicios ya incluyen /api/... en sus endpoints, así que solo necesitamos la base
    authService: useProxy ? "" : (process.env.REACT_APP_AUTH_SERVICE_URL || "http://localhost:3001"),
    gameCatalogService: useProxy ? "" : (process.env.REACT_APP_GAME_CATALOG_SERVICE_URL || "http://localhost:3002"),
    orderService: useProxy ? "" : (process.env.REACT_APP_ORDER_SERVICE_URL || "http://localhost:3003"),
    libraryService: useProxy ? "" : (process.env.REACT_APP_LIBRARY_SERVICE_URL || "http://localhost:3004")
} as const;

export const ROUTES = {
    home: "/",
    products: "/productos",
    blogs: "/blogs",
    about: "/nosotros",
    contact: "/contacto",
    login: "/login",
    register: "/registro",
    admin: "/admin"
} as const;
