const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const SchemaMongo = mongoose.Schema

const User = new SchemaMongo({
    name: { type: String, require: true},
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true},
    plants: [{ type: Schema.Types.ObjectId, ref: 'plant' }],
    todo: { type: Array},
    //ground: { type: Schema.Types.ObjectId, ref: 'ground' },
})
User.pre('save', async function (next) {
    try {
      const user = this
      const hash = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10))
      user.password = hash
      next()
    } catch (error) {
      next(error)
    }
  })
  
  User.methods.isValidPassword = async function (password) {
    const compare = await bcrypt.compare(password, this.password)
    return compare
  }
module.exports = mongoose.model('user', User)