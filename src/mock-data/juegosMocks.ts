// 🎮 Mock Data para Juegos - Con imágenes reales de cada juego
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
        "avatar": "https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/header.jpg",
    },
    {
        "serie": 1,
        "id": 2,
        "name": "The Witcher 3",
        "avatar": "https://cdn.cloudflare.steamstatic.com/steam/apps/292030/header.jpg",
    },
    {
        "serie": 1,
        "id": 3,
        "name": "Minecraft",
        "avatar": "https://cdn.cloudflare.steamstatic.com/steam/apps/1672970/header.jpg",
    },
    {
        "serie": 1,
        "id": 4,
        "name": "GTA V",
        "avatar": "https://cdn.cloudflare.steamstatic.com/steam/apps/271590/header.jpg",
    },
    {
        "serie": 1,
        "id": 5,
        "name": "Elden Ring",
        "avatar": "https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/header.jpg",
    },
    {
        "serie": 1,
        "id": 6,
        "name": "Spider-Man",
        "avatar": "https://cdn.cloudflare.steamstatic.com/steam/apps/1817070/header.jpg",
    },
    {
        "serie": 2,
        "id": 7,
        "name": "Red Dead Redemption 2",
        "avatar": "https://cdn.cloudflare.steamstatic.com/steam/apps/1174180/header.jpg",
    },
    {
        "serie": 2,
        "id": 8,
        "name": "Horizon Zero Dawn",
        "avatar": "https://cdn.cloudflare.steamstatic.com/steam/apps/1151640/header.jpg",
    },
    {
        "serie": 2,
        "id": 9,
        "name": "God of War",
        "avatar": "https://cdn.cloudflare.steamstatic.com/steam/apps/1593500/header.jpg",
    },
    {
        "serie": 2,
        "id": 10,
        "name": "Assassin's Creed Valhalla",
        "avatar": "https://cdn.cloudflare.steamstatic.com/steam/apps/2208920/header.jpg",
    },
    {
        "serie": 2,
        "id": 11,
        "name": "FIFA 24",
        "avatar": "https://cdn.cloudflare.steamstatic.com/steam/apps/2195250/header.jpg",
    },
    {
        "serie": 2,
        "id": 12,
        "name": "Call of Duty: Modern Warfare",
        "avatar": "https://cdn.cloudflare.steamstatic.com/steam/apps/2000950/header.jpg",
    },
    {
        "serie": 2,
        "id": 13,
        "name": "Fortnite",
        "avatar": "https://cdn2.unrealengine.com/14br-consoles-1920x1080-wlogo-1920x1080-432714386.jpg",
    },
    {
        "serie": 2,
        "id": 14,
        "name": "Among Us",
        "avatar": "https://cdn.cloudflare.steamstatic.com/steam/apps/945360/header.jpg",
    },
    {
        "serie": 2,
        "id": 15,
        "name": "Valorant",
        "avatar": "https://images.contentstack.io/v3/assets/blt0eb2a2986b796d29/blt4c6c7903fa0c09fe/6326044a5b2ce82df585e9e2/valorant.jpg",
    },
    {
        "serie": 2,
        "id": 16,
        "name": "League of Legends",
        "avatar": "https://images.contentstack.io/v3/assets/blt0eb2a2986b796d29/blt7c846adc0c0e1f5b/5fec0fa1f1e7e80c3bf5810c/league-of-legends.jpg",
    },
    {
        "serie": 2,
        "id": 17,
        "name": "Overwatch 2",
        "avatar": "https://cdn.cloudflare.steamstatic.com/steam/apps/2357570/header.jpg",
    },
    {
        "serie": 3,
        "id": 18,
        "name": "Fall Guys",
        "avatar": "https://cdn.cloudflare.steamstatic.com/steam/apps/1097150/header.jpg",
    },
    {
        "serie": 3,
        "id": 19,
        "name": "Rocket League",
        "avatar": "https://cdn.cloudflare.steamstatic.com/steam/apps/252950/header.jpg",
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
    return juego?.avatar || 'https://via.placeholder.com/300x200/4d4d80/ffffff?text=Game';
};
