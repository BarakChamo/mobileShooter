import WORLD from 'constants/world'

export default class Controller {
  constructor(r) {
  	this.q = {
  		w: r,
  		h: r
  	}  

    this.type

  	this.quadrants = Array.from({length: WORLD.height / this.q.h + 2}, (v, i) => Array.from({length:  WORLD.width / this.q.w + 2}, (v, i) => new Object ))
  }

  add(component) {
    component.controllers.push(this)
  }

  removeChild(component) {
    delete this.quadrants[component._cy][component._cx][component.id]
  }

  report(component) {
  	const x = Math.floor(component.x / this.q.w) + 1
  	const y = Math.floor(component.y / this.q.h) + 1
  	if (component._cx === x && component._cy === y) return

  	if (component._cx) {
  		delete this.quadrants[component._cy][component._cx][component.id]
  	}

  	this.quadrants[y][x][component.id] = component

  	component._cx = x
  	component._cy = y
  }

  checkForCollision(component) {
  	const x = Math.floor(component.x / this.q.w) + 1
  	const y = Math.floor(component.y / this.q.h) + 1

  	let quadrants = [].concat(
  		this.quadrants[y    ][x], 
  		this.quadrants[y - 1][x], 
  		this.quadrants[y + 1][x],

  		this.quadrants[y    ][x + 1], 
  		this.quadrants[y - 1][x + 1], 
  		this.quadrants[y + 1][x + 1],

  		this.quadrants[y    ][x - 1], 
  		this.quadrants[y - 1][x - 1], 
  		this.quadrants[y + 1][x - 1]
	)

  	quadrants.forEach( quadrant => Object.keys(quadrant).forEach( id => this.collides(component, quadrant[id]) ) )
  }

  collides(a, b) {
    if (b.id === a.id) return

    if (a.intersects(b)) {
      a.collide(b)
      b.collide(a)
    }
  }

}