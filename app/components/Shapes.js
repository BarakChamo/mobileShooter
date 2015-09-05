import WORLD from '../constants/world'
import Base from './Base'

/*
  Movable
 */ 

class Movable extends Base {
  constructor(x, y) {
    super()

    this.x = x;
    this.y = y;
    this.rotation = 0;
    this.xVelocity = 0;
    this.yVelocity = 0;
    this.moveLeft = false;
    this.moveUp = false;
    this.moveRight = false;
    this.moveDown = false;
  }

  move(dx, dy) {
    this.x += dx;
    this.y += dy;
  }

  inBoundries() {
    return !(this.x > WORLD.width - this.height || this.x < 0 + this.height) || (this.y <= 0 + this.height || this.y > WORLD.height - this.height)
  }
}

// class Polygon {
//   constructor(points, color) {
//     ctx.fillStyle = color;

//     ctx.beginPath();
//     ctx.moveTo(points[0][0], points[0][1]);

//     for (var i = 0; i < points.length; i++) {
//       ctx.lineTo( points[i][0] , points[i][1] )
//     }

//     ctx.closePath();
//     ctx.fill();
//   }
// }

// class Triangle extends Polygon {
//   constructor(x, y, color) {
//     super([[x, y],[x + 50, y],[x + 25, y - 50]], color);
//   }
// }


/*
  Rectangle
 */ 

export class Rectangle extends Movable {
  constructor(x, y, width, height, color, ctx) {
    super(x, y);
    this.width = width;
    this.height = height;
    this.color = color;
    this.ctx = ctx;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.rect(this.x, this.y, this.width, this.height);
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
    this.ctx.closePath();
  }
}


/*
  Circle
 */ 

export class Circle extends Movable {
  constructor(x, y, r, color, ctx) {
    super(x, y);
    this.r = r;
    this.ctx = ctx;
    this.color = color;
  }

  draw() {
    this.ctx.save();

    this.ctx.translate(this.x, this.y);
    this.ctx.rotate(this.rotation);

    // Ball
    this.ctx.beginPath();
    this.ctx.arc(0, 0, this.r, 0, 2*Math.PI);
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
    this.ctx.stroke();

    // Cross
    this.ctx.beginPath();
    this.ctx.rect(0 - this.r, 0, this.r * 2, 1);
    this.ctx.fillStyle = 'black';
    this.ctx.fill();
    this.ctx.closePath();

    this.ctx.beginPath();
    this.ctx.rect(0, 0 - this.r * 2, 1, this.r * 3);
    this.ctx.fillStyle = 'black';
    this.ctx.fill();
    this.ctx.closePath();

    this.ctx.restore();
  }
}