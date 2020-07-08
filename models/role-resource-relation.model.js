const Sequelize = require('sequelize')
const sequelize = require('@/database/mysql')

const RoleResource = sequelize.define('role_resource_relation', {
  roleId: {
    type: Sequelize.INTEGER
  },
  resourceId: {
    type: Sequelize.INTEGER
  }
})

module.exports = RoleResource
