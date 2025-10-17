const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');
const url = require('url');
const isDev = process.env.ELECTRON_START_URL !== undefined;

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      // Importante para produção
      webSecurity: true
    },
    // Remove menu padrão
    autoHideMenuBar: true
  });

  // Remove menu completamente
  Menu.setApplicationMenu(null);

  // Modo desenvolvimento: carrega do servidor React
  if (isDev) {
    console.log('DEV MODE: Loading from', process.env.ELECTRON_START_URL);
    win.loadURL(process.env.ELECTRON_START_URL);
    win.webContents.openDevTools();
  } 
  // Modo produção: carrega do build
  else {
    // build/ está em resources/build/ (extraResources)
    const indexPath = path.join(process.resourcesPath, 'build', 'index.html');
    
    console.log('PRODUCTION MODE');
    console.log('process.resourcesPath:', process.resourcesPath);
    console.log('indexPath:', indexPath);
    
    const loadUrl = url.format({
      pathname: indexPath,
      protocol: 'file:',
      slashes: true
    });
    
    console.log('Loading URL:', loadUrl);
    
    win.loadURL(loadUrl);
    
    // Abre DevTools em produção para debug (remover depois)
    win.webContents.openDevTools();
  }
  
  // Log de erros de carregamento
  win.webContents.on('did-fail-load', (event, errorCode, errorDescription, validatedURL) => {
    console.error('Failed to load:', errorDescription);
    console.error('URL tentada:', validatedURL);
  });
  
  win.webContents.on('did-finish-load', () => {
    console.log('Page loaded successfully!');
  });
  
  // Log de erros de console do renderer
  win.webContents.on('console-message', (event, level, message, line, sourceId) => {
    console.log(`Console [${level}]:`, message, `(${sourceId}:${line})`);
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
