// Interfaces comunes para la aplicación

export interface ApiResponse<T> {
    data: T;
    success: boolean;
    message?: string;
    errors?: string[];
}

export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

export interface LoadingState {
    isLoading: boolean;
    error: string | null;
}

export interface FormField {
    name: string;
    label: string;
    type: 'text' | 'email' | 'password' | 'textarea' | 'select' | 'number';
    required: boolean;
    placeholder?: string;
    options?: SelectOption[];
}

export interface SelectOption {
    value: string | number;
    label: string;
}

export interface Toast {
    id: string;
    type: 'success' | 'error' | 'warning' | 'info';
    message: string;
    duration?: number;
}

export interface SearchFilters {
    query?: string;
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    sortBy?: 'name' | 'price' | 'rating' | 'date';
    sortOrder?: 'asc' | 'desc';
}

export interface Pagination {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}