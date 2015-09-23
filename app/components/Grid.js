import { Rectangle } from './Shapes'
import { glow } from 'mixins'
import WORLD from 'constants/world'

@glow('white', 10)
export default class Grid {
	constructor(r) {
		this.x = WORLD.width  / r
		this.y = WORLD.height / r
		
		this.w = r
		this.h = r
	}

	draw(ctx) {
		for (let row = 0; row < this.y; row++) {
			ctx.beginPath()
			ctx.moveTo(0 , this.h * row)
			ctx.lineTo(WORLD.width, this.h * row)
			ctx.lineWidth = 2
			ctx.strokeStyle = 'rgba(255,255,255,0.25)'
			ctx.closePath()
			ctx.stroke()
		}

		for (let col = 0; col < this.x; col++) {
			ctx.beginPath()
	    ctx.moveTo(this.w * col, 0)
	    ctx.lineTo(this.w * col, WORLD.height)
	    ctx.lineWidth = 2
	    ctx.strokeStyle = 'rgba(255,255,255,0.25)'
	    ctx.closePath()
	    ctx.stroke()
		}
	}
}