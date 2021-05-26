const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Ground = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'user'},
    width: {type: String},
    larger: {type: String},
    sunOrient: {type: Boolean, default: false},
    shadowPercentage: {type: String, enum: [
        '0',
        '25',
        '50',
        '75',], default: '0'},
    urban: {type: Boolean, default: false},
    aroma: {type: Boolean, default: false},
    plants: [{type: Schema.Types.ObjectId, ref: 'plant'}],
    option1: {type: Boolean, default: true},
    option2: {type: Boolean, default: false}
})
module.exports = mongoose.model('ground', Ground)