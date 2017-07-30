'use strict'
const Sequelize = require('sequelize')
const db = require('../db')


const Order = db.define('order', {
  status: {
    type: Sequelize.ENUM('CREATED', 'PROCESSING', 'CANCELLED', 'COMPLETED')
  },
  address: {
    type: Sequelize.STRING
  },
  city: {
    type: Sequelize.STRING
  },
  state: {
    type: Sequelize.STRING
  },
  zipCode: {
    type: Sequelize.STRING
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
    }
  }
})


module.exports = Order
