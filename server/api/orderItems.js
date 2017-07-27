const router = require('express').Router()
const {OrderItem} = require('../db/models')
module.exports = router

router.param('orderItemId', (req, res, next, id) => {
  OrderItem.findById(id)
  .then(item => {
    if (!item) {
      const err = Error('Item not found')
      err.status = 400
      throw err
    }
    req.item = item
    next()
    return null // tk: could also return next(), which I think is a bit cleaner
  })
  .catch(next)
})

router.get('/', (req, res, next) => {
  // tk: that extra object in findAll({}) is not necessary, but you should consider
  // OrderItem.findAll({where: req.query}) - this will give you flexibility if you want
  // to filter down the resources you receive
  OrderItem.findAll({})
  .then(items => res.json(items))
  .catch(next)
})

router.get('/:orderItemId', (req, res, next) => {
  res.json(req.item)
})

router.post('/', (req, res, next) => {
  OrderItem.create(req.body)
  .then(item => res.status(201).json(item))
  .catch(next)
})

router.put('/:orderItemId', (req, res, next) => {
  req.item.update(req.body)
  .then(item => res.status(200).json(item))
  .catch(next)
})

router.delete('/:orderItemId', (req, res, next) => {
  req.item.destroy()
  .then(() => res.status(204).end())
  .catch(next)
})
