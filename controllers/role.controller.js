const { Op } = require('sequelize')
const { Role, Resource, RoleResourceRelation } = require('@/models')
const sequelize = require('@/database/mysql')
const { genResponse, someDayStart, someDayEnd } = require('@/utils')
const { createParameterError } = global.err

class RoleController {
  /**
   * @api {get} /role 查询角色
   * @apiName queryRole
   * @apiGroup Role
   *
   * @apiParam {Number} page 页码
   * @apiParam {Number} size 数据条数
   * @apiParam {String} name 角色名
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
    const { name, createdAtStart, createdAtEnd, updatedAtStart, updatedAtEnd, sortProp, sortOrder } = ctx.query
    const where = {}
    if (name) {
      where.name = {
        [Op.like]: '%' + name + '%'
      }
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
        model: Resource,
        through: {
          attributes: []
        },
        attributes: ['id', 'code', 'parentCode', 'name', 'type']
      }]
    }
    const [list, total] = await Promise.all([
      Role.findAll(params),
      Role.count({ where })
    ])
    // const users = await Role.findAndCountAll(params) // {count: xx, rows: []}
    ctx.body = genResponse(true, { list, total })
  }
  /**
   * @api {get} /role/:id 查询角色
   * @apiName queryOneRole
   * @apiGroup Role
   *
   * @apiParam {Number} roleId 角色 id
   * 
   * @apiVersion 0.0.0
   *
   * @apiUse Error
   * @apiUse Success
   */
  async queryOne(ctx) {
    const params = ctx.params
    if (!params.roleId) {
      throw createParameterError('param roleId is required')
    }
    const roleId = +params.roleId
    const options = {
      where: {
        id: roleId
      }
    }
    const role = await Role.findOne(options)
    ctx.body = genResponse(true, { role })
  }
  /**
   * @api {post} /role 添加角色
   * @apiName createRole
   * @apiGroup Role
   *
   * @apiParam {String} name 角色名字
   * @apiParam {String} description 角色描述
   * 
   * @apiVersion 0.0.0
   *
   * @apiUse Error
   * @apiUse Success
   */
  async create(ctx) {
    const params = ctx.request.body
    console.log(params)
    if (!params.name) {
      throw createParameterError('param name is required')
    }
    if (!params.description) {
      throw createParameterError('param description is required')
    }
    if (!params.resources) {
      throw createParameterError('param resources is required')
    }
    if (!Array.isArray(params.resources)) {
      throw createParameterError('param resources must be a Array')
    }
    const doc = await Role.findOne({
      where: {
        name: params.name
      }
    })
    if (doc) {
      ctx.body = genResponse(false, null, '该角色已存在')
    } else {
      const role = await Role.create(params)
      if (params.resources) {
        const relations = params.resources.map(resourceId => ({
          roleId: role.id,
          resourceId
        }))
        await RoleResourceRelation.bulkCreate(relations)
      }
      ctx.body = genResponse(true, role, '添加成功')
    }
    // const resources = await Resource.findAll()
    // const records = routes
    //  .map(item => item.id)
    //  .map(resourceId => ({
    //    roleId: role.id,
    //    resourceId
    //  }))
    // const docs = await RoleResourceRelation.bulkCreate(records)
  }
  /**
   * @api {put} /role 修改角色
   * @apiName updateRole
   * @apiGroup Role
   *
   * @apiParam {Number} id 角色 id
   * @apiParam {String} name 角色名字
   * @apiParam {String} description 角色描述
   * @apiParam {Array} resources 权限 id 集合
   * 
   * @apiVersion 0.0.0
   *
   * @apiUse Error
   * @apiUse Success
   */
  async update(ctx) {
    const { id, ...params } = ctx.request.body
    if (!id) {
      throw createParameterError('param id is required')
    }
    if (!params.name) {
      throw createParameterError('param name is required')
    }
    if (!params.description) {
      throw createParameterError('param description is required')
    }
    if (!params.resources) {
      throw createParameterError('param resources is required')
    }
    if (!Array.isArray(params.resources)) {
      throw createParameterError('param resources must be a Array')
    }
    const doc = await Role.findOne({
      where: {
        name: params.name,
        [Op.not]: [{ id }]
      }
    })
    if (doc) {
      ctx.body = genResponse(false, null, '该角色已存在')
    } else {
      await Role.update(params, {
        where: { id }
      })
      if (params.resources) {
        await RoleResourceRelation.destroy({
          where: {
            roleId: id
          }
        })
        const relations = params.resources.map(resourceId => ({
          roleId: id,
          resourceId
        }))
        await RoleResourceRelation.bulkCreate(relations)
      }
      ctx.body = genResponse(true, null, '修改成功')
    }
  }
  /**
   * @api {delete} /role/:id 删除角色
   * @apiName deleteRole
   * @apiGroup Role
   *
   * @apiParam {Number} id 角色 id
   * 
   * @apiVersion 0.0.0
   *
   * @apiUse Error
   * @apiUse Success
   */
  async delete(ctx) {
    const id = ctx.params.roleId
    if (!id) {
      throw createParameterError('param id is required')
    }
    const result = await Role.destroy({
      where: { id }
    })
    ctx.body = genResponse(true, result, '删除成功')
  }
  /**
   * @api {get} /role/total 查询所有（非管理员）角色
   * @apiName queryTotalRole
   * @apiGroup Role
   * 
   * @apiVersion 0.0.0
   *
   * @apiUse Error
   * @apiUse Success
   */
  async queryTotal(ctx) {
    const docs = await Role.findAll({
      where: {
        [Op.not]: {
          name: '超级管理员'
        }
      },
      attributes: ['id', 'name']
    })
    ctx.body = genResponse(true, docs)
  }
}

module.exports = RoleController
