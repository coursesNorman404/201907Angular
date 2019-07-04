'use strict'

const debug = require('debug')('API:router:User')
const user = require('express').Router()
const uuidv1 = require('uuid/v1')
const bcrypt = require('bcrypt')

const BCRYPT_SALT_ROUNDS = 12

const { asyncMiddleware } = require('../tools/asyncMiddleware')
const { createError } = require('../tools/createError')

user.get('/:uid', asyncMiddleware(async (req, res) => {
  let user = await req.app.db.User.findByUid(req.params.uid)
  res.json(user)
}))
user.post('/', asyncMiddleware(async (req, res) => {
  debug('Post User')
  let user = {
    nick: req.body.nick,
    email: req.body.email,
    uid: uuidv1().replace(/-/gi, ''),
    password: await bcrypt.hash(req.body.password, BCRYPT_SALT_ROUNDS)
  }
  user = await req.app.db.User.createOrUpdate(user)
  res.json(user)
}))
user.post('/login', asyncMiddleware(async (req, res) => {
  debug('User Login')
  let user = await req.app.db.User.findByEmail(req.body.email)
  if (user) {
    let isUser = await bcrypt.compare(req.body.password, user.password)
    if (isUser) {
      let today = Date.now()
      let session = await req.app.db.Token.newToken({
        token: await bcrypt.hash(today.toString(), BCRYPT_SALT_ROUNDS),
        UserId: user.id
      })
      session.UserId = user.uid
      res.json(session)
    } else {
      throw createError('NOT_USER')
    }
  } else {
    throw createError('NOT_USER')
  }
}))

module.exports = user
