import { Application, Sprite, Container, Assets } from './pixi.js';

import {Scene} from './scene'




class App extends Container{
  constructor({pixiApp,json}){

    this.pixiApp = pixiApp;
    this.json = json;
    this.scenes = new Map;

    this.init(json);

  }

  // 初始化一个场景。 准备一些资源。
  async init(json){




  }

  addObject( object ){
    this.addChild(object);
  }

  removeObject( id ){

  }

  show(){
    this.emit('show');
    this.visible = true;
  }

  hide(){
    this.emit('hide');
    this.visible = false;
  }

}

export {Scene}
