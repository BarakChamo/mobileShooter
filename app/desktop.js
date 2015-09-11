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
import Grid   from './components/Grid'

// Controllers
import KeyboardController  from './controllers/Keyboard'
import ComponentController from './controllers/Component'
import CollisionController from './controllers/Collision'

/*
  Bootstrap
 */ 

let ctx    = document.querySelector('#canvas').getContext('2d'),
    socket = SocketIO.connect(window.location.host)

// Initialize component managers
let playerStore    = new ComponentController(Player)
let bulletStore    = new ComponentController(Bullet)
let collisionStore = new CollisionController(WORLD.player.radius * 5)

let grid = new Grid(WORLD.player.radius * 5, ctx)

playerStore.add(WORLD.width / 2, WORLD.height / 2, ctx, 'test')


// Set canvas dimension
setup.setDimensions(ctx)


/*
  Event Handlers
 */ 

// Client connection
socket.on('client:connect', function(data) {
  if (!data.id) return
  let player = playerStore.add(WORLD.width / 2, WORLD.height / 2, ctx, data.id)
});

// Client position update
socket.on('client:position', function (data) {
  if (!data.event || !playerStore.getChild(data.id)) return
  playerStore.getChild(data.id).handleOrientation(data.event)
});

// Client motion
socket.on('client:motion', function (data) {
  //do nothing
});

// Client fire event
socket.on('client:fire', function (data) {
  let player = playerStore.getChild(data.id);

  if (!player.x) return

  let bullet = bulletStore.add(player.x, player.y, player.xVelocity, player.yVelocity, player.rotation, ctx)

  player.fire(bullet)
})


/*
  tell objects in the game to update their positions
 */

function update(dt) {
  playerStore.runOnAll((player, i) => player.update(dt))
  bulletStore.runOnAll((bullet, i) => bullet.update(dt))
  bulletStore.runOnAll((bullet, i) => collisionStore.report(bullet)) 
}


/*
  tell objects in the game to draw themselves
 */
function render() {
  playerStore.runOnAll((player, i) => player.draw(ctx))
  bulletStore.runOnAll((bullet, i) => bullet.draw(ctx))
}


/*
  Launch
 */ 

let raf = new Raf()

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

  grid.draw(ctx)

  update(elapsed)
  render()
});
