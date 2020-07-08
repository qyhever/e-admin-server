const router = require('koa-router')()
const ResourceController = require('@/controllers/resource.controller')
router.prefix('/resource')
const ins = new ResourceController()

router.get('/', ins.query)
router.get('/dir', ins.queryDir)
router.get('/total', ins.queryTotal)
router.get('/:resourceId', ins.queryOne)
router.post('/', ins.create)
router.patch('/', ins.patchResource)
router.put('/', ins.update)
router.delete('/:id', ins.delete)

module.exports = router
