'use strict'
const Sequelize = require('sequelize')
const db = require('../index.js')

const Product = db.define('products', {
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
  }
})

