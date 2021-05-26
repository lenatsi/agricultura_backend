const controller = {}
const ToDo = require('../models/todo.model')

//listo

controller.feedToDo = async (req, res) => {
  const user = req.user
  try {
    const data = await user.populate('todo').populate({
      path: 'todo',
      populate: {
        path: 'todo',
        model: 'todo',
      },
    })
    res.json(data)
  } catch (error) {
    res.status(400).send(error)
  }
}

controller.saveToDo = async (req, res) => {
  const user = req.user
  const title = req.body.title
  const date = req.body.date
  const finished = req.body.finished

  if (!user.id) {
    res.status(500).send(error)
    return
  }

  try {
    const toDo = new ToDo({
      title: title,
      date: date,
      finished: finished,
      user: user.id,
    })
    await toDo.save()
    res.status(204).send()
  } catch (error) {
    res.status(500).send(err)
  }
}

controller.toogleToDo = async (req, res) => {
  const id = req.params.id

  if (id) {
    try {
      await ToDo.findByIdAndUpdate(id, {
        finished: !finished,
      })
      res.status(204).send()
    } catch (error) {
      res.status(500).send(err)
    }
  } else {
    res.status(400).send()
  }
}

controller.deleteToDo = async (req, res) => {
  const id = req.params.id
  if (id) {
    try {
      await ToDo.findByIdAndDelete(id)
      res.status(204).send()
    } catch (err) {
      res.status(500).send(err)
    }
  } else {
    res.status(400).send()
  }
}

module.exports = controller
