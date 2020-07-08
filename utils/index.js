const crypto = require('crypto')

function genResponse(success, data, msg) {
  return {
    success,
    data,
    msg
  }
}

/**
 * md5签名
 * @param  {String} text 需要签名的字符串
 * @return {String} 签名结果
 */
function md5(text) {
  return crypto.createHash('md5').update(String(text)).digest('hex')
}

/**
 * 获取某一天 0 点
 * @param  {Number} timestamp 时间戳
 * @return {Number} 时间戳
 */
function someDayStart(timestamp) {
  if (typeof timestamp === 'string') {
    timestamp = +timestamp
  }
  return +new Date(new Date(new Date(timestamp).toLocaleDateString()).getTime())
}

/**
 * 获取某一天 23:59:59
 * @param  {Number} timestamp 时间戳
 * @return {Number} 时间戳
 */
function someDayEnd(timestamp) {
  if (typeof timestamp === 'string') {
    timestamp = +timestamp
  }
  return +new Date(new Date(new Date(timestamp).toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 - 1)
}

module.exports = {
  genResponse,
  md5,
  someDayStart,
  someDayEnd
}
