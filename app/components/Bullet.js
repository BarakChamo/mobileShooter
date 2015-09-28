import WORLD       from 'constants/world'
import { Rectangle } from './Shapes'
import { movable, collidable, kevin, glow } from 'mixins'
/*
  Bullet
 */ 

@movable @collidable @kevin({health: WORLD.bullet.damage}) @glow('white', 3)
export default class Bullet extends Rectangle {
  constructor(x, y, xV, yV, rotation, player) {
    super(x, y, 5, 5, 'transparent')

    this.playerThatFired = player
    this.xVelocity = WORLD.bullet.speed * Math.cos(rotation + (Math.PI * 90 / 180)) + xV / 2;
    this.yVelocity = WORLD.bullet.speed * Math.sin(rotation + (Math.PI * 90 / 180)) + yV / 2;
  }

  update(dt) {
    if (!this.inBoundries()) {
      this.remove()
    }

    this.move(this.xVelocity * dt, this.yVelocity * dt);
  }

  collide(component) {
    if (this.playerThatFired === component) return

    this.remove()
  }

  draw(ctx, params) {
    ctx.lineWidth = 1
    ctx.strokeStyle = 'white'

    super.draw(ctx, params)

    ctx.stroke()
  }
}