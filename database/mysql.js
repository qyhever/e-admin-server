const Sequelize = require('sequelize')

const dbConfig = global.config.mysqlConfig

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
  host: dbConfig.host,
  dialect: 'mysql',
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
  // 设置时区
  timezone: '+08:00',
  //  connection pool
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  define: {
    // 关闭 自动复数化 表名
    freezeTableName: true
  }
})

// Testing the connection
sequelize
  .authenticate()
  .then(() => {
    console.log('mysql connect success!')
  })
  .catch(err => {
    console.error('mysql connect fail!', err)
  })

module.exports = sequelize
