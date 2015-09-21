import Shape from './Shapes'

export default class Emoji extends Shape {
	constructor(x, y) {
		super(x, y)

		let q = console.log(["🌚","🌘","🌗","🌖","🌝","🌔","🌓","🌒"])
	}

	draw(ctx, params) {
		ctx.save()

		ctx.translate(params.x, params.y)
		ctx.rotate(params.rotation

		ctx.font = (params.r * 2) + "pt Arial"
		ctx.fillText(🌝, -params.r, params.r)

		ctx.restore()
	}
}

