const controller = {}
const Plant = require('../models/plant.model')
const validator = require('../validators/validateplants')
//listos

controller.savePlant = async (req, res) => {
  let name = req.body.name
  let irriagation = req.body.irriagation
  let light = req.body.light
  let plantationTip = req.body.plantationTip
  let info = req.body.info
  let tip = req.body.tip

  const validation = validator.validate(req.body)

  if (validation.error) {
    const error = validation.error.details[0].message
    console.log(error)
    res.status(400).send(error)
    return
  } else {
    if (name && irriagation && light && plantationTip && info && tip) {
      try {
        const plant = new Plant({
          name: name,
          irriagation: irriagation,
          light: light,
          plantationTip:plantationTip,
          info:info,
          tip:tip

        })
        await plant.save()
        res.status(204).send()
      } catch (err) {
        res.status(500).send(err)
      }
    } else {
      res.status(400).send()
    }
  }
}
controller.getPlant = async (req, res) => {
  const id = req.params.id
  if (id) {
    try {
      const plants = await Plant.findById(id)
      res.json(plants)
    } catch (err) {
      res.status(500).send(err)
    }
  } else {
    res.status(400).send()
  }
}

controller.updatePlant = async (req, res) => {
  const name = req.body.name
  const irrigation = req.body.irrigation
  const light = req.body.light
  const plantationTip = req.body.plantationTip
  const info = req.body.info
  const tip = req.body.tip
  const PlantId = req.params.id

  const validation = validator.validate(req.body)

  if (validation.error) {
    const error = validation.error.details[0].message
    console.log(error)
    res.status(400).send(error)
    return
  } else {
    if (PlantId) {
      try {
        await Plant.findByIdAndUpdate(PlantId, {
          name: name,
          irrigation: irrigation,
          light: light,
          plantationTip:plantationTip,
          info:info,
          tip:tip,
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
controller.deletePlant = async (req, res) => {
  const id = req.params.id
  if (id) {
    try {
      await Plant.findByIdAndDelete(id)
      res.status(204).send()
    } catch (err) {
      res.status(500).send(err)
    }
  } else {
    res.status(400).send()
  }
}

module.exports = controller