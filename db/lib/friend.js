'use strict'

module.exports = function setupFriend (friendModel, userModel) {
  async function createOrUpdate (friend) {
    let user1 = await userModel.findOne({ where: { uid: friend.user } })
    let user2 = await userModel.findOne({ where: { uid: friend.user2 } })
    if (user1 && user2) {
      let existFriend = await friendModel.findOne({ where: { User1Id: user1.id, User2Id: user2.id } })
      if (existFriend) {
        if (friend.uid) {
          delete friend.uid
        }
        const update = await friendModel.update(friend, { where: { uid: existFriend.uid } })
        return update ? friendModel.findOne({ where: { uid: existFriend.uid } }) : existFriend
      }
      Object.assign(friend, {
        User1Id: user1.id,
        User2Id: user2.id
      })
      const result = await friendModel.create(friend)
      return result.toJSON()
    }
  }
  return {
    createOrUpdate
  }
}
