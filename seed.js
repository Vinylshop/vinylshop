'use strict'
const TOTAL_USERS = 200
const TOTAL_PRODUCTS = TOTAL_USERS * 2.5
const TOTAL_REVIEWS = TOTAL_PRODUCTS * 4

const Promise = require('bluebird')
const faker = require('faker')

const db = require('./server/db/index')
const Product = db.model('product')
const Review = db.model('review')
const User = db.model('user')

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
  return {
<<<<<<< HEAD
=======
    username: faker.name.findName(),
>>>>>>> master
    email: faker.internet.email(),
    password: faker.internet.password(),
    isAdmin: false
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
  }
}

console.log('Seeding Database')
db.sync({force: true})
  .then(() => {
    console.log('Seeding Admin')
    return User.create({
<<<<<<< HEAD
=======
      username: 'Joe Cool',
>>>>>>> master
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
    console.log('Seeding Completed')
  })
  .finally(() => {
    db.close()
    return null
  })
