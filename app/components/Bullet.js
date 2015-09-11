import { Rectangle } from './Shapes'

/*
  Bullet
 */ 

export default class Bullet extends Rectangle {
  constructor(x, y, xV, yV, rotation, playerId) {
    super(x, y, 5, 5, 'black')

    this.playerThatFired = playerId
    this.xVelocity = -500 * Math.cos(rotation + (Math.PI * 90 / 180)) + xV / 2;
    this.yVelocity = -500 * Math.sin(rotation + (Math.PI * 90 / 180)) + yV / 2;
  }

  update(dt) {
    if (!this.inBoundries()) {
      this.parent.removeChild(this)
    }

    this.move(this.xVelocity * dt, this.yVelocity * dt);
  }

}