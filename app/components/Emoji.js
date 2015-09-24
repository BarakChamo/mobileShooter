import { Shape } from './Shapes'

let emoji = {}
let loaded = false

function loadImage(url, sx = 3, sy = 3, sw = 57, sh = 57){
	const img = new Image()
	img.src = url

	return {
		i: img,
		x: sx,
		y: sy,
		w: sw,
		h: sh
	}
}

function loadImages(){
	emoji = {
		smirk: loadImage('images/emoji/smirk.png')
	}

	loaded = true
}

export default class Emoji extends Shape {
	constructor(x, y) {
		super(x, y)
	}

	draw(ctx, params, emojiName) {
		// !loaded && loadImages()
		
		const e = loadImage('images/emoji/' + emojiName)
		// console.log(e)
		
		ctx.save()
			ctx.drawImage(e.i, e.x, e.y, e.w, e.h, -params.x / 2, -params.y / 2, params.x, params.y)
		ctx.restore()
	}
}

