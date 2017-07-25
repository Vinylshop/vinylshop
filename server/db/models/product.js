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
  }
})
