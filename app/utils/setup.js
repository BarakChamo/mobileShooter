import WORLD from '../constants/world'

var res = 1

export default {
	setDimensions: function(ctx) {
	  var rw, rh, r;
	  rw = window.innerWidth / WORLD.width;
	  rh = window.innerHeight / WORLD.height;
	  r = Math.min(rw, rh);

	  canvas.height = WORLD.height * r
	  canvas.width = WORLD.width * r

	  WORLD.height *= res
	  WORLD.width *=  res

	  canvas.style.marginTop = rw <= rh ? String((window.innerHeight - canvas.height) / 2) + 'px' : 0

	  ctx.scale(r / res, r / res)
	}
}