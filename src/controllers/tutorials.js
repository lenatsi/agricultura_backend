const controller = {}
const Tutorial = require('../models/tutorial.model')
const validator = require('../validators/validateTutoriales')

//listo

controller.saveTutorial = async (req, res) => {
  const name = req.body.name
  const description = req.body.description
  const tags = req.body.tags
  const link = req.body.link

  const validation = validator.validate(req.body)

  if (validation.error) {
    const error = validation.error.details[0].message
    console.log(error)
    res.status(400).send(error)
    return
  } else {
    if (name && description && tags && link) {
      try {
        const tutorial = new Tutorial({
          name: name,
          description: description,
          tags: tags,
          link: link
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
  const tags = req.query.tags
  const filters = []
  if (filter) {
    filters.push({ title: new RegExp(filter, 'i') })
  }
  if (tags) {
    filters.push({ tags: new RegExp(filter, 'i') })
  }
  try {
    let tutoriales = {}
    if (filters.length > 0) {
      tutoriales = await Tutorial.aggregate([
        {
          $match: { $and: filters },
        },
      ])
    } else {
      tutoriales = await Tutorial.find()
    }
    res.send(tutoriales)
  } catch (error) {
    console.log(error)
    res.status(500).send('ocurrió un error')
  }
}
controller.updateTutorial = async (req, res) => {
  const name = req.body.name
  const description = req.body.description
  const tags = req.body.tags
  const link = req.body.link
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
          description: description,
          tags: tags,
          link: link,
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
