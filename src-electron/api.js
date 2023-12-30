const { app, BrowserWindow, dialog, ipcMain } = require('electron')
const path = require('node:path')
const {readFile,writeFile} = require('node:fs').promises



export const fileUtils = {

  selectFile: async _=> {
    const { canceled, filePaths } = await dialog.showOpenDialog({})
    let filePath = ''
    if (!canceled)
      filePath = filePaths[0]
    return { filePath}
  },
  /**
   * 打开文件，并读取文件的text
   * @returns 读取到的text文件
   */
  openFile: async (e,_)=> {

    const { canceled, filePaths } = await dialog.showOpenDialog({})
    let filePath = ''
    if (canceled) return null;

    filePath = filePaths[0];

    console.log("filePath:",filePath);
    const data = await readFile(filePath)
    return { filePath, data: data.toString() }
  },
  /**
   * 全量保存编辑器中的text文件
   * @param data 需要保存的文本文件
   * @param curPath 如果存在则指定了保存路径
   * @return 保存的filePath
   */
  saveFile: async (e,_)=> {


    let {data, curPath} =_;


    if (curPath) {
      await writeFile(curPath, data)
      return curPath
    }else {

      const { canceled, filePath } = await dialog.showSaveDialog({})


      if (!canceled){
        await writeFile(filePath, data)
        return filePath
      }else{
        return null
      }

    }
  },
}




export  function setup(mainWindow){

  ipcMain.handle('dialog@openFile', fileUtils.openFile);
  ipcMain.handle('dialog@saveFile', fileUtils.saveFile);
  ipcMain.handle('dialog@selectFile', fileUtils.selectFile);
}
