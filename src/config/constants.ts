// Constants Simplificados
export const APP = Object.freeze({
    name: "Steamish",
    version: "1.0.0",
    currency: "$"
});

// Paleta de Colores Steamish - Sin CSS, solo TypeScript
// Estos son los colores oficiales de la paleta del tema
export const COLORS = Object.freeze({
    // Colores base (Midnight Aurora mejor balanceado)
    color1: '#080B18', // fondo principal un poco más neutro
    color2: '#101428', // fondo secundario
    color3: '#161C34', // cards / paneles
    color4: '#252E52', // bordes suaves
    color5: '#7C7CFF', // identidad aurora
    
    // Colores semánticos
    primary: '#7C7CFF',       // Aurora Violet
    primaryDark: '#101428',   // Fondo secundario
    primaryLight: '#9A9AFF',  // Hover aurora
    secondary: '#161C34',     // Superficies
    accent: '#3FA9F5',        // Acentos fríos (links, detalles)
    
    // Colores de texto
    textPrimary: '#F2F4FF',
    textSecondary: '#C0C5EC',
    textLight: '#F2F4FF',
    textMuted: '#8087B8',
    
    // Gradientes (más contraste y “aurora”)
    gradientPrimary: 'linear-gradient(135deg, #171D3A 0%, #050814 100%)',
    gradientLight: 'linear-gradient(135deg, #1B2547 0%, #0B1124 100%)',
    gradientAccent: 'linear-gradient(135deg, #7C7CFF 0%, #2EE6A6 100%)'
});

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

export const API = Object.freeze({
    baseUrl: process.env.REACT_APP_API_URL || getServiceUrl(DEV_TUNNEL_URLS.authService, 3001),
    timeout: 30000, // 30 segundos
    // Conectar directamente a microservicios (sin API Gateway)
    authService: getServiceUrl(DEV_TUNNEL_URLS.authService, 3001, 'REACT_APP_AUTH_SERVICE_URL'),
    gameCatalogService: getServiceUrl(DEV_TUNNEL_URLS.gameCatalogService, 3002, 'REACT_APP_GAME_CATALOG_SERVICE_URL'),
    orderService: getServiceUrl(DEV_TUNNEL_URLS.orderService, 3003, 'REACT_APP_ORDER_SERVICE_URL'),
    libraryService: getServiceUrl(DEV_TUNNEL_URLS.libraryService, 3004, 'REACT_APP_LIBRARY_SERVICE_URL'),
    // API Gateway URL (mantenido para referencia futura, pero no se usa)
    apiGateway: process.env.REACT_APP_API_GATEWAY_URL || DEV_TUNNEL_URLS.apiGateway,
});

export const ROUTES = Object.freeze({
    home: "/",
    products: "/productos",
    blogs: "/blogs",
    about: "/nosotros",
    contact: "/contacto",
    login: "/login",
    register: "/registro",
    admin: "/admin"
});
