import WORLD from '../constants/world'

export default class Controller {
  constructor(obj){
    this.obj = obj;
  }

  scaleValue(value, sMin, sMax, min, max) {
    return (sMax - sMin) * (value - min) / (max - min) + sMin;
  }

  handleOrientationAbsolute(event) {
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

  handleOrientation(event) {
    var alpha = -(event.alpha + 180) % 360; // compass
    var beta = -event.beta;               // tilt
    var gamma = event.gamma;              // rotation

    var dx = this.scaleValue(alpha, -2, 2, -200, -160);
    var dy = this.scaleValue(beta, -2, 2, -40, -20);

    // console.log(dx, dy, gamma);

    // this.obj.move(dx, dy);
    this.obj.xVelocity += dx;
    this.obj.yVelocity += dy;
    this.obj.rotation = gamma * Math.PI / 180;
  }

}