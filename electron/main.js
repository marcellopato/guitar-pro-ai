const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');
const url = require('url');
const isDev = process.env.ELECTRON_START_URL !== undefined;

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    show: true, // MOSTRAR IMEDIATAMENTE - ready-to-show não funciona bem no Windows
    backgroundColor: '#1a1a1a', // Preto ao invés de vermelho
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      webSecurity: true,
      offscreen: false
    },
    autoHideMenuBar: true
  });

  // Remove menu completamente
  Menu.setApplicationMenu(null);

  // Modo desenvolvimento: carrega do servidor React
  if (isDev) {
    win.loadURL(process.env.ELECTRON_START_URL);
    win.webContents.openDevTools();
  } 
  // Modo produção: carrega do build
  else {
    // build/ está em resources/build/ (extraResources)
    const indexPath = path.join(process.resourcesPath, 'build', 'index.html');
    
    const loadUrl = url.format({
      pathname: indexPath,
      protocol: 'file:',
      slashes: true
    });
    
    win.loadURL(loadUrl);
  }
  
  // Log apenas erros críticos em produção
  if (!isDev) {
    win.webContents.on('did-fail-load', (event, errorCode, errorDescription) => {
      console.error('Failed to load:', errorDescription);
    });
  }
}

// Flags para melhor compatibilidade - FORÇA renderização por software
app.commandLine.appendSwitch('disable-gpu'); // Desabilita GPU
app.commandLine.appendSwitch('disable-gpu-compositing'); // Desabilita composição por GPU
// NÃO desabilitar software rasterizer - precisamos dele!
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
