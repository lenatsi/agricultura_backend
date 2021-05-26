const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Calendar = new Schema({
    seedtime: {type: Array},
    plantation: {type: Array},
    harvest: {type: Array},
    //añadir user: {}
})
module.exports = mongoose.model('calendar', Calendar)