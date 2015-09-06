import WORLD      from '../constants/world'

export default class Controller {
  constructor(player, marker){
    this.player = player
    this.marker = marker
  }

  scaleValue(value, sMin, sMax, min, max) {
    return (sMax - sMin) * (value - min) / (max - min) + sMin
  }

  updateTarget(event) {
    var alpha = -(event.alpha + 180) % 360  // compass
    var beta = -event.beta               // tilt
    var gamma = event.gamma              // rotation

    var x = this.scaleValue(alpha, 0, WORLD.width, -200, -160)
    var y = this.scaleValue(beta, 0, WORLD.height, -40, 10)

    this.x = x
    this.y = y
    this.rotation = gamma * Math.PI / 180

    this.smooth()
  }

  smooth() {
    this.x = Math.round(this.x)
    this.y = Math.round(this.y)
  }
}