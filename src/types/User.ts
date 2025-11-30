export interface User {
    id: string | number; // El microservicio usa Long (number)
    username?: string; // No está en UserResponse, se mantiene para compatibilidad
    name?: string; // name en UserResponse
    email: string;
    password?: string; // No se devuelve en las respuestas del API
    firstName?: string; // No está en UserResponse
    lastName?: string; // No está en UserResponse
    phone?: string; // phone en UserResponse
    avatar?: string; // profilePhotoUri en UserResponse
    profilePhotoUri?: string; // Alias para avatar
    role?: UserRole; // No está en UserResponse, se infiere del token
    isActive?: boolean; // isBlocked en UserResponse (invertido)
    isBlocked?: boolean; // Campo del microservicio
    gender?: string; // gender en UserResponse
    createdAt?: Date; // No está en UserResponse
    updatedAt?: Date; // No está en UserResponse
    token?: string; // Token JWT del AuthResponse
    tokenType?: string; // Tipo de token (Bearer)
    expiresIn?: number; // Tiempo de expiración del token
}

export enum UserRole {
    USER = 'user',
    ADMIN = 'admin',
    MODERATOR = 'moderator'
}

export interface UserProfile {
    id: string;
    username: string;
    email: string;
    firstName?: string;
    lastName?: string;
    avatar?: string;
    role: UserRole;
    createdAt: Date;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterData {
    username: string;
    email: string;
    password: string;
    phone?: string;
    firstName?: string;
    lastName?: string;
    gender?: string;
}
