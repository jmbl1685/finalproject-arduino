'use strict'

const config = require('../config/config')
const mongoose= config.mongoose
const Schema = mongoose.Schema

const light = new Schema({
  room: String,
  state: { type: Boolean, default: false},
  image: { type: String, default: 'https://image.flaticon.com/icons/svg/385/385417.svg'}
}, { versionKey: false })

module.exports = mongoose.model('Light', light)