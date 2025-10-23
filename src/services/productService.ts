// 🎮 DATOS SUPER SIMPLES - Solo lo esencial para la UI
const games = [
    { id: '1', name: 'Cyberpunk 2077', price: 59.99, image: 'https://via.placeholder.com/300x400/FF6B6B/white?text=Cyberpunk', rating: 4.2, discount: 15 },
    { id: '2', name: 'The Witcher 3', price: 39.99, image: 'https://via.placeholder.com/300x400/4ECDC4/white?text=Witcher', rating: 4.8, discount: 20 },
    { id: '3', name: 'Minecraft', price: 26.95, image: 'https://via.placeholder.com/300x400/45B7D1/white?text=Minecraft', rating: 4.5, discount: 0 },
    { id: '4', name: 'GTA V', price: 29.99, image: 'https://via.placeholder.com/300x400/96CEB4/white?text=GTA+V', rating: 4.6, discount: 25 },
    { id: '5', name: 'Elden Ring', price: 69.99, image: 'https://via.placeholder.com/300x400/FECA57/white?text=Elden+Ring', rating: 4.9, discount: 10 },
    { id: '6', name: 'Spider-Man', price: 49.99, image: 'https://via.placeholder.com/300x400/FF9FF3/white?text=Spider-Man', rating: 4.7, discount: 30 }
];

// 🚀 SERVICIO SÚPER SIMPLE - Una sola función
const productService = {
    getAllProducts: () => games
};

export default productService;