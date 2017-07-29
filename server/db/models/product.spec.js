var Promise = require('bluebird')
var chai = require('chai')
chai.use(require('chai-things'))
var expect = chai.expect
var db = require('../index')
var Product = db.model('product')

describe('Product model', () => {

  beforeEach((done) => {
    Product.sync({force: true})
      .then(() => {
        return Promise.all([
          Product.create({
            title: 'Test 1',
            description: 'This is description 1',
            price: '1111',
            quantity: '1'
          }),
          Product.create({
            title: 'Test 2',
            description: 'This is description 2',
            price: '2222',
            quantity: '2',
            images: ['/image/testImageUrl.png']
          }),
          Product.create({
            title: 'Test 3',
            description: 'This is description 4',
            price: '3333',
            quantity: '3'
          })
        ])
      })
      .then(() => done())
      .catch(done)
  })

  describe('CRUD tests', () => {

    it('gets all products', () => {
      return Product.findAll()
        .then(function (products) {
          expect(products).to.have.lengthOf(3)
          expect(products[0].title).to.equal('Test 1')
          expect(products[1].title).to.equal('Test 2')
          expect(products[2].title).to.equal('Test 3')
        })
    })

    it('gets a products by productId', () => {
      return Product.findById('1')
        .then(product => {
          expect(product.id).to.equal(1)
        })
    })

  })

  describe('Validations', () => {

    it('errors without title', () => {
      const product = Product.build({})
      return product
        .validate()
        .catch(err => {
          expect(err).to.exist
          expect(err.errors).to.contain.a.thing.with.property('path', 'title')
        })
    })

  })

})
