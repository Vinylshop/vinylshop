'use strict'
const Sequelize = require('sequelize')
const db = require('../db')


/**
 * tk: Don't forget that when users check out, they should be able to specify
 * a confirmation email and a shipping address!
 */
const Order = db.define('order', {
  status: {
    type: Sequelize.ENUM('CREATED', 'PROCESSING', 'CANCELLED', 'COMPLETED')
  }
}, {
  scopes:{
    /**
     * tk: Love that you're using a scopes (heer and in the user model)
     */
    populated: () => {
      include:[{
        model: db.model('orderItem')
      }]
    }
  },
  instanceMethods: {
    changeStatus: function(status){
      this.status = status
    }
  }
})


module.exports = Order
