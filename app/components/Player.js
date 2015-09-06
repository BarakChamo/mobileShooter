import WORLD       from '../constants/world'
import {Circle, Polygon}    from './Shapes'
import Orientation from '../controllers/Orientation'

var maxDistance = Math.sqrt(Math.pow(WORLD.width, 2) + Math.pow(WORLD.height, 2))

export default class Player extends Circle {
  constructor(x, y, ctx, id) {
    super(x, y, 10, 'red', ctx);

    this.id = id
    this.marker = new Polygon(200, 200, 20, 3, 'blue', ctx)
    this.controller = new Orientation(this, this.marker);

  }

  intersects(b) {
    // console.log(this.x < b.x + b.width, this.x + this.width > b.x, this.y < b.y + b.height, this.y + this.height > b.y);
      return  this.x < b.x + b.width && 
              this.x + this.width > b.x &&
              this.y < b.y + b.height &&
              this.y + this.height > b.y;
  }

  update(dt) {  
    this.accelerate()

    // if (this.x > WORLD.width - this.r || this.x < 0 + this.r) {
    //   this.xVelocity *= -1;
    // }

    // if (this.y <= 0 + this.r || this.y > WORLD.height - this.r) {
    //   this.yVelocity *= -1;
    // }

    this.marker.rotation += dt * 2

    this.move(this.xVelocity * dt, this.yVelocity * dt)
    this.marker.move(this.marker.xVelocity * dt, this.marker.yVelocity * dt)
  }

  fire(bullet) {
    this.xVelocity -= bullet.xVelocity / 2
    this.yVelocity -= bullet.yVelocity / 2
  }

  pointTo(data) {
    this.controller.updateTarget(data)

    // this.marker.x = this.controller.x
    // this.marker.y = this.controller.y

    this.rotation = this.controller.rotation
  }

  accelerate() {
    // var d = Math.sqrt(Math.pow(this.controller.x - this.x, 2) + Math.pow(this.controller.y - this.y, 2))

    this.xVelocity = ((this.controller.x - this.x) / WORLD.width)  * WORLD.player.velocity || 0
    this.yVelocity = ((this.controller.y - this.y) / WORLD.height) * WORLD.player.velocity || 0

    this.marker.xVelocity = ((this.controller.x - this.marker.x) / WORLD.width)  * 20000 || 0
    this.marker.yVelocity = ((this.controller.y - this.marker.y) / WORLD.height) * 20000 || 0
  }

  draw() {
    super.draw()
    this.marker.draw()
  }
}
