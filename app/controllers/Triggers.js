import Base from 'components/Base'

let socketMap = new WeakMap()

class TriggerController extends Base {
  constructor(){
    super()
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
    this.emit('notify', {message: message })
  }
}

// Export singleton
export default new TriggerController()