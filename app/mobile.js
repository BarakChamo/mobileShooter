require("styles/mobile.scss");

var id     = window.localStorage.getItem('playerId') || Math.random().toString(36).substring(2,7),
    socket = require('socket.io-client/socket.io.js').connect(window.location.host,{query: 'playerId='+id});

window.localStorage.setItem('playerId', id);

socket.on('connect', function(){
  // document.write('connected');
  // var pole = false,
  //     calibrated = false,
  //     first = false;

  window.addEventListener('deviceorientation', updateOrientation);
  
  window.addEventListener('devicemotion', updateMotion);

  document.addEventListener('touchstart', faya);

});

// Throttle updates
var updateOrientation = _.throttle(function(event) {
  // if (!first) return first = true;
  // pole = calibrated ? pole : event.alpha;
  // calibrated = calibrated || true;

  socket.emit('device:position', {
    id: id,
    event: {
      // alpha: (pole + event.alpha) % 360,
      alpha: event.alpha,
      beta:  event.beta,
      gamma: event.gamma
    }
  });
}, 0);

var updateMotion = _.throttle(function(event) {
  // if (!first) return first = true;
  // pole = calibrated ? pole : event.alpha;
  // calibrated = calibrated || true;

  socket.emit('device:motion', {
    id: id,
    event: {
      // alpha: (pole + event.alpha) % 360,
      alpha: event.acceleration.x,
      beta:  event.acceleration.y,
      gamma: event.acceleration.z
    }
  });
}, 0);

var faya = function(){
socket.emit('device:fire', {
  id: id,
  strength: 1
});
}