const { app, BrowserWindow } = require('electron');
const path = require('path');
const { ipcMain } = require('electron');
const EXT_PATH = path.join(__dirname,'stylus');

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 840,
    frame : false,
    webPreferences: {
      preload : path.join(__dirname,'preload.js'),
      nodeIntegration: true,
      contextIsolation: true,
      webviewTag: true, 
    },
    icon: path.join(__dirname, 'assets/icon.png') 
  });
  mainWindow.loadFile(path.join(__dirname,'static/index.html'));
}
app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

ipcMain.on('minimize-window', () => {
    const win = BrowserWindow.getFocusedWindow();
    if (win) {
        win.minimize();
    }
});

ipcMain.on('maximize-window', () => {
    const win = BrowserWindow.getFocusedWindow();
    if (win) {
        if (win.isMaximized()) {
            win.unmaximize();
        } else {
            win.maximize();
        }
    }
});

ipcMain.on('close-window', () => {
    const win = BrowserWindow.getFocusedWindow();
    if (win) {
        win.close();
    }
});

ipcMain.on('toggle-dev-tools', (event) => {
  const webContents = event.sender;
  const win = BrowserWindow.fromWebContents(webContents);
  console.log("OKA")
  if (win) {
    win.webContents.toggleDevTools();
  }
});
