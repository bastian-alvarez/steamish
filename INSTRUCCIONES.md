

### Paso 1: Verificar Node.js

Abre una terminal (PowerShell, CMD, o Git Bash) y ejecuta:

```bash
node --version
npm --version
```

Si ves números de versión, ¡estás listo! Si no:
- Instala Node.js desde: https://nodejs.org/
- Descarga la versión LTS
- Reinicia tu terminal después de instalar

### Paso 2: Navegar al Proyecto

```bash
cd C:\Users\sebas\OneDrive\Escritorio\fullstack\steamish
```

### Paso 3: Instalar Dependencias

```bash
npm install
```

Esto tomará algunos minutos la primera vez. Verás un progreso en la terminal.

### Paso 4: Iniciar el Servidor

```bash
npm start
```

El navegador se abrirá automáticamente en `http://localhost:3000`


Si todo funciona correctamente, deberías ver:
- La página de inicio de Steamish
- El header con navegación
- Juegos destacados en la página principal

## Credenciales de Prueba

**Usuario Demo:**
- Email: `demo@steamish.com`
- Password: `demo123`

**Usuario Admin:**
- Email: `admin@steamish.com`
- Password: `admin123`

## Detener el Servidor

Presiona `Ctrl + C` en la terminal donde está corriendo el servidor.

## Problemas?

1. **Error "npm no se reconoce"**
   - Instala Node.js desde nodejs.org
   - Reinicia tu terminal

2. **Error "Puerto 3000 ocupado"**
   - Cierra otras aplicaciones que usen el puerto
   - O espera unos minutos y vuelve a intentar

3. **Error al instalar dependencias**
   - Elimina la carpeta `node_modules` si existe
   - Elimina `package-lock.json` si existe
   - Ejecuta `npm install` de nuevo

---

¡Listo para comenzar!

