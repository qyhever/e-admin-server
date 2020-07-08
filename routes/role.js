const router = require('koa-router')()
const RoleController = require('@/controllers/role.controller')
router.prefix('/role')
const ins = new RoleController()

router.get('/', ins.query)
router.get('/total', ins.queryTotal)
router.get('/:roleId', ins.queryOne)
router.post('/', ins.create)
router.put('/', ins.update)
router.delete('/:roleId', ins.delete)

module.exports = router
