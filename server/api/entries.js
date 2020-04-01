const router = require('express').Router()
const {Entry} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const entries = await Entry.findAll({
      where: {userId: req.user.id, month: req.query.month},
      order: [['createdAt', 'ASC']]
    })
    res.json(entries)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const entry = await Entry.findOne({where: {id: req.params.id}})
    res.status(200).send(entry)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const date = new Date()
    const entry = await Entry.create({
      ...req.body,
      date: date,
      userId: req.user.id
    })
    res.status(201).send(entry)
  } catch (error) {
    next(error)
  }
})
