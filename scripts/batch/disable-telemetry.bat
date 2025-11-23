@echo off
REM WAX Disable Telemetry Script
REM Disables Windows telemetry and data collection

echo ========================================
echo WAX - Disable Windows Telemetry
echo ========================================
echo.

REM Check for administrator privileges
net session >nul 2>&1
if %errorLevel% neq 0 (
    echo ERROR: This script requires Administrator privileges.
    pause
    exit /b 1
)

echo Disabling telemetry services...

REM Disable Connected User Experiences and Telemetry
sc config DiagTrack start= disabled >nul 2>&1
sc stop DiagTrack >nul 2>&1

REM Disable dmwappushservice
sc config dmwappushservice start= disabled >nul 2>&1
sc stop dmwappushservice >nul 2>&1

echo.
echo Configuring registry settings...

REM Set telemetry to 0 (Security level - Enterprise only)
reg add "HKLM\SOFTWARE\Policies\Microsoft\Windows\DataCollection" /v AllowTelemetry /t REG_DWORD /d 0 /f >nul 2>&1

REM Disable Application Telemetry
reg add "HKLM\SOFTWARE\Policies\Microsoft\Windows\AppCompat" /v AITEnable /t REG_DWORD /d 0 /f >nul 2>&1

REM Disable Customer Experience Improvement Program
reg add "HKLM\SOFTWARE\Policies\Microsoft\SQMClient\Windows" /v CEIPEnable /t REG_DWORD /d 0 /f >nul 2>&1

echo.
echo ========================================
echo Telemetry disabled successfully!
echo ========================================
echo.
echo Note: A system restart is recommended for changes to take full effect.
pause
