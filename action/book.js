import Book from '../model/book';

export default {
  /*
   ** 测试
   */
  test: async(ctx, next) => {
    ctx.body = ctx.session
    console.log(ctx.session)
  },
  /*
   ** 添加书籍
   ** @bookname    {String}    书名
   ** @author      {String}    作者
   ** @publisher   {String}    出版社
   ** @price       {String}    价格
   ** @total       {String}    总量
   */
  add: async(ctx, next) => {
    const body      = ctx.request.body
    const bookname  = body.bookname || ''
    const author    = body.author || ''
    const publisher = body.publisher || ''
    const price     = body.price || '0'
    const total     = body.total || '1'
    try {
      ctx.body = await Book.create({
        'bookname'  : bookname,
        'author'    : author,
        'publisher' : publisher,
        'price'     : price,
        "total"     : total
      })
    } catch (e) {
      console.log(e)
        ctx.body = {
          stats: 0,
          msg  : '添加失败'
        }
    }
  },

  /*
   ** 删除书籍
   ** @_id    {String}    id
   */

  delete: async(ctx, next) => {
    const id = ctx.request.body.id
    try{
      await Book.findOneAndUpdate({'_id': id},{
        'is_deleted'    : true,
      })
      ctx.body = {
        stats: 1,
        msg  : '删除成功'
      }
    }catch(e){
      console.log(e)
      ctx.body = {
        stats: 0,
        msg  : '删除失败'
      }
    }
  },

  /*
   ** 更新书籍信息
   ** @_id    {String}    id
   ** @bookname    {String}    书名
   ** @author      {String}    作者
   ** @publisher   {String}    出版社
   ** @price       {String}    价格
   ** @total       {String}    总量
   */
   update: async(ctx, next) => {
     const body      = ctx.request.body
     const id        = body.id || body._id
     const bookname  = body.bookname || ''
     const author    = body.author || ''
     const publisher = body.publisher || ''
     const price     = body.price || '0'
     const total     = body.total || '1'
     try{
       await Book.findOneAndUpdate({'_id': id},{
         'bookname'  : bookname,
         'author'    : author,
         'publisher' : publisher,
         'price'     : price,
         "total"     : total
       })
       ctx.body = {
         stats: 1,
         msg  : '更新成功'
       }
     }catch(e){
       console.log(e)
       ctx.body = {
         stats: 0,
         msg  : '更新失败'
       }
     }
  },
  /*
   ** 借阅书籍
   ** @_id    {String}    id

   */

  take: async(ctx, next) => {
    const user = ctx.session.user.user
    const id   = ctx.request.body.id

    ctx.body =  await Book.findOneAndUpdate({'_id': id},{
      'reader'  : [user]
    })
  },

  /*
   ** 归还书籍
   ** @_id    {String}    id
   */

  repay: async(ctx, next) => {
    const user  = ctx.session.user.user
    const id    = ctx.request.body.id
    const abook = await Book.findOne({'_id': id})
    ctx.body    = await abook.remove({'reader'  : [user]})
  },

  list: async(ctx, next) => {
    const page  = ctx.params.page || 1
    const limit = 10
    const skip  = (page-1)*limit
    ctx.body   = await Book.find({}) //.skip(skip).limit(limit)
  },


}
