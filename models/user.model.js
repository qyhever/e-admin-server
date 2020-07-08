const Sequelize = require('sequelize')
const sequelize = require('@/database/mysql')

const User = sequelize.define('user', {
  avatar: {
    type: Sequelize.STRING
  },
  userName: {
    type: Sequelize.STRING
  },
  fullName: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING
  },
  enable: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
    comment: '启用 1 禁用 0'
  }
})

module.exports = User
