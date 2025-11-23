@echo off
REM WAX Network Optimization Script
REM Optimizes network settings for better performance

echo ========================================
echo WAX - Network Optimization
echo ========================================
echo.

REM Check for administrator privileges
net session >nul 2>&1
if %errorLevel% neq 0 (
    echo ERROR: This script requires Administrator privileges.
    pause
    exit /b 1
)

echo [1/6] Resetting network stack...
netsh int ip reset >nul
netsh winsock reset >nul
echo Done.

echo.
echo [2/6] Flushing DNS cache...
ipconfig /flushdns >nul
echo Done.

echo.
echo [3/6] Releasing and renewing IP...
ipconfig /release >nul 2>&1
ipconfig /renew >nul
echo Done.

echo.
echo [4/6] Optimizing TCP settings...
netsh int tcp set global autotuninglevel=normal >nul
netsh int tcp set global chimney=enabled >nul
netsh int tcp set global dca=enabled >nul
netsh int tcp set global netdma=enabled >nul
echo Done.

echo.
echo [5/6] Enabling TCP Fast Open...
netsh int tcp set global fastopen=enabled >nul 2>&1
echo Done.

echo.
echo [6/6] Disabling network throttling...
reg add "HKLM\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Multimedia\SystemProfile" /v NetworkThrottlingIndex /t REG_DWORD /d 0xFFFFFFFF /f >nul
echo Done.

echo.
echo ========================================
echo Network optimization completed!
echo ========================================
echo.
echo Note: A system restart is recommended for changes to take full effect.
pause
