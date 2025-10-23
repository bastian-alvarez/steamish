// 🛠️ Helpers Simplificados
export const formatCurrency = (amount: number) => `$${amount.toFixed(2)}`;
export const calculateTotal = (items: { price: number; quantity: number }[]) => 
    items.reduce((total, item) => total + item.price * item.quantity, 0);
export const isEmpty = (obj: object) => Object.keys(obj).length === 0;