const controller = {}
const validator = require('../validators/validForm')
const User = require('../models/user.model')

controller.stepOne = async (req, res) => {
  const user = req.user
  const width = req.body.width
  const larger = req.body.larger
  const sunOrient = req.body.sunOrient
  const shadowPercentage = req.body.shadowPercentage

  const validation = validator.validate(req.body)

  if (validation.error) {
    const error = validation.error.details[0].message
    res.status(400).send(error)
    return
  }
  if (user) {
    if (width && larger && sunOrient && shadowPercentage) {
      try {
        const ground = new Ground({
          width: width,
          larger: larger,
          sunOrient: sunOrient,
          shadowPercentage: shadowPercentage,
          user: user.id,
        })
        await ground.save()
        res.status(204).send()
      } catch (error) {
        res.status(500).send(err)
      }
    }
  } else {
    res.status(400).send()
  }
}

controller.stepTwo = async (req, res) => {
  const user = req.user
  const urban = req.body.urban
  const aroma = req.body.aroma

  const validation = validator.validate(req.body)

  if (validation.error) {
    const error = validation.error.details[0].message
    res.status(400).send(error)
    return
  }
  if (user) {
    const groundId = user.ground
    if (groundId) {
      try {
        await Ground.findByIdAndUpdate(groundId, {
          urban: urban,
          aroma: aroma,
        })
        res.status(204).send()
      } catch (error) {
        res.status(500).send(err)
      }
    } else {
      //madar al stepOne??
    }
  } else {
    res.status(400).send()
  }
}

controller.stepThree = async (req, res) => {
  const user = req.user
  const plants = req.body.plants

  const validation = validator.validate(req.body)

  if (validation.error) {
    const error = validation.error.details[0].message
    res.status(400).send(error)
    return
  }
  if (user) {
    const groundId = user.ground
    if (groundId) {
      try {
        await Ground.findByIdAndUpdate(groundId, {
          plants: plants,
        })
        await User.findByIdAndUpdate(user.id, {
          plants: plants,
        })
        res.status(204).send()
      } catch (error) {
        res.status(500).send(err)
      }
    } else {
      //madar al stepOne??
    }
  } else {
    res.status(400).send()
  }
}

controller.stepFour = async (req, res) => {
  const user = req.user
  const option1 = req.body.option1
  const option2 = req.body.option2

  const validation = validator.validate(req.body)

  if (validation.error) {
    const error = validation.error.details[0].message
    res.status(400).send(error)
    return
  }
  if (user) {
    const groundId = user.ground
    if (groundId) {
      try {
        await Ground.findByIdAndUpdate(groundId, {
          option1: option1,
          option2: option2,
        })
        res.status(204).send()
      } catch (error) {
        res.status(500).send(err)
      }
    } else {
      //madar al stepOne??
    }
  } else {
    res.status(400).send()
  }
}

//función de creación del terreno, procesar las respuestas

module.exports = controller
