const Sequelize = require('sequelize')
const db = require('../db')

const OrderItem = db.define('orderItem', {
  quantity: {
    type: Sequelize.INTEGER
  }
}, {
  scopes: {
    populated: () => ({
      include: [{
        model: db.model('product')
      }]
    })
  }
})

module.exports = OrderItem
