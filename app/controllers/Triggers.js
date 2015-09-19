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
}

export default new TriggerController()