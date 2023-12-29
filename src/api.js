const { ipcRenderer } = require("electron");
const {readFile} = require("fs").promises;

// console.log("fs",fs);

// 打开文件，支持的扩展名。返回文件路径
export const openFile = ext=>{
  return ipcRenderer.invoke('dialog:openFile')
}


// 读取文件，文件路径
// export const readFile = fpath =>{
//   return ipcRenderer.invoke('dialog:openFile')
// }


// 保存文件，文件路径
export const saveFile = body =>{
  return ipcRenderer.invoke('dialog:saveFile')
}

// 打开并读取。{path: , body: '' , encoding:'utf8' };
export const openAndReadFile = async (ext)=>{

  let file = await ipcRenderer.invoke('dialog:openFile');
  if(file&&typeof file === 'string'){
    return await readFile(file,"utf-8")
  }

}




