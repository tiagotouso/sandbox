@echo off
title Auto Git Push Insano

cd /d "%~dp0"

setlocal EnableDelayedExpansion

REM =========================
REM Corrige safe.directory
REM =========================
git config --global --add safe.directory "%cd%" >nul 2>&1

REM =========================
REM Frases aleatorias
REM =========================
set msgs[0]=mexi sem querer
set msgs[1]=agora vai
set msgs[2]=commit da madrugada
set msgs[3]=bug corrigido na fe
set msgs[4]=mais uma gambiarra
set msgs[5]=funcionou nao sei como
set msgs[6]=codigo ficou estranhamente vivo
set msgs[7]=deploy da coragem
set msgs[8]=o importante e compilar
set msgs[9]=senhor tenha piedade
set msgs[10]=na minha maquina funciona
set msgs[11]=mais cafe menos bugs
set msgs[12]=empurrando codigo com esperanca
set msgs[13]=commit totalmente consciente
set msgs[14]=isso parecia uma boa ideia

set /a rand=%random% %% 15

echo.
echo =====================================
echo Enviando codigo para o universo...
echo =====================================
echo.

git add .

git commit -m "!msgs[%rand%]!"

git push

IF %ERRORLEVEL% EQU 0 (
    echo.
    echo =====================================
    echo Codigo enviado com sucesso
    echo =====================================
) ELSE (
    echo.
    echo =====================================
    echo Deu ruim no push
    echo =====================================
)

echo.
pause