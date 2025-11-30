import { User, LoginCredentials, RegisterData, UserRole } from '../types/User';
import { API } from '../config/constants';

// 🔐 AuthService conectado al microservicio auth-service
class AuthService {
    private readonly STORAGE_KEY = 'steamish_user';
    private readonly STORAGE_TOKEN_KEY = 'steamish_token';

    // Obtener token JWT del localStorage
    getToken(): string | null {
        return localStorage.getItem(this.STORAGE_TOKEN_KEY);
    }

    // Guardar token JWT
    private setToken(token: string): void {
        localStorage.setItem(this.STORAGE_TOKEN_KEY, token);
    }

    // Obtener usuario actual del localStorage
    getCurrentUser(): User | null {
        const userJson = localStorage.getItem(this.STORAGE_KEY);
        if (!userJson) return null;
        
        try {
            const user = JSON.parse(userJson);
            // Asegurar que el rol se parsea correctamente al enum
            let parsedRole: UserRole | undefined = undefined;
            if (user.role) {
                // Si el rol es una cadena, convertirla al enum
                if (typeof user.role === 'string') {
                    const roleLower = user.role.toLowerCase();
                    if (roleLower === 'admin' || roleLower === UserRole.ADMIN) {
                        parsedRole = UserRole.ADMIN;
                    } else if (roleLower === 'moderator' || roleLower === UserRole.MODERATOR) {
                        parsedRole = UserRole.MODERATOR;
                    } else {
                        parsedRole = UserRole.USER;
                    }
                } else {
                    parsedRole = user.role;
                }
            }
            
            // Debug log (temporal)
            console.log('Parsing user from localStorage:', {
                originalRole: user.role,
                parsedRole: parsedRole,
                roleType: typeof user.role
            });
            
            return {
                ...user,
                role: parsedRole,
                createdAt: user.createdAt ? new Date(user.createdAt) : undefined,
                updatedAt: user.updatedAt ? new Date(user.updatedAt) : undefined
            };
        } catch {
            return null;
        }
    }

    // Login conectado al microservicio
    async login(credentials: LoginCredentials, isAdmin: boolean = false): Promise<User> {
        try {
            const endpoint = isAdmin ? '/api/auth/admin/login' : '/api/auth/login';
            const response = await fetch(`${API.authService}${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: credentials.email,
                    password: credentials.password
                })
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ message: 'Error en el login' }));
                throw new Error(errorData.message || 'Credenciales inválidas');
            }

            const data = await response.json();
            const authResponse = data._embedded ? data._embedded : data; // Manejar HATEOAS
            
            // Extraer datos del usuario y token
            const userData = authResponse.user || authResponse;
            const token = authResponse.token || data.token;
            
            if (token) {
                this.setToken(token);
            }

            // Mapear UserResponse a User
            const user: User = {
                id: userData.id,
                name: userData.name,
                email: userData.email,
                phone: userData.phone,
                profilePhotoUri: userData.profilePhotoUri,
                avatar: userData.profilePhotoUri,
                isBlocked: userData.isBlocked,
                isActive: !userData.isBlocked,
                gender: userData.gender,
                token: token,
                tokenType: authResponse.tokenType || 'Bearer',
                expiresIn: authResponse.expiresIn,
                // Inferir rol basado en el endpoint usado
                role: isAdmin ? UserRole.ADMIN : UserRole.USER
            };

            // Guardar usuario actual (asegurar que el rol se guarde como string para compatibilidad)
            const userToStore = {
                ...user,
                role: isAdmin ? 'admin' : 'user' // Guardar como string para compatibilidad
            };
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(userToStore));
            
            // Retornar con el enum correcto
            return user;
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            }
            throw new Error('Error al conectar con el servidor de autenticación');
        }
    }

    // Registro conectado al microservicio
    async register(data: RegisterData): Promise<User> {
        try {
            const response = await fetch(`${API.authService}/api/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: data.username || data.firstName || data.email.split('@')[0],
                    email: data.email,
                    password: data.password,
                    phone: data.phone && data.phone.trim() !== '' ? data.phone : '0000000000', // El microservicio requiere phone, usar valor por defecto si no se proporciona
                    gender: data.gender || ''
                })
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ message: 'Error en el registro' }));
                throw new Error(errorData.message || 'Error al registrar usuario');
            }

            const dataResponse = await response.json();
            const authResponse = dataResponse._embedded ? dataResponse._embedded : dataResponse; // Manejar HATEOAS
            
            // Extraer datos del usuario y token
            const userData = authResponse.user || authResponse;
            const token = authResponse.token || dataResponse.token;
            
            if (token) {
                this.setToken(token);
            }

            // Mapear UserResponse a User
            const user: User = {
                id: userData.id,
                name: userData.name,
                username: data.username,
                email: userData.email,
                phone: userData.phone,
                profilePhotoUri: userData.profilePhotoUri,
                avatar: userData.profilePhotoUri,
                isBlocked: userData.isBlocked,
                isActive: !userData.isBlocked,
                gender: userData.gender,
                token: token,
                tokenType: authResponse.tokenType || 'Bearer',
                expiresIn: authResponse.expiresIn,
                role: UserRole.USER
            };

            // Guardar usuario actual
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
            return user;
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            }
            throw new Error('Error al conectar con el servidor de autenticación');
        }
    }

    // Logout
    async logout(): Promise<void> {
        localStorage.removeItem(this.STORAGE_KEY);
        localStorage.removeItem(this.STORAGE_TOKEN_KEY);
    }

    // Obtener headers con autenticación
    getAuthHeaders(): HeadersInit {
        const token = this.getToken();
        const headers: HeadersInit = {
            'Content-Type': 'application/json',
        };
        
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
        
        return headers;
    }

    // Obtener perfil de usuario desde el servidor
    async getProfile(userId: number): Promise<User> {
        try {
            const response = await fetch(`${API.authService}/api/users/me?userId=${userId}`, {
                headers: this.getAuthHeaders()
            });

            if (!response.ok) {
                throw new Error('Error al obtener el perfil');
            }

            const data = await response.json();
            const userData = data._embedded || data;
            
            const user: User = {
                id: userData.id,
                name: userData.name,
                email: userData.email,
                phone: userData.phone,
                profilePhotoUri: userData.profilePhotoUri,
                avatar: userData.profilePhotoUri,
                isBlocked: userData.isBlocked,
                isActive: !userData.isBlocked,
                gender: userData.gender,
                role: userData.role === 'ADMIN' ? UserRole.ADMIN : UserRole.USER
            };

            // Actualizar usuario en localStorage
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
            return user;
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            }
            throw new Error('Error al conectar con el servidor');
        }
    }

    // Actualizar foto de perfil (URL)
    async updateProfilePhoto(userId: number, photoUrl: string): Promise<User> {
        try {
            const response = await fetch(`${API.authService}/api/users/me/photo?userId=${userId}`, {
                method: 'PUT',
                headers: this.getAuthHeaders(),
                body: JSON.stringify({ profilePhotoUri: photoUrl })
            });

            if (!response.ok) {
                throw new Error('Error al actualizar la foto de perfil');
            }

            const data = await response.json();
            const userData = data._embedded || data;
            
            const user: User = {
                id: userData.id,
                name: userData.name,
                email: userData.email,
                phone: userData.phone,
                profilePhotoUri: userData.profilePhotoUri,
                avatar: userData.profilePhotoUri,
                isBlocked: userData.isBlocked,
                isActive: !userData.isBlocked,
                gender: userData.gender,
                role: userData.role === 'ADMIN' ? UserRole.ADMIN : UserRole.USER
            };

            // Actualizar usuario en localStorage
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
            return user;
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            }
            throw new Error('Error al actualizar la foto de perfil');
        }
    }

    // Subir foto de perfil (archivo)
    async uploadProfilePhoto(userId: number, file: File): Promise<User> {
        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('userId', userId.toString());

            const token = this.getToken();
            const headers: HeadersInit = {};
            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
            }

            const response = await fetch(`${API.authService}/api/users/me/photo/upload?userId=${userId}`, {
                method: 'POST',
                headers,
                body: formData
            });

            if (!response.ok) {
                const errorText = await response.text().catch(() => 'Error al subir la foto');
                throw new Error(errorText);
            }

            const data = await response.json();
            const userData = data._embedded || data;
            
            const user: User = {
                id: userData.id,
                name: userData.name,
                email: userData.email,
                phone: userData.phone,
                profilePhotoUri: userData.profilePhotoUri,
                avatar: userData.profilePhotoUri,
                isBlocked: userData.isBlocked,
                isActive: !userData.isBlocked,
                gender: userData.gender,
                role: userData.role === 'ADMIN' ? UserRole.ADMIN : UserRole.USER
            };

            // Actualizar usuario en localStorage
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
            return user;
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            }
            throw new Error('Error al subir la foto de perfil');
        }
    }

    // Cambiar contraseña
    async changePassword(userId: number, currentPassword: string, newPassword: string): Promise<void> {
        try {
            const response = await fetch(`${API.authService}/api/users/${userId}/password`, {
                method: 'PUT',
                headers: this.getAuthHeaders(),
                body: JSON.stringify({
                    currentPassword,
                    newPassword
                })
            });

            if (!response.ok) {
                const errorText = await response.text().catch(() => 'Error al cambiar la contraseña');
                throw new Error(errorText);
            }
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            }
            throw new Error('Error al cambiar la contraseña');
        }
    }
}

export default new AuthService();

