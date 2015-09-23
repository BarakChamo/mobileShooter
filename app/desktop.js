// General styles
import 'styles/desktop.scss'

// Utilities
import setup from 'utils/setup'

// Controllers
import renderers from 'controllers/renderer'

// Constants
import WORLD from 'constants/world'
import Grid   from 'components/Grid'

// Workers
import GameWorker  from 'workers/game.w'

// Graphics
import clouds from 'graphics/clouds'

/*
  Bootstrap
 */ 

const ctx      = document.querySelector('#canvas').getContext('2d'),
      cloudCtx = document.querySelector('#clouds').getContext('2d'),
      grid     = new Grid(75)

// Configure canvas text
ctx.textBaseline = 'center';

// Set canvas dimension
setup.setDimensions(ctx.canvas, ctx)
setup.setDimensions(cloudCtx.canvas, cloudCtx)


function render(gameState) {
  // Clear canvas
  ctx.clearRect(0, 0, WORLD.width, WORLD.height)

  // Draw Grid
  grid.draw(ctx)

  // Draw state
  gameState.forEach(s => renderers[s.type](ctx, s.data))
}

clouds(cloudCtx)

const gameWorker  = new GameWorker()

// Initialize game state worker
gameWorker.onmessage = function(event){
  render(event.data)
}

gameWorker.onerror = error => console.log(error)

// Get room or push room state
let room = (location.pathname.replace('/','') || location.hash || prompt('WHAT ROOM?!?!')).toLowerCase()
history.replaceState ? history.replaceState(null, null, 'kevin') : location.hash = 'room'

gameWorker.postMessage(room)