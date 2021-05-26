const mongoose = require('mongoose')
const SchemaMongo = mongoose.Schema

const Plant = new SchemaMongo({
    name: {type: String},
    irrigation: {type: String},
    light: {type: String},
    plantationTip: {type: String},
    info: {type: String},
    tip: {type: String},
    calendar: {type: SchemaMongo.Types.ObjectId, ref: 'calendar'},
    savedAt: { type: Date, default: Date.now },
    udatedAt: { type: Date, default: Date.now },
})
module.exports = mongoose.model('plant', Plant)