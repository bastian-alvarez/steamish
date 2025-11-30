import { User } from '../types/User';
import { API } from '../config/constants';
import authService from './authService';

export interface UpdateUserRequest {
    name?: string;
    email?: string;
    phone?: string;
    gender?: string;
}

class AdminService {
    // Obtener todos los usuarios
    async getAllUsers(): Promise<User[]> {
        try {
            const token = authService.getToken();
            if (!token) {
                throw new Error('No autenticado. Debes iniciar sesión como administrador.');
            }

            const response = await fetch(`${API.authService}/api/admin/users`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Error al obtener los usuarios');
            }

            const data = await response.json();
            let users: any[] = [];
            if (data._embedded) {
                users = data._embedded.userResponseList || data._embedded || [];
            } else if (Array.isArray(data)) {
                users = data;
            } else if (data.content) {
                users = data.content;
            }

            return users.map((user: any) => this.mapUserResponseToUser(user));
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            }
            throw new Error('Error al conectar con el servidor');
        }
    }

    // Obtener usuario por ID
    async getUserById(userId: number): Promise<User> {
        try {
            const token = authService.getToken();
            if (!token) {
                throw new Error('No autenticado. Debes iniciar sesión como administrador.');
            }

            const response = await fetch(`${API.authService}/api/admin/users/${userId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error('Usuario no encontrado');
                }
                throw new Error('Error al obtener el usuario');
            }

            const data = await response.json();
            const userData = data._embedded || data;
            return this.mapUserResponseToUser(userData);
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            }
            throw new Error('Error al obtener el usuario');
        }
    }

    // Actualizar usuario
    async updateUser(userId: number, request: UpdateUserRequest): Promise<User> {
        try {
            const token = authService.getToken();
            if (!token) {
                throw new Error('No autenticado. Debes iniciar sesión como administrador.');
            }

            const response = await fetch(`${API.authService}/api/admin/users/${userId}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(request)
            });

            if (!response.ok) {
                const errorText = await response.text().catch(() => 'Error al actualizar el usuario');
                throw new Error(errorText);
            }

            const data = await response.json();
            const userData = data._embedded || data;
            return this.mapUserResponseToUser(userData);
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            }
            throw new Error('Error al actualizar el usuario');
        }
    }

    // Eliminar usuario
    async deleteUser(userId: number): Promise<boolean> {
        try {
            const token = authService.getToken();
            if (!token) {
                throw new Error('No autenticado. Debes iniciar sesión como administrador.');
            }

            const response = await fetch(`${API.authService}/api/admin/users/${userId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            return response.ok;
        } catch (error) {
            console.error('Error al eliminar usuario:', error);
            return false;
        }
    }

    // Bloquear usuario
    async blockUser(userId: number): Promise<User> {
        try {
            const token = authService.getToken();
            if (!token) {
                throw new Error('No autenticado. Debes iniciar sesión como administrador.');
            }

            const response = await fetch(`${API.authService}/api/admin/users/${userId}/block`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Error al bloquear el usuario');
            }

            const data = await response.json();
            const userData = data._embedded || data;
            return this.mapUserResponseToUser(userData);
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            }
            throw new Error('Error al bloquear el usuario');
        }
    }

    // Desbloquear usuario
    async unblockUser(userId: number): Promise<User> {
        try {
            const token = authService.getToken();
            if (!token) {
                throw new Error('No autenticado. Debes iniciar sesión como administrador.');
            }

            const response = await fetch(`${API.authService}/api/admin/users/${userId}/unblock`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Error al desbloquear el usuario');
            }

            const data = await response.json();
            const userData = data._embedded || data;
            return this.mapUserResponseToUser(userData);
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            }
            throw new Error('Error al desbloquear el usuario');
        }
    }

    // Mapear UserResponse a User
    private mapUserResponseToUser(userData: any): User {
        return {
            id: userData.id,
            name: userData.name,
            username: userData.name,
            email: userData.email,
            phone: userData.phone,
            profilePhotoUri: userData.profilePhotoUri,
            avatar: userData.profilePhotoUri,
            isBlocked: userData.isBlocked || false,
            isActive: !userData.isBlocked,
            gender: userData.gender,
            role: userData.role === 'ADMIN' ? 'ADMIN' : 'USER',
            createdAt: userData.createdAt ? new Date(userData.createdAt) : undefined,
            updatedAt: userData.updatedAt ? new Date(userData.updatedAt) : undefined
        };
    }
}

export default new AdminService();

