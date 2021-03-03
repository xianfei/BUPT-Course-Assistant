// Modules to control application life and create native browser window
const { app, BrowserWindow } = require('electron')
const isMac = process.platform === 'darwin'

function createWindow() {
  // Create the browser window.
  var mainWindow;
  if (isMac) mainWindow = new BrowserWindow({
    width: 1100,
    height: 700,
    titleBarStyle: 'hidden',
    transparent: true,
    vibrancy: 'popover',
    webPreferences: {
      enableRemoteModule: true,
      nodeIntegration: true,
      contextIsolation: false,
    }
  });
  else {
    // !important   is maybe not suit for linux
    mainWindow = new BrowserWindow({
      width: 1200,
      height: 700,
      frame: false,
      webPreferences: {
        enableRemoteModule: true,
        nodeIntegration: true,
        contextIsolation: false,
      }
    })
  }
  // and load the html of the app.
  mainWindow.loadFile('index.html')

  mainWindow.webContents.session.webRequest.onHeadersReceived({ urls: ["*://*/*"] },
      (d, c) => {
        if (d.responseHeaders['X-Frame-Options']) {
          delete d.responseHeaders['X-Frame-Options'];
        } else if (d.responseHeaders['x-frame-options']) {
          delete d.responseHeaders['x-frame-options'];
        }

        c({ cancel: false, responseHeaders: d.responseHeaders });
      }
    );


  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.commandLine.appendSwitch('disable-site-isolation-trials')

app.whenReady().then(createWindow)

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  app.quit()
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.