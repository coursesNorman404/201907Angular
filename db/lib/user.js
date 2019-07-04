'use strict'

module.exports = function setupUser (userModel) {
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
  return {
    createOrUpdate,
    findByUid,
    findByEmail
  }
}
