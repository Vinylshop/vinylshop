const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Order = db.model('order')

describe('Order routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/orders/', () => {

    beforeEach(() => {
      return Order.create({
        status: 'CREATED'
      })
      .then( ()  => {
        return Order.create({
          status: 'CREATED'
        })
      })
    })

    it('GET /api/orders', () => {
      return request(app)
        .get('/api/orders')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array')
          expect(res.body[1].status).to.be.equal('CREATED')
          expect(res.body[0].status).to.be.equal('CREATED')
        })
    })

    it('GET /api/orders/:orderId', () => {
      return request(app)
        .get('/api/orders/2')
        .expect(200)
        .then(res => {
          expect(res.body.status).to.be.equal('CREATED')
        })
    })

    /**
     * tk: sending a canned response here doesn't help us.
     * A server route test should treat the way that route is handled
     * like a black box. For a certain input (when the database is in
     * a given state), we should expect a certain output.
     * The reason we have these tests is so that we can change the implementation
     * of our route handlers and still be sure that it's working.
     */
    it('PUT /api/orders/:orderId', () => {
      return request(app)
        .put('/api/orders/2')
        .send({ status: 'COMPLETED'})
        .expect(200)
        .then(res => {
          expect(res.body.status).to.be.equal('COMPLETED')
        })
    })


    it('POST /api/orders', () => {
      return request(app)
        .post('/api/orders')
        .send({
          status: 'CREATED'
        })
        .expect(201)
        .then(res => {
          expect(res.body.status).to.be.equal('CREATED')
        })
    })

    it('DELETE /api/orders/:ordersId', () => {
      return request(app)
        .delete('/api/orders/2')
        .expect(204)
        .then(res => { // tk: should check that the order is in fact removed
        })
    })
  })
})
