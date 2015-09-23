// Constants
import WORLD from 'constants/world'
import { Shape, Circle } from './Shapes'

import { collidable, kevin } from 'mixins'

@collidable @kevin({health: -WORLD.bullet.damage})
export default class Drop extends Circle {
  constructor(x, y) {
  	super(x, y, 10, 'green')
  	this.x = x
  	this.y = y
  }

  collide(component) {
    if (this.playerThatFired === component.id) return

    this.remove()
  }

  update(dt){
  	
  }
}