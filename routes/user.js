const router = require('koa-router')()
const UserController = require('@/controllers/user.controller')
router.prefix('/user')
const ins = new UserController()

router.post('/login', ins.login)
router.get('/current', ins.queryCurrentUser)
router.get('/', ins.query)
router.get('/:userId', ins.queryOne)
router.post('/', ins.create)
router.put('/', ins.update)
router.patch('/', ins.patchUser)
router.delete('/:id', ins.delete)
router.post('/login_record', ins.createLoginRecord)

module.exports = router
