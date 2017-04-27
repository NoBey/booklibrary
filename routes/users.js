const router = require('koa-router')(); // 路由中间件
import UserAction from '../action/user'
import UserMw     from '../middleware/user'

/*
  ** 路由列表
  ** @POST  /user             {Object}       创建用户
  ** @put   /user             {Object}       更新用户信息
  ** @get   /user/:user       {params.user}  获取指定用户信息
  ** @post  /user/list/:page  {params.page}  获取用户列表
  ** @post  /login            {params}       登录
  ** @post  /logout           {params}       登出
  **
*/


router.post('/api/user', UserAction.create)
      .post('/api/user/update', UserMw.check, UserAction.update)
      .get('/api/user', UserMw.check, UserAction.get)
      .post(['/api/user/list', '/api/user/list/:page'], UserMw.check, UserAction.list)
      .post('/api/login', UserAction.login)
      .post('/api/logout', UserMw.check, UserAction.logout)
      .post('/api/user/change', UserMw.check, UserAction.changePassword)

export default router
