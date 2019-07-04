'use strict'

const debug = require('debug')('DB:index')
const defaults = require('defaults')

const setupDatabase = require('./lib/db')

const setupUserModel = require('./models/user')
const setupTokenModel = require('./models/token')
const setupGroupModel = require('./models/group')
const setupChatModel = require('./models/chat')
const setupFriendModel = require('./models/friend')
const setupUserToGroupModel = require('./models/userToGroup')

const setupUser = require('./lib/user')
const setupToken = require('./lib/token')
const setupFriend = require('./lib/friend')

module.exports = async function (config) {
  config = defaults(config, {
    dialect: 'sqlite',
    setup: false,
    dev: false,
    storage: 'curso.db',
    query: {
      raw: true
    }
  })
  const sequelize = setupDatabase(config)
  const userModel = setupUserModel(config)
  const chatModel = setupChatModel(config)
  const friendModel = setupFriendModel(config)
  const groupModel = setupGroupModel(config)
  const tokenModel = setupTokenModel(config)
  const userToGroupModel = setupUserToGroupModel(config)

  userModel.hasMany(tokenModel)
  tokenModel.belongsTo(userModel)

  userModel.hasMany(friendModel, { as: 'User1' })
  friendModel.belongsTo(userModel, { as: 'User1' })

  userModel.hasMany(friendModel, { as: 'User2' })
  friendModel.belongsTo(userModel, { as: 'User2' })

  userModel.belongsToMany(groupModel, { through: userToGroupModel })
  groupModel.belongsToMany(userModel, { through: userToGroupModel })

  groupModel.hasMany(chatModel)
  chatModel.belongsTo(groupModel)

  friendModel.hasMany(chatModel)
  chatModel.belongsTo(friendModel)

  if (config.setup) {
    await sequelize.sync({ force: true })
  }
  if (config.dev) {
    await sequelize.sync({ alter: true })
  }
  await sequelize.authenticate()

  const User = setupUser(userModel, friendModel)
  const Friend = setupFriend(friendModel, userModel)
  const Chat = null
  const Group = null
  const Token = setupToken(tokenModel, userModel)

  return {
    User,
    Group,
    Friend,
    Chat,
    Token
  }
}
