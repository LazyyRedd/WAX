# WAX System Information Script
# Retrieves detailed system information

<#
.SYNOPSIS
    Retrieves system information
.DESCRIPTION
    Collects CPU, memory, disk, and other system metrics
.PARAMETER OutputJson
    Outputs the result in JSON format
#>

param(
    [switch]$OutputJson
)

function Get-WAXSystemInfo {
    # CPU Information
    $cpu = Get-CimInstance -ClassName Win32_Processor | Select-Object -First 1
    $cpuUsage = (Get-Counter '\Processor(_Total)\% Processor Time').CounterSamples.CookedValue
    
    # Memory Information
    $os = Get-CimInstance -ClassName Win32_OperatingSystem
    $totalMemory = [math]::Round($os.TotalVisibleMemorySize / 1MB, 2)
    $freeMemory = [math]::Round($os.FreePhysicalMemory / 1MB, 2)
    $usedMemory = [math]::Round($totalMemory - $freeMemory, 2)
    
    # Disk Information
    $disk = Get-CimInstance -ClassName Win32_LogicalDisk -Filter "DeviceID='C:'"
    $totalDisk = [math]::Round($disk.Size / 1GB, 2)
    $freeDisk = [math]::Round($disk.FreeSpace / 1GB, 2)
    $usedDisk = [math]::Round($totalDisk - $freeDisk, 2)
    
    # System Uptime
    $bootTime = $os.LastBootUpTime
    $uptime = (Get-Date) - $bootTime
    
    # GPU Information
    $gpu = Get-CimInstance -ClassName Win32_VideoController | Select-Object -First 1
    
    $systemInfo = [PSCustomObject]@{
        CPU = @{
            Name = $cpu.Name
            Cores = $cpu.NumberOfCores
            LogicalProcessors = $cpu.NumberOfLogicalProcessors
            Usage = [math]::Round($cpuUsage, 2)
        }
        Memory = @{
            Total = $totalMemory
            Free = $freeMemory
            Used = $usedMemory
            UsagePercent = [math]::Round(($usedMemory / $totalMemory) * 100, 2)
        }
        Disk = @{
            Total = $totalDisk
            Free = $freeDisk
            Used = $usedDisk
            UsagePercent = [math]::Round(($usedDisk / $totalDisk) * 100, 2)
        }
        GPU = @{
            Name = $gpu.Name
            DriverVersion = $gpu.DriverVersion
            VideoMemory = [math]::Round($gpu.AdapterRAM / 1GB, 2)
        }
        System = @{
            OS = $os.Caption
            Version = $os.Version
            Architecture = $os.OSArchitecture
            UptimeHours = [math]::Round($uptime.TotalHours, 2)
            UptimeDays = [math]::Round($uptime.TotalDays, 2)
        }
    }
    
    if ($OutputJson) {
        return $systemInfo | ConvertTo-Json -Depth 3
    }
    else {
        return $systemInfo
    }
}

# Execute
Get-WAXSystemInfo
