'use strict'

const Sequelize = require('sequelize')
const setupDatabase = require('../lib/db')

module.exports = function setupUserToGroupModel (config) {
  const sequelize = setupDatabase(config)

  return sequelize.define('userToGroup', {
    active: {
      type: Sequelize.BOOLEAN,
      defaultValue: true
    }
  })
}
