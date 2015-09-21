export default class ComponentController {
	constructor(Component) {
		this.component = Component
		this.components = {}
	}

	add(instance) {
		let component = instance instanceof this.component ? instance : new this.component(...arguments)
		
		component.controllers.push(this)
		this.components[component.id] = component

		return component
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