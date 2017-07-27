const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const User = db.model('user')

xdescribe('User routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/users/', () => {
    const codysEmail = 'cody@puppybook.com'

    beforeEach(() => {
      return User.create({
        email: codysEmail
      })
<<<<<<< Updated upstream
=======
      .then(() => {
        return User.create({
          email: suliEmail
        })
      })
>>>>>>> Stashed changes
    })

    it('GET /api/users', () => {
      return request(app)
        .get('/api/users')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array')
          expect(res.body[0].email).to.be.equal(codysEmail)
        })
    })
<<<<<<< Updated upstream
=======

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
        .put('/api/users/2')
        .send({ email: codysEmail2})
        .expect(200)
        .then(res => {
          expect(res.body.email).to.be.equal(codysEmail2)
        })
    })

    it('POST /api/users', () => {
      return request(app)
        .post('/api/users')
        .send({
          email: 'AWESOME' + suliEmail,
          password: 'secretysecret'
        })
        .expect(201)
        .then(res => {
          expect(res.body.email).to.be.equal('AWESOME' + suliEmail)
        })
    })

    it('DELETE /api/users/:usersId', () => {
      return request(app)
        .delete('/api/users/2')
        .expect(204)
        .then(res => {
          // expect(res.body.email).to.be.equal('AWESOME' + suliEmail)
        })
    })
>>>>>>> Stashed changes
  }) // end describe('/api/users')
}) // end describe('User routes')
