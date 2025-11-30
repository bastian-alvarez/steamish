import { LibraryItem, AddToLibraryRequest } from '../types/Library';
import { Product } from '../types/Product';
import { API } from '../config/constants';

// Servicio para manejar la biblioteca de juegos conectado al microservicio library-service
class LibraryService {
    // Obtener biblioteca de un usuario del microservicio
    async getLibrary(userId: number): Promise<LibraryItem[]> {
        try {
            const response = await fetch(`${API.libraryService}/api/library/user/${userId}`);

            if (!response.ok) {
                throw new Error('Error al obtener la biblioteca');
            }

            const data = await response.json();
            const library = data._embedded?.libraryItemResponseList || data._embedded || (Array.isArray(data) ? data : []);
            
            return library.map((item: any) => ({
                id: item.id,
                userId: item.userId,
                juegoId: item.juegoId,
                name: item.name,
                price: item.price,
                dateAdded: item.dateAdded,
                status: item.status,
                genre: item.genre
            }));
        } catch (error) {
            console.error('Error al obtener biblioteca del microservicio:', error);
            throw error;
        }
    }


    // Agregar juego a la biblioteca
    async addToLibrary(userId: number, juegoId: string | number): Promise<LibraryItem> {
        try {
            const response = await fetch(`${API.libraryService}/api/library`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId,
                    juegoId: juegoId.toString()
                })
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ message: 'Error al agregar a la biblioteca' }));
                throw new Error(errorData.message || 'Error al agregar a la biblioteca');
            }

            const data = await response.json();
            const itemData = data._embedded || data; // Manejar HATEOAS
            
            return {
                id: itemData.id,
                userId: itemData.userId,
                juegoId: itemData.juegoId,
                name: itemData.name,
                price: itemData.price,
                dateAdded: itemData.dateAdded,
                status: itemData.status,
                genre: itemData.genre
            };
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            }
            throw new Error('Error al conectar con el servidor de biblioteca');
        }
    }

    // Agregar múltiples juegos a la biblioteca (para compra)
    async addMultipleToLibrary(userId: number, juegoIds: (string | number)[]): Promise<void> {
        try {
            // Agregar cada juego individualmente
            for (const juegoId of juegoIds) {
                try {
                    await this.addToLibrary(userId, juegoId);
                } catch (error) {
                    // Si el juego ya existe, continuar con el siguiente
                    console.warn(`Juego ${juegoId} ya está en la biblioteca o hubo un error:`, error);
                }
            }
        } catch (error) {
            console.error('Error al agregar múltiples juegos a la biblioteca:', error);
            throw error;
        }
    }

    // Verificar si un juego está en la biblioteca
    async isInLibrary(userId: number, juegoId: string | number): Promise<boolean> {
        try {
            const response = await fetch(`${API.libraryService}/api/library/user/${userId}/game/${juegoId}`);

            if (!response.ok) {
                return false;
            }

            const data = await response.json();
            const ownsData = data._embedded || data; // Manejar HATEOAS
            
            return ownsData.owns === true;
        } catch (error) {
            console.error('Error al verificar si el juego está en la biblioteca:', error);
            throw error;
        }
    }


    // Eliminar juego de la biblioteca
    async removeFromLibrary(userId: number, juegoId: string | number): Promise<void> {
        try {
            const response = await fetch(`${API.libraryService}/api/library/user/${userId}/game/${juegoId}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error('Error al eliminar de la biblioteca');
            }
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            }
            throw new Error('Error al conectar con el servidor de biblioteca');
        }
    }

    // Obtener juego de la biblioteca (compatibilidad con código existente)
    async getGameFromLibrary(userId: number, juegoId: string | number): Promise<LibraryItem | undefined> {
        const library = await this.getLibrary(userId);
        return library.find(item => item.juegoId.toString() === juegoId.toString());
    }

}

const libraryService = new LibraryService();
export default libraryService;





