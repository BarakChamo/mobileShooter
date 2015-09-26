let socketMap = new WeakMap()

class TriggerController {
  constructor(){

  }

  initialize(socket){
    this.socket = socket 
  }

  register(component, socketId){
    socketMap.set(component, socketId)
  }

  trigger(event, component, ...params){
    this.socket.emit('client:event', {sid: socketMap.get(component), event: `trigger:${event}`, params: params})
  }

  notify(message) {
    this.socket.emit('console:notify', {message: message })
  }
}

export default new TriggerController()