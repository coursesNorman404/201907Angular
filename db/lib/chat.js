'use strict'

module.exports = function setupToken (chatModel, userModel, friendModel) {
  async function create (chat) {
    let newChat
    let user = await userModel.findOne({ where: { uid: chat.uid } })
    let friend = await friendModel.findOne({ where: { uid: chat.friendId } })
    if (chat.friendId) {
      newChat = await chatModel.create({
        message: chat.message,
        UserId: user.id,
        friendId: friend.id
      })
    } else {
      newChat = await chatModel.create({
        message: chat.message,
        UserId: user.id,
        GroupId: chat.groupId
      })
    }
    return newChat.toJSON()
  }
  async function findByFriend (id) {
    let chat = await chatModel.findAll({
      where: { friendId: id },
      raw: true,
      include: [
        {
          attributes: ['nick'],
          model: userModel
        }
      ]
    })
    for (let x in chat) {
      chat[x].nick = chat[x]['User.nick']
    }
    return chat
  }
  return {
    create,
    findByFriend
  }
}
