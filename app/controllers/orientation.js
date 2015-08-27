'use strict';

var WORLD = require('../constants/world');

class Controller {
  constructor(obj){
    this.obj = obj;
    this.yRange = [0.0, 50.0];
    this.xRange = 45;
  }

  handleOrientation(event) {
    var x = this.xRange - (event.alpha + this.xRange / 2) % this.xRange;
    var y = this.yRange[1] - (event.beta) % this.yRange[1];
    var z = event.gamma * Math.PI / 180;

    this.obj.x = x * (WORLD.width / this.xRange);
    this.obj.y = y * (WORLD.height / this.yRange[1])// * [180 / this.yRange[1]]; 

    this.obj.z = z;
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

module.exports = Controller;