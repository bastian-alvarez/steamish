// Mock Data para Blogs - Estructura similar a juegosMocks
export interface BlogPropiedades {
    serie: number;
    id: number;
    title: string;
    excerpt: string;
    content: string;
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
        content: `
            <p>El año 2025 promete ser un año histórico para los videojuegos. Con la llegada de nuevas consolas y avances tecnológicos sin precedentes, los desarrolladores están preparando títulos que cambiarán para siempre la forma en que experimentamos el entretenimiento interactivo.</p>
            
            <h3>1. Cyberpunk 2077: Phantom Liberty</h3>
            <p>La expansión más ambiciosa de CD Projekt Red lleva a Night City a nuevos niveles de inmersión. Con mejoras masivas en el sistema de combate y una narrativa que explora las profundidades de la corrupción corporativa, este DLC promete ser una experiencia única.</p>
            
            <h3>2. The Elder Scrolls VI</h3>
            <p>Bethesda finalmente revela detalles sobre la sexta entrega de su saga de fantasía épica. Con un nuevo motor gráfico y un mundo abierto que promete ser el más grande jamás creado, los fans están ansiosos por explorar las tierras de High Rock.</p>
            
            <h3>3. GTA VI</h3>
            <p>Rockstar Games vuelve con una nueva entrega de su franquicia más exitosa. Los rumores sugieren múltiples protagonistas y un mapa que incluye Miami y sus alrededores, prometiendo una experiencia de mundo abierto sin igual.</p>
            
            <h3>4. Starfield: Shattered Space</h3>
            <p>La primera expansión mayor de Starfield lleva a los jugadores a nuevos sistemas estelares con misiones que profundizan en el misterio de los artefactos antiguos y sus creadores.</p>
            
            <h3>5. Final Fantasy XVII</h3>
            <p>Square Enix continúa reinventando la serie con una nueva entrega que combina combate en tiempo real con elementos estratégicos. Los gráficos de nueva generación llevan la experiencia visual a niveles cinematográficos.</p>
            
            <h3>6. The Witcher 4</h3>
            <p>El inicio de una nueva saga de brujos con nuevos personajes y un mundo completamente nuevo. CD Projekt Red promete una narrativa madura y compleja que igualará o superará a sus predecesores.</p>
            
            <h3>7. Half-Life 3</h3>
            <p>El juego más esperado de la historia del gaming finalmente ve la luz. Valve sorprende a todos con un anuncio inesperado y una fecha de lanzamiento confirmada.</p>
            
            <h3>8. Dragon Age: Dreadwolf</h3>
            <p>BioWare regresa con una nueva aventura en Thedas. Con un sistema de combate completamente renovado y decisiones que afectan todo el mundo, este RPG promete horas de juego épico.</p>
            
            <h3>9. Mass Effect 5</h3>
            <p>La continuación de la legendaria saga espacial trae nuevas razas, planetas explorables y una historia que conecta con los eventos de la trilogía original.</p>
            
            <h3>10. Assassin's Creed: Shadows</h3>
            <p>Ubisoft explora el Japón feudal con una nueva mecánica de sigilo y combate que revoluciona la fórmula de la serie. Los gráficos aprovechan al máximo las nuevas consolas.</p>
            
            <p>Estos juegos representan solo una muestra de lo que viene en 2025. Con desarrolladores empujando los límites de la tecnología y la narrativa, este año promete ser inolvidable para los gamers de todo el mundo.</p>
        `,
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
        content: `
            <p>Optimizar tu PC gaming puede marcar la diferencia entre una experiencia fluida y una llena de lag y stuttering. En esta guía completa, te mostraremos todos los pasos necesarios para sacar el máximo provecho de tu equipo.</p>
            
            <h3>1. Actualiza tus Drivers</h3>
            <p>Los drivers actualizados son fundamentales. Asegúrate de tener las últimas versiones de tus drivers de gráficos (NVIDIA o AMD), así como los drivers de tu placa base y otros componentes críticos.</p>
            
            <h3>2. Optimiza la Configuración de Windows</h3>
            <p>Desactiva efectos visuales innecesarios, configura el plan de energía en "Alto Rendimiento" y asegúrate de que Windows Update no esté ejecutándose durante tus sesiones de gaming.</p>
            
            <h3>3. Overclocking Seguro</h3>
            <p>El overclocking puede mejorar significativamente el rendimiento, pero debe hacerse con precaución. Comienza con pequeños incrementos y monitorea las temperaturas constantemente.</p>
            
            <h3>4. Gestión de Temperaturas</h3>
            <p>Un sistema bien ventilado es crucial. Limpia el polvo regularmente, asegúrate de tener un buen flujo de aire y considera actualizar tu sistema de refrigeración si es necesario.</p>
            
            <h3>5. Optimización de Configuración de Juegos</h3>
            <p>Ajusta la configuración gráfica según tus componentes. No siempre necesitas gráficos al máximo; encuentra el equilibrio perfecto entre calidad visual y rendimiento.</p>
            
            <p>Con estos consejos, tu PC gaming debería funcionar de manera más eficiente y darte una experiencia de juego superior.</p>
        `,
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
        content: `
            <p>La realidad virtual ha evolucionado desde una tecnología experimental hasta una plataforma gaming completamente viable. Los avances recientes están cambiando la forma en que interactuamos con los videojuegos.</p>
            
            <h3>El Estado Actual de la VR</h3>
            <p>Las principales compañías están invirtiendo millones en desarrollar hardware y software VR. Dispositivos como Meta Quest 3, PlayStation VR2 y las nuevas gafas de Apple están llevando la experiencia a nuevos niveles.</p>
            
            <h3>Mejoras Tecnológicas</h3>
            <p>La resolución de pantalla ha mejorado dramáticamente, reduciendo el efecto "screen door" que plagaba las primeras generaciones. Los sistemas de seguimiento son más precisos y los controles hápticos añaden una nueva dimensión a la inmersión.</p>
            
            <h3>El Futuro de la VR Gaming</h3>
            <p>Los expertos predicen que en los próximos años veremos avances en realidad aumentada (AR), mejor integración con eSports, y experiencias multijugador más fluidas. La tecnología está mejorando rápidamente y los precios están bajando.</p>
            
            <h3>Desafíos Pendientes</h3>
            <p>Aunque la VR ha avanzado mucho, aún enfrenta desafíos como el motion sickness, la necesidad de espacio físico suficiente, y la creación de contenido de calidad que justifique la inversión.</p>
            
            <p>Sin duda, la realidad virtual será una parte importante del futuro del gaming, ofreciendo experiencias que simplemente no son posibles en pantallas tradicionales.</p>
        `,
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
        content: `<p>Los juegos independientes continúan demostrando que la creatividad y la innovación no requieren de presupuestos multimillonarios. Esta temporada ha sido especialmente rica en títulos indie que han capturado la atención de críticos y jugadores por igual.</p><h3>1. Hollow Knight: Silksong</h3><p>El esperado secuelo de Hollow Knight mantiene la magia del original mientras introduce nuevas mecánicas y un mundo completamente nuevo para explorar.</p><h3>2. Cocoon</h3><p>Un puzzle game innovador que desafía las convenciones del género con mecánicas únicas y una narrativa visualmente impactante.</p><h3>3. Sea of Stars</h3><p>Un RPG por turnos que homenajea los clásicos de los 90s mientras ofrece una experiencia moderna y refinada.</p><h3>4. Viewfinder</h3><p>Un juego de puzzles que permite manipular la perspectiva de manera única, creando soluciones creativas e inesperadas.</p><h3>5. Dredge</h3><p>Una experiencia de pesca con elementos de horror que combina mecánicas relajantes con tensión psicológica.</p><p>Estos juegos demuestran que la escena indie sigue siendo una fuente vital de innovación en la industria del gaming.</p>`,
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
        content: `<p>El mundo de los eSports continúa creciendo exponencialmente, con torneos que ofrecen premios millonarios y atraen audiencias globales masivas.</p><h3>Campeonatos Principales</h3><p>Los principales eventos incluyen The International de Dota 2, Worlds de League of Legends, y los Majors de CS2, cada uno con millones de dólares en premios.</p><h3>Nuevas Competiciones</h3><p>Este año veremos la expansión de competencias en nuevos géneros como fighting games y battle royales, abriendo oportunidades para más jugadores profesionales.</p><h3>Cómo Seguir los Torneos</h3><p>Plataformas como Twitch, YouTube Gaming y las apps oficiales de cada juego ofrecen transmisiones en vivo de alta calidad con comentaristas profesionales.</p><p>El futuro de los eSports se ve brillante, con más inversión, mejor infraestructura y una comunidad global cada vez más grande.</p>`,
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
        content: `<p>El diseño de mundos en videojuegos es un arte que combina arquitectura, diseño ambiental y narrativa visual para crear experiencias inmersivas memorables.</p><h3>Proceso Creativo</h3><p>Los artistas conceptuales comienzan con sketches y bocetos que evolucionan hacia modelos 3D detallados. Cada elemento está cuidadosamente diseñado para contar una historia.</p><h3>Referencias del Mundo Real</h3><p>Muchos mundos fantásticos están inspirados en lugares reales. Los artistas viajan, estudian arquitectura histórica y culturas para crear mundos creíbles.</p><h3>Tecnología y Herramientas</h3><p>Herramientas como Unreal Engine y Unity permiten a los artistas crear mundos increíblemente detallados con iluminación dinámica y sistemas de clima avanzados.</p><h3>Impacto en la Experiencia</h3><p>Un mundo bien diseñado puede ser tan memorable como los personajes o la historia, convirtiéndose en un personaje por sí mismo.</p><p>El arte ambiental sigue siendo una de las disciplinas más importantes en el desarrollo de videojuegos modernos.</p>`,
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
        content: `<p>Los juegos de estrategia requieren pensamiento crítico, planificación a largo plazo y adaptación constante. Estos cinco títulos representan lo mejor del género.</p><h3>1. Civilization VI</h3><p>Construye un imperio desde la antigüedad hasta la era moderna. Cada decisión importa en este juego que puede durar horas.</p><h3>2. Total War: Warhammer III</h3><p>Combina estrategia por turnos con batallas épicas en tiempo real. La variedad de facciones ofrece experiencias únicas.</p><h3>3. Crusader Kings III</h3><p>Gestiona dinastías medievales con un sistema de juego profundo que premia la estrategia política tanto como la militar.</p><h3>4. XCOM 2</h3><p>Comando táctico por turnos donde cada soldado es valioso. La gestión de recursos y la investigación son cruciales.</p><h3>5. Age of Empires IV</h3><p>El clásico RTS modernizado con gráficos mejorados y campañas históricas que educan mientras entretienen.</p><p>Estos juegos ofrecen cientos de horas de juego profundo y desafiante para los amantes de la estrategia.</p>`,
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
        content: `<p>La RTX 4080 es una de las tarjetas gráficas más potentes disponibles. Para aprovechar todo su potencial, necesitas configurar correctamente tus juegos.</p><h3>DLSS 3.0</h3><p>Activa DLSS 3.0 en modo "Calidad" o "Balanceado" para obtener mejor rendimiento sin sacrificar calidad visual notablemente.</p><h3>Ray Tracing</h3><p>Con la RTX 4080 puedes activar ray tracing al máximo en la mayoría de juegos. Experimenta con diferentes niveles para encontrar el equilibrio perfecto.</p><h3>Resolución y Refresco</h3><p>La RTX 4080 puede manejar 4K a 60fps o 1440p a 144fps fácilmente. Elige según tu monitor y preferencias.</p><h3>Configuración de Juegos Específicos</h3><p>Cada juego es diferente. Ajusta las configuraciones avanzadas como sombras, iluminación global y efectos de post-procesamiento según el rendimiento que obtengas.</p><h3>Overclocking</h3><p>Usa herramientas como MSI Afterburner para hacer overclocking seguro y mejorar aún más el rendimiento.</p><p>Con estos ajustes, tu RTX 4080 te dará la mejor experiencia de gaming posible.</p>`,
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
        content: `<p>El gaming multijugador ha evolucionado desde conexiones locales hasta experiencias globales masivas que conectan millones de jugadores.</p><h3>Los Inicios</h3><p>Los primeros juegos multijugador requerían que los jugadores estuvieran en la misma habitación. Títulos como Pong y Spacewar! establecieron las bases.</p><h3>La Era de las LAN</h3><p>Las partidas LAN permitieron a jugadores competir en la misma red local. Doom y Quake popularizaron este formato.</p><h3>Internet y los MMORPGs</h3><p>La llegada de internet masivo permitió MMORPGs como World of Warcraft, donde miles de jugadores comparten el mismo mundo.</p><h3>Gaming Moderno</h3><p>Hoy tenemos battle royales como Fortnite, servicios de suscripción como Xbox Game Pass, y juegos como servicio que evolucionan constantemente.</p><h3>El Futuro</h3><p>La nube gaming y tecnologías como blockchain están preparadas para cambiar nuevamente cómo jugamos juntos.</p><p>El multijugador ha pasado de ser una característica adicional a ser el núcleo de muchos juegos modernos.</p>`,
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
        content: `<p>Phantom Liberty representa la redención completa de Cyberpunk 2077, ofreciendo una experiencia que supera incluso al juego base en muchos aspectos.</p><h3>Narrativa y Personajes</h3><p>La historia principal es emocionante y bien escrita, con personajes memorables como Idris Elba como Solomon Reed. Las decisiones del jugador tienen consecuencias reales.</p><h3>Gameplay Mejorado</h3><p>El sistema de combate ha sido refinado, con nuevas armas, habilidades y mecánicas que hacen el juego más dinámico y divertido.</p><h3>El Nuevo Distrito: Dogtown</h3><p>Dogtown es un distrito completamente nuevo lleno de contenido secundario, misiones y secretos que explorar. El diseño es excelente.</p><h3>Mejoras Técnicas</h3><p>El DLC aprovecha todas las mejoras técnicas que han llegado al juego base, incluyendo mejor IA y gráficos mejorados.</p><h3>Veredicto Final</h3><p>Phantom Liberty es una expansión esencial que transforma Cyberpunk 2077 en la experiencia que siempre debió ser. Un must-play para cualquier fan del género.</p>`,
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
        content: `<p>El streaming de videojuegos se ha convertido en una industria multimillonaria. Si quieres comenzar, aquí tienes todo lo que necesitas saber.</p><h3>Hardware Necesario</h3><p>Necesitas una PC potente, una buena conexión a internet, un micrófono de calidad y una cámara web. OBS Studio es el software gratuito más popular.</p><h3>Elegir tu Plataforma</h3><p>Twitch sigue siendo la plataforma dominante, pero YouTube Gaming y Facebook Gaming ofrecen alternativas viables. Cada una tiene sus ventajas.</p><h3>Crear tu Marca</h3><p>Desarrolla una identidad única, diseña overlays atractivos y mantén un horario consistente. La consistencia es clave para construir audiencia.</p><h3>Interactuar con tu Audiencia</h3><p>Lee el chat constantemente, responde preguntas y haz que los viewers se sientan parte de la experiencia. La interacción es lo que diferencia un buen streamer.</p><h3>Monetización</h3><p>Una vez que tengas seguidores, puedes monetizar a través de suscripciones, donaciones y patrocinios. Pero primero, concéntrate en crear contenido de calidad.</p><p>El streaming requiere dedicación y paciencia, pero puede ser increíblemente gratificante.</p>`,
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
        content: `<p>Un buen mouse gaming puede mejorar significativamente tu rendimiento. Aquí están los mejores según diferentes categorías y presupuestos.</p><h3>Mejor General: Logitech G Pro X Superlight</h3><p>Ultra ligero, sensor preciso y excelente para la mayoría de géneros. El estándar de oro para gaming competitivo.</p><h3>Mejor para FPS: Razer DeathAdder V3 Pro</h3><p>Ergonómico, preciso y con un sensor de 30,000 DPI. Perfecto para shooters y juegos que requieren precisión extrema.</p><h3>Mejor para MMORPG: Corsair Scimitar Elite</h3><p>Con 17 botones programables, este mouse está diseñado para jugadores que necesitan acceso rápido a múltiples habilidades.</p><h3>Mejor Económico: SteelSeries Rival 3</h3><p>Ofrece excelente rendimiento a un precio accesible. Ideal para jugadores que están comenzando en el gaming competitivo.</p><h3>Mejor Ambidiestro: Glorious Model O</h3><p>Ultra ligero y cómodo para ambos tipos de agarre. Perfecto para jugadores que prefieren un diseño simétrico.</p><p>Elegir el mouse correcto depende de tu estilo de juego, tamaño de mano y presupuesto. Prueba varios si es posible antes de decidir.</p>`,
        category: "Tecnología",
        readTime: "5 min",
        featured: false,
        date: "4 Oct 2025",
        image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=800&q=80"
    }
];

// Helper function para obtener blog por ID
export const getBlogPorId = (id: number): BlogPropiedades | undefined => {
    return blogs.find(blog => blog.id === id);
};

// Helper function para obtener blogs por serie
export const getBlogsPorSerie = (serie: number): BlogPropiedades[] => {
    return blogs.filter(blog => blog.serie === serie);
};

// Helper function para obtener blogs por categoría
export const getBlogsPorCategoria = (category: string): BlogPropiedades[] => {
    return blogs.filter(blog => blog.category.toLowerCase() === category.toLowerCase());
};

// Helper function para obtener imagen por título
export const getImagenPorTitulo = (title: string): string => {
    const blog = blogs.find(b => b.title.toLowerCase() === title.toLowerCase());
    return blog?.image || 'https://via.placeholder.com/400x200/4d4d80/ffffff?text=Blog';
};

// Helper function para obtener blogs destacados
export const getBlogsDestacados = (): BlogPropiedades[] => {
    return blogs.filter(blog => blog.featured);
};



