// INTERFACE PARA PRODUCTOS/JUEGOS
export interface Product {
    id: string;
    name: string;
    price: number;
    image: string;
    rating: number;
    discount: number;
    category: string;
    description: string;
    tags: string[];
    featured: boolean;
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