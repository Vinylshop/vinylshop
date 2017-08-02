const router = require('express').Router()
const {Order, User, OrderItem, Product} = require('../db/models')
module.exports = router

// function isLoggedIn (req, res, next) {
//   if (req.user) {
//     next()
//   } else {
//     const error = new Error('Not allowed!!')
//     error.status = 401
//     next(error)
//   }
// }
//
// function isAdmin (req, res, next) {
//   if (req.user.isAdmin) {
//     next()
//   } else {
//     const error = new Error('Must have admin privileges')
//     error.status = 401
//     next(error)
//   }
// }

router.param('orderId', (req, res, next, id) => {
  Order.findOne({
    where: {
      id: id
    },
    include: [
      {
        model: OrderItem,
        include: [
          {
            model: Product,
            attributes: ['title', 'price']
          }
        ]
      }, {
        model: User,
        attributes: ['username']
      }
    ]
  }).then(order => {
    if (!order) {
      const err = Error('Order not found')
      err.status = 400
      throw err
    }
    req.order = order
    next()
    return null
  }).catch(next)
})

// router.get('/',isLoggedIn ,(req, res, next) => {
router.get('/', (req, res, next) => {
  console.log(req.user.dataValues)
  Order.findAll({
    include: [
      {
        model: User,
        attributes: ['username']
      }
    ]
  }).then(orders => res.json(orders)).catch(next)
})

router.post('/', (req, res, next) => {
  console.log(req.body)
  Order.create(req.body).then(order => {
    res.status(201).json(order)
  }).catch(next)
})

router.get('/status/:statusType', (req, res, next) => {
  Order.findAll({
    where: {
      status: req.param.statusType
    }
  })
    .then(OrdersWithStatus => res.json(OrdersWithStatus))
    .catch(next)
})

// router.get('/:orderId', isLoggedIn ,(req, res, next) => {
router.get('/:orderId', (req, res, next) => {
  req.order.reload()
    .then(order => res.json(order))
    .catch(next)
})

// router.put('/:orderId', isAdmin ,(req, res, next) => {
router.put('/:orderId', (req, res, next) => {
  req.order.update(req.body)
    .then(order => res.status(200).json(order))
    .catch(next)
})

// router.delete('/:orderId', isAdmin ,(req, res, next) => {
router.delete('/:orderId', (req, res, next) => {
  req.order.destroy()
    .then(() => res.status(204).end())
    .catch(next)
})
