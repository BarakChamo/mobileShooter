import {Rectangle} from './Shapes'
import WORLD from "../constants/world"

class GridRectangle extends Rectangle {
	draw(ctx, params) {
    ctx.beginPath()
	    ctx.rect(params.x, params.y, params.width, params.height)
	    ctx.strokeStyle = 'rgba(255,255,255,0.1)'
	    ctx.lineWidth = 3
	    ctx.stroke()
    ctx.closePath()
	}
}

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
					array.push(new GridRectangle(this.w * x, this.h * y, this.w, this.h))
				}
			}
			return array
		}.bind(this))(this.x, this.y)
	}

	draw(ctx) {
		this.grid.forEach(elem => elem.draw(ctx, elem.describe().data))
	}
}