const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/*
 *
 ** @user       {String}     用户名
 ** @password   {String}     密码
 ** @tel        {String}     手机号码
 ** @email      {String}     邮箱
 ** @role       {String}    角色
 **
 *
 */


const UserSchema = new Schema({
  user: {
    type: String,
    unique: true
  },

  password: {
    type: String
  },

  tel: {
    type: String,
  },

  email: {
    type: String,
  },

  role: {
    type: String,
  }

})



UserSchema.plugin(require('../plugins/common.js'));
const User = mongoose.model('User', UserSchema);
export default User;
