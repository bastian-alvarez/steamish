import { describe, test, expect } from 'vitest';
import { APP, COLORS, API, ROUTES } from '../../config/constants';

describe('Constants', () => {
    describe('APP', () => {
        test('debe tener las propiedades correctas', () => {
            expect(APP.name).toBe('Steamish');
            expect(APP.version).toBe('1.0.0');
            expect(APP.currency).toBe('$');
        });

        test('debe ser un objeto readonly', () => {
            expect(Object.isFrozen(APP)).toBe(true);
        });
    });

    describe('COLORS', () => {
        test('debe tener todos los colores base definidos', () => {
        expect(COLORS.color1).toBe('#0B0E1A');
        expect(COLORS.color2).toBe('#12162A');
        expect(COLORS.color3).toBe('#181E36');
        expect(COLORS.color4).toBe('#232A4D');
        expect(COLORS.color5).toBe('#7C7CFF');
        });

        test('debe tener colores semánticos definidos', () => {
            expect(COLORS.primary).toBeDefined();
            expect(COLORS.secondary).toBeDefined();
            expect(COLORS.accent).toBeDefined();
            expect(COLORS.primaryDark).toBeDefined();
            expect(COLORS.primaryLight).toBeDefined();
        });

        test('debe tener colores de texto definidos', () => {
            expect(COLORS.textPrimary).toBeDefined();
            expect(COLORS.textSecondary).toBeDefined();
            expect(COLORS.textLight).toBeDefined();
            expect(COLORS.textMuted).toBeDefined();
        });

        test('debe tener gradientes definidos', () => {
            expect(COLORS.gradientPrimary).toContain('linear-gradient');
            expect(COLORS.gradientLight).toContain('linear-gradient');
            expect(COLORS.gradientAccent).toContain('linear-gradient');
        });

        test('debe ser un objeto readonly', () => {
            expect(Object.isFrozen(COLORS)).toBe(true);
        });
    });

    describe('API', () => {
        test('debe tener baseUrl definido', () => {
            expect(API.baseUrl).toBeDefined();
            expect(typeof API.baseUrl).toBe('string');
        });

        test('debe tener timeout definido', () => {
            expect(API.timeout).toBe(30000);
            expect(typeof API.timeout).toBe('number');
        });

        test('debe tener URLs de microservicios definidas', () => {
            expect(API.authService).toBeDefined();
            expect(API.gameCatalogService).toBeDefined();
            expect(API.orderService).toBeDefined();
            expect(API.libraryService).toBeDefined();
        });

        test('debe ser un objeto readonly', () => {
            expect(Object.isFrozen(API)).toBe(true);
        });
    });

    describe('ROUTES', () => {
        test('debe tener todas las rutas definidas', () => {
            expect(ROUTES.home).toBe('/');
            expect(ROUTES.products).toBe('/productos');
            expect(ROUTES.blogs).toBe('/blogs');
            expect(ROUTES.about).toBe('/nosotros');
            expect(ROUTES.contact).toBe('/contacto');
            expect(ROUTES.login).toBe('/login');
            expect(ROUTES.register).toBe('/registro');
            expect(ROUTES.admin).toBe('/admin');
        });

        test('debe ser un objeto readonly', () => {
            expect(Object.isFrozen(ROUTES)).toBe(true);
        });
    });
});

