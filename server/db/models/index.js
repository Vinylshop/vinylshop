const User = require('./user')
const Review = require('./review')
const Product = require('./product')
// const Order = require('./order')
// const OrderItem = require('./orderItem')

// Model Associations

Product.hasMany(Review)
Review.belongsTo(Product)

User.hasMany(Review)
Review.belongsTo(User)

// User.hasMany(Order)
// Order.belongsTo(User)

// Order.hasMany(OrderItem)
// OrderItem.belongsTo(Order)

// Model Exports

module.exports = {
  User,
  Review,
  Product,
  // Order,
  // OrderItem
}
