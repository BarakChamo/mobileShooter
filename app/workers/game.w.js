// Dependencies
import SocketIO from 'socket.io-client'

// Utilities
import Raf   from '../utils/raf'
import setup from '../utils/setup'

// Constants
import WORLD from '../constants/world'

// Components
import Player from '../components/Player'
import Bullet from '../components/Bullet'
import Grid   from '../components/Grid'
import Drop   from '../components/Drop'


// Controllers
import KeyboardController  from '../controllers/Keyboard'
import ComponentController from '../controllers/Component'
import CollisionController from '../controllers/Collision'
import Chaos               from '../controllers/Chaos'

// Managers
import triggerManager from '../controllers/Triggers'


/*
  Bootstrap
 */ 

const socket = SocketIO.connect(self.location.host + '/console')

// Initialize component managers
let playerStore    = new ComponentController(Player)
let bulletStore    = new ComponentController(Bullet)
let dropStore      = new ComponentController(Drop)
let collisionManager = new CollisionController(WORLD.player.radius * 5)


let chaosManager = new Chaos(Drop, 5000, drop => dropStore.add(drop) && collisionManager.add(drop))

playerStore.add(WORLD.width / 2, WORLD.height / 2, 'test')



/*
  Socket connection
 */ 

// Connect to room
onmessage = function(event){
  socket.emit('client:join', event.data, function(room){
    // console.log('CONNECTED TO:' + room)
  })
}

// Register socket instance with trigger manager
triggerManager.initialize(socket)

// Initialize chaos monkey
chaosManager.start()

/*
  Event Handlers
 */ 

// Client connection
socket.on('client:connect', function(data) {
  if (!data.id) return

  let player = playerStore.add(WORLD.width / 2, WORLD.height / 2, data.id)

  triggerManager.register(player, data.socketId)
  collisionManager.add(player)
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
  
  collisionManager.add(bullet)
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
  
  bulletStore.runOnAll((bullet, i) => collisionManager.report(bullet))
    dropStore.runOnAll((drop, i)   => collisionManager.report(drop))
  playerStore.runOnAll((player, i) => collisionManager.report(player))

  playerStore.runOnAll((player, i) => collisionManager.checkForCollision(player)) 

  let state = []

  playerStore.runOnAll((player, i) => state.push(player.describe()))
  bulletStore.runOnAll((bullet, i) => state.push(bullet.describe()))
  dropStore.runOnAll((drop, i)     => state.push(drop.describe()))

  return state
}


/*
  Launch
 */ 

let raf = new Raf()

raf.start(function(elapsed) {
  var state = update(elapsed)
  postMessage(state /*,[state]*/)
})
