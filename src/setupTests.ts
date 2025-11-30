// Configuración inicial para las pruebas con Vitest
import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

// Limpiar después de cada test
afterEach(() => {
  cleanup();
});








