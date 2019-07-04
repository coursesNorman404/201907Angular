'use strict'

const createError = (ERROR, message) => {
  let error
  switch (ERROR) {
    case 'NOT_USER':
      error = new Error('Not User')
      error.status = 404
      break
    default:
      error = new Error('Error Generico')
      error.status = 500
      break
  }
  error.code = ERROR
  return error
}

module.exports = {
  createError
}
