class Movable {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.moveLeft = false;
      this.moveUp = false;
      this.moveRight = false;
      this.moveDown = false;
  }

  move(dx, dy) {
    this.x += dx;
    this.y += dy;
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

// class Rectangle extends Movable {
//   constructor(x, y, width, height, color) {
//     super(x, y);
//     this.width = width;
//     this.height = height;
//     this.color = color;
//   }

//   draw() {
//     ctx.beginPath();
//       ctx.rect(this.x, this.y, this.width, this.height);
//       ctx.fillStyle = this.color;
//       ctx.fill();
//       ctx.closePath();
//   }
// }

// class Platform extends Rectangle {
//   constructor(x, y, width, height, color) {
//     super(x, y, width, height, color);
//   }
// }

class Circle extends Movable {
  constructor(x, y, r, color, ctx) {
    super(x, y);
    this.r = r;
    this.rotation = 0;
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


class Ball extends Circle {
  constructor(x, y, ctx) {
    super(x, y, 10, 'red', ctx);
      this.xVelocity = 1;
      this.yVelocity = -4;
  }

  intersects(b) {
    console.log(this.x < b.x + b.width, this.x + this.width > b.x, this.y < b.y + b.height, this.y + this.height > b.y);
      return  this.x < b.x + b.width && 
              this.x + this.width > b.x &&
              this.y < b.y + b.height &&
              this.y + this.height > b.y;
  }
}

// module.exports.Polygon = Polygon;
// module.exports.Triangle = Triangle;
// module.exports.Rectangle = Rectangle;
// module.exports.Circle = Circle;
// module.exports.Ball = Ball;
// module.exports.Platform = Platform;


module.exports = Ball;