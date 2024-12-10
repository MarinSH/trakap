const { app, BrowserWindow } = require('electron');
import { ipcDirectory } from './handlers/directory';
import { ipcOffer } from './handlers/offer';
const path = require('path');

if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  const iconPath = path.join(__dirname, 'src', 'trakap.ico');
  const mainWindow = new BrowserWindow({
    width: 1920,
    height: 1080,
    autoHideMenuBar: true,
    icon: iconPath,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });

  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
  //TODO: comment and uncomment here
  // mainWindow.webContents.openDevTools();
};

app.whenReady().then(async () => {
  ipcDirectory();
  ipcOffer();
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});