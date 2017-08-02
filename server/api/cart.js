const keyPublishable = process.env.PUBLISHABLE_KEY
const keySecret = process.env.SECRET_KEY

const router = require('express').Router()
const stripe = require('stripe')(keySecret)

module.exports = router

router.get('/', (req, res, next) => {
  req.session.cart = req.session.cart || {total: 0, items: []}
  res.json(req.session.cart)
})

router.put('/addItem', (req, res, next) => {
  let cart = req.session.cart
  let found = false
  const itemToAdd = req.body
  cart.items = cart.items.map(item => {
    if (item.productId === itemToAdd.productId) {
      found = true
      cart.total += (itemToAdd.quantity - item.quantity) * item.price
      return itemToAdd
    }
    return item
  })
  if (!found) {
    cart.total += itemToAdd.price * itemToAdd.quantity
    cart.items.push(itemToAdd)
  }
  cart.items = cart.items.filter(item => item.quantity !== 0)
  res.json(cart)
})

router.put('/removeItem', (req, res, next) => {
  let cart = req.session.cart
  let subtractAmount = 0
  const itemToRemove = req.body
  cart.items = cart.items.filter(item => {
    if (item.productId !== itemToRemove.productId) return true
    subtractAmount = item.price * item.quantity
    return false
  })
  cart.total -= subtractAmount
  res.json(cart)
})

router.post('checkout/charge', (req, res) => {
  const cart = req.session.cart
  const charge = cart.total
  stripe.customers.create({
    email: req.body.stripeEmail,
    source: req.body.stripeToken
  })
    .then(customer =>
      stripe.charges.create({
        charge,
        description: 'Buying vinyls',
        currency: 'usd',
        customer: customer.id
      }))
    .then(charge)
    .catch(console.log)
})

router.delete('/', (req, res, next) => {
  req.session.cart = {total: 0, items: []}
  next()
})
