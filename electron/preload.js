const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  // Exponha APIs seguras aqui quando necessário
});
