const mongoose = require('mongoose')
const SchemaMongo = mongoose.Schema

const Todo = new SchemaMongo({
    title: String,
    date: {type: Date},
    finished: {type: Boolean}
})
module.exports = mongoose.model('todo', Todo)