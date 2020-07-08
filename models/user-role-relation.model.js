const Sequelize = require('sequelize')
const sequelize = require('@/database/mysql')

const UserRole = sequelize.define('user_role_relation', {
  userId: {
    type: Sequelize.INTEGER
  },
  roleId: {
    type: Sequelize.INTEGER
  }
})

module.exports = UserRole
