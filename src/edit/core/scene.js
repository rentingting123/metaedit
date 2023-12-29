import { Application, Sprite, Container, Assets } from './pixi.js';


class Scene extends Container{
  constructor( app ){

    this.app = app;

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
