module.exports = {
  apps: [
    {
      name: 'e-admin-server',
      script: './bin/www',

      // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
      env_production: {
        NODE_ENV: 'production'
      }
    }
  ],

  deploy: {
    production: {
      user: 'root',
      host: [ '47.105.103.118' ],
      port: '22',
      ref: 'origin/master',
      repo: 'git@gitee.com:qinyhquery/e-admin-server.git',
      path: '/usr/local/src/node-project/e-admin-server',
      ssh_options: [ 'StrictHostKeyChecking=no' ],
      'post-deploy': 'git pull && sh deploy.sh',
      env: {
        NODE_ENV: 'production'
      }
    }
  }
}