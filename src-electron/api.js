const { app, BrowserWindow, dialog, ipcMain } = require('electron')
const path = require('node:path')

async function handleFileOpen () {
  const { canceled, filePaths } = await dialog.showOpenDialog({})
  if (!canceled) {
    return filePaths[0]
  }
}


export default function setup(mainWindow){

  ipcMain.handle('dialog:openFile', handleFileOpen)
}
