import { User, LoginCredentials, RegisterData, UserRole } from '../types/User';
import { API } from '../config/constants';

// 🔐 AuthService conectado al microservicio auth-service
class AuthService {
    private readonly STORAGE_KEY = 'steamish_user';
    private readonly STORAGE_TOKEN_KEY = 'steamish_token';

    // Decodificar JWT token para obtener el rol del usuario
    private decodeJWT(token: string): any {
        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(
                atob(base64)
                    .split('')
                    .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                    .join('')
            );
            return JSON.parse(jsonPayload);
        } catch (error) {
            console.error('Error al decodificar JWT:', error);
            return null;
        }
    }

    // Obtener rol del usuario desde el token JWT o desde los datos del usuario
    private getUserRole(userData: any, token?: string): UserRole {
        // Primero intentar obtener el rol desde userData (viene de la base de datos)
        if (userData.role) {
            const role = userData.role.toString().toUpperCase();
            if (role === 'ADMIN' || role === UserRole.ADMIN.toUpperCase()) {
                return UserRole.ADMIN;
            } else if (role === 'MODERATOR' || role === UserRole.MODERATOR.toUpperCase()) {
                return UserRole.MODERATOR;
            }
        }

        // Si no está en userData, intentar obtenerlo del JWT token
        if (token) {
            const decoded = this.decodeJWT(token);
            if (decoded) {
                const role = decoded.role || decoded.authorities?.[0] || decoded.authority;
                if (role) {
                    const roleUpper = role.toString().toUpperCase();
                    if (roleUpper === 'ADMIN' || roleUpper === 'ROLE_ADMIN') {
                        return UserRole.ADMIN;
                    } else if (roleUpper === 'MODERATOR' || roleUpper === 'ROLE_MODERATOR') {
                        return UserRole.MODERATOR;
                    }
                }
            }
        }

        // Por defecto, retornar USER
        return UserRole.USER;
    }

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

    // Login conectado al microservicio - obtiene el rol real desde la base de datos
    async login(credentials: LoginCredentials, isAdmin: boolean = false): Promise<User> {
        try {
            // Intentar primero con el endpoint normal (funciona para usuarios y admins)
            // El servidor debe retornar el rol real del usuario desde la base de datos
            let endpoint = '/api/auth/login';
            let response = await fetch(`${API.authService}${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: credentials.email,
                    password: credentials.password
                })
            });

            // Si falla con el endpoint normal y se especificó isAdmin, intentar con el endpoint de admin
            if (!response.ok && isAdmin) {
                endpoint = '/api/auth/admin/login';
                response = await fetch(`${API.authService}${endpoint}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: credentials.email,
                        password: credentials.password
                    })
                });
            }

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

            // Obtener el rol real desde la base de datos (userData.role) o desde el JWT token
            const userRole = this.getUserRole(userData, token);

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
                // Usar el rol real desde la base de datos
                role: userRole
            };

            // Guardar usuario actual con el rol real
            const userToStore = {
                ...user,
                role: userRole === UserRole.ADMIN ? 'admin' : 
                      userRole === UserRole.MODERATOR ? 'moderator' : 'user'
            };
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(userToStore));
            
            // Log para debugging
            console.log('Login exitoso - Rol obtenido desde la base de datos:', {
                email: user.email,
                role: userRole,
                roleFromUserData: userData.role,
                tokenDecoded: token ? this.decodeJWT(token) : null
            });
            
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
            const token = this.getToken();
            
            // Obtener el rol real desde la base de datos
            const userRole = this.getUserRole(userData, token || undefined);
            
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
                role: userRole
            };

            // Actualizar usuario en localStorage con el rol real
            const userToStore = {
                ...user,
                role: userRole === UserRole.ADMIN ? 'admin' : 
                      userRole === UserRole.MODERATOR ? 'moderator' : 'user'
            };
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(userToStore));
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
            const token = this.getToken();
            
            // Obtener el rol real desde la base de datos
            const userRole = this.getUserRole(userData, token || undefined);
            
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
                role: userRole
            };

            // Actualizar usuario en localStorage con el rol real
            const userToStore = {
                ...user,
                role: userRole === UserRole.ADMIN ? 'admin' : 
                      userRole === UserRole.MODERATOR ? 'moderator' : 'user'
            };
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(userToStore));
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
            
            // Obtener el rol real desde la base de datos
            const userRole = this.getUserRole(userData, token || undefined);
            
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
                role: userRole
            };

            // Actualizar usuario en localStorage con el rol real
            const userToStore = {
                ...user,
                role: userRole === UserRole.ADMIN ? 'admin' : 
                      userRole === UserRole.MODERATOR ? 'moderator' : 'user'
            };
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(userToStore));
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

