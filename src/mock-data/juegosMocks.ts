// 🎮 Mock Data para Juegos - Adaptado de la lógica de panes
export interface JuegoPropiedades {
    serie: number;
    id: number;
    name: string;
    avatar: string;
}

export const juegos: JuegoPropiedades[] = [
    {
        "serie": 1,
        "id": 1,
        "name": "Cyberpunk 2077",
        "avatar": "https://tse2.mm.bing.net/th/id/OIP.Iez5-qYSNf6mantDA-jNegHaFU?cb=12&w=605&h=435&rs=1&pid=ImgDetMain&o=7&rm=3",
    },
    {
        "serie": 1,
        "id": 2,
        "name": "The Witcher 3",
        "avatar": "https://tse1.explicit.bing.net/th/id/OIP.GN7-uDlOR8rtFIjA5PNd5gHaHa?cb=12&w=567&h=567&rs=1&pid=ImgDetMain&o=7&rm=3",
    },
    {
        "serie": 1,
        "id": 3,
        "name": "Minecraft",
        "avatar": "https://farmhaus.com.tr/media/1023/tam-bugday-ekmegi-karisimi-2.jpg",
    },
    {
        "serie": 1,
        "id": 4,
        "name": "GTA V",
        "avatar": "https://thaiartisanfoods.com/wp-content/uploads/2023/06/2fa03996-f144-4e12-8aca-81a7be036d83.jpg",
    },
    {
        "serie": 1,
        "id": 5,
        "name": "Elden Ring",
        "avatar": "https://www.ankarsrum.com/img-srv/D_9eM1CjCy4IR2c9I_-bX97shqlC346j4jOPqPw3AGo/resizing_type:auto/width:0/height:0/gravity:sm/enlarge:1/ext:webp/strip_metadata:1/quality:90/bG9jYWw6Ly8vd3d3LmFua2Fyc3J1bS5jb20vd3AtY29udGVudC91cGxvYWRzLzIwMjMvMTAvMy0xLmpwZw.webp",    
    },
    {
        "serie": 1,
        "id": 6,
        "name": "Spider-Man",
        "avatar": "https://breadsandsweets.com/wp-content/uploads/2022/03/sd-rustic-buns-sq.jpg",    
    },
    {
        "serie": 2,
        "id": 7,
        "name": "Red Dead Redemption 2",
        "avatar": "https://i.pinimg.com/originals/73/2c/ac/732cac313f6edbea88285ba2aab3d03d.jpg",    
    },
    {
        "serie": 2,
        "id": 8,
        "name": "Horizon Zero Dawn",
        "avatar": "https://tse4.mm.bing.net/th/id/OIP.gj2R57CbNQJN4rCo3k7MqwAAAA?cb=12&w=417&h=626&rs=1&pid=ImgDetMain&o=7&rm=3",    
    },
    {
        "serie": 2,
        "id": 9,
        "name": "God of War",
        "avatar": "https://cdn-dev.iberion.net/images/origin/large_chleb_4_1_2943b4e2ab.jpg",    
    },
    {
        "serie": 2,
        "id": 10,
        "name": "Assassin's Creed Valhalla",
        "avatar": "https://tse2.mm.bing.net/th/id/OIP.01UeyHBTtHaGuDtfGCUaQQHaFq?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3",
    },
    {
        "serie": 2,
        "id": 11,
        "name": "FIFA 24",
        "avatar": "https://images.rappi.com.ar/products/266387-1542119214.png",
    },
    {
        "serie": 2,
        "id": 12,
        "name": "Call of Duty: Modern Warfare",
        "avatar": "https://deliciasycaprichos.cl/wp-content/uploads/2024/10/5.png",
    },
    {
        "serie": 2,
        "id": 13,
        "name": "Fortnite",
        "avatar": "https://i.pinimg.com/originals/bb/6b/11/bb6b11eca887a83dfb6a0033e1d352ce.jpg"
    },
    {
        "serie": 2,
        "id": 14,
        "name": "Among Us",
        "avatar": "https://richanddelish.com/wp-content/uploads/2022/12/vanilla-muffins-10-of-12-652x1024.jpg",
    },
    {
        "serie": 2,
        "id": 15,
        "name": "Valorant",
        "avatar": "https://img.cocinarico.es/2020-04/muffins-de-fresa-1.jpg",
    },
    {
        "serie": 2,
        "id": 16,
        "name": "League of Legends",
        "avatar": "https://cdn11.bigcommerce.com/s-3stx4pub31/product_images/uploaded_images/alfajor-negro-relleno-de-dulce-de-leche.jpg",
    },
    {
        "serie": 2,
        "id": 17,
        "name": "Overwatch 2",
        "avatar": "https://hispanaglobal.com/wp-content/uploads/2022/03/Dulce-De-Leche-cookies-9-scaled.jpg",
    },
    {
        "serie": 3,
        "id": 18,
        "name": "Fall Guys",
        "avatar": "https://lovefoodfeed.com/wp-content/uploads/2023/06/Chocolate-cake-px-1200-02.jpg",
    },
    {
        "serie": 3,
        "id": 19,
        "name": "Rocket League",
        "avatar": "https://cdn.midjourney.com/e04e8eb0-a19e-401a-88ac-7221c5e835d6/0_2.jpeg",
    }
];

// 🔧 Helper function para obtener juego por ID
export const getJuegoPorId = (id: number): JuegoPropiedades | undefined => {
    return juegos.find(juego => juego.id === id);
};

// 🔧 Helper function para obtener juegos por serie
export const getJuegosPorSerie = (serie: number): JuegoPropiedades[] => {
    return juegos.filter(juego => juego.serie === serie);
};

// 🔧 Helper function para obtener avatar por nombre
export const getAvatarPorNombre = (name: string): string => {
    const juego = juegos.find(j => j.name.toLowerCase() === name.toLowerCase());
    return juego?.avatar || 'https://via.placeholder.com/300x200/0d6efd/ffffff?text=Game';
};