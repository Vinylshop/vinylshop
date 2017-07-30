const User = require('./user')
const Review = require('./review')
const Product = require('./product')
const Order = require('./order')
const OrderItem = require('./orderItem')
const List = require('./list')

// Model Associations

Product.hasMany(Review)
Review.belongsTo(Product)

User.hasMany(Review)
Review.belongsTo(User)

User.hasMany(Order)
Order.belongsTo(User)

Order.hasMany(OrderItem)
OrderItem.belongsTo(Order)

OrderItem.belongsTo(Product)
Product.hasMany(OrderItem)

List.belongsTo(User)
User.hasOne(List, {as: 'cart'})
User.hasMany(List, {as: 'wishlists'})

// Model Exports

module.exports = {
  User,
  Review,
  Product,
  Order,
  OrderItem,
  List
}
