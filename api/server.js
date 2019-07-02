'use strict'

const debug = require('debug')('API:server')
const http = require('http')
const express = require('express')
const compression = require('compression')
const bodyParser = require('body-parser')
const db = require('db')

const config = require('./config')

const port = 8989
const app = express()
const server = http.createServer(app)
const jsonBodyParser = bodyParser.json({ limit: '50mb' })
const urlencodedBodyParser = bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 })

db(config.db).then(d => {
  app.db = d
}).catch(e => { debug(e) })

app.use(compression())
app.use(jsonBodyParser)
app.use(urlencodedBodyParser)

app.get('/', (req, res) => {
  res.json({ hola: 'mundo' })
})

if (!module.parent) {
  server.listen(port, () => {
    debug('Puerto:', port)
  })
}

module.exports = server
