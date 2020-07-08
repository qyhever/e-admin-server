const Sequelize = require('sequelize')
const sequelize = require('@/database/mysql')

const LoginRecord = sequelize.define('login_record', {
  browser: {
    type: Sequelize.STRING,
    comment: '浏览器'
  },
  system: {
    type: Sequelize.STRING,
    comment: '系统'
  },
  region: {
    type: Sequelize.STRING,
    comment: '地区'
  },
  // userId: {
  //   type: Sequelize.INTEGER,
  //   comment: '用户id',
  //   references: {
  //     model: User,
  //     key: 'id'
  //   }
  // }
})

module.exports = LoginRecord
