const keyPublishable = process.env.PUBLISHABLE_KEY;
const keySecret = process.env.SECRET_KEY;

const router = require('express').Router()
const {List, OrderItem, Product} = require('../db/models')
const stripe = require("stripe")(keySecret);

module.exports = router



router.get('/', (req, res, next) => {
  res.json(req.session.cart || {total: 0, items: []})
})


router.put('/addItem', (req, res, next) => {
  let cart = req.session.cart || { total: 0, items: []}
  let found = false
  const itemToAdd = req.body
  cart.items.map(item => {
    if (item.productId === itemToAdd.productId){
      found = true
      cart.total += (itemToAdd.quantity - item.quantity) * item.price
      return itemToAdd
    }
  })
  if(!found){
    cart.total += itemToAdd.price * itemToAdd.quantity
    cart.items.push(itemToAdd)
  }
  res.json(cart)
})


router.post("checkout/charge", (req, res) => {
  const cart = req.session.cart
  const charge = cart.total
  stripe.customers.create({
     email: req.body.stripeEmail,
    source: req.body.stripeToken
  })
  .then(customer =>
    stripe.charges.create({
      amount,
      description: "Buying vinyls",
         currency: "usd",
         customer: customer.id
    }))
  .then(charge)
  .catch(console.log)
});

router.delete('/', (req,res,next) => {
  req.session.cart.destroy()

})
