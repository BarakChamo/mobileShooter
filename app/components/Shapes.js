import WORLD   from '../constants/world'
import Base    from './Base'
import { describe } from '../mixins'

@describe('x', 'y')
class Shape extends Base {
  constructor(x, y, r, sides, color) {
    super(x, y)

    this.x = x
    this.y = y    
  }

  describe() {
    let desc = {
      type: this.constructor.name,
      data: {}
    }
 
    this._describe.forEach(key => (desc.data[key] = this[key]))

    return desc
  }
}

/*
  Rectangle
 */ 

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

  draw(ctx) {
    if (this.sides < 3) return;

    var a = (Math.PI * 2)/this.sides;

    ctx.save()
    ctx.translate(this.x, this.y)
    ctx.rotate(this.rotation)

    ctx.beginPath();
    ctx.moveTo(this.r,0)

    for (var i = 1; i < this.sides; i++) {
      ctx.lineTo(this.r*Math.cos(a*i),this.r*Math.sin(a*i))
    }

    ctx.closePath()
    ctx.lineWidth = 1
    ctx.setLineDash([5])
    ctx.stroke()

    ctx.restore()

  }
}

/*
  Rectangle
 */ 

export class Triangle extends Polygon {
  constructor(x, y, color) {
    super([[x, y],[x + 50, y],[x + 25, y - 50]], color);
  }
}


/*
  Rectangle
 */ 

@describe('x', 'y', 'width', 'height', 'color')
export class Rectangle extends Shape {
  constructor(x, y, width, height, color) {
    super(x, y);
    this.width = width;
    this.height = height;
    this.color = color;
  }

  
  draw(ctx) {
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
}


/*
  Circle
 */ 

@describe('x', 'y', 'r', 'color')
export class Circle extends Shape {
  constructor(x, y, r, color) {
    super(x, y);
    this.r = r;
    this.color = color;
  }
  

  draw(ctx) {
    ctx.save();

    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);

    // Ball
    ctx.beginPath();
    ctx.arc(0, 0, this.r, 0, 2*Math.PI);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.stroke();

    ctx.restore();
  }
}