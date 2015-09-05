import WORLD       from '../constants/world'
import {Circle}    from './Shapes'
import Orientation from '../controllers/Orientation'

export default class Player extends Circle {
  constructor(x, y, ctx, id) {
    super(x, y, 10, 'red', ctx);

    this.id = id
    this.controller = new Orientation(this)
  }

  intersects(b) {
    console.log(this.x < b.x + b.width, this.x + this.width > b.x, this.y < b.y + b.height, this.y + this.height > b.y);
      return  this.x < b.x + b.width && 
              this.x + this.width > b.x &&
              this.y < b.y + b.height &&
              this.y + this.height > b.y;
  }

  update(dt) {    
    if (this.x > WORLD.width - this.r || this.x < 0 + this.r) {
      this.xVelocity *= -1;
    }

    if (this.y <= 0 + this.r || this.y > WORLD.height - this.r) {
      this.yVelocity *= -1;
    }

    this.move(this.xVelocity * dt, this.yVelocity * dt);
  }

  fire(bullet) {
    this.xVelocity -= bullet.xVelocity / 2
    this.yVelocity -= bullet.yVelocity / 2
  }

  accelerate(data) {
    this.controller.handleOrientation(data)
  }
}
