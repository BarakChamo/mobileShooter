import {Rectangle} from './Shapes'
import WORLD from "../constants/world"

export default class Grid {
	constructor(r) {
		this.x = WORLD.width  / r
		this.y = WORLD.height / r
		
		this.w = r
		this.h = r
		
		this.grid = (function(nx, ny) {
			let array = []
			for (let x = 0; x < nx; x++) {
				for (let y = 0; y < ny; y++) {
					array.push(new Rectangle(this.w * x, this.h * y, this.w, this.h, 'teal'))
				}
			}
			return array
		}.bind(this))(this.x, this.y)
	}

	draw(ctx) {
		this.grid.forEach(elem => elem.draw(ctx))
	}
}