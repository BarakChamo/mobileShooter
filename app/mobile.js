import 'styles/mobile.scss'

// Dependencies
import SocketIO from 'socket.io-client'

// Controllers
import sounds from 'controllers/Sound'

// Graphics
import clouds  from 'graphics/clouds'
import { Arc } from './components/Shapes'

// Constants
import WORLD  from 'constants/world'

// is on an inconsistent apple device?!?
const ios = navigator.userAgent.match(/iPhone|iPad/)

let id     = (window.localStorage.getItem('playerId') || Math.random().toString(36).substring(2,7)),
    socket = SocketIO.connect(window.location.host + '/controller',{query: 'playerId='+id})

let pole = false,
    calibrated = false

// Set player id for reconnection
window.localStorage.setItem('playerId', id)

// Canvases
const hud = document.getElementById('hud').getContext('2d')
hud.canvas.width = window.innerWidth
hud.canvas.height = window.innerHeight


/*
  Load sounds
*/ 

sounds.load('pew',   'sounds/pew.wav')
sounds.load('lazar', 'sounds/lazar.mp3')
sounds.load('sad',   'sounds/sad.mp3')


/*
  Device event handlers
*/ 

let faya = _.throttle(function() {
  sounds.play('pew')

  socket.emit('device:fire', {
    id: id,
    strength: 1
  })
}, 10)

socket.on('connect', function(){
  pole = false
  calibrated = false

  let room = (location.pathname.replace('/','') || location.hash || prompt('WHAT ROOM?!?!')).toLowerCase()
  history.replaceState ? history.replaceState(null, null, 'kevin') : location.hash = 'room'

  // Join console room
  socket.emit('device:join', room, function(data){
    window.addEventListener('deviceorientation', updateOrientation)
    document.addEventListener('touchstart', faya)
  })
})


/*
  Throttled movement handler
*/ 

let updateOrientation = _.throttle(function(event) {
  pole = calibrated ? pole : event.alpha
  calibrated = calibrated || true

  socket.emit('device:position', {
    // room: ROOM_TEMP
    id: id,
    event:  {
      alpha: ios ? event.alpha : Math.abs(360 + event.alpha - pole) % 360,
      beta:  event.beta,
      gamma: event.gamma
    },
    a: event.absolute
  })
}, 10)


/*
  Game event handlers
*/ 

function die() {
  sounds.play('sad')
  // navigator.vibrate && navigator.vibrate([200, 100, 200, 100, 200])
  alert('you died')
}

socket.on('trigger:hit', function(params) {
  let newAngle =  params[0].health / WORLD.player.health * 2

   animateValue(health, 'endAngle', newAngle, 10, function(){
    hud.clearRect(0, 0, window.innerWidth, window.innerHeight)
    health.draw(hud, health)

    if (health.endAngle <= 0) die()
  })
})


function animateValue(target, key, value, delay, fn) {  
  const interval = setInterval(function(){
    if (target[key] !== value){
      target[key] = Number((target[key] < value ? target[key] + 0.01 : target[key] - 0.01).toFixed(2))
      fn()
    }
    
    if (target[key] === value) clearInterval(interval)
  }, delay)
}

/*
  Animation for the HUD
*/

const health = new Arc(window.innerWidth / 2, window.innerHeight / 2, 100, -0.5, 2, 'white')
health.draw(hud, health)


/*
  Cloud background
*/ 

// clouds(document.querySelector('#clouds').getContext('2d'))

const emoji = require('templates/emoji.json')
const dialogTemplate = require('templates/emoji.jade')
const emojiDialog = document.getElementById('emoji')

emojiDialog.innerHTML = dialogTemplate({emoji:emoji.list})
emojiDialog.style.display = 'block'
emojiDialog.addEventListener('click', function(e) {
  const _emoji = e.target.attributes['data-emoji'].value
  
  emojiDialog.style.display = 'none'
  localStorage.setItem('emoji', _emoji)
  
<<<<<<< HEAD
=======
  console.log(_emoji)
>>>>>>> mobilefix
})