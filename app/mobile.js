require("styles/mobile.scss");

var id     = window.localStorage.getItem('playerId') || Math.random().toString(36).substring(2,7),
    socket = require('socket.io-client/socket.io.js').connect(window.location.host,{query: 'playerId='+id});

window.localStorage.setItem('playerId', id);

socket.on('connect', function(){
  // document.write('connected');
  // var pole = false,
  //     calibrated = false,
  //     first = false;

  // Throttle updates
  var update = _.throttle(function(event) {
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

  var faya = function(){
    socket.emit('device:fire', {
      strength: 1
    });
  }

  window.addEventListener('deviceorientation', update);

  document.addEventListener('touchstart', faya);
});
