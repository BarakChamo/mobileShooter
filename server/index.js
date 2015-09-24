var express    = require('express'),
    proxy      = require('http-proxy').createProxyServer(),
    publicPath = require('path').resolve(__dirname, '..' , 'public'),
    app        = express(),
    server     = require('http').Server(app),
    io         = require('socket.io')(server)
    isProd     = process.env.NODE_ENV === 'production'


/*
  Static assets and build system
*/ 

// We point to our static assets
app.use(express.static(publicPath))

// We only want to run the workflow when not in production
if (!isProd) {

  // We require the bundler inside the if block because
  // it is only needed in a development environment. Later
  // you will see why this is a good idea
  require('./bundle.js')()

  // Any requests to localhost:3000/build is proxied
  // to webpack-dev-server
  app.all('/dist/*', function (req, res) {
    proxy.web(req, res, {target: 'http://localhost:8080'})
  })
}


/*
  Game socket events
*/ 

// Namespace incoming socket connections
var ctrl = io.of('/controller'),
    cnsl = io.of('/console')

// Controller sockets events
ctrl.on('connection', function(socket){
  /*
    Controller events
  */ 

  // Join room
  socket.on('device:join', function(data, callback){
    cnsl.emit('client:connect', { id: socket.handshake.query.playerId, socketId: socket.id, emoji: data.emoji })

    socket.join(data.room)
    socket.room = data.room
    callback(data)
  })

  // Update position
  socket.on('device:position', function(data){
    cnsl.to(socket.room).emit('client:position', data)
  })

  // Update motion
  socket.on('device:motion', function(data){
    cnsl.to(socket.room).emit('client:motion', data)
  })

  // Trigger fire
  socket.on('device:fire', function(data){
    cnsl.to(socket.room).emit('client:fire', data)
  })

  // Trigger a test event
  socket.on('device:test', function(data){
    cnsl.to(socket.room).emit('client:test', data)
  })

  // Disconnection
  socket.on('disconnect', function(){
    // console.log('someone died')
  })
})

// Console sockets events
cnsl.on('connection', function(socket){
  socket.on('client:join', function(room, callback){
    socket.join(room)
    callback(room)
  })

  socket.on('client:event', function(data) {
    ctrl.to(data.sid).emit(data.event, data.params)
  })
})


/*
  Bootstrap
*/ 

// Catchall - redirect to app base
app.get('*', function(req, res){
  res.sendFile(publicPath + (/Android|iPhone|iPad/.test(req.headers['user-agent']) ? '/mobile.html' : '/desktop.html'))
})

// It is important to catch any errors from the proxy or the
// server will crash. An example of this is connecting to the
// server when webpack is bundling
proxy.on('error', function(e) {
  console.log('Could not connect to proxy, please try again...')
})

// And run the server
server.listen(process.env.PORT || 3000, '0.0.0.0', function () {
  console.log('Server running on port ' + (process.env.PORT || 3000))
})
