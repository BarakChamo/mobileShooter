export default class ComponentController {
	constructor(Component) {
		this.component = Component
		this.components = {}
	}

	_add(instance) {

		instance.controllers.push(this)

		this.components[instance.id] = instance

		return instance
	}

	add() {
		let component = new this.component(...arguments)
		return this._add(component)
	}

	remove() {

	}

	removeChild(child) {
		let id = child.id
		this.components[id] = null
		delete this.components[id]
	}

	removeAll() {

	}

	disableChild() {

	}

	enableChild() {

	}

	getChild(id) {
		return this.components[id]
	}

	getAll() {

	}

	runOnAll(fn) {
		for (let id in this.components) {
			fn(this.components[id])
		}
	}

	runOnChild(id, fn) {
		components[id]
	}
}