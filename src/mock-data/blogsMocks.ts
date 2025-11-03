// 📝 Mock Data para Blogs - Estructura similar a juegosMocks
export interface BlogPropiedades {
    serie: number;
    id: number;
    title: string;
    excerpt: string;
    category: string;
    readTime: string;
    featured: boolean;
    date: string;
    image: string;
}

export const blogs: BlogPropiedades[] = [
    {
        serie: 1,
        id: 1,
        title: "Los 10 Juegos Más Esperados de 2025",
        excerpt: "Descubre los títulos que revolucionarán el gaming este año con gráficos de próxima generación y mecánicas innovadoras.",
        category: "Novedades",
        readTime: "5 min",
        featured: true,
        date: "15 Oct 2025",
        image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80"
    },
    {
        serie: 1,
        id: 2,
        title: "Guía Completa: Cómo Optimizar tu PC Gaming",
        excerpt: "Consejos profesionales para sacar el máximo rendimiento de tu equipo y disfrutar de los juegos más exigentes.",
        category: "Tutoriales",
        readTime: "8 min",
        featured: false,
        date: "14 Oct 2025",
        image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&q=80"
    },
    {
        serie: 1,
        id: 3,
        title: "El Futuro del Gaming: Realidad Virtual",
        excerpt: "Explora cómo la VR está transformando la industria del gaming y qué podemos esperar en los próximos años.",
        category: "Tecnología",
        readTime: "6 min",
        featured: false,
        date: "13 Oct 2025",
        image: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=800&q=80"
    },
    {
        serie: 1,
        id: 4,
        title: "Review: Los Mejores Indies de la Temporada",
        excerpt: "Una selección cuidadosa de juegos independientes que han marcado la diferencia este año.",
        category: "Reviews",
        readTime: "7 min",
        featured: false,
        date: "12 Oct 2025",
        image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&q=80"
    },
    {
        serie: 1,
        id: 5,
        title: "eSports 2025: Torneos y Competencias",
        excerpt: "Todo lo que necesitas saber sobre los próximos torneos internacionales y cómo seguir la acción.",
        category: "eSports",
        readTime: "4 min",
        featured: false,
        date: "11 Oct 2025",
        image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80"
    },
    {
        serie: 1,
        id: 6,
        title: "Construcción de Mundos: Arte en Videojuegos",
        excerpt: "Detrás de escenas: cómo los artistas crean universos fantásticos que nos transportan a otros mundos.",
        category: "Arte",
        readTime: "9 min",
        featured: false,
        date: "10 Oct 2025",
        image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&q=80"
    },
    {
        serie: 2,
        id: 7,
        title: "Top 5 Juegos de Estrategia que Debes Probar",
        excerpt: "Descubre los mejores títulos de estrategia que pondrán a prueba tus habilidades tácticas y de planificación.",
        category: "Reviews",
        readTime: "6 min",
        featured: false,
        date: "9 Oct 2025",
        image: "https://images.unsplash.com/photo-1560253023-3ec5d502959f?w=800&q=80"
    },
    {
        serie: 2,
        id: 8,
        title: "Configuración Óptima de Gráficos para RTX 4080",
        excerpt: "Aprende a configurar tus juegos para aprovechar al máximo tu tarjeta gráfica de última generación.",
        category: "Tutoriales",
        readTime: "10 min",
        featured: false,
        date: "8 Oct 2025",
        image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=800&q=80"
    },
    {
        serie: 2,
        id: 9,
        title: "La Evolución de los Videojuegos Multijugador",
        excerpt: "Un recorrido histórico por cómo ha evolucionado el gaming multijugador desde sus inicios hasta hoy.",
        category: "Tecnología",
        readTime: "7 min",
        featured: false,
        date: "7 Oct 2025",
        image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&q=80"
    },
    {
        serie: 2,
        id: 10,
        title: "Análisis Profundo: Cyberpunk 2077 Phantom Liberty",
        excerpt: "Una revisión completa de la expansión más esperada del año con todos los detalles y novedades.",
        category: "Reviews",
        readTime: "8 min",
        featured: false,
        date: "6 Oct 2025",
        image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80"
    },
    {
        serie: 2,
        id: 11,
        title: "Streaming Gaming: Guía para Principiantes",
        excerpt: "Todo lo que necesitas saber para comenzar a transmitir tus partidas y construir tu audiencia.",
        category: "Tutoriales",
        readTime: "9 min",
        featured: false,
        date: "5 Oct 2025",
        image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&q=80"
    },
    {
        serie: 2,
        id: 12,
        title: "Los Mejores Mouses Gaming de 2025",
        excerpt: "Una comparativa detallada de los mejores ratones para gaming según diferentes necesidades y presupuestos.",
        category: "Tecnología",
        readTime: "5 min",
        featured: false,
        date: "4 Oct 2025",
        image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=800&q=80"
    }
];

// 🔧 Helper function para obtener blog por ID
export const getBlogPorId = (id: number): BlogPropiedades | undefined => {
    return blogs.find(blog => blog.id === id);
};

// 🔧 Helper function para obtener blogs por serie
export const getBlogsPorSerie = (serie: number): BlogPropiedades[] => {
    return blogs.filter(blog => blog.serie === serie);
};

// 🔧 Helper function para obtener blogs por categoría
export const getBlogsPorCategoria = (category: string): BlogPropiedades[] => {
    return blogs.filter(blog => blog.category.toLowerCase() === category.toLowerCase());
};

// 🔧 Helper function para obtener imagen por título
export const getImagenPorTitulo = (title: string): string => {
    const blog = blogs.find(b => b.title.toLowerCase() === title.toLowerCase());
    return blog?.image || 'https://via.placeholder.com/400x200/4d4d80/ffffff?text=Blog';
};

// 🔧 Helper function para obtener blogs destacados
export const getBlogsDestacados = (): BlogPropiedades[] => {
    return blogs.filter(blog => blog.featured);
};

