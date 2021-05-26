const controller = {}
const User = require('../models/user.model')
const authJWT = require('../auth/jwt')
const validator = require('../validators/validator')

controller.signup = async (req, res) => {
    const email = req.body.email
    const password = req.body.password
    const name = req.body.name 
    const plants = req.body.plants
  
    const validation = validator.validate(req.body)
    if (validation.error) {
      const error = validation.error.details[0].message
      console.log(error)
      res.status(400).send(error)
      return
    } else {
      if (!email || !password || !name || !plants) {
        res.status(400).send()
        return
      }
      try {
        const user = new User({
          name: name,
          email: email,
          password: password,
          plants: plants,
        })
        await user.save()
        const data = await User.findOne({ email: email })
        res.send({ status: 'ok', data: data })
      } catch (err) {
        console.log(err)
        res.status(500).send(err.message)
      }
    }
  } 
controller.login = async (req, res) => {
    const email = req.body.email
    const password = req.body.password
  
    if (!email || !password) {
      res.status(401).send('Credenciales incorrectas')
      return
    }
    try {
      const user = await User.findOne({ email: email })
  
      if (!user) {
        res.status(401).send('Credenciales incorrectas')
        return
      }
      const validate = await user.isValidPassword(password)
      if (!validate) {
        res.status(401).send('Credenciales incorrectas')
        return
      }
      const dataToken = authJWT.createToken(user)
      return res.send({
        access_token: dataToken[0],
        expires_in: dataToken[1],
        role: user.role
      })
    } catch (err) {
      console.log(err)
      res.status(401).send('Credenciales incorrectas')
      return
    }
  }

//formulario
  


module.exports = controller
