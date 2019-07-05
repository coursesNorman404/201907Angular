'use strict'

const debug = require('debug')('API:router:User')
const user = require('express').Router()
const uuidv1 = require('uuid/v1')
const bcrypt = require('bcrypt')

const BCRYPT_SALT_ROUNDS = 12

const { asyncMiddleware } = require('../tools/asyncMiddleware')
const { createError } = require('../tools/createError')

user.get('/:uid', asyncMiddleware(async (req, res) => {
  debug('Get user uid')
  let user = await req.app.db.User.findByUid(req.params.uid)
  delete user.password
  delete user.id
  res.json(user)
}))

user.post('/', asyncMiddleware(async (req, res) => {
  debug('Post User')
  let user = await req.app.db.User.createOrUpdate({
    uid: uuidv1().replace(/-/gi, ''),
    nick: req.body.nick,
    email: req.body.email,
    password: await bcrypt.hash(req.body.password, BCRYPT_SALT_ROUNDS)
  })
  res.json(user)
}))
user.patch('/:uid', asyncMiddleware(async (req, res) => {
  debug('Patch User')
  let user = await req.app.db.User.findByUid(req.params.uid)
  req.body.nick = user.nick
  user = await req.app.db.User.createOrUpdate(req.body)
  delete user.id
  delete user.password
  res.json(user)
}))

user.post('/login', asyncMiddleware(async (req, res) => {
  debug('Login')
  let user = await req.app.db.User.findByEmail(req.body.email)
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
}))
user.get('/:uid/friend', asyncMiddleware(async (req, res) => {
  debug('List Friend')
  let user = await req.app.db.User.findByUid(req.params.uid)
  let friend = await req.app.db.User.allFrien(user.id)
  res.json(friend)
}))
user.get('/:uid/friend/pending', asyncMiddleware(async (req, res) => {
  debug('List Friend Pending')
  let user = await req.app.db.User.findByUid(req.params.uid)
  let friend = await req.app.db.User.allFrienPending(user.id)
  res.json(friend)
}))

module.exports = user
