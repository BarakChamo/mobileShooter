// General styles
import 'styles/desktop.scss'

// Utilities
import setup from './utils/setup'

// Controllers
import renderers from './controllers/renderer'

// Constants
import WORLD from './constants/world'
import Grid   from './components/Grid'

// Workers
import GameWorker  from './workers/game.w'

// Graphics
import clouds from './clouds'

/*
  Bootstrap
 */ 

const ctx      = document.querySelector('#canvas').getContext('2d'),
      cloudCtx = document.querySelector('#clouds').getContext('2d'),
      grid     = new Grid(WORLD.player.radius * 5)

// Configure canvas text
ctx.textBaseline = 'center';

// Set canvas dimension
setup.setDimensions(ctx.canvas, ctx)
setup.setDimensions(cloudCtx.canvas, cloudCtx)


function render(gameState) {
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

  // grid.draw(ctx)

  gameState.forEach(s => renderers[s.type](ctx, s.data))
}

clouds(cloudCtx)

const gameWorker  = new GameWorker()

// Initialize game state worker
gameWorker.onmessage = function(event){
  render(event.data)
}

gameWorker.onerror = error => console.log(error)

gameWorker.postMessage((location.pathname.replace('/','') || prompt('WHAT ROOM?!?!')).toLowerCase())