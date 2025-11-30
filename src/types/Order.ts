// INTERFACE PARA ÓRDENES (compatible con OrderResponse del microservicio)
export interface Order {
    id: number;
    userId: number;
    fechaOrden: string;
    total: number;
    estadoId: number;
    estadoNombre: string;
    metodoPago: string;
    direccionEnvio?: string;
    detalles: OrderDetail[];
}

export interface OrderDetail {
    id: number;
    juegoId: number;
    juegoNombre: string;
    cantidad: number;
    precioUnitario: number;
    subtotal: number;
}

export interface CreateOrderRequest {
    userId: number;
    items: OrderItem[];
    metodoPago?: string;
    direccionEnvio?: string;
}

export interface OrderItem {
    juegoId: number;
    cantidad: number;
}

