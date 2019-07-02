'use strict'

const Sequelize = require('sequelize')
const setupDatabase = require('../lib/db')

module.exports = function setupChatModel (config) {
  const sequelize = setupDatabase(config)

  return sequelize.define('Chat', {
    uid: {
      type: Sequelize.STRING
    },
    message: {
      type: Sequelize.STRING
    }
  })
}
