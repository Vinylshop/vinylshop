'use strict'
const TOTAL_USERS = 20
const TOTAL_PRODUCTS = TOTAL_USERS * 2.5
const TOTAL_REVIEWS = TOTAL_PRODUCTS * .2
const TOTAL_ORDERS = TOTAL_USERS / .8
const TOTAL_ORDER_ITEMS = TOTAL_ORDERS * 2

const Promise = require('bluebird')
const faker = require('faker')

const db = require('./server/db/index')
const Product = db.model('product')
const Review = db.model('review')
const User = db.model('user')
const Order = db.model('order')
const OrderItem = db.model('orderItem')

const ORDER_STATUS = ['CREATED', 'PROCESSING', 'CANCELLED', 'COMPLETED']

const randProduct = () => {
  return {
    title: faker.commerce.productName(),
    description: faker.lorem.paragraph(),
    price: faker.commerce.price(),
    quantity: 100,
    images: faker.image.imageUrl()
  }
}

const randReview = () => {
  return {
    title: faker.lorem.sentence(),
    content: faker.lorem.paragraphs(),
    rating: faker.random.number({min: 1, max: 10}),
    productId: faker.random.number({min: 1, max: TOTAL_PRODUCTS - 10}),
    userId: faker.random.number({min: 1, max: TOTAL_USERS - 10})
  }
}

const randUser = () => {
  const username = faker.name.firstName() + ' ' + faker.name.lastName()
  return {
    username: username,
    email: faker.internet.email(username),
    password: faker.internet.password(),
    isAdmin: false
  }
}

const randOrder = () => {
  return {
    status: ORDER_STATUS[Math.floor(Math.random() * 4)],
    email: faker.internet.email(),
    address: faker.address.streetAddress(),
    city: faker.address.city(),
    state: faker.address.state(),
    zipCode: faker.address.zipCode(),
    userId: Math.ceil(Math.random() * (TOTAL_USERS + 1))
  }
}

const randOrderItem = () => {
  return {
    quantity: Math.ceil(Math.random() * 12),
    productId: Math.ceil(Math.random() * TOTAL_PRODUCTS),
    price: faker.commerce.price(),
    orderId: Math.ceil(Math.random() * TOTAL_ORDERS)
  }
}

const generateItems = (total = 200, callback, type) => {
  const items = []
  for (let i = 0; i < total; i++) {
    items.push(callback())
  }
  // poor man's reducer
  if (type === 'product') {
    return items.map(product => Product.build(product))
  } else if (type === 'user') {
    return items.map(user => User.build(user))
  } else if (type === 'review') {
    return items.map(review => Review.build(review))
  } else if (type === 'order') {
    return items.map(order => Order.build(order))
  } else if (type === 'orderItem') {
    return items.map(orderItem => OrderItem.build(orderItem))
  }
}

console.log('Seeding Database')
db.sync({force: true})
  .then(() => {
    console.log('Seeding Admin')
    return User.create({
      username: 'Joe Cool',
      email: 'admin@admin.com',
      password: 'vinylShopRocks!',
      isAdmin: true
    })
  })
  .then(() => {
    console.log('Seeding Users')
    return Promise.map(generateItems(TOTAL_USERS, randUser, 'user'), user => user.save())
  })
  .then(() => {
    console.log('Seeding Products')
    return Promise.map(generateItems(TOTAL_PRODUCTS, randProduct, 'product'), product => product.save())
  })
  .then(() => {
    console.log('Seeding Reviews')
    return Promise.map(generateItems(TOTAL_REVIEWS, randReview, 'review'), review => review.save())
  })
  .then(() => {
    console.log('Seeding Orders')
    return Promise.map(generateItems(TOTAL_ORDERS, randOrder, 'order'), order => order.save())
  })
  .then(() => {
    console.log('Seeding Order Items')
    return Promise.map(generateItems(TOTAL_ORDER_ITEMS, randOrderItem, 'orderItem'), orderItem => orderItem.save())
  })
  .then(() => {
    console.log('Seeding Completed')
  })
  .finally(() => {
    db.close()
    return null
  })
