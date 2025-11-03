import { Product } from '../types/Product';
import { getAvatarPorNombre } from '../mock-data/juegosMocks';

// 🎮 DATOS COMPLETOS CON IMÁGENES REALES DEL MOCK
const games: Product[] = [
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
    }
];

// Debug: Verificar que las imágenes se carguen correctamente
console.log('🎮 Productos cargados con imágenes:', games.map(g => ({ name: g.name, image: g.image })));

// 🚀 SERVICIO SÚPER SIMPLE - Una sola función
const productService = {
    getAllProducts: () => games
};

export default productService;