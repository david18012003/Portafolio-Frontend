@echo off
:: Configurar Git si aún no está configurado
git config --global user.name "david18012003"
git config --global user.email "bravocarmen264@gmail.com"

:: Inicializar repositorio (solo si es la primera vez)
if not exist ".git" (
    echo Inicializando repositorio Git...
    git init
    echo "# Portafolio-Frontend" >> README.md
    git add README.md
    git commit -m "primer commit"
    git branch -M main
    git remote add origin https://github.com/david18012003/Portafolio-Frontend.git
    git push -u origin main
) else (
    :: Añadir todos los archivos
    git add .

    :: Crear mensaje de commit con fecha y hora
    for /f %%i in ('powershell -command "Get-Date -Format yyyy-MM-dd_HH-mm-ss"') do set fecha=%%i
    git commit -m "Actualización automática: %fecha% - %date% %time% frontend"
    echo "Actualización automática: %fecha% - %date% %time% frontend"

    :: Hacer push
    git push origin main
)

pause
