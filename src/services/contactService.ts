import { ContactMessage } from '../types/Contact';

// Servicio para gestionar mensajes de contacto
class ContactService {
    private readonly STORAGE_KEY = 'steamish_contact_messages';

    // Guardar un nuevo mensaje
    saveMessage(name: string, email: string, message: string): ContactMessage {
        const messages = this.getMessages();
        const newMessage: ContactMessage = {
            id: `msg_${Date.now()}`,
            name,
            email,
            message,
            createdAt: new Date(),
            read: false
        };

        messages.push(newMessage);
        this.saveMessages(messages);
        
        // Disparar evento personalizado para actualización en tiempo real
        window.dispatchEvent(new CustomEvent('contactMessageAdded', { 
            detail: newMessage 
        }));
        
        return newMessage;
    }

    // Obtener todos los mensajes
    getMessages(): ContactMessage[] {
        const messagesJson = localStorage.getItem(this.STORAGE_KEY);
        if (!messagesJson) {
            return [];
        }

        try {
            return JSON.parse(messagesJson).map((msg: any) => ({
                ...msg,
                createdAt: new Date(msg.createdAt),
                read: msg.read || false
            }));
        } catch {
            return [];
        }
    }

    // Marcar mensaje como leído
    markAsRead(messageId: string): void {
        const messages = this.getMessages();
        const messageIndex = messages.findIndex(msg => msg.id === messageId);
        
        if (messageIndex !== -1) {
            messages[messageIndex].read = true;
            this.saveMessages(messages);
            
            // Disparar evento para actualización en tiempo real
            window.dispatchEvent(new CustomEvent('contactMessageUpdated'));
        }
    }

    // Marcar todos como leídos
    markAllAsRead(): void {
        const messages = this.getMessages();
        messages.forEach(msg => {
            msg.read = true;
        });
        this.saveMessages(messages);
        
        // Disparar evento para actualización en tiempo real
        window.dispatchEvent(new CustomEvent('contactMessageUpdated'));
    }

    // Eliminar un mensaje
    deleteMessage(messageId: string): void {
        const messages = this.getMessages();
        const filteredMessages = messages.filter(msg => msg.id !== messageId);
        this.saveMessages(filteredMessages);
        
        // Disparar evento para actualización en tiempo real
        window.dispatchEvent(new CustomEvent('contactMessageUpdated'));
    }

    // Obtener mensajes no leídos
    getUnreadCount(): number {
        const messages = this.getMessages();
        return messages.filter(msg => !msg.read).length;
    }

    // Guardar mensajes en localStorage
    private saveMessages(messages: ContactMessage[]): void {
        const messagesToStore = messages.map(msg => ({
            ...msg,
            createdAt: msg.createdAt instanceof Date ? msg.createdAt.toISOString() : msg.createdAt
        }));
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(messagesToStore));
    }
}

const contactService = new ContactService();
export default contactService;

