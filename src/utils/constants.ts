// API Configuration
export const API_CONFIG = {
    BASE_URL: process.env.REACT_APP_API_URL || "http://localhost:3001",
    TIMEOUT: 10000,
    VERSION: "v1"
} as const;

// Application Settings
export const APP_CONFIG = {
    NAME: "Steamish",
    VERSION: "1.0.0",
    DESCRIPTION: "Tu tienda de videojuegos favorita",
    DEFAULT_LANGUAGE: "es",
    SUPPORTED_LANGUAGES: ["es", "en", "fr", "de"],
    CURRENCY: "USD",
    CURRENCY_SYMBOL: "$"
} as const;

// Cart Configuration
export const CART_CONFIG = {
    DEFAULT_COUNT: 0,
    DEFAULT_TOTAL: 0.00,
    MAX_QUANTITY_PER_ITEM: 10,
    STORAGE_KEY: "steamish_cart"
} as const;

// Authentication
export const AUTH_CONFIG = {
    TOKEN_KEY: "authToken",
    USER_KEY: "currentUser",
    SESSION_TIMEOUT: 24 * 60 * 60 * 1000, // 24 horas en ms
} as const;

// UI Constants
export const UI_CONFIG = {
    PRODUCT_CARD_IMAGE_HEIGHT: 200,
    PRODUCTS_PER_PAGE: 12,
    DESCRIPTION_MAX_LENGTH: 120,
    TOAST_DURATION: 3000
} as const;

// Routes
export const ROUTES = {
    HOME: "/",
    PRODUCTS: "/productos",
    BLOGS: "/blogs",
    ABOUT: "/nosotros",
    CONTACT: "/contacto",
    LOGIN: "/login",
    REGISTER: "/registro",
    ADMIN: "/admin"
} as const;