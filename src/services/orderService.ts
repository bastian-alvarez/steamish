import { Order, CreateOrderRequest, OrderItem } from '../types/Order';
import { API } from '../config/constants';
import authService from './authService';

// Servicio para manejar órdenes conectado al microservicio order-service
class OrderService {
    // Obtener headers con autenticación
    private getAuthHeaders(): HeadersInit {
        const token = authService.getToken();
        const headers: HeadersInit = {
            'Content-Type': 'application/json',
        };
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
        return headers;
    }

    // Crear nueva orden
    async createOrder(request: CreateOrderRequest): Promise<Order> {
        try {
            const url = `${API.orderService}/api/orders`;
            const headers = this.getAuthHeaders();
            const body = JSON.stringify({
                userId: request.userId,
                items: request.items.map(item => ({
                    juegoId: item.juegoId,
                    cantidad: item.cantidad
                })),
                metodoPago: request.metodoPago || 'Tarjeta',
                direccionEnvio: request.direccionEnvio
            });
            
            console.log('Creating order:', { url, hasToken: !!authService.getToken(), body });
            
            const response = await fetch(url, {
                method: 'POST',
                headers,
                body
            });

            if (!response.ok) {
                let errorMessage = 'Error al crear la orden';
                try {
                    const errorText = await response.text();
                    if (errorText) {
                        try {
                            const errorData = JSON.parse(errorText);
                            errorMessage = errorData.message || errorData.error || errorText;
                        } catch {
                            errorMessage = errorText;
                        }
                    }
                } catch {
                    errorMessage = `Error ${response.status}: ${response.statusText}`;
                }
                throw new Error(errorMessage);
            }

            const data = await response.json();
            // Manejar respuesta HATEOAS - el objeto principal está en el root, no en _embedded
            const orderData = data._embedded || data;
            
            return this.mapOrderResponseToOrder(orderData);
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            }
            throw new Error('Error al conectar con el servidor de órdenes');
        }
    }

    // Obtener órdenes por usuario
    async getOrdersByUserId(userId: number): Promise<Order[]> {
        try {
            const response = await fetch(`${API.orderService}/api/orders/user/${userId}`, {
                headers: this.getAuthHeaders()
            });

            if (!response.ok) {
                throw new Error('Error al obtener las órdenes');
            }

            const data = await response.json();
            // Manejar respuesta HATEOAS - puede venir como _embedded.orderResponseList o directamente como array
            let orders: any[] = [];
            if (data._embedded) {
                orders = data._embedded.orderResponseList || data._embedded || [];
            } else if (Array.isArray(data)) {
                orders = data;
            } else if (data.content) {
                orders = data.content;
            }
            
            return orders.map((order: any) => this.mapOrderResponseToOrder(order));
        } catch (error) {
            console.error('Error al obtener órdenes:', error);
            return [];
        }
    }

    // Obtener orden por ID
    async getOrderById(orderId: number): Promise<Order | null> {
        try {
            const response = await fetch(`${API.orderService}/api/orders/${orderId}`, {
                headers: this.getAuthHeaders()
            });

            if (!response.ok) {
                if (response.status === 404) {
                    return null;
                }
                throw new Error('Error al obtener la orden');
            }

            const data = await response.json();
            const orderData = data._embedded || data; // Manejar HATEOAS
            
            return this.mapOrderResponseToOrder(orderData);
        } catch (error) {
            console.error('Error al obtener orden:', error);
            return null;
        }
    }

    // Obtener todas las órdenes (para admin)
    async getAllOrders(): Promise<Order[]> {
        try {
            const response = await fetch(`${API.orderService}/api/orders`, {
                headers: this.getAuthHeaders()
            });

            if (!response.ok) {
                throw new Error('Error al obtener las órdenes');
            }

            const data = await response.json();
            // Manejar respuesta HATEOAS - puede venir como _embedded.orderResponseList o directamente como array
            let orders: any[] = [];
            if (data._embedded) {
                orders = data._embedded.orderResponseList || data._embedded || [];
            } else if (Array.isArray(data)) {
                orders = data;
            } else if (data.content) {
                orders = data.content;
            }
            
            return orders.map((order: any) => this.mapOrderResponseToOrder(order));
        } catch (error) {
            console.error('Error al obtener todas las órdenes:', error);
            return [];
        }
    }

    // Mapear OrderResponse a Order
    private mapOrderResponseToOrder(orderData: any): Order {
        return {
            id: orderData.id,
            userId: orderData.userId,
            fechaOrden: orderData.fechaOrden,
            total: orderData.total,
            estadoId: orderData.estadoId,
            estadoNombre: orderData.estadoNombre,
            metodoPago: orderData.metodoPago,
            direccionEnvio: orderData.direccionEnvio,
            detalles: (orderData.detalles || []).map((detail: any) => ({
                id: detail.id,
                juegoId: detail.juegoId,
                juegoNombre: detail.juegoNombre,
                cantidad: detail.cantidad,
                precioUnitario: detail.precioUnitario,
                subtotal: detail.subtotal
            }))
        };
    }

    // Crear orden desde el carrito
    async createOrderFromCart(userId: number, cartItems: Array<{ id: number; quantity: number }>): Promise<Order> {
        const items: OrderItem[] = cartItems.map(item => ({
            juegoId: typeof item.id === 'string' ? parseInt(item.id) : item.id,
            cantidad: item.quantity
        }));

        return this.createOrder({
            userId,
            items,
            metodoPago: 'Tarjeta'
        });
    }
}

export default new OrderService();

