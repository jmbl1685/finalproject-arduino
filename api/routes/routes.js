'use strict'

const express = require('express')
const api = express.Router()
const lightController = require('../controllers/lightController')

api.put('/light', lightController.UpdateStateLigth)
api.get('/light', lightController.GetLight)
api.post('/light', lightController.AddRoom)

module.exports = api