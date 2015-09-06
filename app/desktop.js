import 'styles/desktop.scss'

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

// Controllers
import KeyboardController  from './controllers/Keyboard'
import ComponentController from './controllers/Component'


/*
  Bootstrap
 */ 

var ctx    = document.querySelector('#canvas').getContext('2d'),
    socket = SocketIO.connect(window.location.host)

// Initialize component managers
var playerStore = new ComponentController(Player)
var bulletStore = new ComponentController(Bullet)

// Set canvas dimension
setup.setDimensions(ctx)


/*
  Event Handlers
 */ 

// Client connection
socket.on('client:connect', function(data) {
  if (!data.id) return
  var player = playerStore.add(WORLD.width / 2, WORLD.height / 2, ctx, data.id)
});

// Client position update
socket.on('client:position', function (data) {
  if (!data.event || !playerStore.getChild(data.id)) return
  playerStore.getChild(data.id).pointTo(data.event)
});

// Client motion
socket.on('client:motion', function (data) {
  //do nothing
});

// Client fire event
socket.on('client:fire', function (data) {
  var player = playerStore.getChild(data.id);

  if (!player.x) return

  var  bullet = bulletStore.add(player.x, player.y, player.xVelocity, player.yVelocity, player.rotation, ctx)

  player.fire(bullet)
})


/*
  tell objects in the game to update their positions
 */

function update(dt) {
  playerStore.runOnAll((player, i) => player.update(dt))
  bulletStore.runOnAll((bullet, i) => bullet.update(dt))
}


/*
  tell objects in the game to draw themselves
 */
function render() {
  playerStore.runOnAll((player, i) => player.draw())
  bulletStore.runOnAll((bullet, i) => bullet.draw())
}


/*
  Launch
 */ 

var raf = new Raf()

raf.start(function(elapsed) {
  // Clear canvas
  ctx.clearRect(0, 0, WORLD.width, WORLD.height)

  ctx.beginPath()
  ctx.rect(WORLD.width/2, 0, 1, WORLD.height)
  ctx.fillStyle = 'black'
  ctx.fill()
  ctx.closePath()

  ctx.beginPath()
  ctx.rect(0, WORLD.height/2, WORLD.width, 1)
  ctx.fillStyle = 'black'
  ctx.fill()
  ctx.closePath()

  update(elapsed)
  render()
});
