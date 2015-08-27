require("styles/desktop.scss");

// Constants
var WORLD       = require('./constants/world'),
    socket      = require('socket.io-client/socket.io.js').connect(window.location.host),
    raf         = require('./utils/raf'),
    canvas      = document.querySelector('#canvas'),
    ctx         = canvas.getContext('2d'),
    Ball        = require('./shapes/ball'),
    ball        = new Ball(WORLD.width / 2, WORLD.height / 2, ctx),
    orientation = new (require('./controllers/orientation'))(ball);

socket.on('client:position', function (data) {
  if (!data.event) return;
  orientation.handleOrientation(data.event);
});

socket.on('client:fire', function (data) {
  console.log('FAYA!');
  ball.color = ['red', 'green', 'blue', 'yellow'][Math.round(Math.random() * 3)];
});

function setDimensions() {
  var rw, rh, r;
  rw = window.innerWidth / WORLD.width;
  rh = window.innerHeight / WORLD.height;
  r = Math.min(rw, rh);

  canvas.height = WORLD.height * r;
  canvas.width = WORLD.width * r;

  canvas.style.marginTop = rw <= rh ? String((window.innerHeight - canvas.height) / 2) + 'px' : 0;

  ctx.scale(r, r);
};

// Resize canvas
setDimensions();

// Renderer
function render() {
  ball.draw();
};

raf.start(function(elapsed) {
  // Clear canvas
  ctx.clearRect(0, 0, WORLD.width, WORLD.height);

  ctx.beginPath();
  ctx.rect(WORLD.width/2, 0, 1, WORLD.height);
  ctx.fillStyle = 'black';
  ctx.fill();
  ctx.closePath();

  ctx.beginPath();
  ctx.rect(0, WORLD.height/2, WORLD.width, 1);
  ctx.fillStyle = 'black';
  ctx.fill();
  ctx.closePath();

  render();
});