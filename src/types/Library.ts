// INTERFACE PARA BIBLIOTECA (compatible con LibraryItemResponse del microservicio)
export interface LibraryItem {
    id: number;
    userId: number;
    juegoId: string | number;
    name: string;
    price: number;
    dateAdded: string;
    status: string;
    genre?: string;
}

export interface AddToLibraryRequest {
    userId: number;
    juegoId: string | number;
}

