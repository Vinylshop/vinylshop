const {expect} = require('chai')
const db = require('../db')
const OrderItem = db.model('orderItem')

describe('OrderItem model', () => {

  beforeEach(() => {
    return db.sync({force: true})
  });

  describe('', () => {

    describe('', () => {

      let sillyOrderItem

      beforeEach(() => {
        return OrderItem.create({
          quantity: 4,
          productId: 2,
          price: 4.25
        })
          .then(orderItem => {
            sillyOrderItem = orderItem
          })
      })

      it('will have quantity of 4', () => {
        expect(sillyOrderItem.getDataValue('quantity')).to.be.equal(4)
      })

      it('will productId of 2', () => {
        expect(sillyOrderItem.getDataValue('productId')).to.be.equal(2)
      })

      it('will have price of 4', () => {
        expect(sillyOrderItem.getDataValue('price')).to.be.equal(425)
      })

    })

  })
})
