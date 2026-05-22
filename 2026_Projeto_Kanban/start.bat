@echo off
:: Altera a pagina de codigo para UTF-8 para suportar caracteres especiais e acentos no caminho
chcp 65001 >nul

title Servidor de Desenvolvimento
cd /d "%~dp0"

echo ===================================================
echo   Iniciando o Servidor de Desenvolvimento
echo ===================================================
echo.

:: Verifica se a pasta node_modules existe
if exist "node_modules\" goto :iniciar_servidor

echo [INFO] Pasta 'node_modules' nao encontrada.
echo [INFO] Instalando as dependencias do projeto (npm install)...
call npm install
if errorlevel 1 goto :erro_instalacao

:iniciar_servidor
echo [INFO] Iniciando o servidor Vite e abrindo o navegador...
call npm run dev -- --open
if errorlevel 1 goto :erro_servidor
goto :fim

:erro_instalacao
echo.
echo [ERRO] Falha ao instalar as dependencias.
echo Verifique se o Node.js esta instalado e se o comando 'npm' esta acessivel.
pause
exit /b 1

:erro_servidor
echo.
echo [ERRO] Ocorreu um erro ao iniciar o servidor.
pause
exit /b 1

:fim
