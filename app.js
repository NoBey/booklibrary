import koa        from 'koa';
import Static     from 'koa-static';      // 静态目录中间件
import logger     from 'koa-logger';      // http请求日志中间件
import json       from 'koa-json';        // 打印json
import bodyparser from 'koa-bodyparser';  // 解析 http 提交数据
import session    from 'koa-session';     // session 中间件
import convert    from 'koa-convert';     // 兼容koa1的中间件
import cors       from 'kcors';           //  cors跨域

const  router = require('koa-router')();  // 路由中间件
const  app    = new koa();

// 载入路由文件
import users      from './routes/users'
import books      from './routes/book'

// session 密钥
app.keys = ['TJCU'];

// 加载配置中间件
app.use(convert(session({
  httpOnly: false,
  maxAge: 211111111,
}, app)))
app.use(cors())
app.use(json())
app.use(logger())
app.use(bodyparser())


// 加载路由
app.use(router.routes())
   .use(router.allowedMethods())
   .use(users.routes())
   .use(books.routes())

app.use(Static('public'))

export default app
