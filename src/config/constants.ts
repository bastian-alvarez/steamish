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

// URLs públicas de los microservicios (Dev Tunnels)
const DEV_TUNNEL_URLS = {
    eurekaServer: 'https://13wfn3bx-8761.brs.devtunnels.ms',
    apiGateway: 'https://13wfn3bx-8080.brs.devtunnels.ms',
    authService: 'https://13wfn3bx-3001.brs.devtunnels.ms',
    gameCatalogService: 'https://13wfn3bx-3002.brs.devtunnels.ms',
    orderService: 'https://13wfn3bx-3003.brs.devtunnels.ms',
    libraryService: 'https://13wfn3bx-3004.brs.devtunnels.ms',
} as const;

// SIMPLIFICACIÓN: Conectar directamente a microservicios sin API Gateway
// Esto evita problemas de CORS y Eureka

// Detectar si estamos en producción (Vercel) o desarrollo
const isProduction = process.env.NODE_ENV === 'production';

// Función simple para obtener URL del servicio
const getServiceUrl = (devTunnelUrl: string, localPort: number, envVar?: string): string => {
    // Prioridad 1: Variable de entorno
    if (envVar && process.env[envVar]) {
        return process.env[envVar]!;
    }
    // Prioridad 2: Dev Tunnels (siempre en producción o si está configurado)
    if (isProduction || process.env.REACT_APP_USE_DEV_TUNNELS === 'true') {
        return devTunnelUrl;
    }
    // Prioridad 3: Localhost en desarrollo
    return `http://localhost:${localPort}`;
};

export const API = {
    baseUrl: process.env.REACT_APP_API_URL || getServiceUrl(DEV_TUNNEL_URLS.authService, 3001),
    timeout: 30000, // 30 segundos
    // Conectar directamente a microservicios (sin API Gateway)
    authService: getServiceUrl(DEV_TUNNEL_URLS.authService, 3001, 'REACT_APP_AUTH_SERVICE_URL'),
    gameCatalogService: getServiceUrl(DEV_TUNNEL_URLS.gameCatalogService, 3002, 'REACT_APP_GAME_CATALOG_SERVICE_URL'),
    orderService: getServiceUrl(DEV_TUNNEL_URLS.orderService, 3003, 'REACT_APP_ORDER_SERVICE_URL'),
    libraryService: getServiceUrl(DEV_TUNNEL_URLS.libraryService, 3004, 'REACT_APP_LIBRARY_SERVICE_URL'),
    // API Gateway URL (mantenido para referencia futura, pero no se usa)
    apiGateway: process.env.REACT_APP_API_GATEWAY_URL || DEV_TUNNEL_URLS.apiGateway,
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
