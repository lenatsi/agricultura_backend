const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const config = require('../config')
const User = require('../models/user.model')

passport.use('users',new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.secret,
}, async (payload, done) => {
      try {
        const user = await User.findById(payload.sub)
        if (!user) {
          return done(null, false)
        }
        done(null, user)
      } catch (error) {
        done(error, false)
      }
    },
  ),
)
const users = passport.authenticate('users', {
  session: false,
})

passport.use('admin',new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.secret,
}, async (payload, done) => {
    try {
      const user = await User.findById(payload.sub)
      if (!user) {
        return done(null, false)
      }
      if (user.role == 'user'){
        return done(null, false)
      }
      done(null, user)
    } catch (error) {
      done(error, false)
    }
  },
),
)
const admin = passport.authenticate('admin', {
session: false,
})

module.exports = {users, admin}
