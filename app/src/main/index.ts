import { app, BrowserWindow, ipcMain } from 'electron'
import type { BrowserWindowConstructorOptions } from 'electron'
import contextMenu from 'electron-context-menu'
import windowStateKeeper from 'electron-window-state'
import path from 'path'

import { getFiles, readFile } from './io'

const isDevelopment = !app.isPackaged

let win: BrowserWindow

function createWindow() {
  const windowOptions: BrowserWindowConstructorOptions = {
    minWidth: 800,
    minHeight: 600,
    titleBarStyle: 'hidden',
    autoHideMenuBar: false,
    trafficLightPosition: {
      x: 15,
      y: 10,
    },
    webPreferences: {
      contextIsolation: true,
      devTools: isDevelopment,
      spellcheck: false,
      nodeIntegration: true,
      preload: path.join(__dirname, './preload/index.js'),
    },
    show: false,
  }

  contextMenu({
    showSearchWithGoogle: false,
    showCopyImage: false,
    prepend: (_defaultActions, _params, _browserWindow) => [
      {
        label: 'its like magic 💥',
      },
    ],
  })

  const windowState = windowStateKeeper({
    defaultWidth: windowOptions.minWidth,
    defaultHeight: windowOptions.minHeight,
  })

  const browserWindow = new BrowserWindow({
    ...windowOptions,
    x: windowState.x,
    y: windowState.y,
    width: windowState.width,
    height: windowState.height,
  })

  win = browserWindow

  windowState.manage(browserWindow)

  browserWindow.once('ready-to-show', () => {
    browserWindow.show()
    browserWindow.focus()
  })

  const port = process.env.PORT || 3000

  if (isDevelopment) {
    browserWindow.loadURL(`http://localhost:${port}`)
  } else {
    browserWindow.loadFile('./index.html')
  }
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  app.quit()
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// io
// TODO: constants app action
ipcMain.on('app:get-files', () => {
  console.log('app:get-files')
  getFiles()
})

ipcMain.on('app:read-file', () => {
  console.log('app:read-file')
  const content = readFile()
  win.webContents.send('render:read-file', content)
})
