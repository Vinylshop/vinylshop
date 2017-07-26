'use strict'
const Sequelize = require('sequelize')
const db = require('../db')


const Order = db.define('order', {
  status: {
    type: Sequelize.ENUM('CREATED', 'PROCESSING', 'CANCELLED', 'COMPLETED')
  }
}, {
  scopes:{
    populated: () => {
      include:[{
        model: db.model('orderItem')
      }]
    }
  },
  instanceMethods: {
    changeStatus: function(status){
      this.status = status
    },
    // getTotal:
  }
})


module.exports = Order
