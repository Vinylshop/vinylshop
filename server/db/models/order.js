const Sequelize = require('sequelize')
const db = require('../db')


const Order = db.define('order', {
  checkedOut: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
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
    checkOut: function(){
      this.defaultValue = true
    }
  }
})


module.exports = Order
