// Constants Simplificados
export const APP = Object.freeze({
    name: "Steamish",
    version: "1.0.0",
    currency: "$"
});

// Paleta de Colores Steamish - Sin CSS, solo TypeScript
// Estos son los colores oficiales de la paleta del tema
export const COLORS = Object.freeze({
    // Colores base (Midnight Aurora Gaming)
    color1: '#0B0E1A', // fondo principal
    color2: '#12162A', // fondo secundario
    color3: '#181E36', // cards / paneles
    color4: '#232A4D', // bordes suaves
    color5: '#7C7CFF', // identidad aurora
    
    // Colores semánticos
    primary: '#7C7CFF',       // Aurora Violet
    primaryDark: '#12162A',   // Fondo secundario
    primaryLight: '#9A9AFF',  // Hover aurora
    secondary: '#181E36',     // Superficies
    accent: '#232A4D',        // Bordes / acento
    
    // Colores de texto
    textPrimary: '#E8EBFF',
    textSecondary: '#A6ADD9',
    textLight: '#E8EBFF',
    textMuted: '#6E75A8',
    
    // Gradientes (oscuros con profundidad)
    gradientPrimary: 'linear-gradient(135deg, #12162A 0%, #0B0E1A 100%)',
    gradientLight: 'linear-gradient(135deg, #181E36 0%, #12162A 100%)',
    gradientAccent: 'linear-gradient(135deg, #232A4D 0%, #181E36 100%)'
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
