import WORLD from '../constants/world'

export default class Controller {
  constructor(r) {
  	this.q = {
  		w: r,
  		h: r
  	}  

  	this.clear()
  }

  clear () {
  	this.quadrants = Array.from({length: WORLD.height/this.q.h}, (v, i) => Array.from({length:  WORLD.width/this.q.w}, (v, i) => []))
  }

  report(components) {
  	components.forEach( component => this.update(component) )
  }

  update(component) {
  	if (false) return

  	// update quadrant position
  }

  collide(component) {
  	// collide with components in quadrants
  }
}