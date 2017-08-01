const router = require('express').Router()
module.exports = router

router.use('/products', require('./products'))
router.use('/reviews', require('./reviews'))
router.use('/users', require('./users'))
router.use('/orders', require('./orders'))
router.use('/orderItems', require('./orderItems'))
router.use('/lists', require('./lists'))
router.use('/cart', require('./cart'))
router.use('/sendEmail', require('./sendEmail'))


router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
