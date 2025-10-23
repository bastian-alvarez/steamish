// 📝 Constants Simplificados
export const APP = {
    name: "Steamish",
    version: "1.0.0",
    currency: "$"
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