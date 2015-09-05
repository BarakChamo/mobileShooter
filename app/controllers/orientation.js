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
    var alpha = -(event.alpha + 30) % 60 // compass
    var beta = -event.beta               // tilt
    var gamma = event.gamma              // rotation

    var x = this.scaleValue(alpha, 0, WORLD.width, -60, 0)
    var y = this.scaleValue(beta, 0, WORLD.height, -40, 10)

    this.x = x
    this.y = y
    this.rotation = gamma * Math.PI / 180
  }

  moveMarker(event) {
    var alpha = -(event.alpha + 30) % 60 // compass
    var beta = -event.beta               // tilt
    var gamma = event.gamma              // rotation

    var x = this.scaleValue(alpha, 0, WORLD.width, -60, 0)
    var y = this.scaleValue(beta, 0, WORLD.height, -40, 10)

    // console.log(alpha, beta, gamma)

    this.marker.x = x
    this.marker.y = y
    this.marker.rotation = gamma * Math.PI / 180
  }

  handleOrientation(event) {
    var alpha = -(event.alpha + 180) % 360 // compass
    var beta = -event.beta               // tilt
    var gamma = event.gamma              // rotation

    var dx = this.scaleValue(alpha, -2, 2, -200, -160)
    var dy = this.scaleValue(beta, -2, 2, -40, -20)

    // console.log(dx, dy, gamma)

    // this.player.move(dx, dy)
    this.player.accelerate(dx, dy)
    this.player.rotation = gamma * Math.PI / 180
  }
}