// INTERFACE PARA PRODUCTOS/JUEGOS (compatible con GameResponse del microservicio)
export interface Product {
    id: string | number; // El microservicio usa Long (number)
    name: string; // nombre en el microservicio
    price: number; // precio en el microservicio
    image: string; // imagenUrl en el microservicio
    rating: number; // averageRating en el microservicio
    discount: number; // descuento en el microservicio (0-100)
    category: string; // categoriaNombre en el microservicio
    description: string; // descripcion en el microservicio
    tags?: string[]; // No está en el microservicio, se mantiene para compatibilidad
    featured?: boolean; // No está en el microservicio, se mantiene para compatibilidad
    // Campos adicionales del microservicio
    stock?: number;
    imagenUrl?: string; // Alias para image
    nombre?: string; // Alias para name
    descripcion?: string; // Alias para description
    precio?: number; // Alias para price
    categoriaId?: number;
    generoId?: number;
    categoriaNombre?: string;
    generoNombre?: string;
    averageRating?: number;
    ratingCount?: number;
    discountedPrice?: number;
    hasDiscount?: boolean;
    activo?: boolean;
    desarrollador?: string;
    fechaLanzamiento?: string;
}

// INTERFACE PARA FILTROS DE BÚSQUEDA
export interface SearchFilters {
    query: string;
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    minRating?: number;
    tags?: string[];
}

// INTERFACE PARA RESULTADOS DE BÚSQUEDA
export interface SearchResult {
    products: Product[];
    totalCount: number;
    filteredCount: number;
    searchTerm: string;
}
