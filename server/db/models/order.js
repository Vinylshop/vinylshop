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
    res.json(order)
  })
  .catch(next)
})

//api/orders/status/:statusType
router.get('/status/:statusType', (req, res, next) => {
  Order.findAll({
    where: {
      status: req.param.statusType
    }
  })
  .then(OrdersWithStatus => res.json(OrdersWithStatus))
  .catch(next)
})

//api/orders/:orderId
router.get('/:orderId', (req, res, next) => {
  req.order.reload(Order.options.scopes.populated())
  .then(order => res.json(order))
  .catch(next)
})


router.put('/:orderId', (req, res, next) => {
  req.order.update(req.body)
  .then(order => order.reload(Order.options.scopes.populated()))
  .then(order => res.json(order))
  .catch(next)
})
