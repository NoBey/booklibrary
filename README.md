# booklibrary

# 项目架构
全面使用es6 koa2

- `bin/www` 创建了服务 监听了error事件和开始监听事件
- `routes/` 挂载路由
- `model/` 数据模型
- `action/` 行为处理
- `middleware` 中间件
- `config/` 配置文件
- `plugins/` 扩展文件




启动项目
- `npm install`
- `npm start` or 需要设置端口 `p=1234 npm start` or `PORT=1234 npm start` and  调试使用`nodemon`:`nodemon --exec npm start`


检查代码错误  `gulp lint`or`npm run lint`
