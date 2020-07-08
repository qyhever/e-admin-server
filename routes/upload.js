const router = require('koa-router')()
const UploadController = require('@/controllers/upload.controller')
router.prefix('/upload')
const ins = new UploadController()

router.get('/qiniu_token', ins.generateQiniuToken)

module.exports = router
