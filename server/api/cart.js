const router = require('express').Router()
const {List, OrderItem, Product} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  res.json(req.session.cart || {total: 0, items: []})
})

router.put('/addItem', (req, res, next) => {
  let cart = req.session.cart || {total: 0, items: []}
  let found = false
  const itemToAdd = req.body
  cart.items.map(item => {
    if (item.productId === itemToAdd.productId) {
      found = true
      cart.total += (itemToAdd.quantity - item.quantity) * item.price
      return itemToAdd
    }
  })
  if (!found) {
    cart.total += itemToAdd.price * itemToAdd.quantity
    cart.items.push(itemToAdd)
  }
  res.json(cart)
})

router.delete('/', (req, res, next) => {
  req.session.cart.destroy()

})
