import { Product } from '../types/Product';
import { getAvatarPorNombre } from '../mock-data/juegosMocks';

const STORAGE_KEY = 'steamish_custom_products';
const DELETED_GAMES_KEY = 'steamish_deleted_games';

// DATOS COMPLETOS CON IMÁGENES REALES DEL MOCK - TODOS LOS JUEGOS INICIALES
const defaultGames: Product[] = [
    { 
        id: '1', 
        name: 'Cyberpunk 2077', 
        price: 59.99, 
        image: getAvatarPorNombre('Cyberpunk 2077'), 
        rating: 4.2, 
        discount: 15,
        category: 'Acción',
        description: 'Un RPG de acción en un mundo abierto futurista con una historia inmersiva',
        tags: ['Acción', 'RPG', 'Futurista', 'Mundo Abierto'],
        featured: true
    },
    { 
        id: '2', 
        name: 'The Witcher 3', 
        price: 39.99, 
        image: getAvatarPorNombre('The Witcher 3'), 
        rating: 4.8, 
        discount: 20,
        category: 'Aventura',
        description: 'Aventura épica de fantasía con decisiones que importan y un mundo lleno de misterios',
        tags: ['Aventura', 'RPG', 'Fantasía', 'Historia'],
        featured: true
    },
    { 
        id: '3', 
        name: 'Minecraft', 
        price: 26.95, 
        image: getAvatarPorNombre('Minecraft'), 
        rating: 4.5, 
        discount: 0,
        category: 'Simulación',
        description: 'Construye, explora y sobrevive en un mundo infinito de bloques',
        tags: ['Simulación', 'Construcción', 'Creatividad', 'Supervivencia'],
        featured: false
    },
    { 
        id: '4', 
        name: 'GTA V', 
        price: 29.99, 
        image: getAvatarPorNombre('GTA V'), 
        rating: 4.6, 
        discount: 25,
        category: 'Acción',
        description: 'Mundo abierto lleno de acción, crimen y aventuras en Los Santos',
        tags: ['Acción', 'Mundo Abierto', 'Crimen', 'Multijugador'],
        featured: true
    },
    { 
        id: '5', 
        name: 'Elden Ring', 
        price: 69.99, 
        image: getAvatarPorNombre('Elden Ring'), 
        rating: 4.9, 
        discount: 10,
        category: 'Aventura',
        description: 'Aventura souls-like épica en un mundo abierto lleno de misterios y desafíos',
        tags: ['Aventura', 'RPG', 'Souls-like', 'Desafío'],
        featured: true
    },
    { 
        id: '6', 
        name: 'Spider-Man', 
        price: 49.99, 
        image: getAvatarPorNombre('Spider-Man'), 
        rating: 4.7, 
        discount: 30,
        category: 'Acción',
        description: 'Vive las aventuras del hombre araña en Nueva York con gráficos espectaculares',
        tags: ['Acción', 'Superhéroes', 'Aventura', 'Historia'],
        featured: false
    },
    { 
        id: '7', 
        name: 'Red Dead Redemption 2', 
        price: 59.99, 
        image: getAvatarPorNombre('Red Dead Redemption 2'), 
        rating: 4.9, 
        discount: 20,
        category: 'Aventura',
        description: 'Vive la épica historia del oeste en este mundo abierto increíblemente detallado',
        tags: ['Aventura', 'Mundo Abierto', 'Historia', 'Oeste'],
        featured: true
    },
    { 
        id: '8', 
        name: 'Horizon Zero Dawn', 
        price: 49.99, 
        image: getAvatarPorNombre('Horizon Zero Dawn'), 
        rating: 4.6, 
        discount: 15,
        category: 'Aventura',
        description: 'Explora un mundo post-apocalíptico lleno de máquinas y misterios',
        tags: ['Aventura', 'Mundo Abierto', 'Ciencia Ficción', 'Acción'],
        featured: false
    },
    { 
        id: '9', 
        name: 'God of War', 
        price: 49.99, 
        image: getAvatarPorNombre('God of War'), 
        rating: 4.9, 
        discount: 25,
        category: 'Acción',
        description: 'La épica aventura de Kratos y Atreus en el mundo nórdico',
        tags: ['Acción', 'Aventura', 'Historia', 'Mitología'],
        featured: true
    },
    { 
        id: '10', 
        name: 'Assassin\'s Creed Valhalla', 
        price: 59.99, 
        image: getAvatarPorNombre('Assassin\'s Creed Valhalla'), 
        rating: 4.5, 
        discount: 30,
        category: 'Aventura',
        description: 'Conviértete en un guerrero vikingo en este mundo abierto épico',
        tags: ['Aventura', 'Mundo Abierto', 'Historia', 'Vikingos'],
        featured: false
    },
    { 
        id: '11', 
        name: 'FIFA 24', 
        price: 69.99, 
        image: getAvatarPorNombre('FIFA 24'), 
        rating: 4.3, 
        discount: 10,
        category: 'Deportes',
        description: 'El juego de fútbol más realista con los mejores equipos y jugadores',
        tags: ['Deportes', 'Fútbol', 'Multijugador', 'Realista'],
        featured: false
    },
    { 
        id: '12', 
        name: 'Call of Duty: Modern Warfare', 
        price: 69.99, 
        image: getAvatarPorNombre('Call of Duty: Modern Warfare'), 
        rating: 4.4, 
        discount: 20,
        category: 'Acción',
        description: 'Guerra moderna con campaña épica y multijugador competitivo',
        tags: ['Acción', 'FPS', 'Multijugador', 'Guerra'],
        featured: true
    },
    { 
        id: '13', 
        name: 'Fortnite', 
        price: 0, 
        image: getAvatarPorNombre('Fortnite'), 
        rating: 4.2, 
        discount: 0,
        category: 'Battle Royale',
        description: 'Battle royale gratuito con construcción y acción constante',
        tags: ['Battle Royale', 'Gratuito', 'Multijugador', 'Construcción'],
        featured: false
    },
    { 
        id: '14', 
        name: 'Among Us', 
        price: 4.99, 
        image: getAvatarPorNombre('Among Us'), 
        rating: 4.0, 
        discount: 40,
        category: 'Estrategia',
        description: 'Encuentra al impostor en esta divertida experiencia multijugador',
        tags: ['Estrategia', 'Multijugador', 'Misterio', 'Social'],
        featured: false
    },
    { 
        id: '15', 
        name: 'Valorant', 
        price: 0, 
        image: getAvatarPorNombre('Valorant'), 
        rating: 4.5, 
        discount: 0,
        category: 'Acción',
        description: 'FPS táctico gratuito con agentes únicos y habilidades especiales',
        tags: ['FPS', 'Gratuito', 'Multijugador', 'Competitivo'],
        featured: true
    },
    { 
        id: '16', 
        name: 'League of Legends', 
        price: 0, 
        image: getAvatarPorNombre('League of Legends'), 
        rating: 4.3, 
        discount: 0,
        category: 'MOBA',
        description: 'El MOBA más popular del mundo con más de 150 campeones únicos',
        tags: ['MOBA', 'Gratuito', 'Multijugador', 'Competitivo'],
        featured: false
    },
    { 
        id: '17', 
        name: 'Overwatch 2', 
        price: 0, 
        image: getAvatarPorNombre('Overwatch 2'), 
        rating: 4.1, 
        discount: 0,
        category: 'Acción',
        description: 'Hero shooter gratuito con héroes únicos y combates épicos',
        tags: ['FPS', 'Gratuito', 'Multijugador', 'Héroes'],
        featured: false
    },
    { 
        id: '18', 
        name: 'Fall Guys', 
        price: 0, 
        image: getAvatarPorNombre('Fall Guys'), 
        rating: 4.0, 
        discount: 0,
        category: 'Battle Royale',
        description: 'Battle royale divertido con minijuegos y eliminaciones',
        tags: ['Battle Royale', 'Gratuito', 'Multijugador', 'Divertido'],
        featured: false
    },
    { 
        id: '19', 
        name: 'Rocket League', 
        price: 0, 
        image: getAvatarPorNombre('Rocket League'), 
        rating: 4.6, 
        discount: 0,
        category: 'Deportes',
        description: 'Fútbol con coches: combina fútbol y carreras en este juego único',
        tags: ['Deportes', 'Gratuito', 'Multijugador', 'Único'],
        featured: false
    }
];

// Obtener productos personalizados del localStorage
const getCustomProducts = (): Product[] => {
    const customJson = localStorage.getItem(STORAGE_KEY);
    if (!customJson) return [];
    try {
        return JSON.parse(customJson);
    } catch {
        return [];
    }
};

// Obtener IDs de juegos eliminados
const getDeletedGamesIds = (): string[] => {
    const deletedJson = localStorage.getItem(DELETED_GAMES_KEY);
    if (!deletedJson) return [];
    try {
        return JSON.parse(deletedJson);
    } catch {
        return [];
    }
};

// Guardar productos personalizados en localStorage
const saveCustomProducts = (products: Product[]): void => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
};

// Guardar IDs de juegos eliminados
const saveDeletedGamesIds = (ids: string[]): void => {
    localStorage.setItem(DELETED_GAMES_KEY, JSON.stringify(ids));
};

// SERVICIO COMPLETO CON CRUD
const productService = {
    // Obtener todos los productos (combinando iniciales + personalizados, excluyendo eliminados)
    getAllProducts: (): Product[] => {
        const customProducts = getCustomProducts();
        const deletedIds = getDeletedGamesIds();
        // Filtrar juegos iniciales que no han sido eliminados
        const activeDefaultGames = defaultGames.filter(game => !deletedIds.includes(game.id));
        return [...activeDefaultGames, ...customProducts];
    },

    // Agregar nuevo producto
    addProduct: (product: Omit<Product, 'id'>): Product => {
        const customProducts = getCustomProducts();
        const newId = `custom_${Date.now()}`;
        const newProduct: Product = {
            ...product,
            id: newId
        };
        customProducts.push(newProduct);
        saveCustomProducts(customProducts);
        return newProduct;
    },

    // Eliminar producto (cualquiera, inicial o personalizado)
    deleteProduct: (id: string): boolean => {
        const deletedIds = getDeletedGamesIds();
        
        // Si es un juego personalizado, eliminarlo directamente
        if (id.startsWith('custom_')) {
            const customProducts = getCustomProducts();
            const index = customProducts.findIndex(p => p.id === id);
            if (index !== -1) {
                customProducts.splice(index, 1);
                saveCustomProducts(customProducts);
                return true;
            }
        } else {
            // Si es un juego inicial, agregarlo a la lista de eliminados
            if (!deletedIds.includes(id)) {
                deletedIds.push(id);
                saveDeletedGamesIds(deletedIds);
                return true;
            }
        }
        return false;
    },

    // Obtener producto por ID
    getProductById: (id: string): Product | undefined => {
        const allProducts = productService.getAllProducts();
        return allProducts.find(p => p.id === id);
    }
};

export default productService;