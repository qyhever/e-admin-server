const requireDirectory = require('require-directory')
const Router = require('koa-router')
const koaBody = require('koa-body')
const koaLogger = require('koa-logger')
const logger = require('./middlewares/logger')
const errorHandler = require('./middlewares/error')
const cors = require('./middlewares/cors')
const { handleAuthorizationError, verifyToken, decodedAuthorization } = require('./middlewares/authorization')
const { createNotFoundError } = require('./utils/error')

class InitManager {
  static initCore(app) {
    InitManager.app = app
    InitManager.loadConfig()
    InitManager.loadHttpException()
    require('./database/mysql')
    InitManager.mountMiddlewares()
    InitManager.initLoadRouters()
  }
  static mountMiddlewares() {
    const app = InitManager.app
    // error handler
    app.use(errorHandler)
    app.use(koaBody({
      jsonLimit: '10mb',
      formLimit: '15mb',
      multipart: true
    }))
    app.use(koaLogger())
    app.use(require('koa-static')(`${__dirname}/public`))
    // logger
    app.use(logger)
    // cors
    app.use(cors)
    // handle 401
    app.use(handleAuthorizationError)
    // verify token
    app.use(verifyToken)
    // decoded authorization
    app.use(decodedAuthorization)
  }
  static initLoadRouters() {
    const app = InitManager.app
    const modules = requireDirectory(module, `${__dirname}/routes`)
    for (const k in modules) {
      const route = modules[k]
      if (route instanceof Router) {
        app.use(route.routes(), route.allowedMethods())
      }
    }
    // 404 not found
    app.use(() => {
      throw createNotFoundError()
    })
    // error-handling
    app.on('error', (err, ctx) => {
      console.error('server error', err, ctx)
      ctx.body = {
        success: false,
        msg: err.message
      }
    })
  }
  static loadConfig() {
    const config = require(`${__dirname}/config`)
    global.config = config
  }
  static loadHttpException() {
    const err = require('./utils/error')
    global.err = err
  }
}

module.exports = InitManager
