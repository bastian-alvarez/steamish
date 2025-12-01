# 🚂 Guía de Despliegue en Railway

Esta guía te ayudará a desplegar tu API Gateway en Railway.

## 📋 Requisitos Previos

1. **Cuenta en Railway**: Crea una cuenta en [railway.app](https://railway.app)
2. **Repositorio en GitHub**: Tu proyecto debe estar en GitHub

## 🔧 Paso 1: Crear Proyecto en Railway

1. Ve a [railway.app](https://railway.app) e inicia sesión
2. Click en "New Project"
3. Selecciona "Deploy from GitHub repo"
4. Conecta tu repositorio `MS-orden-resena-catalogo`
5. Selecciona el servicio `api-gateway`

## ⚙️ Paso 2: Configurar el Servicio

Railway detectará automáticamente que es un proyecto Java/Maven. Configura lo siguiente:

### Variables de Entorno

En la pestaña "Variables" del servicio, agrega:

```
SERVER_PORT=8080
EUREKA_CLIENT_SERVICE_URL_DEFAULTZONE=http://eureka-server:8761/eureka/
```

**Nota**: Si no usas Eureka, puedes omitir la segunda variable.

### Configuración de Build

Railway debería detectar automáticamente:
- **Build Command**: `mvn clean package -DskipTests`
- **Start Command**: `java -jar target/api-gateway-*.jar`

Si no se detecta automáticamente, configúralo manualmente en "Settings" > "Deploy".

## 🌐 Paso 3: Obtener la URL

Una vez desplegado, Railway te dará una URL automáticamente:
- Ve a la pestaña "Settings"
- En "Domains", verás tu URL tipo: `https://tu-proyecto.railway.app`
- **Copia esta URL** - la necesitarás para Vercel

## 🔗 Paso 4: Configurar en Vercel

1. Ve a tu proyecto en Vercel
2. Settings > Environment Variables
3. Agrega:
   - Key: `REACT_APP_API_GATEWAY_URL`
   - Value: `https://tu-proyecto.railway.app` (tu URL de Railway)
4. Guarda y haz Redeploy

## ✅ Verificar

1. Abre la URL de Railway en tu navegador
2. Deberías ver una respuesta del API Gateway (o un error 404 si no hay rutas raíz, lo cual es normal)
3. Prueba: `https://tu-proyecto.railway.app/api/games` - debería responder

## 🐛 Solución de Problemas

### Error: "Build failed"
- Verifica que Maven esté configurado correctamente
- Revisa los logs de build en Railway
- Asegúrate de que el `pom.xml` esté en el directorio correcto

### Error: "Port not found"
- Verifica que `SERVER_PORT=8080` esté configurado
- Railway debería detectar automáticamente el puerto 8080

### Error: "Service unavailable"
- Verifica que todos los microservicios estén desplegados
- Si usas Eureka, asegúrate de que esté corriendo
- Revisa los logs del servicio en Railway

### La URL no funciona
- Espera unos minutos después del despliegue
- Verifica que el servicio esté "Active" en Railway
- Revisa los logs para ver si hay errores

## 💡 Notas Importantes

1. **Eureka Server**: Si usas Eureka, necesitarás desplegar también el Eureka Server en Railway
2. **Base de Datos**: Si tus microservicios usan bases de datos, necesitarás configurarlas en Railway
3. **CORS**: Asegúrate de que tu API Gateway tenga CORS configurado para permitir tu dominio de Vercel

## 🎯 Próximos Pasos

Una vez que tengas el API Gateway funcionando en Railway:
1. Configura la variable de entorno en Vercel
2. Haz redeploy en Vercel
3. Verifica que tu aplicación funcione correctamente

