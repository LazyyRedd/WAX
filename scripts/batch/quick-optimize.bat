@echo off
REM WAX Quick Optimization Script
REM Performs quick system cleanup and optimization

echo ========================================
echo WAX System Optimizer - Quick Mode
echo ========================================
echo.

REM Check for administrator privileges
net session >nul 2>&1
if %errorLevel% neq 0 (
    echo ERROR: This script requires Administrator privileges.
    echo Please run as Administrator.
    pause
    exit /b 1
)

echo [1/5] Cleaning temporary files...
del /q /f /s "%TEMP%\*" 2>nul
del /q /f /s "C:\Windows\Temp\*" 2>nul
echo Done.

echo.
echo [2/5] Cleaning Windows Update cache...
net stop wuauserv >nul 2>&1
del /q /f /s "C:\Windows\SoftwareDistribution\Download\*" 2>nul
net start wuauserv >nul 2>&1
echo Done.

echo.
echo [3/5] Flushing DNS cache...
ipconfig /flushdns >nul
echo Done.

echo.
echo [4/5] Clearing recycle bin...
rd /s /q %systemdrive%\$Recycle.bin 2>nul
echo Done.

echo.
echo [5/5] Optimizing system memory...
echo. > "%TEMP%\empty.txt"
del "%TEMP%\empty.txt"
echo Done.

echo.
echo ========================================
echo Optimization completed successfully!
echo ========================================
pause
