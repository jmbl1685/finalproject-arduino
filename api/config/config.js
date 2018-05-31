'use strict'

const mongoose = require('mongoose');

const server = {
  port: 3000
}

const ArduinoSerialPort = {
  port:'COM3' 
}

const urlMongoDBService = {
  dev: 'mongodb://localhost:27017/DomoticHouse'
}

const ChangeStateLed = (data, led) => {
  if (data.state)
    led.on()
  else
    led.off()
}

mongoose.Promise = global.Promise;
mongoose.connect(urlMongoDBService.dev);

module.exports = {
  ArduinoSerialPort,
  mongoose,
  server,
  ChangeStateLed
}