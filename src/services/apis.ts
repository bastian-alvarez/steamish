/**
 * Configuración de URLs de APIs públicas
 * Dev Tunnels - URLs públicas para conectar con microservicios
 */

// URLs públicas de los microservicios (Dev Tunnels)
export const API_URLS = {
    // Eureka Server (Service Discovery)
    eurekaServer: 'https://13wfn3bx-8761.brs.devtunnels.ms',
    
    // API Gateway (punto de entrada principal)
    apiGateway: 'https://13wfn3bx-8080.brs.devtunnels.ms',
    
    // Microservicios individuales (para uso directo si es necesario)
    authService: 'https://13wfn3bx-3001.brs.devtunnels.ms',
    gameCatalogService: 'https://13wfn3bx-3002.brs.devtunnels.ms',
    orderService: 'https://13wfn3bx-3003.brs.devtunnels.ms',
    libraryService: 'https://13wfn3bx-3004.brs.devtunnels.ms',
} as const;

/**
 * Configuración de APIs
 * Por defecto, todos los servicios usan el API Gateway
 * Si necesitas acceder directamente a un microservicio, usa las URLs individuales
 */
export const API_CONFIG = {
    // URL base para todas las peticiones (API Gateway)
    baseUrl: API_URLS.apiGateway,
    
    // Timeout para peticiones HTTP
    timeout: 30000, // 30 segundos (aumentado para Dev Tunnels)
    
    // Headers por defecto
    defaultHeaders: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    
    // Configuración de retry (útil para Dev Tunnels que pueden tener latencia)
    retry: {
        maxRetries: 3,
        retryDelay: 1000, // 1 segundo
    },
} as const;

/**
 * Endpoints específicos por servicio
 * Todos pasan a través del API Gateway
 */
export const API_ENDPOINTS = {
    // Auth Service endpoints (a través de API Gateway)
    auth: {
        login: '/api/auth/login',
        register: '/api/auth/register',
        logout: '/api/auth/logout',
        currentUser: '/api/auth/me',
        refreshToken: '/api/auth/refresh',
        adminLogin: '/api/admin/login',
        users: '/api/users',
        userById: (id: string | number) => `/api/users/${id}`,
        updateUser: (id: string | number) => `/api/users/${id}`,
        deleteUser: (id: string | number) => `/api/users/${id}`,
        notifications: '/api/notifications',
    },
    
    // Game Catalog Service endpoints
    games: {
        all: '/api/games',
        byId: (id: string | number) => `/api/games/${id}`,
        create: '/api/games',
        update: (id: string | number) => `/api/games/${id}`,
        delete: (id: string | number) => `/api/games/${id}`,
        categories: '/api/categories',
        genres: '/api/genres',
        comments: '/api/comments',
        commentByGame: (gameId: string | number) => `/api/comments/game/${gameId}`,
        ratings: '/api/ratings',
        ratingByGame: (gameId: string | number) => `/api/ratings/game/${gameId}`,
        moderator: '/api/moderator',
    },
    
    // Order Service endpoints
    orders: {
        all: '/api/orders',
        byId: (id: string | number) => `/api/orders/${id}`,
        create: '/api/orders',
        byUser: (userId: string | number) => `/api/orders/user/${userId}`,
        update: (id: string | number) => `/api/orders/${id}`,
        cancel: (id: string | number) => `/api/orders/${id}/cancel`,
    },
    
    // Library Service endpoints
    library: {
        all: '/api/library',
        byUser: (userId: string | number) => `/api/library/user/${userId}`,
        add: '/api/library',
        remove: (id: string | number) => `/api/library/${id}`,
        checkOwnership: (userId: string | number, gameId: string | number) => 
            `/api/library/user/${userId}/game/${gameId}`,
    },
} as const;

/**
 * Helper para construir URLs completas
 */
export const buildApiUrl = (endpoint: string): string => {
    // Si el endpoint ya es una URL completa, retornarlo
    if (endpoint.startsWith('http://') || endpoint.startsWith('https://')) {
        return endpoint;
    }
    
    // Construir URL completa con baseUrl
    const baseUrl = API_CONFIG.baseUrl.replace(/\/$/, ''); // Remover trailing slash
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    
    return `${baseUrl}${cleanEndpoint}`;
};

/**
 * Helper para construir URLs directas a microservicios (sin API Gateway)
 * Útil para debugging o acceso directo
 */
export const buildDirectServiceUrl = (
    service: keyof typeof API_URLS,
    endpoint: string
): string => {
    const baseUrl = API_URLS[service].replace(/\/$/, '');
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    return `${baseUrl}${cleanEndpoint}`;
};

/**
 * Exportar configuración completa
 */
export default {
    urls: API_URLS,
    config: API_CONFIG,
    endpoints: API_ENDPOINTS,
    buildUrl: buildApiUrl,
    buildDirectUrl: buildDirectServiceUrl,
};

