require("styles/desktop.scss");

var raf         = require('./utils/raf'), 
    setup       = require('./utils/setup'),
    canvas      = document.querySelector('#canvas'),
    ctx         = canvas.getContext('2d'),

    WORLD       = require('./constants/world'),
    socket      = require('socket.io-client/socket.io.js').connect(window.location.host),
    Shapes      = require('./shapes/Shapes'),

    MotionController = require('./controllers/Orientation'),
    KeyboardController = require('./controllers/Keyboard');

var playerStore = {};
var controllerStore = {};
var bullets = [];

setup.setDimensions(ctx);

socket.on('client:connect', function(data) {
  var id = data.id;
  var player = new Shapes.Ball(WORLD.width / 2, WORLD.height / 2, ctx);
  playerStore[id] =  player;
  controllerStore[id] = new MotionController(player);
});

socket.on('client:position', function (data) {
  if (!data.event) return;
  if (!controllerStore[data.id]) return;
  controllerStore[data.id].handleOrientationBeta(data.event);
});

socket.on('client:motion', function (data) {
  //do nothing
});

socket.on('client:fire', function (data) {
  console.log('FAYA!');
  var player = playerStore[data.id];
  player.color = ['red', 'green', 'blue', 'yellow'][Math.round(Math.random() * 3)];
  var bullet = new Shapes.Bullet(player.x, player.y, player.xVelocity, player.yVelocity, player.rotation, bullets, ctx)
  player.xVelocity -= bullet.xVelocity / 2;
  player.yVelocity -= bullet.yVelocity / 2;
  bullets.push(bullet);
});

/*
  tell objects in the game to update their positions
 */
function update(dt) {
  for (var id in playerStore){
    playerStore[id].update(dt);
  }
  for (var i in bullets){
    bullets[i].update(dt);
  }
}

/*
  tell objects in the game to draw themselves
 */
function render() {
  for (var id in playerStore){
    playerStore[id].draw();
  }
  for (var i in bullets){
    bullets[i].draw();
  }
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

  update(elapsed);
  render();
});
