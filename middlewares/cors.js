module.exports = async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*')
  ctx.set('Access-Control-Allow-Methods', 'OPTIONS,GET,PUT,POST,DELETE,PATCH')
  ctx.set('Access-Control-Allow-Headers', 'Content-Type,x-requested-with,Authorization')
  if (ctx.method === 'OPTIONS' || ctx.url === '/favicon.ico') {
    ctx.status = 200
  } else {
    await next()
  }
}
