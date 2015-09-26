// Dependencies
import SocketIO from 'socket.io-client'

// Utilities
import setup from 'utils/setup'

// Constants
import WORLD from 'constants/world'

// Components
import Player from 'components/Player'
import Bullet from 'components/Bullet'
import Grid   from 'components/Grid'
import Drop   from 'components/Drop'


// Controllers
import KeyboardController  from 'controllers/Keyboard'
import ComponentController from 'controllers/Component'
import CollisionController from 'controllers/Collision'
import Chaos               from 'controllers/Chaos'

// Managers
import triggerManager from 'controllers/Triggers'


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

// playerStore.add(WORLD.width / 2, WORLD.height / 2, 'test', 'smirk.png')



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

// Client position update
socket.on('client:position', function (data) {
  // Make sure data is valid
  if (!data.p) return

  if (!playerStore.getChild(data.p.id)) {  
    let player = playerStore.add(WORLD.width / 2, WORLD.height / 2, data.id, data.p.e)

    triggerManager.register(player, data.sid)
    collisionManager.add(player)
  }

  playerStore.getChild(data.p.id).handleOrientation(data.event)
})

// Client motion
socket.on('client:motion', function (data) {
  //do nothing
})

// Client fire event
socket.on('client:fire', function (data) {
  let player = playerStore.getChild(data.id)

  if (!player || !player.x) return

  let bullet = bulletStore.add(player.x, player.y, player.xVelocity, player.yVelocity, player.rotation, player.id)
  
  collisionManager.add(bullet)
  player.fire(bullet)
})

socket.on('console:notify', function(data) {
  postMessage({type: 'notify', message: data.message} )
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
    dropStore.runOnAll((drop, i)   => drop.update(dt))
  
  bulletStore.runOnAll((bullet, i) => collisionManager.report(bullet))
  playerStore.runOnAll((player, i) => collisionManager.report(player))
    dropStore.runOnAll((drop, i)   => collisionManager.report(drop))


  playerStore.runOnAll((player, i) => collisionManager.checkForCollision(player)) 

  let state = []

  playerStore.runOnAll((player, i) => state.push(player.describe()))
  bulletStore.runOnAll((bullet, i) => state.push(bullet.describe()))
    dropStore.runOnAll((drop, i)   => state.push(drop.describe()))
  
  return state
}


/*
  Launch
 */ 

let time = 0

let start = _.throttle(function(){
  const now = Date.now(),
        dt  = time ? (now - time) / 1000 : 1 / 60

  // Re-set last time frame
  time = now

  var state = update(dt)
  postMessage({type: 'render', state: state} /*,[state]*/)

  // Re-run
  start()
}, 1000/WORLD.framerate)

start()