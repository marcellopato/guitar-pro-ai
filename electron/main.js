const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true
    }
  });

  const startUrl = process.env.ELECTRON_START_URL || `file://${path.join(__dirname, '..', 'build', 'index.html')}`;
  
  // Log para debug
  console.log('Loading URL:', startUrl);
  
  win.loadURL(startUrl);
  
  // Abre DevTools em modo desenvolvimento
  if (process.env.ELECTRON_START_URL) {
    win.webContents.openDevTools();
  }
  
  // Log de erros de carregamento
  win.webContents.on('did-fail-load', (event, errorCode, errorDescription) => {
    console.error('Failed to load:', errorDescription);
  });
  
  win.webContents.on('did-finish-load', () => {
    console.log('Page loaded successfully!');
  });
}

// Flags para melhor compatibilidade com WSL2
app.commandLine.appendSwitch('disable-gpu');
app.commandLine.appendSwitch('disable-software-rasterizer');
app.commandLine.appendSwitch('no-sandbox');
app.commandLine.appendSwitch('disable-dev-shm-usage'); // Workaround para /dev/shm no WSL2

app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});
