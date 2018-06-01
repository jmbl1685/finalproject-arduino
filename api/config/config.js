'use strict'

const mongoose = require('mongoose')

const sgMail = require('@sendgrid/mail')
sgMail.setApiKey('YourSengridKey')

const server = {
  port: 3000
}

const ArduinoSerialPort = {
  port:'COM4' 
}

const urlMongoDBService = {
  dev: 'mongodb://0.0.0.0:27017/DomoticHouse'
}

const ChangeStateLed = (data, led) => {
  if (data.state)
    led.on()
  else
    led.off()
}

 const SendEmail = (fullname,email) => {

  const date = new Date();

  const msg = {
    to: email,
    from: 'DomoticHome <admin@domotichome.com>',
    subject: 'Notificación - Detección movimiento',
    html: `<strong>Hola ${fullname}:</strong><br> Le informamos que se ha detectado un movimiento en su casa. [${date}]</a>`
  }

  sgMail.send(msg)
    .then(res => console.log(res))
    .catch(err => console.log(err))

}

mongoose.Promise = global.Promise;
mongoose.connect(urlMongoDBService.dev);

module.exports = {
  ArduinoSerialPort,
  mongoose,
  server,
  ChangeStateLed,
  SendEmail
}