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
  function findByEmail (email) {
    return userModel.findOne({ where: { email } })
  }
  function findByUid (uid) {
    return userModel.findOne({ where: { uid } })
  }
  function findById (id) {
    return userModel.findOne({ where: { id } })
  }
  async function allFrien (id) {
    console.log('Todos', id)
    let user = []
    let user1 = await friendModel.findAll({
      attributes: ['uid'],
      raw: true,
      include: [
        {
          attributes: ['uid', 'nick', 'subNick', 'email', 'status'],
          model: userModel,
          foreignKey: 'User1Id',
          as: 'User1'
        }
      ],
      where: { User2Id: id, status: true }
    })
    for (let x in user1) {
      user.push({
        uid: user1[x].uid,
        uuid: user1[x]['User1.uid'],
        nick: user1[x]['User1.nick'],
        subNick: user1[x]['User1.subNick'] || null,
        email: user1[x]['User1.email'],
        status: user1[x]['User1.status']
      })
    }
    let user2 = await friendModel.findAll({
      attributes: ['uid'],
      raw: true,
      include: [
        {
          attributes: ['uid', 'nick', 'subNick', 'email', 'status'],
          model: userModel,
          foreignKey: 'User2Id',
          as: 'User2'
        }
      ],
      where: { User1Id: id, status: true }
    })
    for (let x in user2) {
      user.push({
        uid: user2[x].uid,
        uuid: user2[x]['User2.uid'],
        nick: user2[x]['User2.nick'],
        subNick: user2[x]['User2.subNick'] || null,
        email: user2[x]['User2.email'],
        status: user2[x]['User2.status']
      })
    }
    return user
  }
  function allFrienPending (id) {
    console.log('Pending', id)
    return friendModel.findAll({
      attributes: ['uid'],
      raw: true,
      include: [
        {
          attributes: ['uid', 'nick', 'subNick', 'email'],
          model: userModel,
          foreignKey: 'User1Id',
          as: 'User1'
        }
      ],
      where: { User2Id: id, status: false }
    })
  }
  return {
    createOrUpdate,
    findByEmail,
    findByUid,
    findById,
    allFrien,
    allFrienPending
  }
}
