const { ipcRenderer } = require("electron");
const {readFile} = require("fs").promises;

// console.log("fs",fs);

// 打开文件，支持的扩展名。返回文件路径
export const openFile = _=>{
  return  ipcRenderer.invoke('dialog:openFile',_)
}

// 打开文件，支持的扩展名。返回文件路径
export const selectFile = _=>{
  return ipcRenderer.invoke('dialog:selectFile',_)
}

export const selectDir = _=>{
  return ipcRenderer.invoke('dialog:selectDir',_)
}

// 读取文件，文件路径
// export const readFile = fpath =>{
//   return ipcRenderer.invoke('dialog:openFile')
// }


// 保存文件，文件路径
export const saveFile = async _ =>{

  console.log("saveFile",_);

  let a = await ipcRenderer.invoke('dialog:saveFile',_);
  console.log(a);

  return a
}

// 打开并读取。{path: , body: '' , encoding:'utf8' };
export const openAndReadFile = async _=>{

  let file = await ipcRenderer.invoke('dialog:openFile');
  if(file&&typeof file === 'string'){
    return await readFile(file,"utf-8")
  }

}

const express = require('express')


function assetsServe() {

  const app = express()
  const port = 3000

  app.get('/', (req, res) => {
    res.send('Hello World!')
  })



  app.get('/file/:scene/:name', function (req, res, next) {
    var options = {
      root: '/Users/eva/work/git/metaedit/public',
      dotfiles: 'deny',
      headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
      }
    }

    const {name,scene} = req.params;

    console.log("name:",name,scene);
    // res.sendFile(fileName, options, function (err) {
    //   if (err) {
    //     console.log("fileName-err",err);
    //     res.status(403).send("Sorry! You can't see that.");
    //   }
    // })

    res.send(`${name}-${scene}`);

  })

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  });


}


assetsServe();




