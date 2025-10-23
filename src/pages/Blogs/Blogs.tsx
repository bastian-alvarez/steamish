import React from 'react';
import styles from './Blogs.module.css';

// 📝 Blogs Súper Hermosos y Atractivos
const Blogs: React.FC = () => {
    const blogPosts = [
        {
            id: 1,
            title: "Los 10 Juegos Más Esperados de 2025",
            excerpt: "Descubre los títulos que revolucionarán el gaming este año con gráficos increíbles y jugabilidad innovadora...",
            image: "🎮",
            date: "15 Oct 2025",
            category: "Novedades",
            readTime: "5 min"
        },
        {
            id: 2,
            title: "Guía Completa: Cómo Optimizar tu PC Gaming",
            excerpt: "Consejos profesionales para sacar el máximo rendimiento a tu equipo y disfrutar gaming a 60fps...",
            image: "💻",
            date: "12 Oct 2025",
            category: "Tutoriales",
            readTime: "8 min"
        },
        {
            id: 3,
            title: "El Futuro del Gaming: Realidad Virtual",
            excerpt: "Explora cómo la VR está transformando la industria de los videojuegos y creando experiencias inmersivas...",
            image: "🥽",
            date: "10 Oct 2025",
            category: "Tecnología",
            readTime: "6 min"
        },
        {
            id: 4,
            title: "Review: Los Mejores Indies de la Temporada",
            excerpt: "Una selección cuidadosa de juegos independientes que no puedes perderte, con historias únicas...",
            image: "⭐",
            date: "8 Oct 2025",
            category: "Reviews",
            readTime: "7 min"
        },
        {
            id: 5,
            title: "eSports 2025: Torneos y Competencias",
            excerpt: "Todo lo que necesitas saber sobre los próximos torneos mundiales y cómo participar...",
            image: "🏆",
            date: "5 Oct 2025",
            category: "eSports",
            readTime: "4 min"
        },
        {
            id: 6,
            title: "Construcción de Mundos: Arte en Videojuegos",
            excerpt: "Detrás de escenas: cómo los artistas crean universos fantásticos que cobran vida en pantalla...",
            image: "🎨",
            date: "2 Oct 2025",
            category: "Arte",
            readTime: "9 min"
        }
    ];

    return (
        <div className={styles.blogsPage}>
            {/* Hero Section */}
            <section className={styles.hero}>
                <div className={styles.heroContent}>
                    <h1 className={styles.heroTitle}>
                        <span className={styles.titleIcon}>📝</span>
                        Gaming Blog
                    </h1>
                    <p className={styles.heroSubtitle}>
                        Noticias, reviews, guías y todo sobre el mundo gaming
                    </p>
                </div>
            </section>

            <div className={styles.container}>
                {/* Featured Post */}
                <section className={styles.featuredSection}>
                    <h2 className={styles.sectionTitle}>✨ Artículo Destacado</h2>
                    <div className={styles.featuredPost}>
                        <div className={styles.featuredImage}>
                            <span className={styles.featuredIcon}>🎮</span>
                        </div>
                        <div className={styles.featuredContent}>
                            <div className={styles.featuredMeta}>
                                <span className={styles.category}>Novedades</span>
                                <span className={styles.date}>15 Oct 2025</span>
                            </div>
                            <h3 className={styles.featuredTitle}>
                                Los 10 Juegos Más Esperados de 2025
                            </h3>
                            <p className={styles.featuredExcerpt}>
                                Descubre los títulos que revolucionarán el gaming este año. Desde 
                                AAA épicos hasta indies innovadores, exploramos los juegos que definirán 
                                el futuro del entretenimiento digital.
                            </p>
                            <button className={styles.readMoreButton}>
                                <span className={styles.buttonIcon}>📖</span>
                                Leer Artículo
                            </button>
                        </div>
                    </div>
                </section>

                {/* Blog Grid */}
                <section className={styles.blogGrid}>
                    <h2 className={styles.sectionTitle}>🔥 Últimos Artículos</h2>
                    <div className={styles.postsGrid}>
                        {blogPosts.slice(1).map(post => (
                            <article key={post.id} className={styles.blogCard}>
                                <div className={styles.cardImage}>
                                    <span className={styles.cardIcon}>{post.image}</span>
                                    <div className={styles.cardCategory}>{post.category}</div>
                                </div>
                                
                                <div className={styles.cardContent}>
                                    <div className={styles.cardMeta}>
                                        <span className={styles.cardDate}>{post.date}</span>
                                        <span className={styles.readTime}>⏱️ {post.readTime}</span>
                                    </div>
                                    
                                    <h3 className={styles.cardTitle}>{post.title}</h3>
                                    <p className={styles.cardExcerpt}>{post.excerpt}</p>
                                    
                                    <button className={styles.cardButton}>
                                        Leer más →
                                    </button>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Blogs;