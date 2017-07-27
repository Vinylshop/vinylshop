var Promise = require('bluebird')
var chai = require('chai')
chai.user(require('chai-things'))
var expect = chai.expect
var Product = require('./product')

describe('Product model', () => {
  beforeEach(function (done) {
    Product.sync({force: true})
      .then(function () {
        done()
      })
      .then(function () {
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
            image: '/image/testImageUrl.png'
          }),
          Product.create({
            title: 'Test 3',
            description: 'This is description 4',
            price: '3333',
            quantity: '3'
          })
        ])
      })
      .catch(done)
  })

  it('gets all products', function (done) {
    Product.findAll()
      .then(function (products) {
        expect(products).to.have.lengthOf(3)
        expect(products[0].title).to.equal('Test 1')
        expect(products[1].title).to.equal('Test 2')
        expect(products[2].title).to.equal('Test 3')
        done()
      })
      .catch(done)
  })

  it('gets a product by productId', function (done) {
    Product.findById(2)
      .then(function (product) {
        expect(product).to.have.lengthOf(1)
        expect(product[0].title).to.equal('Test 2') // change product.title
        done()
      })
      .catch(done)
  })

  it('requires a title', function () {
    var product = Product.build({})
    return product
      .validate()
      .then(function (err) {
        expect(err).to.exit
        expect(err.errors).to.contain.a.thing.with.property('path', 'title')
      })
  })
})
