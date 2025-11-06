import { User, LoginCredentials, RegisterData, UserRole } from '../types/User';

// 🔐 AuthService con localStorage para persistencia
class AuthService {
    private readonly STORAGE_KEY = 'steamish_user';

    // Obtener usuario actual del localStorage
    getCurrentUser(): User | null {
        const userJson = localStorage.getItem(this.STORAGE_KEY);
        if (!userJson) return null;
        
        try {
            const user = JSON.parse(userJson);
            return {
                ...user,
                createdAt: new Date(user.createdAt),
                updatedAt: new Date(user.updatedAt)
            };
        } catch {
            return null;
        }
    }

    // Login simulado
    async login(credentials: LoginCredentials): Promise<User> {
        // Simulación de API call
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const users = this.getStoredUsers();
        const user = users.find(
            u => u.email === credentials.email && u.password === credentials.password
        );

        if (!user) {
            throw new Error('Credenciales inválidas');
        }

        if (!user.isActive) {
            throw new Error('Tu cuenta ha sido bloqueada. Contacta al administrador para más información.');
        }

        // Guardar usuario actual (crear una copia sin las fechas como objetos Date para evitar problemas de serialización)
        const userToStore = {
            ...user,
            createdAt: user.createdAt instanceof Date ? user.createdAt.toISOString() : user.createdAt,
            updatedAt: user.updatedAt instanceof Date ? user.updatedAt.toISOString() : user.updatedAt
        };
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(userToStore));
        return user;
    }

    // Registro simulado
    async register(data: RegisterData): Promise<User> {
        // Simulación de API call
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const users = this.getStoredUsers();
        
        // Verificar si el email ya existe
        if (users.some(u => u.email === data.email)) {
            throw new Error('El email ya está registrado');
        }

        // Verificar si el username ya existe
        if (users.some(u => u.username === data.username)) {
            throw new Error('El nombre de usuario ya existe');
        }

        const newUser: User = {
            id: `user_${Date.now()}`,
            username: data.username,
            email: data.email,
            password: data.password,
            firstName: data.firstName,
            lastName: data.lastName,
            role: UserRole.USER,
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date()
        };

        // Guardar nuevo usuario
        users.push(newUser);
        // Serializar fechas correctamente antes de guardar
        const usersToStore = users.map(u => ({
            ...u,
            createdAt: u.createdAt instanceof Date ? u.createdAt.toISOString() : u.createdAt,
            updatedAt: u.updatedAt instanceof Date ? u.updatedAt.toISOString() : u.updatedAt
        }));
        localStorage.setItem('steamish_users', JSON.stringify(usersToStore));
        
        // Guardar usuario actual
        const userToStore = {
            ...newUser,
            createdAt: newUser.createdAt instanceof Date ? newUser.createdAt.toISOString() : newUser.createdAt,
            updatedAt: newUser.updatedAt instanceof Date ? newUser.updatedAt.toISOString() : newUser.updatedAt
        };
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(userToStore));
        
        return newUser;
    }

    // Logout
    async logout(): Promise<void> {
        await new Promise(resolve => setTimeout(resolve, 200));
        localStorage.removeItem(this.STORAGE_KEY);
    }

    // Obtener todos los usuarios (para estadísticas admin)
    getAllUsers(): User[] {
        return this.getStoredUsers();
    }

    // Actualizar estado de un usuario (bloquear/desbloquear)
    updateUserStatus(userId: string, isActive: boolean): void {
        const users = this.getStoredUsers();
        const userIndex = users.findIndex(u => u.id === userId);
        
        if (userIndex !== -1) {
            users[userIndex].isActive = isActive;
            users[userIndex].updatedAt = new Date();
            // Serializar fechas correctamente antes de guardar
            const usersToStore = users.map(u => ({
                ...u,
                createdAt: u.createdAt instanceof Date ? u.createdAt.toISOString() : u.createdAt,
                updatedAt: u.updatedAt instanceof Date ? u.updatedAt.toISOString() : u.updatedAt
            }));
            localStorage.setItem('steamish_users', JSON.stringify(usersToStore));
            
            // Si el usuario está bloqueado y está logueado, cerrar su sesión
            const currentUser = this.getCurrentUser();
            if (currentUser && currentUser.id === userId && !isActive) {
                localStorage.removeItem(this.STORAGE_KEY);
            }
        }
    }

    // Obtener usuarios almacenados
    private getStoredUsers(): User[] {
        const usersJson = localStorage.getItem('steamish_users');
        let users: User[] = [];

        if (!usersJson) {
            // Usuarios por defecto
            const defaultUsers: User[] = [
                {
                    id: 'admin_1',
                    username: 'admin',
                    email: 'admin@steamish.com',
                    password: 'admin123',
                    role: UserRole.ADMIN,
                    isActive: true,
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    id: 'moderator_1',
                    username: 'moderator',
                    email: 'moderator@steamish.com',
                    password: 'moderator123',
                    role: UserRole.MODERATOR,
                    isActive: true,
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    id: 'user_1',
                    username: 'demo',
                    email: 'demo@steamish.com',
                    password: 'demo123',
                    role: UserRole.USER,
                    isActive: true,
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    id: 'user_2',
                    username: 'testuser',
                    email: 'test@steamish.com',
                    password: 'test123',
                    role: UserRole.USER,
                    isActive: true,
                    createdAt: new Date(),
                    updatedAt: new Date()
                }
            ];
            // Serializar fechas correctamente antes de guardar
            const defaultUsersToStore = defaultUsers.map(u => ({
                ...u,
                createdAt: u.createdAt instanceof Date ? u.createdAt.toISOString() : u.createdAt,
                updatedAt: u.updatedAt instanceof Date ? u.updatedAt.toISOString() : u.updatedAt
            }));
            localStorage.setItem('steamish_users', JSON.stringify(defaultUsersToStore));
            return defaultUsers;
        }

        try {
            users = JSON.parse(usersJson).map((user: any) => ({
                ...user,
                createdAt: new Date(user.createdAt),
                updatedAt: new Date(user.updatedAt)
            }));
        } catch {
            users = [];
        }

        // Verificar si el moderador existe, si no, agregarlo
        const moderatorExists = users.some(u => u.email === 'moderator@steamish.com');
        if (!moderatorExists) {
            const moderator: User = {
                id: 'moderator_1',
                username: 'moderator',
                email: 'moderator@steamish.com',
                password: 'moderator123',
                role: UserRole.MODERATOR,
                isActive: true,
                createdAt: new Date(),
                updatedAt: new Date()
            };
            users.push(moderator);
            // Guardar usuarios actualizados
            const usersToStore = users.map(u => ({
                ...u,
                createdAt: u.createdAt instanceof Date ? u.createdAt.toISOString() : u.createdAt,
                updatedAt: u.updatedAt instanceof Date ? u.updatedAt.toISOString() : u.updatedAt
            }));
            localStorage.setItem('steamish_users', JSON.stringify(usersToStore));
        }

        return users;
    }
}

const authService = new AuthService();
export default authService;

