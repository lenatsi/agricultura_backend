const controller = {}

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
      const tips = await Tip.findById(id)
      res.json(tips)
    } catch (err) {
      res.status(500).send(err)
    }
  } else {
    res.status(400).send()
  }
}
controller.getTips = async (req, res) => {
  const filter = req.query.filter
  console.log(filter)
  const filters = []
  if (filter) {
    filters.push({ title: new RegExp(filter, 'i') })
  }
  
  try {
    let profiles = {}
    if (filters.length > 0) {
      profiles = await Tip.aggregate([
        //{ $addFields: { fullname: { $concat: ['$name', ' ', '$surname'] } } },
        {
          $match: { $and: filters },
        },
      ])
    } else {
      profiles = await Tip.find()
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
      const Tip = await Tip.find(query)
      res.send(Tip)
    }catch (error){
      console.log(error)
      res.status(500).send('Error al enviar datos')
    } */
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