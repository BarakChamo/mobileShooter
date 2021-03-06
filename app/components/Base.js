var DEFAULT_MAX_LISTENERS = 12

function error(message, ...args){
  console.error.apply(console, [message].concat(args))
  console.trace()
}

export default class Base {
	constructor(){
		this.id = Math.random().toString(36).substring(2,7)
		this._maxListeners = DEFAULT_MAX_LISTENERS
		this._events = {}
		this.controllers = []
	}
	
	on(type, listener) {
		if(typeof listener != "function") {
		throw new TypeError()
	}

	var listeners = this._events[type] ||(this._events[type] = [])
		if(listeners.indexOf(listener) != -1) {
		return this
		}

		listeners.push(listener)
		if(listeners.length > this._maxListeners) {
			error(
				"possible memory leak, added %i %s listeners, "+
			 	"use EventEmitter#setMaxListeners(number) if you " +
				"want to increase the limit (%i now)",
				listeners.length,
				type,
				this._maxListeners
			)
		}
		
		return this
	}

	once(type, listener) {
		var eventsInstance = this
		function onceCallback(){
			eventsInstance.off(type, onceCallback)
			listener.apply(null, arguments)
		}
		
		return this.on(type, onceCallback)
	}

	off(type, ...args) {
		if(args.length == 0) {
			this._events[type] = null
		}

		var listener = args[0]
			if(typeof listener != "function") {
			throw new TypeError()
		}

		var listeners = this._events[type]
			if(!listeners || !listeners.length) {
			return this
		}

		var indexOfListener = listeners.indexOf(listener)
			if(indexOfListener == -1) {
			return this
		}

		listeners.splice(indexOfListener, 1)
		
		return this
	}

	emit(type, ...args){
		var listeners = this._events[type]
		
		if(!listeners || !listeners.length) {
			return false
		}

		listeners.forEach(fn => fn.apply(null, args))
		
		return true
	}
	
	setMaxListeners(newMaxListeners){
		if(parseInt(newMaxListeners) !== newMaxListeners) {
			throw new TypeError()
		}

		this._maxListeners = newMaxListeners
	}

	mix(...args) {
		arguments.forEach( mixin => Object.keys(mixin).forEach( prop => this[prop] = mixin[prop] ) )
	}

	remove() {
		this.controllers.forEach(controller => controller.removeChild(this))
	}
}
