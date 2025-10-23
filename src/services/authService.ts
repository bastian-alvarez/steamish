import { User, UserRole, LoginCredentials, RegisterData } from '../types/User';

// Mock users for development
const mockUsers: User[] = [
    {
        id: '1',
        username: 'admin',
        email: 'admin@steamish.com',
        password: 'admin123', // En producción esto estaría hasheado
        role: UserRole.ADMIN,
        isActive: true,
        createdAt: new Date('2023-01-01'),
        updatedAt: new Date('2023-01-01')
    },
    {
        id: '2',
        username: 'user',
        email: 'user@steamish.com',
        password: 'user123', // En producción esto estaría hasheado
        role: UserRole.USER,
        isActive: true,
        createdAt: new Date('2023-01-02'),
        updatedAt: new Date('2023-01-02')
    }
];

const authService = {
    login: async (credentials: LoginCredentials): Promise<User> => {
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simular delay de red
        
        const user = mockUsers.find(u => 
            u.email === credentials.email && u.password === credentials.password
        );
        
        if (!user) {
            throw new Error('Credenciales inválidas');
        }
        
        // Guardar token en localStorage (simplificado)
        localStorage.setItem('authToken', `token-${user.id}`);
        localStorage.setItem('currentUser', JSON.stringify(user));
        
        return user;
    },

    register: async (userData: RegisterData): Promise<User> => {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Verificar si el email ya existe
        const existingUser = mockUsers.find(u => u.email === userData.email);
        if (existingUser) {
            throw new Error('El email ya está registrado');
        }
        
        const newUser: User = {
            id: Date.now().toString(),
            username: userData.username,
            email: userData.email,
            password: userData.password, // En producción esto estaría hasheado
            firstName: userData.firstName,
            lastName: userData.lastName,
            role: UserRole.USER,
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date()
        };
        
        mockUsers.push(newUser);
        localStorage.setItem('authToken', `token-${newUser.id}`);
        localStorage.setItem('currentUser', JSON.stringify(newUser));
        
        return newUser;
    },

    logout: async (): Promise<void> => {
        await new Promise(resolve => setTimeout(resolve, 500));
        localStorage.removeItem('authToken');
        localStorage.removeItem('currentUser');
    },

    getCurrentUser: (): User | null => {
        const userStr = localStorage.getItem('currentUser');
        const token = localStorage.getItem('authToken');
        
        if (!userStr || !token) {
            return null;
        }
        
        try {
            return JSON.parse(userStr);
        } catch {
            return null;
        }
    },

    isAuthenticated: (): boolean => {
        return !!localStorage.getItem('authToken');
    }
};

export default authService;