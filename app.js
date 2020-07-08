const Koa = require('koa')
const app = new Koa()

require('module-alias/register')
const InitManager = require('./init')
InitManager.initCore(app)

module.exports = app
