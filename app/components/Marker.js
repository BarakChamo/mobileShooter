import {Circle, Polygon}    from './Shapes'
import WORLD       from '../constants/world'
import { movable } from '../mixins'

@movable
export default class Marker extends Circle {
	constructor(x, y, radius, color) {
		super(x, y, radius, color)
	}

	update(controllerX, controllerY, rotation, dt) {
		this.xVelocity = ((controllerX - this.x) / WORLD.width)  * 20000
		this.yVelocity = ((controllerY - this.y) / WORLD.height) * 20000
		this.rotation += dt
		this.move(this.xVelocity * dt, this.yVelocity * dt)
	}
}