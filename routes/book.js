const router = require('koa-router')(); // 路由中间件
import BookAction from '../action/book'

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


router.get('/book/test', BookAction.test)
router.post('/book/add', BookAction.add)
router.post('/book/delete', BookAction.delete)
router.post('/book/update', BookAction.update)
router.post('/book/take', BookAction.take)
router.post('/book/repay', BookAction.repay)
router.post('/book/list', BookAction.list)


export default router
