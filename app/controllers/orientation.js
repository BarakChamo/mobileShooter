import WORLD from '../constants/world'

export default class Controller {
  constructor(){

    this.x = WORLD.width / 2
    this.y = WORLD.height / 2
    this.rotation = 0

    this.dxV = 0
    this.dyV = 0
  }

  scaleValue(value, sMin, sMax, min, max) {
    return (sMax - sMin) * (value - min) / (max - min) + sMin
  }

  handleOrientation(event) {
    var alpha = -(event.alpha + 180) % 360  // compass
    var beta = -event.beta               // tilt
    var gamma = event.gamma              // rotation

    var x = this.scaleValue(alpha, 0, WORLD.width, -200, -160)
    var y = this.scaleValue(beta, 0, WORLD.height, -40, 10)

    var dxV = this.scaleValue(alpha, -2, 2, -200, -160);
    var dyV = this.scaleValue(beta, -2, 2, -40, -20);

    this.x = x
    this.y = y
    this.rotation = gamma * Math.PI / 180

    this.dxV = dxV
    this.dyV = dyV

    this.smooth()
  }

  smooth(val) {
    this.x = Math.round(this.x)
    this.y = Math.round(this.y)
  }
}