const commonConfig = {
  privateKey: 'This is jwt secret'
}

const config = {
  development: {
    mysqlConfig: {
      database: 'e_admin',
      username: 'root',
      password: '123456',
      host: 'localhost'
    },
    qiniu: {
      accessKey: 'xxx',
      secretKey: 'xxx',
      scope: 'xxx',
      url: 'https://xxx'
    }
  },
  production: {
    mysqlConfig: {
      database: 'e_admin',
      username: 'xxx',
      password: 'xxx',
      host: 'xxx'
    },
    qiniu: {
      accessKey: 'xxx',
      secretKey: 'xxx',
      scope: 'xxx',
      url: 'https:/xxx'
    }
  }
}[process.env.NODE_ENV]

module.exports = {
  ...commonConfig,
  ...config
}
