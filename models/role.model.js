const Sequelize = require('sequelize')
const sequelize = require('@/database/mysql')

const Role = sequelize.define('role', {
  name: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.STRING
  }
})

module.exports = Role
