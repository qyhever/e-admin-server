const jwt = require('jsonwebtoken')
const { privateKey } = require('@/config')

// 生成 token
exports.generateToken = payload => {
  return jwt.sign(payload, privateKey, {
    expiresIn: '3d'
    // noTimestamp: true
  })
}

// 验证 token
exports.verifyToken = (token) => {
  // 异步写法
  // jwt.verify(token, privateKey, { algorithm: 'RS256' }, (err, decoded) => {
  //   fn(err, decoded)
  // })
  // 同步写法
  return jwt.verify(token, privateKey, { algorithm: 'RS256' })
}