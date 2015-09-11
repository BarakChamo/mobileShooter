import WORLD       from '../constants/world'
import {Circle}    from './Shapes'
import Marker      from './Marker'
import Orientation from '../controllers/Orientation'

var maxDistance = Math.sqrt(Math.pow(WORLD.width, 2) + Math.pow(WORLD.height, 2))

export default class Player extends Circle {
  constructor(x, y, id) {
    super(x, y, WORLD.player.radius, 'red');

    this.id = id
    this.controller = new Orientation();
    this.marker = new Marker(200, 200, 20, 3, 'blue')
  }

  update(dt) {
    if (this.x > WORLD.width - this.r || this.x < 0 + this.r) {
      this.xVelocity *= -1;
    }

    if (this.y <= 0 + this.r || this.y > WORLD.height - this.r) {
      this.yVelocity *= -1;
    }

    this.xVelocity = ((this.controller.x - this.x) / WORLD.width) * 2000
    this.yVelocity = ((this.controller.y - this.y) / WORLD.height) * 2000

    this.rotation = this.controller.rotation
    this.move(this.xVelocity * dt, this.yVelocity * dt)

    this.marker.update(this.controller.x, this.controller.y, this.rotation, dt)
  }

  fire(bullet) {
    this.xVelocity -= bullet.xVelocity / 10
    this.yVelocity -= bullet.yVelocity / 10
  }

  handleOrientation(event) {
    this.controller.handleOrientation(event)
  }

  draw(ctx) {
    super.draw(ctx)
    this.marker.draw(ctx)
  }
}