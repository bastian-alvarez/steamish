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
            // Validaciones previas
            if (!request.userId || request.userId <= 0) {
                throw new Error('ID de usuario inválido');
            }

            if (!request.items || request.items.length === 0) {
                throw new Error('No hay items en la orden');
            }

            // Validar que todos los items tengan juegoId y cantidad válidos
            const invalidItems = request.items.filter(item => !item.juegoId || item.cantidad <= 0);
            if (invalidItems.length > 0) {
                throw new Error('Algunos items tienen datos inválidos');
            }

            const url = `${API.orderService}/api/orders`;
            const token = authService.getToken();
            
            if (!token) {
                throw new Error('No estás autenticado. Por favor, inicia sesión nuevamente.');
            }

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
            
            console.log('Creating order:', { 
                url, 
                hasToken: !!token,
                userId: request.userId,
                itemsCount: request.items.length,
                orderServiceUrl: API.orderService
            });
            
            // Agregar timeout y mejor manejo de errores de red
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), API.timeout);

            let response: Response;
            try {
                response = await fetch(url, {
                    method: 'POST',
                    headers,
                    body,
                    signal: controller.signal
                });
                clearTimeout(timeoutId);
            } catch (fetchError) {
                clearTimeout(timeoutId);
                
                if (fetchError instanceof Error) {
                    if (fetchError.name === 'AbortError') {
                        throw new Error('La solicitud tardó demasiado. Verifica tu conexión a internet.');
                    }
                    if (fetchError.message.includes('Failed to fetch')) {
                        throw new Error(`No se pudo conectar con el servidor de órdenes. Verifica que el servicio esté disponible en: ${API.orderService}`);
                    }
                    throw new Error(`Error de red: ${fetchError.message}`);
                }
                throw new Error('Error desconocido al intentar conectar con el servidor');
            }

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
                
                // Mensajes más específicos según el código de estado
                if (response.status === 401) {
                    throw new Error('Sesión expirada. Por favor, inicia sesión nuevamente.');
                } else if (response.status === 403) {
                    throw new Error('No tienes permisos para realizar esta acción.');
                } else if (response.status === 404) {
                    throw new Error('El servicio de órdenes no está disponible.');
                } else if (response.status >= 500) {
                    throw new Error('Error en el servidor. Por favor, intenta más tarde.');
                }
                
                throw new Error(errorMessage);
            }

            const data = await response.json();
            // Manejar respuesta HATEOAS - el objeto principal está en el root, no en _embedded
            const orderData = data._embedded || data;
            
            return this.mapOrderResponseToOrder(orderData);
        } catch (error) {
            if (error instanceof Error) {
                console.error('Error en createOrder:', {
                    message: error.message,
                    stack: error.stack,
                    userId: request.userId,
                    itemsCount: request.items?.length
                });
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

