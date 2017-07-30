'use strict'
const Sequelize = require('sequelize')
const db = require('../db')

const List = db.define('list', {
  name: {type: Sequelize.STRING}
})

module.exports = List
