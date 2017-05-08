import User from '../model/user';

export default {
/*
  ** 创建用户
  ** @user       {String}     用户名
  ** @password   {String}     密码
  ** @tel        {String}     手机号码
  ** @email      {String}     邮箱
  ** @role       {String}     角色
  **
*/
  create: async (ctx, next)=>{
    const body     = ctx.request.body
    const user     = body.user || ''
    const password = body.password || ''
    const tel      = body.tel || ''
    const email    = body.email || ''
    const role     = 'user'
    const count    = await User.count({'user': user})
    if( count==0 ){
      ctx.body = ctx.session.user = await User.create({
        'user'    : user,
        'password': password,
        'tel'     : tel,
        'email'   : email,
        'role'    : role
      })
    }else{
      ctx.body = {
        stats: 0,
        msg  : '用户已存在'
      }
    }

  },
  /*
   ** 修改用户信息
   ** @user       {String}     用户名
   ** @password   {String}     密码
   ** @tel        {String}     手机号码
   ** @email      {String}     邮箱
   ** @role       {String}     角色
   */
  update: async (ctx, next)=>{
    const body     = ctx.request.body
    const user     = body.user || ''
    const password = body.password || ''
    const tel      = body.tel || ''
    const email    = body.email || ''
    const role     = body.role || ''

    const data =  await User.findOneAndUpdate({'user': user},{
      'user'    : user,
      'password': password,
      'tel'     : tel,
      'email'   : email,
      'role'    : role
    })

    if(data._id) ctx.body = {stats:'ok',msg:'更新成功'}
    else ctx.body = {stats:0,msg:'更新失败'}
  },


  /*
    ** 修改密码
    ** @user       {String}     用户名
    ** @oldpw      {String}     老密码
    ** @newpw      {String}     新密码
    **
  */

  changePassword: async (ctx, next)=>{
    const body   = ctx.request.body
    const count  = await User.count({
      'user': body.user,
      'password':body.oldpw
    })

    if(count===1 && body.newpw===body.newpw2){
      await User.findOneAndUpdate({'user': body.user},{
        'password': body.newpw,
      })
      ctx.body = {stats:'ok',msg:'修改密码成功'}
    }else {
      ctx.body = {stats:0,msg:'修改密码失败'}
    }

  },

  /*
    ** 获取指定用户信息
    ** @user       {String}     用户名
    ** @password   {String}     密码
    ** @tel        {String}     手机号码
    ** @email      {String}     邮箱
    ** @role       {String}     角色
    **
  */

  get: async (ctx, next)=>{
    // const name = ctx.session.user.user
    console.log(ctx.session.user )
    ctx.body   =   ctx.session.user       //await User.findOne({'user': name}, 'user tel xh email portrait')
  },

  /*
    ** 获取用户列表
    ** @user       {String}     用户名
    **
  */

  list: async (ctx, next)=>{
    const page  = ctx.params.page || 1
    const limit = 2
    const skip  = (page-1)*limit
    ctx.body   = await User.find({}, 'user role password tel email').skip(skip).limit(limit)
  },

  /*
    ** 登录
    ** @user       {String}     用户名
    ** @password   {String}     密码
    ** @tel        {String}     手机号码
    ** @email      {String}     邮箱
    ** @role       {String}     角色
    **
  */
  login: async (ctx, next)=>{
    const body     = ctx.request.body
    const name     = body.user || ''
    const password = body.password || ''
    const count = await User.count({
      'user'     : name,
      'password' : password
    })
    if(count==1) {
      const data = ctx.session.user = await User.findOne({
          'user'     : name,
          'password' : password
        }, 'user tel email role')
      data.cookie = ctx.header.cookie
    ctx.body = data
    }else{
      ctx.body =  {
        stats: 0,
        msg  : '账户或密码错误'
      }
    }
  },

  /*
    ** 登出用户
    **
  */
  logout: (ctx, next)=>{
    ctx.session = null;
  },


}
