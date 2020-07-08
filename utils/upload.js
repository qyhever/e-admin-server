const qiniu = require('qiniu')
const qiniuConfig = global.config.qiniu


// 生成七牛云上传 token
function genQiniuToken() {
  const mac = new qiniu.auth.digest.Mac(qiniuConfig.accessKey, qiniuConfig.secretKey)
  const options = {
    scope: qiniuConfig.scope
  }
  const putPolicy = new qiniu.rs.PutPolicy(options)
  const token = putPolicy.uploadToken(mac)
  return token
}

module.exports = {
  genQiniuToken
}
