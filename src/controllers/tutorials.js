const controller = {}
const Tutorial = require('../models/tutorial.model')

//revisar

controller.saveTutorial = async (req, res) => {
  let name = req.body.name

  const validation = validator.validate(req.body)

  if (validation.error) {
    const error = validation.error.details[0].message
    console.log(error)
    res.status(400).send(error)
    return
  } else {
    if (name) {
      try {
        const tutorial = new Tutorial({
          name: name,
        })
        await tutorial.save()
        res.status(204).send()
      } catch (err) {
        res.status(500).send(err)
      }
    } else {
      res.status(400).send()
    }
  }
}
controller.getTutorial = async (req, res) => {
  const id = req.params.id
  if (id) {
    try {
      const tutorials = await Tutorial.findById(id)
      res.json(tutorials)
    } catch (err) {
      res.status(500).send(err)
    }
  } else {
    res.status(400).send()
  }
}
controller.getTutorials = async (req, res) => {
  const filter = req.query.filter
  const startDate = req.query.startDate
  const endDate = req.query.endDate
  console.log(filter)
  console.log(startDate)
  const filters = []
  if (filter) {
    filters.push({ fullname: new RegExp(filter, 'i') })
  }
  if (startDate && endDate) {
    filters.push({
      birthDate: {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      },
    })
  }
  try {
    let profiles = {}
    if (filters.length > 0) {
      profiles = await Tutorial.aggregate([
        { $addFields: { fullname: { $concat: ['$name', ' ', '$surname'] } } },
        {
          $match: { $and: filters },
        },
      ])
    } else {
      profiles = await Tutorial.find()
    }
    res.send(profiles)
  } catch (error) {
    console.log(error)
    res.status(500).send('ocurrió un error')
  }
  /* let query ={}
    
    if (filter || (startDate && endDate)) {
      query.$or =[]
    }
    
    if (filter) {
      query.$or.push({ surname: new RegExp(filter, 'i') })
    }
    
    if (startDate && endDate) {
      query.$or.push({
        birthDate:{
          $gte: startDate,
            $lte: endDate,
        }
      })
    }
    
    try {
      const Tutorial = await Tutorial.find(query)
      res.send(Tutorial)
    }catch (error){
      console.log(error)
      res.status(500).send('Error al enviar datos')
    } */
}
controller.updateTutorial = async (req, res) => {
  const name = req.body.name
  const surname = req.body.surname
  const birthDate = req.body.birthDate
  const bio = req.body.bio
  const profession = req.body.profession
  const photo = req.body.photo
  const tutorialId = req.params.id

  const validation = validator.validate(req.body)

  if (validation.error) {
    const error = validation.error.details[0].message
    console.log(error)
    res.status(400).send(error)
    return
  } else {
    if (tutorialId) {
      try {
        await Tutorial.findByIdAndUpdate(tutorialId, {
          name: name,
          surname: surname,
          birthDate: birthDate,
          bio: bio,
          profession: profession,
          photo: photo,
          updatedAt: Date.now(),
        })
        res.status(204).send()
      } catch (err) {
        res.status(500).send(err)
      }
    } else {
      res.status(400).send()
    }
  }
}
controller.deleteTutorial = async (req, res) => {
  const id = req.params.id
  if (id) {
    try {
      await Tutorial.findByIdAndDelete(id)
      res.status(204).send()
    } catch (err) {
      res.status(500).send(err)
    }
  } else {
    res.status(400).send()
  }
}

module.exports = controller
