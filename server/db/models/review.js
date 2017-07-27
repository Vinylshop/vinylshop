'use strict'
const Sequelize = require('sequelize')
const db = require('../db')

const Review = db.define('reviews', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  content: {
    type: Sequelize.TEXT,
    defaultValue: 'Please Enter A Review',
    allowNull: false
  },
  rating: {
    type: Sequelize.INTEGER,
    allowNull: false,
    max: 10,
    min: 0,
    set (val) {
      this.setDataValue('rating', val * 2)
    },
    get () {
      return this.getDataValue('rating') / 2
    }
  }
})

module.exports = Review
