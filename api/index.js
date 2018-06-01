'use strict'

const app = require('./app')
const config = require('./config/config')
const server = require('http').Server(app)
const io = require('socket.io')(server)

const five = require('johnny-five')
const board = new five.Board(config.ArduinoSerialPort)
let countMovement = 0

io.on('connection', socket => {

  // MovementSensor settings //
  board.on("ready", () => {

    let motion = new five.Motion({
      pin: 2
    })

    motion.on("calibrated", () => {
      console.log("Calibrated")
    })

    motion.on("motionstart", () => {
      countMovement++
      io.emit('sensor', countMovement)
      config.SendEmail('Sr. Beto Toro','betocabj@msn.com')
    })

    motion.on("motionend", () => {
      console.log("finish")
    })

  })

  socket.on('light', data => {

    var motion = new five.Motion({
      pin: 2
    });

    if (data.room === "Kitchen")    
      config.ChangeStateLed(data,new five.Led(13))
    
    if (data.room === "Bathroom")
      config.ChangeStateLed(data,new five.Led(11))
    
    if (data.room === "Bedroom 1")
      config.ChangeStateLed(data,new five.Led(10))
    
    if (data.room === "Bedroom 2") 
      config.ChangeStateLed(data,new five.Led(9))
    
    if (data.room === "Living room") 
      config.ChangeStateLed(data,new five.Led(12))
    
    io.emit('light', data)

  })

})

server.listen(config.server.port, () => {
  console.log('Server started')
})