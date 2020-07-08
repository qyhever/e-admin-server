const { Op } = require('sequelize')
const { User, UserRoleRelation, Role, Resource, LoginRecord } = require('@/models')
const sequelize = require('@/database/mysql')
const { genResponse, someDayStart, someDayEnd, md5 } = require('@/utils')
const { generateToken } = require('@/utils/jwt')
const bcrypt = require('bcryptjs')
const SALT_LENGTH = 10
const { createParameterError } = global.err

  // sequelize.query('SELECT * FROM user', {
  //   replacements: ['active'],
  //   type: sequelize.QueryTypes.SELECT
  // }).then(res => {
  //   console.log(res)
  // })
  ; (async () => {
    // const md5Pwd = md5(md5('123456'))
    // console.log(md5Pwd)
    // const salt = await bcrypt.genSaltAsync(10) // 生成盐
    // const saltPwd = await bcrypt.hashAsync(md5Pwd, salt, null) // 密码加盐
    // console.log(saltPwd)
  })()
class UserController {
  /**
   * @api {post} /user/login 用户登录
   * @apiName userLogin
   * @apiGroup User
   *
   * @apiParam {String} userName 用户名
   * @apiParam {String} password 密码（经过md5加密）
   *
   * @apiVersion 0.0.0
   *
   * @apiUse Error
   * @apiUse Success
  */
  async login(ctx) {
    const { userName, password } = ctx.request.body
    if (!userName) {
      throw createParameterError('param userName is required')
    }
    if (!password) {
      throw createParameterError('param password is required')
    }
    const user = await User.findOne({
      where: { userName },
      include: [{
        model: Role,
        through: {
          attributes: []
        },
        attributes: ['id', 'name'],
        include: [{
          model: Resource,
          through: {
            attributes: []
          },
          attributes: ['id', 'name', 'code']
        }]
      }]
    })
    if (!user) {
      ctx.body = genResponse(false, null, '用户不存在')
      return
    }
    const md5Pwd = md5(password) // md5签名
    // 数据库存储的是 md5Pwd 加盐生成的密码
    // 将 md5Pwd 与 数据库 加盐生成的 user.password 比较
    const passed = await bcrypt.compare(md5Pwd, user.password)
    if (!passed) {
      ctx.body = genResponse(false, null, '密码错误')
      return
    }
    // 启用 1/true 禁用 0/false
    if (!user.enable) {
      ctx.body = genResponse(false, null, '账号已被禁用，请联系管理员')
      return
    }
    const payload = {
      userName,
      id: user.id
    }
    const token = generateToken(payload)
    // user.setDataValue('token', token)
    const result = user.toJSON()
    result.token = token
    const temp = new Map()
    result.roleIds = result.roles.map(item => item.id)
    result.roleNames = result.roles.map(item => item.name)
    result.resources = result.roles.map(item => item.resources) // [[], []]
      .reduce((prev, next) => prev.concat(next), []) // flatten [{}, {}]
      .reduce((arr, item) => { // unique
        if (!temp.has(item.id)) {
          arr.push(item)
          temp.set(item.id, true)
        }
        return arr
      }, [])
    if (!result.roles.length) {
      ctx.body = genResponse(false, null, '该账号没有配置角色')
    } else if (!result.resources.length) {
      ctx.body = genResponse(false, null, '该账号对应角色没有配置权限')
    } else {
      result.roles = undefined
      ctx.body = genResponse(true, { userInfo: result, token })
    }
    // try {
    // } catch (err) {
    //   console.log(err)
    //   ctx.body = { code: errorCode, msg: '系统异常' }
    // }
  }
  /**
   * @api {get} /user/current 查询当前用户信息
   * @apiName queryCurrentUser
   * @apiGroup User
   *
   * @headerParam {String} Authorization token
   * @apiVersion 0.0.0
   *
   * @apiUse Error
   * @apiUse Success
  */
  async queryCurrentUser(ctx) {
    const currentUser = ctx.state.user
    const doc = await User.findOne({
      where: {
        id: currentUser.id
      },
      include: [{
        model: Role,
        through: {
          attributes: []
        },
        attributes: ['id', 'name'],
        include: [{
          model: Resource,
          through: {
            attributes: []
          },
          attributes: ['id', 'name', 'code']
        }]
      }]
    })
    const result = doc.toJSON()
    const temp = new Map()
    result.roleIds = result.roles.map(item => item.id)
    result.roleNames = result.roles.map(item => item.name)
    result.resources = result.roles.map(item => item.resources) // [[], []]
      .reduce((prev, next) => prev.concat(next), []) // flatten [{}, {}]
      .reduce((arr, item) => { // unique
        if (!temp.has(item.id)) {
          arr.push(item)
          temp.set(item.id, true)
        }
        return arr
      }, [])
    result.roles = undefined
    ctx.body = genResponse(true, result)
  }
  /**
   * @api {get} /user 查询用户
   * @apiName queryUser
   * @apiGroup User
   *
   * @apiParam {Number} page 页码
   * @apiParam {Number} size 数据条数
   * @apiParam {String} userName 用户名
   * @apiParam {String} fullName 真实姓名
   * @apiParam {String} enable 启用状态 （1 启用，0 禁用）
   * @apiParam {String} sortProp 排序字段
   * @apiParam {Number} sortOrder 排序顺序（1 升序，-1 降序）
   * 
   * @apiVersion 0.0.0
   *
   * @apiUse Error
   * @apiUse Success
  */
  async query(ctx) {
    const page = +ctx.query.page || 1
    const size = +ctx.query.size || 10
    const { userName, fullName, enable, createdAtStart, createdAtEnd, updatedAtStart, updatedAtEnd, sortProp, sortOrder } = ctx.query
    const where = {}
    if (userName) {
      where.userName = {
        [Op.like]: '%' + userName + '%'
      }
    }
    if (fullName) {
      where.fullName = {
        [Op.like]: '%' + fullName + '%'
      }
    }
    if (enable) {
      where.enable = +enable
    }
    if (createdAtStart && createdAtEnd) {
      // [Op.gte]: >=   [Op.lte]: <=
      if (createdAtStart === createdAtEnd) {
        where.createdAt = {
          [Op.gte]: someDayStart(createdAtStart),
          [Op.lte]: someDayEnd(createdAtStart)
        }
      } else {
        where.createdAt = {
          [Op.gte]: new Date(+createdAtStart),
          [Op.lte]: someDayEnd(createdAtEnd)
        }
      }
    }
    if (updatedAtStart && updatedAtEnd) {
      // [Op.gte]: >=   [Op.lte]: <=
      if (updatedAtStart === updatedAtEnd) {
        where.createdAt = {
          [Op.gte]: someDayStart(updatedAtStart),
          [Op.lte]: someDayEnd(updatedAtStart)
        }
      } else {
        where.createdAt = {
          [Op.gte]: new Date(+updatedAtStart),
          [Op.lte]: someDayEnd(updatedAtEnd)
        }
      }
    }
    let order = sequelize.literal('createdAt ASC')
    if (sortProp && sortOrder) {
      const sortOrderStr = +sortOrder === 1 ? 'ASC' : 'DESC'
      order = sequelize.literal(`${sortProp} ${sortOrderStr}`)
    }
    const params = {
      where,
      limit: size,
      offset: (page - 1) * size,
      order,
      include: [{
        model: Role,
        through: {
          attributes: []
        },
        attributes: ['id', 'name']
      }]
    }
    const [list, total] = await Promise.all([
      User.findAll(params),
      User.count({ where })
    ])
    // const users = await User.findAndCountAll(params) // {count: xx, rows: []}
    ctx.body = genResponse(true, { list, total })
  }
  /**
   * @api {get} /user/:id 查询角色
   * @apiName queryOneUser
   * @apiGroup User
   *
   * @apiParam {Number} userId 用户 id
   * 
   * @apiVersion 0.0.0
   *
   * @apiUse Error
   * @apiUse Success
  */
  async queryOne(ctx) {
    const params = ctx.params
    if (!params.userId) {
      throw createParameterError('param userId is required')
    }
    const userId = +params.userId
    const doc = await User.findOne({
      where: {
        id: userId
      }
    })
    ctx.body = genResponse(true, doc)
  }
  /**
   * @api {post} /user 添加用户
   * @apiName createUser
   * @apiGroup User
   *
   * @apiParam {String} avatar 头像链接
   * @apiParam {String} userName 账户名
   * @apiParam {String} fullName 真实姓名
   * @apiParam {String} password 密码，两次 md5 加密
   * @apiParam {String} [enable=1] 是否启用，启用 1/true 禁用 0/false 默认启用
   * @apiParam {Array} role 对应角色 id 列表
   *
   * @apiVersion 0.0.0
   *
   * @apiUse Error
   * @apiUse Success
  */
  async create(ctx) {
    const params = ctx.request.body
    console.log(params)
    if (!params.avatar) {
      throw createParameterError('param avatar is required')
    }
    if (!params.userName) {
      throw createParameterError('param userName is required')
    }
    if (!params.fullName) {
      throw createParameterError('param fullName is required')
    }
    if (!params.password) {
      throw createParameterError('param password is required')
    }
    if (params.role && !Array.isArray(params.role)) {
      throw createParameterError('param role must be a Array')
    }
    const doc = await User.findOne({
      where: {
        userName: params.userName
      }
    })
    if (doc) {
      ctx.body = { code: errorCode, msg: '该账号已存在' }
    } else {
      const md5Pwd = md5(params.password) // md5签名
      const salt = await bcrypt.genSalt(SALT_LENGTH) // 生成盐
      const saltPwd = await bcrypt.hash(md5Pwd, salt, null) // 密码加盐
      const result = await User.create({
        ...params,
        password: saltPwd
      })
      if (params.role) {
        const relations = params.role.map(roleId => ({
          userId: result.id,
          roleId
        }))
        await UserRoleRelation.bulkCreate(relations)
      }
      ctx.body = genResponse(true, result, '添加成功')
    }
  }
  /**
   * @api {put} /user 更新用户
   * @apiName updateUser
   * @apiGroup User
   *
   * @apiParam {Number} id 用户 id
   * @apiParam {String} avatar 头像链接
   * @apiParam {String} userName 账户名
   * @apiParam {String} fullName 真实姓名
   * @apiParam {String} password 密码，两次 md5 加密
   * @apiParam {String} [enable=1] 是否启用，启用 1/true 禁用 0/false 默认启用
   * @apiParam {Array} role 对应角色 id 列表
   *
   * @apiVersion 0.0.0
   *
   * @apiUse Error
   * @apiUse Success
  */
  async update(ctx) {
    const { id, ...params } = ctx.request.body
    if (params.role && !Array.isArray(params.role)) {
      throw createParameterError('param role must be a Array')
    }
    const doc = await User.findOne({
      where: {
        userName: params.userName,
        [Op.not]: [{ id }]
      }
    })
    if (doc) {
      ctx.body = genResponse(false, null, '该账户名已存在')
    } else {
      await User.update(params, {
        where: { id }
      })
      if (params.role) {
        await UserRoleRelation.destroy({
          where: {
            userId: id
          }
        })
        const relations = params.role.map(roleId => ({
          userId: id,
          roleId
        }))
        await UserRoleRelation.bulkCreate(relations)
      }
      ctx.body = genResponse(true, null, '更新成功')
    }
  }
  /**
   * @api {delete} /user/:id 删除用户
   * @apiName deleteUser
   * @apiGroup User
   *
   * @apiParam {Number} id 用户 id
   *
   * @apiVersion 0.0.0
   *
   * @apiUse Error
   * @apiUse Success
  */
  async delete(ctx) {
    const id = ctx.params.id
    if (!id) {
      throw createParameterError('param id is required')
    }
    await User.destroy({
      where: { id }
    })
    ctx.body = genResponse(true, null, '删除成功')
  }
  /**
   * @api {patch} /user 切换用户状态
   * @apiName patchUserEnabled
   * @apiGroup User
   *
   * @apiParam {Number} id 用户 id
   * @apiParam {Boolean} enable   启用状态（0 禁用 1 启用）
   *
   * @apiVersion 0.0.0
   *
   * @apiUse Error
   * @apiUse Success
   */
  async patchUser(ctx) {
    const { id, enable } = ctx.request.body
    console.log({ id, enable })
    if (!id) {
      throw createParameterError('param id is required')
    }
    await User.update({ enable }, {
      where: { id }
    })
    ctx.body = genResponse(true, null, '操作成功')
  }
  /**
   * @api {post} /login_record 添加登录记录
   * @apiName createLoginRecord
   * @apiGroup User
   *
   * @apiParam {Number} userId 用户 id
   * @apiParam {String} browser 浏览器
   * @apiParam {String} system 系统
   * @apiParam {String} region 地区
   *
   * @apiVersion 0.0.0
   *
   * @apiUse Error
   * @apiUse Success
   */
  async createLoginRecord(ctx) {
    console.log(ctx.request.body)
    await LoginRecord.create(1)
    ctx.body = genResponse(true, null, '操作成功')
  }
}

module.exports = UserController
