const { genQiniuToken } = require('@/utils/upload')
const { genResponse } = require('@/utils')

class UploadController {
  /**
   * @api {get} /upload/qiniu_token 七牛云 token
   * @apiName qiniuToken
   * @apiGroup Upload
   *
   *
   * @apiSuccess {String} url 链接
   *
   * @apiUse Error
   * @apiUse Success
   */
  async generateQiniuToken(ctx) {
    const token = genQiniuToken()
    ctx.body = genResponse(true, { token })
  }
}

module.exports = UploadController
