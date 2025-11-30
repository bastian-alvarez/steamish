// Helpers Simplificados
export const formatCurrency = (amount: number | undefined | null): string => {
    if (amount === undefined || amount === null || isNaN(amount)) {
        return '$0.00';
    }
    return `$${amount.toFixed(2)}`;
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
