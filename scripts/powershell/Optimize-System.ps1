# WAX System Optimization Script
# PowerShell script for advanced system optimization

<#
.SYNOPSIS
    Optimizes Windows system for better performance
.DESCRIPTION
    This script performs various system optimizations including
    cleaning temporary files, optimizing services, and tweaking registry settings
.PARAMETER FullOptimization
    Performs a complete system optimization
.PARAMETER QuickOptimization
    Performs quick optimization tasks
#>

param(
    [switch]$FullOptimization,
    [switch]$QuickOptimization
)

# Requires Administrator privileges
if (-NOT ([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole] "Administrator"))
{
    Write-Warning "This script requires Administrator privileges. Please run as Administrator."
    exit 1
}

Write-Host "WAX System Optimizer - PowerShell Edition" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan

# Function to clean temporary files
function Clear-TemporaryFiles {
    Write-Host "`nCleaning temporary files..." -ForegroundColor Yellow
    
    $tempFolders = @(
        $env:TEMP,
        "C:\Windows\Temp",
        "C:\Windows\Prefetch"
    )
    
    $totalFreed = 0
    
    foreach ($folder in $tempFolders) {
        if (Test-Path $folder) {
            try {
                $beforeSize = (Get-ChildItem $folder -Recurse -ErrorAction SilentlyContinue | Measure-Object -Property Length -Sum).Sum
                Get-ChildItem $folder -Recurse -ErrorAction SilentlyContinue | Remove-Item -Force -Recurse -ErrorAction SilentlyContinue
                $afterSize = (Get-ChildItem $folder -Recurse -ErrorAction SilentlyContinue | Measure-Object -Property Length -Sum).Sum
                $freed = [math]::Round(($beforeSize - $afterSize) / 1MB, 2)
                $totalFreed += $freed
                Write-Host "  Cleaned $folder - Freed: $freed MB" -ForegroundColor Green
            }
            catch {
                Write-Host "  Warning: Could not clean $folder" -ForegroundColor Yellow
            }
        }
    }
    
    Write-Host "Total space freed: $totalFreed MB" -ForegroundColor Green
}

# Function to optimize Windows services
function Optimize-WindowsServices {
    Write-Host "`nOptimizing Windows services..." -ForegroundColor Yellow
    
    $servicesToDisable = @(
        "DiagTrack",        # Connected User Experiences and Telemetry
        "dmwappushservice", # WAP Push Message Routing Service
        "WSearch",          # Windows Search (optional)
        "SysMain",          # Superfetch
        "XblAuthManager",   # Xbox Live Auth Manager
        "XblGameSave"       # Xbox Live Game Save
    )
    
    foreach ($service in $servicesToDisable) {
        try {
            $svc = Get-Service -Name $service -ErrorAction SilentlyContinue
            if ($svc -and $svc.Status -eq "Running") {
                Stop-Service -Name $service -Force -ErrorAction SilentlyContinue
                Set-Service -Name $service -StartupType Disabled -ErrorAction SilentlyContinue
                Write-Host "  Disabled: $service" -ForegroundColor Green
            }
        }
        catch {
            Write-Host "  Warning: Could not disable $service" -ForegroundColor Yellow
        }
    }
}

# Function to disable telemetry
function Disable-Telemetry {
    Write-Host "`nDisabling Windows telemetry..." -ForegroundColor Yellow
    
    try {
        Set-ItemProperty -Path "HKLM:\SOFTWARE\Policies\Microsoft\Windows\DataCollection" -Name "AllowTelemetry" -Value 0 -Force
        Write-Host "  Telemetry disabled" -ForegroundColor Green
    }
    catch {
        Write-Host "  Warning: Could not disable telemetry" -ForegroundColor Yellow
    }
}

# Function to optimize network settings
function Optimize-Network {
    Write-Host "`nOptimizing network settings..." -ForegroundColor Yellow
    
    try {
        # Disable network throttling
        Set-ItemProperty -Path "HKLM:\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Multimedia\SystemProfile" -Name "NetworkThrottlingIndex" -Value 0xFFFFFFFF -Force
        
        # Enable TCP Fast Open
        netsh int tcp set global fastopen=enabled
        
        Write-Host "  Network optimized" -ForegroundColor Green
    }
    catch {
        Write-Host "  Warning: Could not optimize network" -ForegroundColor Yellow
    }
}

# Function to optimize visual effects
function Optimize-VisualEffects {
    Write-Host "`nOptimizing visual effects..." -ForegroundColor Yellow
    
    try {
        Set-ItemProperty -Path "HKCU:\Software\Microsoft\Windows\CurrentVersion\Explorer\VisualEffects" -Name "VisualFXSetting" -Value 2 -Force
        Write-Host "  Visual effects optimized" -ForegroundColor Green
    }
    catch {
        Write-Host "  Warning: Could not optimize visual effects" -ForegroundColor Yellow
    }
}

# Main execution
if ($QuickOptimization) {
    Clear-TemporaryFiles
    Disable-Telemetry
}
elseif ($FullOptimization) {
    Clear-TemporaryFiles
    Optimize-WindowsServices
    Disable-Telemetry
    Optimize-Network
    Optimize-VisualEffects
}
else {
    Write-Host "Please specify -QuickOptimization or -FullOptimization" -ForegroundColor Red
}

Write-Host "`nOptimization completed!" -ForegroundColor Cyan
