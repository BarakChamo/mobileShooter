import WORLD from '../constants/world'

export default {
	setDimensions: function(canvas, ctx) {
	  const rw = window.innerWidth / WORLD.width,
	  			rh = window.innerHeight / WORLD.height,
	  			r  = Math.min(rw, rh)

	  canvas.height = WORLD.height * r
	  canvas.width = WORLD.width * r

	  WORLD.height *= WORLD.resolution
	  WORLD.width *=  WORLD.resolution

	  canvas.style.marginTop = rw <= rh ? String((window.innerHeight - canvas.height) / 2) + 'px' : 0

	  ctx.imageSmoothingEnabled = true

	  ctx.scale(r / WORLD.resolution, r / WORLD.resolution)
	}
}