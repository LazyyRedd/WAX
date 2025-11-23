# ⚡ WAX - Windows System Optimizer

![WAX Logo](https://via.placeholder.com/800x200/1a1a1a/e63946?text=WAX+System+Optimizer)

**WAX** is an intelligent Windows control hub that blends safe, reversible optimizations with real-time insights and personalized tuning. No more one-click mystery tweaks or manual registry hacking—WAX gives you power with clarity.

## 🎯 Who it's for

- **Gamers** - Lower latency, higher FPS
- **Creators** - Stability, fewer disruptions
- **Advanced Users** - Deep registry, services, and network controls

## ✨ Features

### 🚀 System Optimization
- **🧹 Cleaner** - Free up disk space by removing unnecessary files
- **🗑️ Debloat** - Remove unnecessary pre-installed Windows applications
- **⚡ Performance** - Fine-tune system settings for optimal performance
- **🎮 GPU Tweaks** - Optimize graphics settings for better gaming

### 🔧 Windows Tweaks
- **⚙️ General** - Customize Windows system settings
- **🔒 Privacy** - Protect your data and privacy
- **🌐 Network** - Optimize network settings for improved connectivity
- **✨ Quality of Life** - Enhance your Windows experience
- **🔋 Power** - Configure power and performance settings

### 🛠️ System Management
- **🛠️ Services** - Manage Windows services and background processes
- **💻 Devices** - View and manage hardware devices
- **🚀 Startup** - Control which apps launch at startup

### 📱 Apps and Tools
- **📱 App Store** - Install popular applications easily
- **↩️ System Restore** - Create and restore system restore points

## 🎨 Design Principles

- **Beautiful Dark Grey Theme** - Professional and easy on the eyes
- **Red Accent Colors** - Bold and attention-grabbing highlights
- **Smooth Animations** - Polished micro-interactions and transitions
- **Glass Morphism** - Modern glass effects with backdrop blur
- **Loading States** - Professional loading indicators
- **Error Handling** - Graceful error management with user feedback

## 🚀 Getting Started

### Prerequisites

- **Node.js** 16.x or higher
- **npm** or yarn package manager
- **.NET 8 SDK** (for building C# components)
- **Windows 10/11** (for full functionality)
- **PowerShell 5.1+** (included in Windows)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/LazyyRedd/WAX.git
cd WAX
```

2. Install Node.js dependencies:
```bash
npm install
```

3. Build C# backend services:
```bash
cd csharp
dotnet restore
dotnet build --configuration Release
cd ..
```

4. Run the development server:
```bash
npm run dev
```

5. Build for production:
```bash
# Build React frontend
npm run build

# Build C# services
cd csharp
dotnet publish WAX.Services/WAX.Services.csproj -c Release -o ../dist/services
cd ..

# Build Electron app
npm run build:electron
```

### Running Scripts

**PowerShell Scripts** (Run as Administrator):
```powershell
# Full system optimization
.\scripts\powershell\Optimize-System.ps1 -FullOptimization

# Quick optimization
.\scripts\powershell\Optimize-System.ps1 -QuickOptimization

# Get system information
.\scripts\powershell\Get-SystemInfo.ps1 -OutputJson
```

**Batch Scripts** (Run as Administrator):
```cmd
# Quick optimization
.\scripts\batch\quick-optimize.bat

# Disable telemetry
.\scripts\batch\disable-telemetry.bat

# Optimize network
.\scripts\batch\network-optimize.bat
```

## 🛠️ Tech Stack

### Frontend
- **Electron.js** - Cross-platform desktop application framework
- **React 18** - UI framework for building user interfaces
- **Framer Motion** - Animation library for smooth transitions
- **Vite** - Build tool and development server
- **Lucide React** - Icon library

### Backend & Core
- **C# (.NET 8)** - Core system optimization components for better performance, stability, and compatibility
  - `WAX.Core` - System information and optimization library
  - `WAX.Services` - REST API service for Electron communication
- **PowerShell** - Advanced optimization scripts and system management
- **Batch Scripts** - CLI tools for quick system optimizations

## 📦 Project Structure

```
WAX/
├── electron/              # Electron main process files
│   └── main.js           # Main process, starts C# service
├── src/                  # React frontend
│   ├── components/       # Reusable React components
│   │   ├── Sidebar.jsx
│   │   ├── Header.jsx
│   │   ├── FeatureCard.jsx
│   │   └── LoadingSpinner.jsx
│   ├── pages/           # Application pages (15+ pages)
│   │   ├── HomePage.jsx
│   │   ├── CleanerPage.jsx
│   │   ├── DebloatPage.jsx
│   │   └── ...
│   ├── styles/          # CSS stylesheets
│   │   ├── global.css
│   │   ├── App.css
│   │   └── ...
│   ├── utils/           # Utility functions
│   │   └── api.js       # C# backend API client
│   ├── App.jsx          # Main application component
│   └── main.jsx         # React entry point
├── csharp/              # C# backend components
│   ├── WAX.Core/        # Core optimization library
│   │   ├── SystemInfo.cs
│   │   ├── SystemOptimizer.cs
│   │   └── WAX.Core.csproj
│   ├── WAX.Services/    # REST API service
│   │   ├── Controllers/
│   │   │   └── SystemController.cs
│   │   ├── Program.cs
│   │   └── WAX.Services.csproj
│   └── WAX.sln          # Visual Studio solution
├── scripts/             # Optimization scripts
│   ├── powershell/      # PowerShell scripts
│   │   ├── Optimize-System.ps1
│   │   └── Get-SystemInfo.ps1
│   └── batch/           # Batch scripts
│       ├── quick-optimize.bat
│       ├── disable-telemetry.bat
│       └── network-optimize.bat
├── package.json
├── vite.config.js
└── README.md
```

## 🔒 Security & Safety

- **Reversible Changes** - All optimizations can be undone
- **System Restore Points** - Automatic creation before major changes
- **Clear Explanations** - Know exactly what each tweak does
- **Safe Defaults** - Conservative settings by default

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## ⚠️ Disclaimer

WAX is a system optimization tool that modifies Windows settings. While all changes are designed to be safe and reversible, please:

- Create a system restore point before making changes
- Understand what each optimization does
- Use at your own risk

## 📞 Support

For issues, questions, or suggestions:
- Open an issue on GitHub
- Check the documentation
- Join our community discussions

## 🌟 Show Your Support

Give a ⭐️ if this project helped you!

---

Made with ❤️ by LazyyRedd
