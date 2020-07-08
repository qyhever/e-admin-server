const { Op } = require('sequelize')
const { Resource, RoleResourceRelation } = require('@/models')
const sequelize = require('@/database/mysql')
const { genResponse, someDayStart, someDayEnd } = require('@/utils')
const { createParameterError } = global.err

class ResourceController {
  /**
   * @api {get} /resource 权限列表
   * @apiName userQuery
   * @apiGroup User
   *
   * @apiParam {Number} [page=1] 页码
   * @apiParam {Number} [size=10] 每页几条数据
   * @apiParam {String} name 权限名
   * @apiParam {String} code 权限编码
   * @apiParam {String} type 资源类型 (目录 1 资源 2)
   * @apiParam {Number} enable  启用状态（0 禁用 1 启用）
   * @apiParam {Number} createdAtStart 创建时间-开始
   * @apiParam {Number} createdAtEnd 创建时间-结束
   * @apiParam {Number} updatedAtStart 更新时间-开始
   * @apiParam {Number} updatedAtEnd 更新时间-结束
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
    const { name, code, type, enable, createdAtStart, createdAtEnd, updatedAtStart, updatedAtEnd, sortProp, sortOrder } = ctx.query
    const where = {}
    if (name) {
      where.name = {
        [Op.like]: '%' + name + '%'
      }
    }
    if (code) {
      where.code = {
        [Op.like]: '%' + code + '%'
      }
    }
    if (type) {
      where.type = type
    }
    if (enable) {
      where.enable = enable
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
    let order = sequelize.literal('createdAt DESC')
    if (sortProp && sortOrder) {
      const sortOrderStr = +sortOrder === 1 ? 'ASC' : 'DESC'
      order = sequelize.literal(`${sortProp} ${sortOrderStr}`)
    }
    const params = {
      where,
      limit: size,
      offset: (page - 1) * size,
      // order: [['createdAt', 'DESC']]
      order
    }
    const [ list, total ] = await Promise.all([
      Resource.findAll(params),
      Resource.count({ where })
    ])
    // const users = await Resource.findAndCountAll(params) // {count: xx, rows: []}
    ctx.body = genResponse(true, { list, total })
  }
  async queryOne(ctx) {
    const params = ctx.params
    if (!params.resourceId) {
      throw createParameterError('param resourceId is required')
    }
    const options = {
      where: {
        id: +params.resourceId
      }
    }
    const doc = await Resource.findOne(options)
    ctx.body = genResponse(true, doc)
  }
  /**
   * @api {post} /resource 添加资源权限
   * @apiName createResource
   * @apiGroup Resource
   *
   * @apiParam {Number} [parentCode=null] 路由对应的父级 id，默认空
   * @apiParam {String} name 资源名
   * @apiParam {String} code 资源编码
   * @apiParam {String} [type=2] 资源类型 (目录 1 资源 2)
   * @apiParam {Number} [enable=1] (启用 1 禁用 0) 是否启用，默认启用
   * 
   * @apiVersion 0.0.0
   *
   * @apiUse Error
   * @apiUse Success
   */
  async create(ctx) {
    const params = ctx.request.body
    if (!params.name) {
      throw createParameterError('param name is required')
    }
    if (!params.code) {
      throw createParameterError('param code is required')
    }
    const doc = await Resource.findOne({
      where: {
        [Op.or]: [ {name: params.name}, {code: params.code} ]
      }
    })
    if (doc) {
      ctx.body = genResponse(false, null, '该资源名或资源编码已存在')
    } else {
      const ret = await Resource.create(params)
      await RoleResourceRelation.create({
        roleId: 1,
        resourceId: ret.id
      })
      ctx.body = genResponse(true, ret, '添加成功')
    }
  }
  /**
   * @api {put} /resource 修改资源权限
   * @apiName updateResource
   * @apiGroup Resource
   *
   * @apiParam {Number} id 资源 id
   * @apiParam {Number} [parentCode=null] 路由对应的父级 id，默认空
   * @apiParam {String} name 资源名
   * @apiParam {String} code 资源编码
   * @apiParam {String} [type=2] 资源类型 (目录 1 资源 2)
   * @apiParam {Number} [enable=1] (启用 1 禁用 0) 是否启用，默认启用
   * 
   * @apiVersion 0.0.0
   *
   * @apiUse Error
   * @apiUse Success
   */
  async update(ctx) {
    const { id, name, ...params } = ctx.request.body
    if (!id) {
      throw createParameterError('param id is required')
    }
    if (!name) {
      throw createParameterError('param name is required')
    }
    if (!params.code) {
      throw createParameterError('param code is required')
    }
    const doc = await Resource.findOne({
      where: {
        [Op.or]: [ {name}, {code: params.code} ],
        [Op.not]: [ {id} ]
      }
    })
    if (doc) {
      ctx.body = genResponse(false, null, '该资源名或资源编码已存在')
    } else {
      const result = await Resource.update({
        ...params,
        name
      }, {
        where: { id }
      })
      ctx.body = genResponse(true, result, '修改成功')
    }
  }
  /**
   * @api {patch} /resource 切换资源启用状态
   * @apiName patchResourceEnabled
   * @apiGroup Resource
   *
   * @apiParam {Number} id 资源 id
   * @apiParam {Boolean} enable   启用状态（0 禁用 1 启用）
   *
   * @apiVersion 0.0.0
   *
   * @apiUse Error
   * @apiUse Success
   */
  async patchResource(ctx) {
    const { id, enable } = ctx.request.body
    if (!id) {
      throw createParameterError('param id is required')
    }
    await Resource.update({ enable }, {
      where: { id }
    })
    ctx.body = genResponse(true, null, '操作成功')
  }
  /**
   * @api {delete} /resource/:id 删除资源 / 目录
   * @apiName deleteResource
   * @apiGroup Resource
   *
   * @apiParam {Number} id 资源 id
   * @apiParam {String} type 类型（资源 resource 目录 dir）
   *
   * @apiVersion 0.0.0
   *
   * @apiUse Error
   * @apiUse Success
   */
  async delete(ctx) {
    const id = +ctx.params.id
    const type = ctx.query.type
    if (!type) {
      throw createParameterError('param type is required')
    }
     // 删除目录，需要把下面的资源也删除
    if (type === 'dir') {
      const resource = await Resource.findOne({
        where: { id }
      })
      const where = {
        [Op.or]: [
          {id},
          {parentCode: resource.code}
        ]
      }
      const resources = await Resource.findAll({
        where
      })
      // 删除关联记录
      if (resources.length) {
        await RoleResourceRelation.destroy({
          where: {
            resourceId: {
              [Op.in]: resources.map(item => item.id)
            }
          }
        })
      }
      await Resource.destroy({
        where
      })
    } else {
      // 删除资源
      await Resource.destroy({
        where: { id }
      })
    }
    ctx.body = genResponse(true, null, '删除成功')
  }
  /**
   * @api {get} /resource/dir 查询类型为目录的所有权限
   * @apiName queryResourceDir
   * @apiGroup Resource
   * 
   * @apiVersion 0.0.0
   *
   * @apiUse Error
   * @apiUse Success
   */
  async queryDir(ctx) {
    const result = await Resource.findAll({
      where: {
        type: '1',
        enable: 1
      },
      attributes: [ 'id', 'name', 'code' ]
    })
    ctx.body = genResponse(true, result)
  }
  /**
   * @api {get} /resource/total 查询所有权限
   * @apiName queryResourceTotal
   * @apiGroup Resource
   * 
   * @apiVersion 0.0.0
   *
   * @apiUse Error
   * @apiUse Success
   */
  async queryTotal(ctx) {
    const result = await Resource.findAll({
      where: {
        enable: 1
      }
      // attributes: ['id', 'name', 'code']
    })
    ctx.body = genResponse(true, result)
  }
}

module.exports = ResourceController
