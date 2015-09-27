// Notifications:

// Join Room
// Leave Room
// Die
// Kill
// Took lead
// Random jokes

export default class HUD {
  constructor() {
  	this.notifications = document.getElementById('n_list')
  }
  notify(message) {
  	let li = document.createElement("li")
  	li.innerText = message
  	this.notifications.appendChild(li)

  	setTimeout(() => this.notifications.removeChild(this.notifications.childNodes[0]), 3000)
  }
}
