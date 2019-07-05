'use strict'

const Sequelize = require('sequelize')
const setupDatabase = require('../lib/db')

module.exports = function setupTokenModel (config) {
  const sequelize = setupDatabase(config)

  return sequelize.define('token', {
    token: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    }
  })
}
