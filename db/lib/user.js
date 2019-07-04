'use strict'

module.exports = function setupUser (userModel, friendModel) {
  async function createOrUpdate (user) {
    const cond = {
      where: {
        nick: user.nick
      }
    }
    const existUser = await userModel.findOne(cond)
    if (existUser) {
      const update = await userModel.update(user, cond)
      return update ? userModel.findOne(cond) : existUser
    }
    const result = await userModel.create(user)
    return result.toJSON()
  }
  function findByUid (uid) {
    return userModel.findOne({ where: { uid } })
  }
  function findByEmail (email) {
    return userModel.findOne({ where: { email } })
  }
  function allFriend (id) {
    return friendModel.findAll({
      attributes: ['uid'],
      include: [
        {
          attributes: ['uid', 'nick', 'email', 'subNick', 'status'],
          model: userModel,
          as: 'User2'
        }
      ],
      where: {
        User1Id: id,
        status: true
      },
      raw: true
    })
  }
  function allFriendPending (id) {
    return friendModel.findAll({
      attributes: ['uid'],
      include: [
        {
          attributes: ['uid', 'nick', 'email', 'subNick', 'status'],
          model: userModel,
          as: 'User2'
        }
      ],
      where: {
        User1Id: id,
        status: false
      },
      raw: true
    })
  }
  return {
    createOrUpdate,
    findByUid,
    findByEmail,
    allFriend,
    allFriendPending
  }
}
