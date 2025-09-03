const { app, BrowserWindow, shell, ipcMain, Menu, MenuItem } = require('electron');
const path = require('path');
const EXT_PATH = path.join(__dirname, 'stylus');

function createWindow() {

  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 840,
    frame: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: true,
      webviewTag: true,
    },
    icon: path.join(__dirname, 'assets/icon.png')
  });
  mainWindow.loadFile(path.join(__dirname, 'static/index.html'));


  mainWindow.webContents.on("did-attach-webview", (event, webContents) => {
    webContents.setWindowOpenHandler(({ url }) => {
      if (!url.startsWith("https://web.whatsapp.com")) {
        shell.openExternal(url);
        return { action: "deny" };
      }
      return { action: "allow" };
    });

    webContents.on("will-navigate", (event, url) => {
      if (!url.startsWith("https://web.whatsapp.com")) {
        event.preventDefault();
        shell.openExternal(url);
      }
    });
  });



  // Open Right Click


  mainWindow.webContents.on("did-attach-webview", (event, webContents) => {
    // intercept link external (sudah ada)
    webContents.setWindowOpenHandler(({ url }) => {
      if (!url.startsWith("https://web.whatsapp.com")) {
        shell.openExternal(url);
        return { action: "deny" };
      }
      return { action: "allow" };
    });

    webContents.on("will-navigate", (event, url) => {
      if (!url.startsWith("https://web.whatsapp.com")) {
        event.preventDefault();
        shell.openExternal(url);
      }
    });

    // Tambahkan context menu untuk klik kanan di dalam webview
    const { Menu, MenuItem } = require('electron');
    webContents.on('context-menu', (event, params) => {
      const menu = new Menu();

      menu.append(new MenuItem({ role: 'copy' }));
      menu.append(new MenuItem({ role: 'paste' }));
      menu.append(new MenuItem({ role: 'selectAll' }));
      menu.append(new MenuItem({ type: 'separator' }));
      menu.append(new MenuItem({
        label: 'Inspect Element',
        click: () => {
          webContents.inspectElement(params.x, params.y);
        }
      }));

      menu.popup({ window: BrowserWindow.fromWebContents(webContents) });
    });
  });


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
