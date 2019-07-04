'use strict'

const debug = require('debug')('API:router:Friend')
const friend = require('express').Router()
const uuidv1 = require('uuid/v1')

const { asyncMiddleware } = require('../tools/asyncMiddleware')
const { createError } = require('../tools/createError')

friend.post('/new/:uid', asyncMiddleware(async (req, res) => {
  debug('post new friend')
  let user2 = await req.app.db.User.findByEmail(req.body.email)
  if (user2) {
    let friend = await req.app.db.Friend.createOrUpdate({
      uid: uuidv1().replace(/-/gi, ''),
      user: req.params.uid,
      user2: user2.uid,
      status: false
    })
    res.json(friend)
  } else {
    throw createError('NOT_USER')
  }
}))

module.exports = friend
