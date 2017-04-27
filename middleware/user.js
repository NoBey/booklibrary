const User = {}
User.check = async(ctx, next) => {
  if (ctx.session.user == null) {
    ctx.body = {
      stats: 0,
      msg: '请先登录'
    }
  } else {
    await next()
  }
}













export default User
