# e-admin后台管理系统 后端 api

#### 技术栈
- koa2 小而精美的框架
- sequelize 大而全的 orm 框架，轻松访问 mysql
- qiniu 出色的 oss 对象存储服务

#### 启动项目
npm start
npm run dev

#### 部署
生产环境使用 pm2 部署
初始化:
pm2 deploy ecosystem.config.js production setup
部署:
pm2 deploy ecosystem.config.js production

执行命令之前需要修改配置文件 `ecosystem.config.js`