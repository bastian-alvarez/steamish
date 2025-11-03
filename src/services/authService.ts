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
            throw new Error('Usuario inactivo');
        }

        // Guardar usuario actual
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
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
        localStorage.setItem('steamish_users', JSON.stringify(users));
        
        // Guardar usuario actual
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(newUser));
        
        return newUser;
    }

    // Logout
    async logout(): Promise<void> {
        await new Promise(resolve => setTimeout(resolve, 200));
        localStorage.removeItem(this.STORAGE_KEY);
    }

    // Obtener usuarios almacenados
    private getStoredUsers(): User[] {
        const usersJson = localStorage.getItem('steamish_users');
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
                    id: 'user_1',
                    username: 'demo',
                    email: 'demo@steamish.com',
                    password: 'demo123',
                    role: UserRole.USER,
                    isActive: true,
                    createdAt: new Date(),
                    updatedAt: new Date()
                }
            ];
            localStorage.setItem('steamish_users', JSON.stringify(defaultUsers));
            return defaultUsers;
        }

        try {
            return JSON.parse(usersJson).map((user: any) => ({
                ...user,
                createdAt: new Date(user.createdAt),
                updatedAt: new Date(user.updatedAt)
            }));
        } catch {
            return [];
        }
    }
}

export default new AuthService();

