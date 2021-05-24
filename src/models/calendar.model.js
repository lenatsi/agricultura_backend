const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Calendar = new Schema({
    plant: {type: Schema.Types.ObjectId, ref: 'plant'},
    seedtime: {type: Array},
    plantation: {type: Array},
    harvest: {type: Array},

})
module.exports = mongoose.model('calendar', Calendar)