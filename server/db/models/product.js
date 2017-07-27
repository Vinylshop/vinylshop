'use strict'
const Sequelize = require('sequelize')
const db = require('../db')

/**
 * tk: can products have categories?
 */
const Product = db.define('product', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT,
    defaultValue: 'Please Enter Description',
    allowNull: false
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
    set (val) {
      this.setDataValue('price', val * 100)
    },
    get () {
      return this.getDataValue('price') / 100
    }
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  /**
   * tk: consider naming this `images` since it's an array
   */
  image: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    allowNull: false,
    defaultValue: ['/image/vinylshoplogo.png']
  }
})

module.exports = Product;
