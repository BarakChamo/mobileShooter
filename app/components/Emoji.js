import { Shape } from './Shapes'

let emoji = {}

function loadImage(url, sx = 3, sy = 3, sw = 57, sh = 57){
	if (!emoji[url]) {	
		emoji[url] = new Image()
		emoji[url].src = url
	}

	return {
		i: emoji[url],
		x: sx,
		y: sy,
		w: sw,
		h: sh
	}
}

export default class Emoji extends Shape {
	constructor(x, y) {
		super(x, y)
	}

	draw(ctx, params) {		
		const e = loadImage('images/emoji/' + params.emoji)
		
		ctx.save()
			ctx.drawImage(e.i, e.x, e.y, e.w, e.h, -params.x / 2, -params.y / 2, params.x, params.y)
		ctx.restore()
	}
}

