const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const OrderItem = db.model('orderItem')

xdescribe('OrderItem routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/orderItems/', () => {
    beforeEach(() => {
      return OrderItem.create({
        quantity: 4,
        productId: 2,
        price: 4.25
      })
      .then(() => {
        return OrderItem.create({
          quantity: 3,
          productId: 1,
          price: 5.75
        })
      })
    })

    it('GET /api/orderItems', () => {
      return request(app)
        .get('/api/orderItems')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array')
          expect(res.body[0].quantity).to.be.equal(4)
          expect(res.body[1].quantity).to.be.equal(3)
        })
    })

    it('GET /api/orderItems/:orderItemId', () => {
      return request(app)
        .get('/api/orderItems/2')
        .expect(200)
        .then(res => {
          expect(res.body.quantity).to.be.equal(3)
        })
    })

    it('PUT /api/orderItems/:orderItemId', () => {
      return request(app)
        .put('/api/orderItems/2')
        .send({ quantity: 5})
        .expect(200)
        .then(res => {
          expect(res.body.quantity).to.be.equal(5)
        })
    })

    it('POST /api/orderItems', () => {
      return request(app)
        .post('/api/orderItems')
        .send({
          quantity: 12,
          productId: 5,
          price: 5.75
        })
        .expect(201)
        .then(res => {
          expect(res.body.productId).to.be.equal(5)
        })
    })

    it('DELETE /api/orderItems/:orderItemsId', () => {
      return request(app)
        .delete('/api/orderItems/2')
        .expect(204)
        .then(res => {
        })
    })
  })
})
