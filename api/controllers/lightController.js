'use strict'

const lightModel = require('../models/light')

async function AddRoom(req, res) {
  try {
    const light = await lightModel.insertMany({
      room: req.body.room
    })
    res.status(200).send(light)
  } catch (error) {
    res.status(404).send(error)
  }
}

async function UpdateStateLigth(req, res) {
  try {
    const id = req.body._id
    const state = req.body.state
    let image = null;

    if (state)
      image = '/assets/img/light-on.svg'
    else
      image = '/assets/img/light-off.svg'

    const light = await lightModel.findByIdAndUpdate({ _id: id }, { state, image }, { new: true })
    res.status(200).send(light)

  } catch (error) {
    res.status(404).send(error)
  }
}

async function GetLight(req, res) {
  try {
    const lights = await lightModel.find()
    res.status(200).send(lights)
  } catch (error) {
    res.status(404).send(error)
  }
}

module.exports = {
  UpdateStateLigth,
  GetLight,
  AddRoom
}