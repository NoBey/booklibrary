const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/*
 *
 ** @bookname    {String}    书名
 ** @author      {String}    作者
 ** @publisher   {String}    出版社
 ** @price       {String}    价格
 ** @total       {String}    总量
 ** @stock       {String}    库存量
 ** @reader      {Array}     借阅者
 **
 *
 */


const BookSchema = new Schema({
  bookname: {
    type: String,
    unique: true
  },

  author: {
    type: String
  },

  publisher: {
    type: String,
  },

  price: {
    type: String,
  },

  total: {
    type: String,
  },

  stock: {
    type: String,
  },

  reader: {
    type: Array,
  }
})



BookSchema.plugin(require('../plugins/common.js'));
const Book = mongoose.model('Book', BookSchema);
export default Book;
