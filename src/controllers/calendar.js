const controller = {}
const Calendar = require('../models/calendar.model')
const User = require('../models/user.model')
const Plant = require('../models/plant.model')

controller.feedCalendar = async (req, res) => {
  const user = req.user
    try{
        const data = await user.populate('plants')
    }


}

controller.saveCalendar = async (req, res) => {
  const plant = req.body.plant
  const seedtime = req.body.seedtime
  const plantation = req.body.plantation
  const harvest = req.body.harvest

  if (plant && seedtime && plantation && harvest) {
    try {
      const calendar = new Calendar({
        plant: plant,
        seedtime: seedtime,
        plantation: plantation,
        harvest: harvest,
      })
      await calendar.save()
      res.status(204).send()
    } catch (err) {
      res.status(500).send(err)
    }
  }
}

module.exports = controller
