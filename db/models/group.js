'use strict'

const Sequelize = require('sequelize')
const setupDatabase = require('../lib/db')

module.exports = function setupGroupModel (config) {
  const sequelize = setupDatabase(config)

  return sequelize.define('Group', {
    uid: {
      type: Sequelize.STRING
    },
    name: {
      type: Sequelize.STRING
    }
  })
}
