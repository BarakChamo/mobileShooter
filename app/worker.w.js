// Dependencies
import SocketIO from 'socket.io-client'

// Utilities
import Raf   from './utils/raf'
import setup from './utils/setup'

// Constants
import WORLD from './constants/world'

// Components
import Player from './components/Player'
import Bullet from './components/Bullet'
import Grid   from './components/Grid'

// Controllers
import KeyboardController  from './controllers/Keyboard'
import ComponentController from './controllers/Component'
import CollisionController from './controllers/Collision'


/*
  Bootstrap
 */ 

const socket = SocketIO.connect(self.location.host + '/console')

// Initialize component managers
let playerStore    = new ComponentController(Player)
let bulletStore    = new ComponentController(Bullet)
let collisionStore = new CollisionController(WORLD.player.radius * 5)

playerStore.add(WORLD.width / 2, WORLD.height / 2, 'test')


/*
  Socket connection
 */ 

// Connect to room
onmessage = function(event){
  socket.emit('client:join', event.data, function(room){
    console.log('CONNECTED TO:' + room)
  })
}


/*
  Event Handlers
 */ 

// Client connection
socket.on('client:connect', function(data) {
  if (!data.id) return
  let player = playerStore.add(WORLD.width / 2, WORLD.height / 2, data.id)
})

// Client position update
socket.on('client:position', function (data) {
  if (!data.event || !playerStore.getChild(data.id)) return
  playerStore.getChild(data.id).handleOrientation(data.event)
})

// Client motion
socket.on('client:motion', function (data) {
  //do nothing
})

// Client fire event
socket.on('client:fire', function (data) {
  let player = playerStore.getChild(data.id)

  if (!player.x) return

  let bullet = bulletStore.add(player.x, player.y, player.xVelocity, player.yVelocity, player.rotation, player.id)
  collisionStore.add(bullet)

  player.fire(bullet)
})

// Any test events
socket.on('client:test', function (data) {
  console.log('TEST', data)
})


/*
  tell objects in the game to update their positions
 */

function update(dt) {
  playerStore.runOnAll((player, i) => player.update(dt))
  bulletStore.runOnAll((bullet, i) => bullet.update(dt))
  bulletStore.runOnAll((bullet, i) => collisionStore.report(bullet))
  playerStore.runOnAll((player, i) => collisionStore.report(player))
  playerStore.runOnAll((player, i) => collisionStore.checkForCollision(player)) 

  let state = []

  playerStore.runOnAll((player, i) => state.push(player.describe()))
  bulletStore.runOnAll((bullet, i) => state.push(bullet.describe()))

  return state
}


/*
  Launch
 */ 

let raf = new Raf()
let first
raf.start(function(elapsed) {
  var state = update(elapsed)
  postMessage(state /*,[state]*/)
})
