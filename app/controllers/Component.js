export default class ComponentController {
	constructor(Component, initial) {
		this.component = Component
		this.components = {}
	}

	add() {
		var component = new this.component(...arguments)
		component.parent = this

		this.components[component.id] = component

		return component
	}

	remove() {

	}

	removeChild(child) {
		var id = child.id
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
		for (var component in this.components) {
			fn(this.components[component])
		}
	}

	runOnChild(id, fn) {
		components[id]
	}
}