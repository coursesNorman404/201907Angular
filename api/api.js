'use strict'

const api = require('express').Router()

const user = require('./router/user')
const friend = require('./router/friend')

api.use('/users', user)
api.use('/friend', friend)

module.exports = api
