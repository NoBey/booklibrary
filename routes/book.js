const router = require('koa-router')(); // 路由中间件
import BookAction from '../action/book'
import UserMw     from '../middleware/user'

/*
  ** 路由列表
  ** @POST   /book/add            {Object}       创建书籍
  ** @POST   /book/delete         {Object}       删除书籍
  ** @POST   /book/update         {Object}       更新书籍信息
  ** @POST   /book/take           {Object}       借阅书籍
  ** @POST   /book/repay          {Object}       归还书籍
  ** @POST   /book/list           {Object}       书籍列表
  **
*/


router.get('/book/test', UserMw.check, BookAction.test)
router.post('/book/add', UserMw.check, BookAction.add)
router.post('/book/delete', UserMw.check, BookAction.delete)
router.post('/book/update', UserMw.check, BookAction.update)
router.post('/book/take', UserMw.check, BookAction.take)
router.post('/book/repay', UserMw.check, BookAction.repay)
router.get('/book/list', UserMw.check, BookAction.list)


export default router
