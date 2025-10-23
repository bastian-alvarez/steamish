// src/utils/helpers.ts
export const formatCurrency = (amount: number): string => {
    return `$${amount.toFixed(2)}`;
};

export const calculateTotal = (items: { price: number; quantity: number }[]): number => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
};

export const isEmpty = (obj: object): boolean => {
    return Object.keys(obj).length === 0;
};