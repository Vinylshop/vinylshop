const {expect} = require('chai')
const db = require('../db')
const Order = db.model('order')

xdescribe('Ordermodel', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('Initial tests', () => {
    describe('initial status', () => {
      let sillyOrder

      beforeEach(() => {
        return Order.create({status: 'CREATED'}).then(order => {
          sillyOrder = order
        })
      })

      it('will have status of created', () => {
        expect(sillyOrder.getDataValue('status')).to.be.equal('CREATED')
      })

      xit('', () => {
        expect(sillyOrder.correctPassword('bonez')).to.be.equal(false)
      })
    })
  })
})
