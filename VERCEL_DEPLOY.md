# 🚀 Guía de Despliegue en Vercel

Esta guía te ayudará a desplegar tu aplicación React en Vercel de forma rápida y sencilla.

## 📋 Requisitos Previos

1. **Cuenta en Vercel**: Crea una cuenta en [vercel.com](https://vercel.com)
2. **Repositorio en GitHub**: Tu proyecto debe estar en un repositorio de GitHub
3. **API Gateway público**: Necesitas tener tu API Gateway accesible públicamente (usando ngrok, Railway, Render, etc.)

## 🔧 Paso 1: Preparar el Proyecto

El proyecto ya está configurado con:
- ✅ `vercel.json` - Configuración de Vercel
- ✅ `package.json` - Scripts de build
- ✅ Variables de entorno configuradas en `constants.ts`

## 📤 Paso 2: Subir a GitHub

Si aún no has subido tu proyecto a GitHub:

```bash
git add .
git commit -m "Preparado para Vercel"
git push origin main
```

## 🌐 Paso 3: Desplegar en Vercel

### Opción A: Desde el Dashboard de Vercel (Recomendado)

1. Ve a [vercel.com/new](https://vercel.com/new)
2. Conecta tu repositorio de GitHub
3. Selecciona el proyecto `steamish-react-app`
4. Vercel detectará automáticamente que es un proyecto Create React App
5. **IMPORTANTE**: Configura las variables de entorno antes de desplegar

### Opción B: Desde la CLI de Vercel

```bash
# Instalar Vercel CLI
npm i -g vercel

# Iniciar sesión
vercel login

# Desplegar
vercel

# Para producción
vercel --prod
```

## 🔐 Paso 4: Configurar Variables de Entorno

En el dashboard de Vercel, ve a:
**Settings > Environment Variables**

Agrega las siguientes variables:

### Variable Requerida:

```
REACT_APP_API_GATEWAY_URL
```
**Valor**: La URL pública de tu API Gateway
- Ejemplo con ngrok: `https://tu-dominio.ngrok-free.app`
- Ejemplo con Railway: `https://tu-proyecto.railway.app`
- Ejemplo con Render: `https://tu-proyecto.onrender.com`

### Variables Opcionales (si no usas API Gateway):

```
REACT_APP_AUTH_SERVICE_URL
REACT_APP_GAME_CATALOG_SERVICE_URL
REACT_APP_ORDER_SERVICE_URL
REACT_APP_LIBRARY_SERVICE_URL
REACT_APP_API_URL
```

## 🎯 Paso 5: Configurar tu API Gateway

Tu API Gateway debe estar:
1. **Públicamente accesible** (usando ngrok, Railway, Render, etc.)
2. **Configurado con CORS** para permitir peticiones desde tu dominio de Vercel
3. **Con todas las rutas configuradas** correctamente

### Ejemplo de configuración CORS en API Gateway:

```java
@Configuration
public class CorsConfig {
    @Bean
    public CorsWebFilter corsWebFilter() {
        CorsConfiguration corsConfig = new CorsConfiguration();
        corsConfig.setAllowedOrigins(Arrays.asList(
            "https://tu-proyecto.vercel.app",
            "https://tu-dominio-custom.com"
        ));
        corsConfig.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        corsConfig.setAllowedHeaders(List.of("*"));
        corsConfig.setAllowCredentials(true);
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", corsConfig);
        
        return new CorsWebFilter(source);
    }
}
```

## ✅ Paso 6: Verificar el Despliegue

1. Vercel te proporcionará una URL como: `https://tu-proyecto.vercel.app`
2. Abre la URL en tu navegador
3. Verifica que la aplicación carga correctamente
4. Abre la consola del navegador (F12) para verificar que no hay errores de CORS

## 🔄 Paso 7: Actualizaciones Automáticas

Vercel se conecta automáticamente a tu repositorio de GitHub:
- Cada push a `main` desplegará automáticamente en producción
- Cada push a otras ramas creará un preview deployment

## 🐛 Solución de Problemas

### Error: "Failed to fetch"
- Verifica que tu API Gateway esté corriendo y accesible públicamente
- Verifica que la variable `REACT_APP_API_GATEWAY_URL` esté configurada correctamente
- Verifica que CORS esté configurado en tu API Gateway

### Error: "CORS policy"
- Asegúrate de que tu API Gateway permita el origen de Vercel
- Agrega tu dominio de Vercel a la lista de orígenes permitidos en CORS

### Error: "Build failed"
- Verifica que `npm run build` funcione localmente
- Revisa los logs de build en Vercel para ver el error específico

## 📝 Notas Importantes

1. **Variables de entorno**: Las variables deben comenzar con `REACT_APP_` para que React las incluya en el build
2. **API Gateway**: Es recomendable usar un API Gateway en lugar de URLs directas a microservicios
3. **HTTPS**: Vercel siempre usa HTTPS, asegúrate de que tu API Gateway también use HTTPS
4. **CORS**: Tu API Gateway debe permitir peticiones desde tu dominio de Vercel

## 🎉 ¡Listo!

Tu aplicación debería estar funcionando en Vercel. Si tienes problemas, revisa los logs en el dashboard de Vercel o la consola del navegador.

