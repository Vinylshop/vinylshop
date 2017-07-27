const router = require('express').Router()
const {Order} = require('../db/models')
module.exports = router

router.param('orderId', (req, res, next, id) =>  {
  Order.findById(id)
  .then(order => {
    if(!order) {
      const err = Error('User not found')
      err.status = 400
      throw err
    }
    req.order = order
    next()
    return null
  })
  .catch(next)
})


router.get('/', (req, res, next) => {
  Order.findAll({})
    .then(orders => res.json(orders))
    .catch(next)
})

router.post('/', (req, res, next) => {
  Order.create(req.body)
  .then(order => {
    res.status(201).json(order)
  })
  .catch(next)
})


// tk: this whole route would be unnecessary if your GET /api/orders route
// accepted req.query - Order.findAll({where: req.query})
router.get('/status/:statusType', (req, res, next) => {
  Order.findAll({
    where: {
      status: req.param.statusType
    }
  })
  .then(OrdersWithStatus => res.json(OrdersWithStatus))
  .catch(next)
})


router.get('/:orderId', (req, res, next) => {
  req.order.reload(Order.options.scopes.populated())
  .then(order => res.json(order))
  .catch(next)
})


router.put('/:orderId', (req, res, next) => {
  req.order.update(req.body)
  .then(order => order.reload(Order.options.scopes.populated()))
  .then(order => res.status(200).json(order))
  .catch(next)
})

router.delete('/:orderId', (req, res, next) => {
  req.order.destroy()
  .then(() => res.status(204).end())
  .catch(next)
})
