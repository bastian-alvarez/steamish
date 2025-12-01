# 🚀 Guía para hacer público el proyecto con ngrok

Esta guía te ayudará a exponer tu proyecto React y los microservicios Spring Boot usando ngrok.

## 📋 Requisitos previos

1. **Cuenta en ngrok**: Regístrate en [ngrok.com](https://ngrok.com) (plan gratuito disponible)
2. **ngrok instalado**: Descarga e instala ngrok desde [ngrok.com/download](https://ngrok.com/download)
3. **Authtoken de ngrok**: Obtén tu authtoken desde el dashboard de ngrok

## 🔧 Configuración inicial de ngrok

1. **Configurar authtoken**:
   ```bash
   ngrok config add-authtoken TU_AUTHTOKEN_AQUI
   ```

## 🎯 Opción 1: Desarrollo local con proxy (⭐ RECOMENDADA)

Esta opción es la más simple y funciona perfectamente para desarrollo local y demos.

### Pasos:

1. **Asegúrate de que todos los microservicios estén corriendo**:
   - Auth Service: `http://localhost:3001`
   - Game Catalog Service: `http://localhost:3002`
   - Order Service: `http://localhost:3003`
   - Library Service: `http://localhost:3004`
   - Eureka Server: `http://localhost:8761` (opcional, pero recomendado)

2. **Inicia el frontend React**:
   ```bash
   npm start
   ```
   El frontend se iniciará en `http://localhost:3000` (o el puerto que te indique)

3. **Exponer solo el frontend con ngrok**:
   
   **Opción A - Usando el script** (Windows):
   ```bash
   start-ngrok.bat
   ```
   
   **Opción B - Manualmente**:
   ```bash
   ngrok http 3000
   ```
   (O el puerto que esté usando tu frontend)

4. **¡Listo!** ngrok te dará una URL pública tipo:
   ```
   Forwarding  https://abc123.ngrok-free.app -> http://localhost:3000
   ```

5. **Cómo funciona**:
   - Cuando alguien accede a `https://abc123.ngrok-free.app`, carga tu frontend React
   - El frontend hace peticiones a rutas relativas como `/api/auth/login`, `/api/games`, etc.
   - El proxy de Create React App (configurado en `setupProxy.js`) redirige automáticamente:
     - `/api/auth/*` → `http://localhost:3001/api/*`
     - `/api/games/*` → `http://localhost:3002/api/games/*`
     - `/api/orders/*` → `http://localhost:3003/api/orders/*`
     - `/api/library/*` → `http://localhost:3004/api/library/*`
   - **IMPORTANTE**: Tu PC debe estar encendido y todos los microservicios corriendo

### Ventajas:
- ✅ Solo necesitas un túnel ngrok
- ✅ Configuración simple
- ✅ Funciona automáticamente con el proxy

### Desventajas:
- ❌ Requiere que tu PC esté encendido
- ❌ Los microservicios deben estar corriendo localmente

---

## 🌐 Opción 2: Exponer cada microservicio con ngrok (Para producción/demo)

Esta opción es más compleja pero permite que los microservicios estén en servidores diferentes.

### Pasos:

1. **Exponer cada microservicio con su propio túnel ngrok**:

   **Terminal 1 - Auth Service**:
   ```bash
   ngrok http 3001
   # Anota la URL: https://auth-abc123.ngrok-free.app
   ```

   **Terminal 2 - Game Catalog Service**:
   ```bash
   ngrok http 3002
   # Anota la URL: https://games-abc123.ngrok-free.app
   ```

   **Terminal 3 - Order Service**:
   ```bash
   ngrok http 3003
   # Anota la URL: https://orders-abc123.ngrok-free.app
   ```

   **Terminal 4 - Library Service**:
   ```bash
   ngrok http 3004
   # Anota la URL: https://library-abc123.ngrok-free.app
   ```

2. **Crear archivo `.env` en la raíz del proyecto**:
   ```env
   REACT_APP_USE_PROXY=false
   REACT_APP_AUTH_SERVICE_URL=https://auth-abc123.ngrok-free.app
   REACT_APP_GAME_CATALOG_SERVICE_URL=https://games-abc123.ngrok-free.app
   REACT_APP_ORDER_SERVICE_URL=https://orders-abc123.ngrok-free.app
   REACT_APP_LIBRARY_SERVICE_URL=https://library-abc123.ngrok-free.app
   ```

3. **Reiniciar el frontend**:
   ```bash
   npm start
   ```

4. **Exponer el frontend con ngrok**:
   ```bash
   ngrok http 3000
   ```

### Ventajas:
- ✅ Los microservicios pueden estar en diferentes servidores
- ✅ Más flexible para producción

### Desventajas:
- ❌ Necesitas múltiples túneles ngrok (plan gratuito permite 1 a la vez)
- ❌ Configuración más compleja

---

## ⚠️ Limitaciones del plan gratuito de ngrok

- **1 túnel activo a la vez**: Si usas la Opción 2, necesitarás el plan de pago
- **URLs temporales**: Las URLs cambian cada vez que reinicias ngrok (a menos que uses un dominio personalizado)
- **Límites de tráfico**: Hay límites razonables pero suficientes para demos

---

## 🎨 Solución recomendada para tu caso

**Usa la Opción 1** (proxy local):
- Es la más simple
- Solo necesitas 1 túnel ngrok
- Funciona perfectamente para demos y desarrollo
- El proxy maneja automáticamente el enrutamiento a los microservicios

---

## 📝 Checklist antes de compartir

- [ ] Todos los microservicios están corriendo
- [ ] El frontend React está corriendo
- [ ] ngrok está configurado con tu authtoken
- [ ] Tienes un túnel ngrok activo apuntando al puerto del frontend
- [ ] Has probado la URL de ngrok en un navegador
- [ ] Has verificado que las peticiones API funcionan correctamente

---

## 🔍 Troubleshooting

### Error: "Connection refused"
- Verifica que todos los microservicios estén corriendo
- Verifica que ngrok esté apuntando al puerto correcto

### Error: "CORS error"
- Los microservicios deben tener CORS configurado para aceptar peticiones desde la URL de ngrok
- Verifica la configuración de CORS en cada microservicio

### Las peticiones no llegan a los microservicios
- Verifica que el proxy esté configurado correctamente
- Revisa la consola del navegador para ver las peticiones
- Verifica los logs de los microservicios

---

## 📚 Recursos adicionales

- [Documentación de ngrok](https://ngrok.com/docs)
- [Documentación de Create React App Proxy](https://create-react-app.dev/docs/proxying-api-requests-in-development/)

