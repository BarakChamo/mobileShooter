export default class Controller {
  constructor(obj) {
    this.obj = obj
  }

  keyDownHandler(e) {
    if(e.keyCode == 37) {
      this.obj.moveLeft = true;
    }
    else if(e.keyCode == 38) {
      this.obj.moveUp = true;
    }
    else if(e.keyCode == 39) {
      this.obj.moveRight = true;
    }
    else if(e.keyCode == 40) {
      this.obj.moveDown = true;
    }
  }

  keyUpHandler(e) {
    if(e.keyCode == 37) {
      this.obj.moveLeft = false;
    }
    if(e.keyCode == 38) {
      this.obj.moveUp = false;
    }
    if(e.keyCode == 39) {
      this.obj.moveRight = false;
    }
    if(e.keyCode == 40) {
      this.obj.moveDown = false;
    }
  }
}