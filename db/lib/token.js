'use strict'

module.exports = function setupToken (tokenModel, userModel) {
  async function newToken (token) {
    let newToken = await tokenModel.create(token)
    return newToken.toJSON()
  }
  return {
    newToken
  }
}
