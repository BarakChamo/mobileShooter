import WORLD       from '../constants/world'
import {Circle}    from './Shapes'
import Marker      from './Marker'
import Orientation from '../controllers/Orientation'
import Triggers    from '../controllers/Triggers'

import { movable, collidable, kevin, describe } from '../mixins'

let maxDistance = Math.sqrt(Math.pow(WORLD.width, 2) + Math.pow(WORLD.height, 2))

@movable 
@collidable 
@kevin({health: WORLD.player.damage})
@describe('x', 'y', 'r', 'color', 'rotation')
export default class Player extends Circle {
  constructor(x, y, id) {
    super(x, y, WORLD.player.radius, 'red')

    this.id = id
    this.controller = new Orientation()
    this.marker = new Marker(200, 200, 20, 3, 'blue')

    this.health = WORLD.player.health
  }
  

  update(dt) {
    this.xVelocity = ((this.controller.x - this.x) / WORLD.width) * 2000
    this.yVelocity = ((this.controller.y - this.y) / WORLD.height) * 2000

    this.rotation = this.controller.rotation
    this.move(this.xVelocity * dt, this.yVelocity * dt)

    // this.marker.update(this.controller.x, this.controller.y, this.rotation, dt)

    if (this.x > WORLD.width - this.r) {
      this.x = WORLD.width - this.r
    }

    if (this.x < 0 + this.r) {
      this.x = 0 + this.r
    }

    if (this.y < 0 + this.r) {
      this.y = 0 + this.r
    }

    if (this.y > WORLD.height - this.r) {
      this.y = WORLD.height - this.r
    }
  }

  fire(bullet) {
    this.xVelocity -= bullet.xVelocity / 10
    this.yVelocity -= bullet.yVelocity / 10
  }

  collide(component) {
    const a = component.action

    if (component.playerThatFired === this.id) return
    if (a.health) this.health += a.health

    this.checkLife()
  }

  checkLife(){
    if (this.health > 0) return Triggers.trigger('hit', this)

    Triggers.trigger('dead', this)
    this.remove()
  }

  handleOrientation(event) {
    this.controller.handleOrientation(event)
  }

  draw(ctx) {
    // Ball
    super.draw(ctx)
      
      ctx.save()

      ctx.translate(this.x, this.y)
      ctx.rotate(this.rotation)

      // Cross
      ctx.beginPath()
      ctx.rect(0 - this.r, 0, this.r * 2, 1)
      ctx.fillStyle = 'black'
      ctx.fill()
      ctx.closePath()

      ctx.beginPath()
      ctx.rect(0, 0 - this.r * 2, 1, this.r * 3)
      ctx.fillStyle = 'black'
      ctx.fill()
      ctx.closePath()

      // ctx.font = (this.r * 2) + "pt Arial"
      // ctx.fillText(String.fromCharCode(55357) + String.fromCharCode(56835), -this.r, this.r)

    ctx.restore()
    

    // this.marker.draw(ctx)
  }
}