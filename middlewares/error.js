const { ERROR } = require('@/utils/error')
const getStatusByType = type => {
  switch(type) {
    case ERROR.FORMAT_INVALID:
    case ERROR.DATA_EXISTED:
    case ERROR.DATA_INVALID:
      return 400
    case ERROR.AUTHORIZATION_FAILURE:
      return 401
    case ERROR.PERMISSION_DENIED:
      return 403
    case ERROR.NOT_FOUND:
      return 404
    default:
      return 500
  }
}

module.exports = async function errorHandler(ctx, next) {
  try {
    await next()
  } catch (err) {
    console.log('err.stack', err.stack)
    console.log(err.type, getStatusByType(err.type))
    ctx.status = getStatusByType(err.type)
    ctx.body = err
  }
}
