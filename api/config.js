'use strict'

const debug = require('debug')('API:config')

module.exports = {
  db: {
    logging: s => debug(s),
    setup: true
  }
}
