import WORLD from '../constants/world'
import mixin from './mixin'

/*
  Collidable Mixin
*/ 

export const collidable = mixin({
  intersects(b) {
    return  this.x - this.r < b.x + (b.width || b.r * 2) && 
            this.x + this.r > b.x &&
            this.y - this.r < b.y + (b.height || b.r * 2) &&
            this.y + this.r > b.y;
  }
})


/*
  Movable Mixin
*/ 

export const movable = mixin({
  rotation:  0,
  xVelocity: 0,
  yVelocity: 0,
  moveLeft:  false,
  moveUp:    false,
  moveRight: false,
  moveDown:  false,

  move(dx, dy) {
    this.x += dx || this.xVelocity;
    this.y += dy || this.yVelocity;
  },

  inBoundries() {
    return !(this.x > WORLD.width - this.height || this.x < 0 + this.height || this.y <= 0 + this.height || this.y > WORLD.height - this.height)
  }
})


/*
  KEVIN Mixin
*/ 

export function kevin(action) {
  return function decorator(target){
    target.prototype.action = action
  }
}