'use strict'
const Sequelize = require('sequelize')
const db = require('../db')

const OrderItem = db.define('orderItem', {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
    set (val) {
      this.setDataValue('price', val * 100)
    },
    get () {
      return (this.getDataValue('price') / 100)
    }
  }
})

module.exports = OrderItem
