import {Circle, Polygon}    from './Shapes'
import WORLD       from '../constants/world'

export default class Marker extends Polygon {
	constructor(x, y, radius, sides, color, ctx) {
		super(x, y, radius, sides, color, ctx)
	}

	update(controllerX, controllerY, rotation, dt) {
		this.xVelocity = ((controllerX - this.x) / WORLD.width)  * 20000
		this.yVelocity = ((controllerY - this.y) / WORLD.height) * 20000
		this.rotation += dt
		this.move(this.xVelocity * dt, this.yVelocity * dt)
	}
}