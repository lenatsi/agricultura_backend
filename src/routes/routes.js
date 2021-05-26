const express = require('express')
const router = express.Router()
const plantController = require('../controllers/plant')
const userController = require('../controllers/user')
const calendarController = require('../controllers/calendar')
const tutorialController = require('../controllers/tutorials')
const tipController = require('../controllers/tips')
const toDoController = require('../controllers/todo')
const groundController = require('../controllers/ground')
const passport = require('../auth/auth')

router.post("/signup", userController.signup)
router.post("/login", userController.login)

//Guardado
router.post("/plants", plantController.savePlant)
router.post("/calendar", calendarController.saveCalendar)
router.post("/tutorial", tutorialController.saveTutorial)
router.post("/tip", tipController.saveTip)
router.post("/todo",toDoController.saveToDo)

router.post("/groundone", groundController.stepOne)
router.post("/groundtwo", groundController.stepTwo)
router.post("/groundthree", groundController.stepThree)
router.post("/groundfour", groundController.stepFour)




module.exports = router