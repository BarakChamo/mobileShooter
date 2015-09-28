import 'styles/desktop/hud.scss'

// Notifications:

// Join Room
// Leave Room
// Die
// Kill
// Took lead
// Random jokes

export default class HUD {
  constructor() {

  }

  render(){
    let parser = new DOMParser(),
        elm    = parser.parseFromString(require('templates/desktop/hud/hud.jade')(), 'text/html')

    this.elm = elm.body.firstChild

    this.notifications = this.elm.querySelector('.n_list')

    elm = undefined
    parser = undefined

    return this.elm
  }

  notify(message) {
  	let li = document.createElement('LI')
  	li.innerText = message

  	this.notifications.insertBefore(li, this.notifications.firstChild)
    
    setTimeout(() => li.classList.add('shown'), 10)

  	this.removeNotification(li)
  }

  removeNotification(notification) {
    const self = this

    setTimeout(function(){
      notification.classList.add('hidden')

      setTimeout(() => self.notifications.removeChild(notification), 1000)
    }, 3000)
  }
}
