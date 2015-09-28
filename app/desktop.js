// General styles
import 'styles/desktop.scss'

// Utilities
import setup from 'utils/setup'

// Controllers
import renderers from 'controllers/renderer'

// Constants
import WORLD from 'constants/world'
import Grid   from 'components/Grid'
import HUD   from 'components/HUD'

// Workers
import GameWorker  from 'workers/game.w'

// Graphics
import clouds from 'graphics/clouds'

/*
  Bootstrap
 */ 

const ctx      = document.querySelector('#canvas').getContext('2d'),
      cloudCtx = document.querySelector('#clouds').getContext('2d'),
      hud      = new HUD()

// Configure canvas text
ctx.textBaseline = 'center';

// Set canvas dimension
setup.setDimensions(ctx.canvas, ctx)
setup.setDimensions(cloudCtx.canvas, cloudCtx)

// Initialize grid
const grid = new Grid(75, ctx)

document.querySelector('#hud').appendChild(hud.render())

function render(gameState) {
  // Clear canvas
  ctx.clearRect(0, 0, WORLD.width, WORLD.height)

  // Draw Grid
  grid.draw(ctx)

  // Draw state
  gameState.forEach(s => renderers[s.type](ctx, s.data))
}

function notify(message) {
  hud.notify(message)
}

clouds(cloudCtx)

const gameWorker  = new GameWorker()

// Initialize game state worker
gameWorker.onmessage = function(event) {
  switch(event.data.type){
    case 'render': 
      render(event.data.state)
      break

    case 'notify':
      notify(event.data.message)
      break

    default:
      break
  }
}

gameWorker.onerror = error => console.log(error)

// Get room or push room state
let room = (location.pathname.replace('/','') || prompt('WHAT ROOM?!?!')).toLowerCase()
history.replaceState ? history.replaceState(null, null, room) : location.pathname = room

gameWorker.postMessage(room)