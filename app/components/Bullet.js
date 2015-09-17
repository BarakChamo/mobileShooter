import WORLD       from '../constants/world'
import { Rectangle } from './Shapes'
import { movable, collidable, kevin } from '../mixins'

/*
  Bullet
 */ 

@movable @collidable @kevin({health: WORLD.bullet.damage})
export default class Bullet extends Rectangle {
  constructor(x, y, xV, yV, rotation, playerId) {
    super(x, y, 5, 5, 'black')

    this.playerThatFired = playerId
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
    if (this.playerThatFired === component.id) return

    this.remove()
  }
}