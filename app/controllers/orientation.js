'use strict';

var WORLD = require('../constants/world');

class Controller {
  constructor(obj){
    this.obj = obj;
    this.yRange = [0.0, 50.0];
    this.xRange = 45;
  }

  scaleValue(value, sMin, sMax, min, max) {
    return (sMax - sMin) * (value - min) / (max - min) + sMin;
  }

  handleOrientation(event) {
    var alpha = -(event.alpha + 30) % 60; // compass
    var beta = -event.beta;               // tilt
    var gamma = event.gamma;              // rotation

    var x = this.scaleValue(alpha, 0, WORLD.width, -60, 0);
    var y = this.scaleValue(beta, 0, WORLD.height, -40, 10);

    // console.log(alpha, beta, gamma);

    this.obj.x = x;
    this.obj.y = y;
    this.obj.rotation = gamma * Math.PI / 180;
  }

  // handleOrientation(event) {
  //   var x = this.xRange - (event.alpha + this.xRange / 2) % this.xRange;
  //   var y = this.yRange[1] - (event.beta) % this.yRange[1];
  //   var z = event.gamma * Math.PI / 180;

  //   this.obj.x = x * (WORLD.width / this.xRange);
  //   this.obj.y = y * (WORLD.height / this.yRange[1])// * [180 / this.yRange[1]]; 

  //   this.obj.z = z;
  // }

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