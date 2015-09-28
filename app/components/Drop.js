// Constants
import WORLD from 'constants/world'
import { Shape, Circle } from './Shapes'

import { collidable, kevin, glow } from 'mixins'

@collidable @kevin({health: -WORLD.bullet.damage}) @glow('white', 10)
export default class Drop extends Circle {
  constructor(x, y) {
  	super(x, y, 15, 'transparent')
  	this.x = x
  	this.y = y

    this.selfDestruct()
  }

  selfDestruct(){
    setTimeout(() => this && this.remove(), 10000)
  }

  collide(component) {
    if (this.playerThatFired === component.id) return

    this.remove()
  }

  update(dt){
  	this.rotation = (Date.now() / 7 % 360) * Math.PI/180
  }

  draw(ctx, params){
    ctx.save()
      ctx.globalAlpha = 0.5
      ctx.strokeStyle = 'white'

      super.draw(ctx, params)

      ctx.save()
        ctx.translate(params.x, params.y)
        ctx.rotate(params.rotation)
        
        ctx.beginPath()
          ctx.rect( -params.r * 0.25 , -params.r + params.r * 0.25, params.r * 0.5, params.r * 1.5)
          ctx.rect( -params.r + params.r * 0.25, -params.r * 0.25 , params.r * 1.5, params.r * 0.5)

          ctx.fillStyle = 'MediumSeaGreen'
          ctx.fill()
        ctx.closePath()

      ctx.restore()
    ctx.restore()
  }
}