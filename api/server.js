'use strict'

const debug = require('debug')('API:server')
const http = require('http')
const express = require('express')
const compression = require('compression')
const bodyParser = require('body-parser')
const socketIO = require('socket.io')
const db = require('db')

const config = require('./config')
const api = require('./api')

const port = 8989
const app = express()
const server = http.createServer(app)
const jsonBodyParser = bodyParser.json({ limit: '50mb' })
const urlencodedBodyParser = bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 })
const io = socketIO(server)

db(config.db).then(d => {
  app.db = d
}).catch(e => { debug(e) })

app.io = io
app.use(compression())
app.use(jsonBodyParser)
app.use(urlencodedBodyParser)

app.use('/api', async (req, res, next) => {
  res.header('Access-Control-Allow-Credentials', 'true')
  res.header('Strict-Transport-Security', 'max-age=0; includeSubDomains')

  res.header(
    'Access-Control-Allow-Headers',
    'Content-type,Accept,X-Custom-Header'
  )
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }
  next()
})

app.use('/api', api)

app.use((error, req, res, next) => {
  debug(error)
  if (error.status) {
    res.status(error.status).json({ message: error.message })
  } else {
    res.status(500).json({ message: error.message })
  }
})

app.get('/', (req, res) => {
  res.json({ hola: 'mundo' })
})

io.on('connection', socket => {
  debug('Se conectan')
  socket.on('message', message => {
    io.emit('message', message)
  })
})

if (!module.parent) {
  server.listen(port, () => {
    debug('Puerto:', port)
  })
}

module.exports = server
