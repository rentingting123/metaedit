import { defineStore } from 'pinia';
import { selectFile, openFile, selectDir, saveFile } from "../api";



export const useEditStore = defineStore('edit', {
  state: () => ({

    sceneList: [
      {
        name: "场景1",
        path: "",
        direction: null,
        objects: [],
      },
    ],
    //启动场景
    main: "场景1",
    name: "我的项目",
    rootPath: "/Users/admin", //地址

    //当前选中的object
    selectObject: '',

    //当前选中场景
    selectScene: '',
    //当前选中场景的index
    selectSceneIdx: '',

  }),
  getters: {
    //根据组建类型获取可用事件列表
    getEventType(){

    },
    //根据动作类型，获取设置
    getActionConfig(){

    },

  },
  actions: {

    //更新图层的属性，需要设置的key 和 值
    updateObject(name, key, value ){

    },

    addObject( type ){

    },
    removeObject(name, key, value ){

    },
    // 选择文件夹
    selectDir(_){
      return selectDir(_);

    },
    // 选择文件
    selectFile(option){
      return selectFile(option);
    },
    // 选择文件
    openFile(option){
      return openFile(option);
    },
    saveFile(option){
      return saveFile(option);
    },
    //从json初始化项目
    fromeJson(json){

    },
    //把当前项目导出json
    toJson(){
      return {

      }
    },
    // 添加文件，需要将文件复制到资源文件目录下。
    addFile(){

    },
    //添加事件
    addEvent(){

    },

    runProject(){

    },

    buildProject(){

    }

  },
});
