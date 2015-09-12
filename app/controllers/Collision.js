import WORLD from '../constants/world'

export default class Controller {
  constructor(r) {
  	this.q = {
  		w: r,
  		h: r
  	}  

  	this.quadrants = Array.from({length: WORLD.height / this.q.h + 2}, (v, i) => Array.from({length:  WORLD.width / this.q.w + 2}, (v, i) => new Object ))
  }

  report(component) {
  	// components.forEach( component => this.update(component) )
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
      if (b.constructor.name === 'Player') {
        console.log("MOVE IT!")
      }
      else if (b.constructor.name === 'Bullet' && b.playerThatFired !== a.id) {
        console.log("I'M HIT!!")
        delete this.quadrants[b._cy][b._cx][b.id]
        b.parent.removeChild(b)
      } 
    }
  }

}