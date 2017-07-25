const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {

  // let orderArray=[];
  //
  // set(productId, quantity){
  //   orderArray.push({productId, quantity})
  // }
  // update(productId, quantity){}
  //
  // placedOrder(){
  //   orderArray.map((item)=>{
  //     return ({productId:productId, price:item, quantity: item.quantity})
  //   })
  // }
})

module.exports = Order
