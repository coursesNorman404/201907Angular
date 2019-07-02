'use strict'

const Sequelize = require('sequelize')
const setupDatabase = require('../lib/db')

module.exports = function setupUserModel (config) {
  const sequelize = setupDatabase(config)
  return sequelize.define('User', {
    uid: {
      type: Sequelize.STRING
    },
    nick: {
      type: Sequelize.STRING
    },
    subNick: {
      type: Sequelize.STRING
    },
    age: {
      type: Sequelize.NUMBER
    },
    email: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    status: {
      type: Sequelize.STRING
    }
  })
}
