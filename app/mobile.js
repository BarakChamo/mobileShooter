import 'styles/mobile.scss'

// Dependencies
import SocketIO from 'socket.io-client'

// is on an inconsistent apple device?!?
const ios = navigator.userAgent.match(/iPhone|iPad/)

let id     = (window.localStorage.getItem('playerId') || Math.random().toString(36).substring(2,7)),
    socket = SocketIO.connect(window.location.host,{query: 'playerId='+id})

let pole = false,
    calibrated = false,
    first = false;

// Set player id for reconnection
window.localStorage.setItem('playerId', id)


// Handle Events
socket.on('connect', function(){
  pole = false
  calibrated = false
  first = false

  window.addEventListener('deviceorientation', updateOrientation);

  window.addEventListener('orientationchange', function(data){
    window.document.body.style.backgroundColor = 'blue'
    socket.emit('device:orientation', data)
  })

  // window.addEventListener('devicemotion', updateMotion);

  document.addEventListener('touchstart', faya);

});

// Throttle updates
let updateOrientation = _.throttle(function(event) {
  if (!first) return first = true;
  pole = calibrated ? pole : event.alpha;
  calibrated = calibrated || true;

  socket.emit('device:position', {
    id: id,
    event: {
      alpha: (ios ? event.alpha : event.alpha - pole) % 360,
      // alpha: event.alpha,
      beta:  event.beta,
      gamma: event.gamma
    },
    a: event.absolute
  });
}, 0);

// var updateMotion = _.throttle(function(event) {
//   if (!first) return first = true;
//   pole = calibrated ? pole : event.alpha;
//   calibrated = calibrated || true;

//   socket.emit('device:motion', {
//     id: id,
//     event: {
//       alpha: (pole + event.alpha) % 360,
//       alpha: event.acceleration.x,
//       beta:  event.acceleration.y,
//       gamma: event.acceleration.z
//     }
//   });
// }, 0);

let faya = function(){
socket.emit('device:fire', {
  id: id,
  strength: 1
});
}