# 🌐 Configuración de Dev Tunnels para Microservicios

## 📋 URLs Públicas Configuradas

Las siguientes URLs de Dev Tunnels están configuradas en `src/services/apis.ts`:

| Microservicio | URL Dev Tunnel | Puerto |
|---------------|----------------|--------|
| **Eureka Server** | `https://13wfn3bx-8761.brs.devtunnels.ms` | 8761 |
| **API Gateway** | `https://13wfn3bx-8080.brs.devtunnels.ms` | 8080 |
| **Auth Service** | `https://13wfn3bx-3001.brs.devtunnels.ms` | 3001 |
| **Game Catalog Service** | `https://13wfn3bx-3002.brs.devtunnels.ms` | 3002 |
| **Order Service** | `https://13wfn3bx-3003.brs.devtunnels.ms` | 3003 |
| **Library Service** | `https://13wfn3bx-3004.brs.devtunnels.ms` | 3004 |

---

## ✅ Configuración Aplicada

### 1. Archivo `src/services/apis.ts`

Este archivo contiene:
- ✅ URLs públicas de todos los microservicios
- ✅ Configuración del API Gateway
- ✅ Endpoints organizados por servicio
- ✅ Helpers para construir URLs

### 2. Archivo `src/config/constants.ts`

Actualizado para:
- ✅ Usar las URLs de Dev Tunnels automáticamente
- ✅ Priorizar API Gateway cuando esté disponible
- ✅ Fallback a localhost en desarrollo local
- ✅ Soporte para variables de entorno

---

## 🚀 Cómo Funciona

### En Producción (Vercel)

Por defecto, la aplicación usa:
- **API Gateway**: `https://13wfn3bx-8080.brs.devtunnels.ms`
- Todas las peticiones pasan a través del API Gateway
- El API Gateway enruta a los microservicios correspondientes

### En Desarrollo Local

Si no hay variables de entorno configuradas:
- Usa `localhost` con los puertos estándar
- O puedes configurar `REACT_APP_USE_DEV_TUNNELS=true` para usar Dev Tunnels

---

## 🔧 Variables de Entorno (Opcional)

Puedes sobrescribir las URLs usando variables de entorno en Vercel:

```
REACT_APP_API_GATEWAY_URL=https://13wfn3bx-8080.brs.devtunnels.ms
REACT_APP_AUTH_SERVICE_URL=https://13wfn3bx-3001.brs.devtunnels.ms
REACT_APP_GAME_CATALOG_SERVICE_URL=https://13wfn3bx-3002.brs.devtunnels.ms
REACT_APP_ORDER_SERVICE_URL=https://13wfn3bx-3003.brs.devtunnels.ms
REACT_APP_LIBRARY_SERVICE_URL=https://13wfn3bx-3004.brs.devtunnels.ms
REACT_APP_USE_DEV_TUNNELS=true
```

---

## 📝 Uso en los Servicios

Todos los servicios ya están configurados para usar estas URLs:

### Ejemplo: authService.ts
```typescript
import { API } from '../config/constants';

// Usa automáticamente API.authService que apunta a Dev Tunnels
const url = `${API.authService}/api/auth/login`;
```

### Ejemplo: productService.ts
```typescript
import { API } from '../config/constants';

// Usa automáticamente API.gameCatalogService
const url = `${API.gameCatalogService}/api/games`;
```

---

## 🎯 Rutas del API Gateway

Todas las peticiones pasan a través del API Gateway:

| Ruta Frontend | Microservicio | Puerto |
|---------------|---------------|--------|
| `/api/auth/**` | Auth Service | 3001 |
| `/api/users/**` | Auth Service | 3001 |
| `/api/games/**` | Game Catalog Service | 3002 |
| `/api/categories/**` | Game Catalog Service | 3002 |
| `/api/orders/**` | Order Service | 3003 |
| `/api/library/**` | Library Service | 3004 |

---

## 🔍 Verificación

### Probar Conexión

Abre la consola del navegador y verifica:

```javascript
// Debería mostrar la URL de Dev Tunnels
console.log(API.apiGateway);
// Output: "https://13wfn3bx-8080.brs.devtunnels.ms"
```

### Probar Endpoint

```javascript
// En la consola del navegador
fetch('https://13wfn3bx-8080.brs.devtunnels.ms/actuator/health')
  .then(r => r.json())
  .then(console.log);
```

---

## ⚠️ Notas Importantes

1. **CORS**: Asegúrate de que los microservicios tengan CORS configurado para aceptar peticiones desde Vercel
2. **HTTPS**: Dev Tunnels usa HTTPS, así que no hay problemas de mixed content
3. **Latencia**: Dev Tunnels puede tener más latencia que localhost
4. **Timeout**: El timeout está configurado en 30 segundos para manejar la latencia de Dev Tunnels

---

## 🔄 Actualizar URLs

Si necesitas cambiar las URLs de Dev Tunnels:

1. Edita `src/services/apis.ts`
2. Actualiza el objeto `API_URLS`
3. Haz commit y push
4. Vercel redeployará automáticamente

---

## ✅ Checklist

- [x] `apis.ts` creado con todas las URLs
- [x] `constants.ts` actualizado para usar Dev Tunnels
- [x] Servicios configurados para usar API Gateway
- [ ] Verificar que los microservicios tengan CORS configurado
- [ ] Probar conexión desde Vercel
- [ ] Verificar que todas las rutas funcionen

---

## 🆘 Troubleshooting

### Error: CORS

**Solución**: Asegúrate de que los microservicios tengan:
```properties
spring.web.cors.allowed-origins=*
spring.web.cors.allowed-methods=GET,POST,PUT,DELETE,OPTIONS
spring.web.cors.allowed-headers=*
```

### Error: Timeout

**Solución**: El timeout ya está configurado en 30 segundos. Si persiste, aumenta en `apis.ts`:
```typescript
timeout: 60000, // 60 segundos
```

### Error: Connection Refused

**Solución**: Verifica que los Dev Tunnels estén activos y accesibles.

