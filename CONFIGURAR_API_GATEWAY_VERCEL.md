# 🔗 Configurar API Gateway para Vercel

Esta guía te ayudará a obtener una URL pública para tu API Gateway y configurarla en Vercel.

## 📋 Opciones para exponer tu API Gateway

Tienes 3 opciones principales:

### Opción 1: ngrok (⭐ Más rápida para pruebas)

**Ventajas:**
- ✅ Gratis
- ✅ Configuración rápida (5 minutos)
- ✅ Perfecto para pruebas y demos

**Desventajas:**
- ⚠️ La URL cambia cada vez que reinicias ngrok (a menos que uses plan de pago)
- ⚠️ Límite de conexiones en plan gratuito

**Pasos:**

1. **Asegúrate de que tu API Gateway esté corriendo**:
   ```bash
   cd MS-orden-resena-catalogo/api-gateway
   mvn spring-boot:run
   ```
   El API Gateway debería estar corriendo en `http://localhost:8080`

2. **Instala ngrok** (si no lo tienes):
   - Descarga desde: https://ngrok.com/download
   - O instala con: `choco install ngrok` (Windows) o `brew install ngrok` (Mac)

3. **Configura tu authtoken** (si es la primera vez):
   ```bash
   ngrok config add-authtoken TU_AUTHTOKEN_AQUI
   ```
   Obtén tu authtoken desde: https://dashboard.ngrok.com/get-started/your-authtoken

4. **Expone el API Gateway**:
   ```bash
   ngrok http 8080
   ```

5. **Copia la URL HTTPS** que ngrok te proporciona:
   ```
   Forwarding: https://abc123.ngrok-free.app -> http://localhost:8080
   ```
   **Esta es la URL que usarás en Vercel**

6. **Configura en Vercel**:
   - Ve a tu proyecto en Vercel
   - Settings > Environment Variables
   - Agrega:
     - Key: `REACT_APP_API_GATEWAY_URL`
     - Value: `https://abc123.ngrok-free.app` (tu URL de ngrok)
   - Selecciona: Production, Preview, Development
   - Guarda y haz Redeploy

---

### Opción 2: Railway (⭐ Recomendada para producción)

**Ventajas:**
- ✅ URL permanente
- ✅ Plan gratuito generoso
- ✅ Fácil de configurar
- ✅ Ideal para producción

**Pasos:**

1. **Crea cuenta en Railway**: https://railway.app

2. **Crea un nuevo proyecto**:
   - Click en "New Project"
   - Selecciona "Deploy from GitHub repo"
   - Conecta tu repositorio `MS-orden-resena-catalogo`
   - Selecciona el servicio `api-gateway`

3. **Configura el servicio**:
   - Railway detectará automáticamente que es un proyecto Maven/Java
   - Asegúrate de que el puerto esté configurado como `8080`
   - Railway te dará una URL automáticamente tipo: `https://tu-proyecto.railway.app`

4. **Configura variables de entorno en Railway** (si es necesario):
   - `SERVER_PORT=8080`
   - `EUREKA_CLIENT_SERVICE_URL_DEFAULTZONE=http://eureka-server:8761/eureka/` (si usas Eureka)

5. **Configura en Vercel**:
   - Key: `REACT_APP_API_GATEWAY_URL`
   - Value: `https://tu-proyecto.railway.app` (tu URL de Railway)

---

### Opción 3: Render

**Ventajas:**
- ✅ URL permanente
- ✅ Plan gratuito disponible
- ✅ Similar a Railway

**Pasos:**

1. **Crea cuenta en Render**: https://render.com

2. **Crea un nuevo Web Service**:
   - Conecta tu repositorio de GitHub
   - Selecciona el directorio `api-gateway`
   - Configura:
     - Build Command: `mvn clean package -DskipTests`
     - Start Command: `java -jar target/api-gateway-*.jar`
     - Port: `8080`

3. **Render te dará una URL** tipo: `https://tu-proyecto.onrender.com`

4. **Configura en Vercel**:
   - Key: `REACT_APP_API_GATEWAY_URL`
   - Value: `https://tu-proyecto.onrender.com`

---

## 🎯 Configurar en Vercel (Paso a paso)

Una vez que tengas tu URL del API Gateway:

1. **Ve a tu proyecto en Vercel**: https://vercel.com/dashboard

2. **Navega a Settings**:
   - Click en tu proyecto `steamish-react-app`
   - Click en "Settings" en el menú superior

3. **Ve a Environment Variables**:
   - En el menú lateral izquierdo, click en "Environment Variables"

4. **Agrega la variable**:
   - Click en "Add New"
   - Key: `REACT_APP_API_GATEWAY_URL`
   - Value: `https://tu-url-del-api-gateway.com` (la URL que obtuviste)
   - Selecciona los ambientes: ✅ Production, ✅ Preview, ✅ Development
   - Click en "Save"

5. **Redeploy**:
   - Ve a "Deployments"
   - Click en los tres puntos del último deployment
   - Selecciona "Redeploy"
   - O simplemente haz un nuevo commit y push (Vercel desplegará automáticamente)

---

## ✅ Verificar que funciona

1. **Abre tu aplicación en Vercel**
2. **Abre la consola del navegador** (F12)
3. **Verifica que no haya errores de CORS o conexión**
4. **Prueba cargar la lista de juegos** - debería funcionar si todo está bien configurado

---

## 🐛 Solución de problemas

### Error: "Failed to fetch" o "CORS policy"
- Verifica que tu API Gateway esté corriendo y accesible
- Verifica que la URL en Vercel sea correcta (debe ser HTTPS)
- Asegúrate de que tu API Gateway tenga CORS configurado para permitir tu dominio de Vercel

### Error: "Connection refused"
- Verifica que tu API Gateway esté corriendo
- Si usas ngrok, verifica que el túnel esté activo
- Si usas Railway/Render, verifica que el servicio esté desplegado y corriendo

### La URL de ngrok cambió
- Si usas ngrok gratuito, la URL cambia cada vez que reinicias
- Actualiza la variable de entorno en Vercel con la nueva URL
- Considera usar Railway o Render para una URL permanente

---

## 💡 Recomendación

Para **producción**, usa **Railway** o **Render** porque:
- ✅ URL permanente (no cambia)
- ✅ Más estable
- ✅ Mejor para usuarios finales

Para **pruebas rápidas**, usa **ngrok** porque:
- ✅ Configuración inmediata
- ✅ Perfecto para demos

