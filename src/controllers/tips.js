const controller = {}
const validator = require('../validators/validateTutoriales')
const Tip = require('../models/tip.model')

//listos

controller.saveTip = async (req, res) => {
  let title = req.body.title
  let description = req.body.description
  let tags = req.body.tags

  const validation = validator.validate(req.body)

  if (validation.error) {
    const error = validation.error.details[0].message
    console.log(error)
    res.status(400).send(error)
    return
  } else {
    if (title && description && tags) {
      try {
        const tip = new Tip({
          title: title,
          description: description,
          tags: tags,
        })
        await tip.save()
        res.status(204).send()
      } catch (err) {
        res.status(500).send(err)
      }
    } else {
      res.status(400).send()
    }
  }
}
controller.getTip = async (req, res) => {
  const id = req.params.id
  if (id) {
    try {
      const tip = await Tip.findById(id)
      res.json(tip)
    } catch (err) {
      res.status(500).send(err)
    }
  } else {
    res.status(400).send()
  }
}
controller.getTips = async (req, res) => {
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
    let tips = {}
    if (filters.length > 0) {
      tips = await Tip.aggregate([
        {
          $match: { $and: filters },
        },
      ])
    } else {
      tips = await Tip.find()
    }
    res.send(tips)
  } catch (error) {
    console.log(error)
    res.status(500).send('Ocurrió un error')
  }
}
controller.updateTip = async (req, res) => {
  const title = req.body.title
  const description = req.body.description
  const tags = req.body.tags
  const TipId = req.params.id

  const validation = validator.validate(req.body)

  if (validation.error) {
    const error = validation.error.details[0].message
    console.log(error)
    res.status(400).send(error)
    return
  } else {
    if (TipId) {
      try {
        await Tip.findByIdAndUpdate(TipId, {
          title: title,
          description: description,
          tags: tags,
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
controller.deleteTip = async (req, res) => {
  const id = req.params.id
  if (id) {
    try {
      await Tip.findByIdAndDelete(id)
      res.status(204).send()
    } catch (err) {
      res.status(500).send(err)
    }
  } else {
    res.status(400).send()
  }
}

module.exports = controller
