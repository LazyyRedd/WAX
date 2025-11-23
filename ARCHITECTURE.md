# WAX Architecture Documentation

## Overview

WAX is a multi-layered Windows system optimizer that combines modern web technologies with powerful native Windows capabilities. The application is built using three main technology stacks:

1. **Electron + React** - Cross-platform UI
2. **C# (.NET 8)** - High-performance core components
3. **PowerShell + Batch** - System-level scripting

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────┐
│                    Electron App                          │
│  ┌───────────────────────────────────────────────────┐  │
│  │         React UI (Frontend)                       │  │
│  │  - Components (Sidebar, Header, Cards)            │  │
│  │  - Pages (15+ feature pages)                      │  │
│  │  - Styles (CSS with animations)                   │  │
│  └───────────────┬───────────────────────────────────┘  │
│                  │ HTTP REST API                         │
│                  ▼                                        │
│  ┌───────────────────────────────────────────────────┐  │
│  │         Electron Main Process                     │  │
│  │  - Window management                              │  │
│  │  - C# service lifecycle management                │  │
│  │  - IPC communication                              │  │
│  └───────────────┬───────────────────────────────────┘  │
└──────────────────┼───────────────────────────────────────┘
                   │ Spawns & Communicates
                   ▼
┌─────────────────────────────────────────────────────────┐
│              C# Backend Service                          │
│  ┌───────────────────────────────────────────────────┐  │
│  │         WAX.Services (ASP.NET Core)               │  │
│  │  - REST API Controllers                           │  │
│  │  - System endpoints                               │  │
│  │  - CORS configuration                             │  │
│  └───────────────┬───────────────────────────────────┘  │
│                  │ Uses                                  │
│                  ▼                                        │
│  ┌───────────────────────────────────────────────────┐  │
│  │         WAX.Core (Class Library)                  │  │
│  │  - SystemInfo: CPU, Memory, Disk metrics          │  │
│  │  - SystemOptimizer: Registry, Services, Files     │  │
│  │  - Native Windows API interop                     │  │
│  └───────────────┬───────────────────────────────────┘  │
└──────────────────┼───────────────────────────────────────┘
                   │ Executes
                   ▼
┌─────────────────────────────────────────────────────────┐
│           PowerShell & Batch Scripts                     │
│  - Optimize-System.ps1: Full system optimization         │
│  - Get-SystemInfo.ps1: Detailed system information       │
│  - quick-optimize.bat: Fast cleanup                      │
│  - disable-telemetry.bat: Privacy settings               │
│  - network-optimize.bat: Network tuning                  │
└─────────────────────────────────────────────────────────┘
```

## Component Details

### 1. Frontend (Electron + React)

**Technology**: Electron, React 18, Vite, Framer Motion

**Purpose**: Provides the user interface and user experience

**Key Features**:
- Modern, responsive UI with dark theme
- Glass morphism effects and smooth animations
- 15+ feature pages covering all optimization areas
- Real-time system monitoring
- Interactive controls for all features

**Communication**: Makes HTTP requests to C# backend service via REST API

### 2. Backend Service (C# .NET 8)

**Technology**: ASP.NET Core 8, C# 12

**Purpose**: Provides high-performance, stable core functionality

**Why C#?**
- Direct access to Windows APIs
- Better performance for system-level operations
- Type safety and reliability
- Easy integration with Windows Management Instrumentation (WMI)
- Native registry and service management

**Components**:

#### WAX.Core Library
- `SystemInfo.cs`: System metrics (CPU, Memory, Disk, Uptime)
- `SystemOptimizer.cs`: Optimization operations
  - Temporary file cleanup
  - Registry modifications
  - Service management
  - Network optimization
  - Telemetry control

#### WAX.Services API
- REST API endpoints for frontend communication
- Runs on `http://localhost:5000`
- CORS enabled for Electron app
- Swagger documentation for API

**Endpoints**:
- `GET /api/system/info` - Get system information
- `POST /api/system/clean/temp` - Clean temporary files
- `POST /api/system/privacy/disable-telemetry` - Disable telemetry
- `POST /api/system/performance/visual-effects` - Optimize visual effects
- `POST /api/system/network/optimize` - Optimize network
- `POST /api/system/restore/create` - Create restore point

### 3. Scripts (PowerShell + Batch)

**Technology**: PowerShell 5.1+, Windows Batch

**Purpose**: Provides CLI tools and advanced scripting capabilities

**Why Scripts?**
- Direct system access without additional dependencies
- Can be run independently of the main application
- Familiar to system administrators
- Easy to modify and extend

**PowerShell Scripts**:
- `Optimize-System.ps1`: Comprehensive system optimization
  - Parameter-driven (Full/Quick optimization)
  - Service management
  - Registry tweaks
  - Network optimization
- `Get-SystemInfo.ps1`: Detailed system information gathering
  - JSON output support
  - WMI queries
  - Performance counters

**Batch Scripts**:
- `quick-optimize.bat`: Fast system cleanup
- `disable-telemetry.bat`: Privacy protection
- `network-optimize.bat`: Network performance tuning

## Communication Flow

### UI Interaction Flow

```
User Action (React UI)
    ↓
API Call (src/utils/api.js)
    ↓
HTTP Request → C# Service (localhost:5000)
    ↓
SystemController endpoint
    ↓
WAX.Core operation
    ↓
Windows API / Registry / Service
    ↓
Response ← JSON
    ↓
UI Update (React State)
```

### Script Execution Flow

```
User Action (React UI)
    ↓
API Call (executePowerShellScript/executeBatchScript)
    ↓
C# Service (ScriptController)
    ↓
Process.Start()
    ↓
PowerShell.exe / cmd.exe
    ↓
Script execution with params
    ↓
Output captured
    ↓
Response to UI
```

## Security Considerations

1. **Administrator Privileges**: Most optimization operations require admin rights
2. **Script Validation**: All scripts are validated before execution
3. **Restore Points**: System restore points created before major changes
4. **CORS**: Restricted to localhost origins only
5. **Input Validation**: All API inputs validated on backend

## Performance Considerations

1. **C# Backend**: 
   - Compiled native code for fast execution
   - Direct Windows API access
   - Minimal overhead

2. **Async Operations**:
   - Non-blocking UI updates
   - Background task execution
   - Progress reporting

3. **Resource Management**:
   - Proper disposal of system resources
   - Memory-efficient operations
   - Lazy loading of components

## Deployment

### Development Mode
- Frontend: Vite dev server (port 5173)
- Backend: dotnet run (port 5000)
- Electron: Loads from localhost

### Production Build
- Frontend: Static files in `dist/`
- Backend: Compiled to `dist/services/`
- Electron: Packaged with both components
- Scripts: Bundled in `scripts/` directory

## Error Handling

1. **Graceful Degradation**: UI works even if C# service unavailable
2. **Mock Data**: Fallback to mock data for development
3. **Error Messages**: User-friendly error notifications
4. **Logging**: Comprehensive logging for debugging

## Future Enhancements

1. **Plugin System**: Allow third-party optimization plugins
2. **Cloud Sync**: Sync settings across devices
3. **Scheduled Tasks**: Automated optimization schedules
4. **Rollback System**: Automatic rollback on errors
5. **Telemetry**: Anonymous usage statistics (opt-in)
