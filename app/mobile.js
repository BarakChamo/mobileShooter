import 'styles/mobile.scss'

// Dependencies
import SocketIO from 'socket.io-client'

// is on an inconsistent apple device?!?
const ios = navigator.userAgent.match(/iPhone|iPad/)

let id     = (window.localStorage.getItem('playerId') || Math.random().toString(36).substring(2,7)),
    socket = SocketIO.connect(window.location.host + '/controller',{query: 'playerId='+id})

let pole = false,
    calibrated = false,
    first = false;

// Set player id for reconnection
window.localStorage.setItem('playerId', id)


/*
  Initialize socket connection
*/ 

socket.on('connect', function(){
  pole = false
  calibrated = false
  first = false


  /*
    Device event handlers
  */ 

  // Join console room
  socket.emit('device:join', (location.pathname.replace('/','') || prompt('What room?!?')).toLowerCase(), function(data){
    window.addEventListener('deviceorientation', updateOrientation)
    document.addEventListener('touchstart', faya)
  })

});


/*
  Throttled movement handler
*/ 

let updateOrientation = _.throttle(function(event) {
  if (!first) return first = true
  pole = calibrated ? pole : event.alpha
  calibrated = calibrated || true

  socket.emit('device:position', {
    // room: ROOM_TEMP
    id: id,
    event: {
      alpha: (ios ? event.alpha : event.alpha - pole) % 360,
      beta:  event.beta,
      gamma: event.gamma
    },
    a: event.absolute
  })
}, 0)

/*
  Fire handler
*/ 

function faya() {
  socket.emit('device:fire', {
    // room: ROOM_TEMP
    id: id,
    strength: 1
  })
}


/*
  Video handler
*/ 