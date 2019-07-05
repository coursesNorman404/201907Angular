'use strict'

const Sequelize = require('sequelize')
const setupDatabase = require('../lib/db')

module.exports = function setupFriendModel (config) {
  const sequelize = setupDatabase(config)

  return sequelize.define('friend', {
    uid: {
      type: Sequelize.STRING
    },
    status: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    }
  })
}
