const jwt = require('jsonwebtoken')
const jwtKoa = require('koa-jwt')
const { privateKey } = require('@/config')
const { createAuthorizationError } = require('@/utils/error')

// 自定义处理 401 错误 ， koa-jwt 会默认处理 401 请求
const handleAuthorizationError = async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    if (err.status === 401) {
      throw createAuthorizationError('您的登陆状态有误，请重新登录')
    } else {
      throw err
    }
  }
}

// 验证 token
const verifyToken = jwtKoa({
  secret: privateKey,
  getToken: ctx => {
    // 自定义返回，默认的 token 为 'Bearer <token>'
    const token = ctx.query.Authorization || ctx.headers.authorization
    return token
  }
}).unless({
  // 数组中的路径不需要通过jwt验证
  path: [
    /^\/user(\/login|\/logout)?/,
    /\/upload.?/
  ]
})

// 拿到 token 中的数据，挂载到 ctx 上，给后面路由使用
const decodedAuthorization = async (ctx, next) => {
  const token = ctx.query.Authorization || ctx.headers.authorization
  const decoded = jwt.decode(token)
  ctx.state.user = decoded
  await next()
}

module.exports = {
  handleAuthorizationError,
  verifyToken,
  decodedAuthorization
}
