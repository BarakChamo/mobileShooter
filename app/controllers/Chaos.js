import WORLD from '../constants/world'

export default class Chaos {
	constructor(component, delay, callback) {
		this.component = component
		this.delay = delay
		this.interval = null
		this.generator = this.chaos()
		this.callback = callback
	}

	start() {
		this.interval = setInterval(this.add.bind(this), this.delay)

	}

	stop() {
		clearInterval(this.interval)
	}

	add() {
		this.callback(this.generator.next().value)
	}

	* chaos() {
		for(;;) {
			let x = Math.random(0) * WORLD.width
			let y = Math.random(0) * WORLD.height
			
			yield new this.component(x, y)
		}
	}
}