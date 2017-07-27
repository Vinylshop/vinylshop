const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const User = db.model('user')

describe('User routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/users/', () => {
    const codysEmail = 'cody@puppybook.com'
    const suliEmail = 'sulamita@kyu.com'

    beforeEach(() => {
      return User.create({
        email: codysEmail
      })
      .then( ()  => {
        return User.create({
          email: suliEmail
        })
      })
    })

    it('GET /api/users', () => {
      return request(app)
        .get('/api/users')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array')
          expect(res.body[1].email).to.be.equal(suliEmail)
          expect(res.body[0].email).to.be.equal(codysEmail)
        })
    })

    it('GET /api/users/:userId', () => {
      return request(app)
        .get('/api/users/2')
        .expect(200)
        .then(res => {
          expect(res.body.email).to.be.equal(suliEmail)
        })
    })

    it('PUT /api/users/:userId', () => {
      return request(app)
        .put('/api/users/2', { email: codysEmail})
        .expect(200)
        .then(res => {
          expect(res.body.email).to.be.equal(codysEmail)
        })
    })
  }) // end describe('/api/users')
}) // end describe('User routes')
