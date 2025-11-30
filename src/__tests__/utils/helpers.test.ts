import { describe, test, expect } from 'vitest';
import { formatCurrency, calculateTotal, isEmpty } from '../../utils/helpers';

describe('helpers', () => {
    describe('formatCurrency', () => {
        test('debe formatear un número como moneda', () => {
            expect(formatCurrency(59.99)).toBe('$59.99');
            expect(formatCurrency(100)).toBe('$100.00');
            expect(formatCurrency(0)).toBe('$0.00');
        });

        test('debe manejar números decimales', () => {
            expect(formatCurrency(10.5)).toBe('$10.50');
            expect(formatCurrency(99.999)).toBe('$100.00');
        });
    });

    describe('calculateTotal', () => {
        test('debe calcular el total de items', () => {
            const items = [
                { price: 10, quantity: 2 },
                { price: 5, quantity: 3 }
            ];

            expect(calculateTotal(items)).toBe(35);
        });

        test('debe retornar 0 para un array vacío', () => {
            expect(calculateTotal([])).toBe(0);
        });

        test('debe manejar cantidades decimales', () => {
            const items = [
                { price: 10.5, quantity: 2 }
            ];

            expect(calculateTotal(items)).toBe(21);
        });
    });

    describe('isEmpty', () => {
        test('debe retornar true para un objeto vacío', () => {
            expect(isEmpty({})).toBe(true);
        });

        test('debe retornar false para un objeto con propiedades', () => {
            expect(isEmpty({ key: 'value' })).toBe(false);
        });

        test('debe retornar false para un objeto con múltiples propiedades', () => {
            expect(isEmpty({ a: 1, b: 2, c: 3 })).toBe(false);
        });
    });
});

