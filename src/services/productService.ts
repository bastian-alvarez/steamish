import { Product } from '../types/Product';
import { API } from '../config/constants';
import authService from './authService';

// Función auxiliar para mapear GameResponse a Product
const mapGameResponseToProduct = (game: any): Product => {
    return {
        id: game.id,
        name: game.nombre || game.name,
        nombre: game.nombre,
        price: game.precio || game.price,
        precio: game.precio,
        image: game.imagenUrl || game.image || '',
        imagenUrl: game.imagenUrl,
        rating: game.averageRating || game.rating || 0,
        averageRating: game.averageRating,
        ratingCount: game.ratingCount,
        discount: game.descuento || game.discount || 0,
        descuento: game.descuento,
        discountedPrice: game.discountedPrice,
        hasDiscount: game.hasDiscount || (game.descuento && game.descuento > 0),
        category: game.categoriaNombre || game.category || '',
        categoriaNombre: game.categoriaNombre,
        categoriaId: game.categoriaId,
        generoNombre: game.generoNombre,
        generoId: game.generoId,
        description: game.descripcion || game.description || '',
        descripcion: game.descripcion,
        stock: game.stock,
        activo: game.activo,
        desarrollador: game.desarrollador,
        fechaLanzamiento: game.fechaLanzamiento,
        tags: [], // No está en el microservicio
        featured: false // No está en el microservicio
    };
};

// SERVICIO COMPLETO CONECTADO AL MICROSERVICIO
const productService = {
    // Obtener todos los productos del microservicio (SOLO desde la base de datos)
    getAllProducts: async (filters?: {
        categoria?: number;
        genero?: number;
        descuento?: boolean;
        search?: string;
    }): Promise<Product[]> => {
        let url = `${API.gameCatalogService}/api/games`;
        const params = new URLSearchParams();
        
        if (filters?.categoria) params.append('categoria', filters.categoria.toString());
        if (filters?.genero) params.append('genero', filters.genero.toString());
        if (filters?.descuento !== undefined) params.append('descuento', filters.descuento.toString());
        if (filters?.search) params.append('search', filters.search);
        
        if (params.toString()) {
            url += `?${params.toString()}`;
        }

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            // No incluir credentials para evitar problemas con CORS
            credentials: 'omit',
        });
        
        if (!response.ok) {
            const errorText = await response.text().catch(() => 'Error desconocido');
            throw new Error(`Error al obtener los juegos: ${response.status} - ${errorText}`);
        }

        const data = await response.json();
        // Manejar respuesta HATEOAS
        const games = data._embedded?.gameResponseList || data._embedded || (Array.isArray(data) ? data : []);
        
        if (!Array.isArray(games) || games.length === 0) {
            console.warn('No se encontraron juegos en la base de datos');
            return [];
        }
        
        return games.map(mapGameResponseToProduct);
    },

    // Obtener producto por ID del microservicio (SOLO desde la base de datos)
    getProductById: async (id: string | number): Promise<Product | undefined> => {
        const response = await fetch(`${API.gameCatalogService}/api/games/${id}`);
        
        if (!response.ok) {
            if (response.status === 404) {
                return undefined;
            }
            const errorText = await response.text().catch(() => 'Error desconocido');
            throw new Error(`Error al obtener el juego: ${response.status} - ${errorText}`);
        }

        const data = await response.json();
        const game = data._embedded || data;
        return mapGameResponseToProduct(game);
    },

    // Obtener categorías
    getCategories: async (): Promise<any[]> => {
        try {
            const response = await fetch(`${API.gameCatalogService}/api/categories`);
            
            if (!response.ok) {
                throw new Error('Error al obtener las categorías');
            }

            const data = await response.json();
            const categories = data._embedded?.categoryList || data._embedded || (Array.isArray(data) ? data : []);
            return categories;
        } catch (error) {
            console.error('Error al obtener categorías:', error);
            return [];
        }
    },

    // Obtener géneros
    getGenres: async (): Promise<any[]> => {
        try {
            const response = await fetch(`${API.gameCatalogService}/api/genres`);
            
            if (!response.ok) {
                throw new Error('Error al obtener los géneros');
            }

            const data = await response.json();
            const genres = data._embedded?.genreList || data._embedded || (Array.isArray(data) ? data : []);
            return genres;
        } catch (error) {
            console.error('Error al obtener géneros:', error);
            return [];
        }
    },

    // Agregar nuevo producto (conectado al API)
    addProduct: async (product: Omit<Product, 'id'>): Promise<Product> => {
        const token = authService.getToken();
        if (!token) {
            throw new Error('No autenticado. Debes iniciar sesión como administrador.');
        }

        // Mapear Product a CreateGameRequest
        const createRequest = {
            nombre: product.name || product.nombre || '',
            descripcion: product.description || product.descripcion || '',
            precio: product.price || product.precio || 0,
            stock: product.stock || 0,
            imagenUrl: product.image || product.imagenUrl || '',
            desarrollador: product.desarrollador || 'Desconocido',
            fechaLanzamiento: product.fechaLanzamiento || new Date().getFullYear().toString(),
            categoriaId: product.categoriaId || 1,
            generoId: product.generoId || 1,
            descuento: product.discount || product.descuento || 0,
            activo: product.activo !== undefined ? product.activo : true
        };

        const response = await fetch(`${API.gameCatalogService}/api/admin/games`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(createRequest)
        });

        if (!response.ok) {
            const errorText = await response.text().catch(() => 'Error desconocido');
            throw new Error(`Error al crear el juego: ${response.status} - ${errorText}`);
        }

        const data = await response.json();
        const game = data._embedded || data;
        return mapGameResponseToProduct(game);
    },

    // Actualizar producto (conectado al API)
    updateProduct: async (id: string | number, product: Partial<Product>): Promise<Product> => {
        const token = authService.getToken();
        if (!token) {
            throw new Error('No autenticado. Debes iniciar sesión como administrador.');
        }

        // Mapear Product a UpdateGameRequest
        const updateRequest: any = {};
        if (product.name || product.nombre) updateRequest.nombre = product.name || product.nombre;
        if (product.description || product.descripcion) updateRequest.descripcion = product.description || product.descripcion;
        if (product.price !== undefined || product.precio !== undefined) updateRequest.precio = product.price || product.precio;
        if (product.stock !== undefined) updateRequest.stock = product.stock;
        if (product.image || product.imagenUrl) updateRequest.imagenUrl = product.image || product.imagenUrl;
        if (product.desarrollador) updateRequest.desarrollador = product.desarrollador;
        if (product.fechaLanzamiento) updateRequest.fechaLanzamiento = product.fechaLanzamiento;
        if (product.categoriaId !== undefined) updateRequest.categoriaId = product.categoriaId;
        if (product.generoId !== undefined) updateRequest.generoId = product.generoId;
        if (product.discount !== undefined || product.descuento !== undefined) updateRequest.descuento = product.discount || product.descuento;
        if (product.activo !== undefined) updateRequest.activo = product.activo;

        const response = await fetch(`${API.gameCatalogService}/api/admin/games/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(updateRequest)
        });

        if (!response.ok) {
            const errorText = await response.text().catch(() => 'Error desconocido');
            throw new Error(`Error al actualizar el juego: ${response.status} - ${errorText}`);
        }

        const data = await response.json();
        const game = data._embedded || data;
        return mapGameResponseToProduct(game);
    },

    // Eliminar producto (conectado al API)
    deleteProduct: async (id: string | number): Promise<boolean> => {
        const token = authService.getToken();
        if (!token) {
            throw new Error('No autenticado. Debes iniciar sesión como administrador.');
        }

        const response = await fetch(`${API.gameCatalogService}/api/admin/games/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            if (response.status === 404) {
                return false;
            }
            const errorText = await response.text().catch(() => 'Error desconocido');
            throw new Error(`Error al eliminar el juego: ${response.status} - ${errorText}`);
        }

        return true;
    }
};

export default productService;
