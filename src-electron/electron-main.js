/*
 * @Author: rentingting 1542078062@qq.com
 * @Date: 2023-12-11 20:54:17
 * @LastEditors: rentingting 1542078062@qq.com
 * @LastEditTime: 2023-12-20 11:09:59
 * @FilePath: /code/metaedit/src-electron/electron-main.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { app, BrowserWindow, ipcMain } from 'electron'
import path from 'path'
import os from 'os'
import {setup} from './api'

// needed in case process is undefined under Linux
const platform = process.platform || os.platform()

let mainWindow

function createWindow() {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    icon: path.resolve(__dirname, 'icons/icon.png'), // tray icon
    width: 1920,
    height: 1080,
    useContentSize: true,
    frame: false,

    webPreferences: {
      nodeIntegration: true,

      contextIsolation: false,
      // More info: https://v2.quasar.dev/quasar-cli-vite/developing-electron-apps/electron-preload-script
      preload: path.resolve(__dirname, process.env.QUASAR_ELECTRON_PRELOAD)
    }
  })
  require('@electron/remote/main').initialize()
  require('@electron/remote/main').enable(mainWindow.webContents);

  mainWindow.loadURL(process.env.APP_URL)
  console.log("process.env.DEBUGGING:", process.env.DEBUGGING);

  if (process.env.DEBUGGING) {
    // if on DEV or Production with debug enabled
    mainWindow.webContents.openDevTools()
  } else {
    // we're on production; no access to devtools pls
    mainWindow.webContents.on('devtools-opened', () => {
      mainWindow.webContents.closeDevTools()
    })
  }

  mainWindow.on('closed', () => {
    mainWindow = null
  })
  ipcMain.on('min', () => {
    mainWindow.minimize()
  })
  ipcMain.on('max', () => {
    mainWindow.maximize()
  })
  ipcMain.on('close', () => {
    mainWindow = null
    app.quit()
  })

  setup(mainWindow);
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})
