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

export const API = {
    baseUrl: process.env.REACT_APP_API_URL || "http://localhost:3001",
    timeout: 10000
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