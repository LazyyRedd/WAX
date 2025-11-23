const { app, BrowserWindow } = require('electron');
const path = require('path');
const { spawn } = require('child_process');

let mainWindow;
let csharpService;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 1200,
    minHeight: 700,
    backgroundColor: '#1a1a1a',
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
    frame: true,
    titleBarStyle: 'default',
    icon: path.join(__dirname, '../assets/icon.png'),
  });

  // Load the app
  if (process.env.NODE_ENV === 'development' || !app.isPackaged) {
    mainWindow.loadURL('http://localhost:5173');
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// Start C# backend service
function startCSharpService() {
  const servicePath = path.join(__dirname, '../csharp/WAX.Services/bin/Release/net8.0/WAX.Services.exe');
  
  // Check if the service executable exists
  if (require('fs').existsSync(servicePath)) {
    csharpService = spawn(servicePath, [], {
      cwd: path.join(__dirname, '../csharp/WAX.Services/bin/Release/net8.0')
    });

    csharpService.stdout.on('data', (data) => {
      console.log(`C# Service: ${data}`);
    });

    csharpService.stderr.on('data', (data) => {
      console.error(`C# Service Error: ${data}`);
    });

    csharpService.on('close', (code) => {
      console.log(`C# Service exited with code ${code}`);
    });
  } else {
    console.warn('C# Service not found. Running in UI-only mode.');
  }
}

app.whenReady().then(() => {
  startCSharpService();
  createWindow();
});

app.on('window-all-closed', () => {
  // Cleanup C# service
  if (csharpService) {
    csharpService.kill();
  }
  
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
