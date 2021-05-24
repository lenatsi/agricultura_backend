const express = require('express')
const router = express.Router()
const plantController = require('../controllers/plant')
const userController = require('../controllers/user')
const calendarController = require('../controllers/calendar')
const passport = require('../auth/auth')

router.post("/signup", userController.signup)
router.post("/login", userController.login)


router.post("/plants", plantController.savePlant)
router.post("/calendar", calendarController.saveCalendar)


module.exports = router