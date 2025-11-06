import { Product } from '../types/Product';

// Servicio para manejar la biblioteca de juegos comprados
class LibraryService {
    private readonly STORAGE_KEY = 'steamish_library';

    // Obtener biblioteca de un usuario
    getLibrary(userId: string): Product[] {
        const libraryJson = localStorage.getItem(`${this.STORAGE_KEY}_${userId}`);
        if (!libraryJson) return [];
        
        try {
            return JSON.parse(libraryJson);
        } catch {
            return [];
        }
    }

    // Agregar juego a la biblioteca
    addToLibrary(userId: string, product: Product): void {
        const library = this.getLibrary(userId);
        const exists = library.some(item => item.id === product.id);
        
        if (!exists) {
            library.push(product);
            localStorage.setItem(`${this.STORAGE_KEY}_${userId}`, JSON.stringify(library));
        }
    }

    // Agregar múltiples juegos a la biblioteca (para compra)
    addMultipleToLibrary(userId: string, products: Product[]): void {
        const library = this.getLibrary(userId);
        products.forEach(product => {
            const exists = library.some(item => item.id === product.id);
            if (!exists) {
                library.push(product);
            }
        });
        localStorage.setItem(`${this.STORAGE_KEY}_${userId}`, JSON.stringify(library));
    }

    // Verificar si un juego está en la biblioteca
    isInLibrary(userId: string, productId: string): boolean {
        const library = this.getLibrary(userId);
        return library.some(item => item.id === productId);
    }

    // Obtener juego de la biblioteca
    getGameFromLibrary(userId: string, productId: string): Product | undefined {
        const library = this.getLibrary(userId);
        return library.find(item => item.id === productId);
    }
}

const libraryService = new LibraryService();
export default libraryService;





