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
    console.log('__dirname:', __dirname);
    console.log('indexPath:', indexPath);
    
    // Verifica se o arquivo existe (só funciona em dev, mas ajuda debug)
    const fs = require('fs');
    try {
      if (fs.existsSync(indexPath)) {
        console.log('✓ index.html encontrado!');
      } else {
        console.error('✗ index.html NÃO encontrado em:', indexPath);
      }
    } catch (err) {
      console.log('Não foi possível verificar arquivo (pode ser por estar em asar):', err.message);
    }
    
    const loadUrl = url.format({
      pathname: indexPath,
      protocol: 'file:',
      slashes: true
    });
    
    console.log('Loading URL:', loadUrl);
    
    win.loadURL(loadUrl).then(() => {
      console.log('✓ loadURL completed');
    }).catch(err => {
      console.error('✗ loadURL failed:', err);
    });
    
    // DevTools removido - pronto para produção!
    // Usar F12 ou Ctrl+Shift+I para abrir manualmente se necessário
  }
  
  // Log de erros de carregamento
  win.webContents.on('did-fail-load', (event, errorCode, errorDescription, validatedURL) => {
    console.error('Failed to load:', errorDescription);
    console.error('URL tentada:', validatedURL);
  });
  
  win.webContents.on('did-finish-load', () => {
    console.log('Page loaded successfully!');
    
    // Abre DevTools após carregar para debug
    setTimeout(() => {
      win.webContents.openDevTools();
      console.log('DevTools aberto!');
    }, 1000);
  });
  
  // Log de erros de console do renderer
  win.webContents.on('console-message', (event, level, message, line, sourceId) => {
    console.log(`Console [${level}]:`, message, `(${sourceId}:${line})`);
  });
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
