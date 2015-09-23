import WORLD   from 'constants/world'
import Base    from './Base'
import { describe, glow } from 'mixins'

@describe('x', 'y')
export class Shape extends Base {
  constructor(x, y) {
    super(x, y)

    this.x = x
    this.y = y    
  }

  describe() {
    let desc = {
      type: this.constructor.name,
      data: {}
    }
 
    this._describe.forEach(key => (desc.data[key] = this[key] instanceof Shape ? this[key].describe() : this[key]) )

    return desc
  }
}

/*
  Rectangle
 */ 

@describe('x', 'y', 'r', 'sides', 'color', 'rotation')
export class Polygon extends Shape {
  constructor(x, y, r, sides, color) {
    super(x, y)

    if (sides < 3) throw new Error('Invalid Polygon')

    this.x = x
    this.y = y
    this.r = r
    this.sides = sides
    this.color = color
  }

  draw(ctx, params) {
    if (params.sides < 3) return

    var a = (Math.PI * 2)/params.sides

    ctx.save()
    ctx.translate(params.x, params.y)
    ctx.rotate(params.rotation)

    ctx.beginPath()
    ctx.moveTo(params.r,0)

    for (var i = 1; i < params.sides; i++) {
      ctx.lineTo(params.r*Math.cos(a*i),params.r*Math.sin(a*i))
    }

    ctx.closePath()
    ctx.lineWidth = 1
    ctx.setLineDash([5])
    ctx.stroke()

    ctx.restore()

  }
}

/*
  Triangle
 */ 

export class Triangle extends Polygon {
  constructor(x, y, color) {
    super([[x, y],[x + 50, y],[x + 25, y - 50]], color)
  }
}


/*
  Rectangle
 */ 

@describe('x', 'y', 'width', 'height', 'color')
export class Rectangle extends Shape {
  constructor(x, y, width, height, color) {
    super(x, y)
    this.width = width
    this.height = height
    this.color = color
  }

  
  draw(ctx, params) {
    ctx.beginPath()
    ctx.rect(params.x, params.y, params.width, params.height)
    ctx.fillStyle = params.color
    ctx.fill()
    ctx.closePath()
  }
}

@glow('white', 3)
@describe('x', 'y', 'r', 'color')
export class Arc {
  constructor(x, y, r, startAngle, endAngle, color) {
    this.x = x
    this.y = y
    this.r = r
    this.color = color
    this.startAngle = startAngle
    this.endAngle = endAngle
  }

  draw(ctx, params) {
    ctx.save()

    ctx.translate(params.x, params.y)
    ctx.rotate(params.rotation)

    ctx.beginPath()
    ctx.arc(0, 0, params.r, params.startAngle * Math.PI, (params.startAngle + params.endAngle) * Math.PI)
    ctx.strokeStyle = params.color
    ctx.lineWidth = 3.5
    ctx.stroke()

    ctx.restore()
  }
}


/*
  Circle
 */ 

@describe('x', 'y', 'r', 'rotation', 'color')
export class Circle extends Shape {
  constructor(x, y, r, color) {
    super(x, y)
    this.r = r
    this.color = color
  }
  

  draw(ctx, params) {
    ctx.save()

      ctx.translate(params.x, params.y)
      ctx.rotate(params.rotation)

      // Ball
      ctx.beginPath()
      ctx.arc(0, 0, params.r, 0, 2*Math.PI)
      ctx.fillStyle = params.color
      ctx.fill()
      ctx.stroke()

    ctx.restore()
  }
}