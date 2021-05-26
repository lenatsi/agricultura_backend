const controller = {}
const Calendar = require('../models/calendar.model')
const User = require('../models/user.model')
const Plant = require('../models/plant.model')

controller.feedCalendar = async (req, res) => {
  const user = req.user
    try{
        const data = await user.populate('plants').populate(
          {
            path: "plants",
            populate: {
              path: 'calendar',
              model: 'calendar'
            }
          }
        )
        res.json(data)
    }catch(error){
      res.status(400).send(error)
    }
}

controller.saveCalendar = async (req, res) => {
  const seedtime = req.body.seedtime
  const plantation = req.body.plantation
  const harvest = req.body.harvest

  if (plant && seedtime && plantation && harvest) {
    try {

      const calendar = new Calendar({
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
