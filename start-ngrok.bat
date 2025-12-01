@echo off
echo ========================================
echo   Iniciando ngrok para Steamish
echo ========================================
echo.
echo Asegurate de que:
echo   1. Todos los microservicios esten corriendo
echo   2. El frontend React este corriendo (npm start)
echo   3. Tengas configurado tu authtoken de ngrok
echo.
echo Presiona cualquier tecla para continuar...
pause >nul

echo.
echo Iniciando ngrok en el puerto 3000...
echo (Si tu frontend usa otro puerto, cambia el numero)
echo.

ngrok http 3000

echo.
echo ngrok se ha cerrado.
pause

