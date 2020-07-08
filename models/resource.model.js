const Sequelize = require('sequelize')
const sequelize = require('@/database/mysql')

const Resource = sequelize.define('resource', {
  parentCode: {
    type: Sequelize.STRING,
    comment: '父级菜单权限编码'
  },
  name: {
    type: Sequelize.STRING
  },
  code: {
    type: Sequelize.STRING,
    comment: '权限编码'
  },
  type: {
    type: Sequelize.STRING,
    defaultValue: '2',
    comment: '目录 1 资源 2'
  },
  enable: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
    comment: '启用 1 禁用 0'
  }
})

module.exports = Resource
