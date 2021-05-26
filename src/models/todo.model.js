const mongoose = require('mongoose')
const userModel = require('./user.model')
const SchemaMongo = mongoose.Schema

const Todo = new SchemaMongo({
    title: String,
    date: {type: Date},
    finished: {type: Boolean, default: false},
    user: {type: SchemaMongo.Types.ObjectId, ref: 'user'}
})
module.exports = mongoose.model('todo', Todo)