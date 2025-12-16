// Helpers Simplificados
export const formatCurrency = (amount: number | undefined | null): string => {
    if (amount === undefined || amount === null || isNaN(amount)) {
        return '$0.00';
    }
    return `$${amount.toFixed(2)}`;
};

// Generar placeholder de imagen local (SVG data URI) para evitar llamadas a servicios externos
export const getImagePlaceholder = (width: number = 300, height: number = 200, text: string = 'Juego'): string => {
    // SVG simple con el color de la marca - usar encodeURIComponent para el SVG completo
    const fontSize = Math.min(width, height) / 12;
    // Escapar caracteres especiales en el texto para el SVG
    const escapedText = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
    const svg = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg"><rect width="${width}" height="${height}" fill="#4d4d80"/><text x="50%" y="50%" font-family="Arial, sans-serif" font-size="${fontSize}" fill="#ffffff" text-anchor="middle" dy=".3em">${escapedText}</text></svg>`;
    return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
};

// Función para manejar errores de imagen sin loops infinitos
export const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>, fallbackText: string = 'Juego'): void => {
    const target = e.target as HTMLImageElement;
    
    // Si ya se usó el fallback, no hacer nada más (evitar loops)
    if (target.dataset.fallbackUsed === 'true') {
        return;
    }
    
    // Marcar que se usó el fallback
    target.dataset.fallbackUsed = 'true';
    
    // Usar placeholder local
    target.src = getImagePlaceholder(300, 200, fallbackText);
};

export const formatPrice = (price: number | undefined | null): string => {
    if (price === undefined || price === null || isNaN(price)) {
        return '0.00';
    }
    return price.toFixed(2);
};

export const calculateTotal = (items: { price: number; quantity: number }[]) => 
    items.reduce((total, item) => total + (item.price || 0) * item.quantity, 0);

export const isEmpty = (obj: object) => Object.keys(obj).length === 0;
