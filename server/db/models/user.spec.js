const {expect} = require('chai')
var chai = require('chai')
chai.use(require('chai-things'))
const db = require('../db')
const User = db.model('user')
const Review = db.model('review')


describe('User model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('instanceMethods', () => {
    describe('correctPassword', () => {
      let cody

      beforeEach(() => {
        return User.create({
          email: 'cody@puppybook.com',
          password: 'bones'
        })
          .then(user => {
            cody = user
          })
      })

      it('returns true if the password is correct', () => {
        expect(cody.correctPassword('bones')).to.be.equal(true)
      })

      it('returns false if the password is incorrect', () => {
        expect(cody.correctPassword('bonez')).to.be.equal(false)
      })
    }) // end describe('correctPassword')
  }) // end describe('instanceMethods')

  describe('defaultValue set correctly', () => {
    describe('isAdmin', () => {
      let cody

      beforeEach(() => {
        return User.create({
          email: 'cody@puppybook.com',
          password: 'bones'
        })
          .then(user => {
            cody = user
          })
      })

      it('isAdmin false by default', () => {
        expect(cody.getDataValue('isAdmin')).to.be.equal(false)
      })

      it('promptChange false by default', () => {
        expect(cody.getDataValue('promptChange')).to.be.equal(false)
      })
    }) // end describe('correctPassword')
  }) // end describe('instanceMethods')

  describe('Validations', function () {
    let cody

    beforeEach(() => {
      return User.create({
        email: 'cody@puppybook.com',
        password: 'bones'
      })
          .then(user => {
            cody = user
          })
    })

    it('errors with a duplicate email', function () {
      var user = User.build({
        email: 'cody@puppybook.com'
      })
      return user
        .save()
        .then(function () {
          throw Error('Promise should have rejected')
        }, function (err) {
          expect(err).to.exist
          console.log(err.errors)
          expect(err.errors).to.contain.a.thing.with.property('path', 'email')
        })
    })
  })


  describe('Populated scope', function () {
  let cody

  beforeEach(() => {
    return User.create({
      email: 'cody@puppybook.com',
      password: 'bones'
    })
    .then(user => {
      cody = user
      Review.create({
        title: 'Test Review',
        content: 'Test Content',
        rating: 1,
        userId: 1
      })
    })
  })

  it('populates User with reviews', function () {
    console.log(cody.reload(User.options.scopes.populated()))
  })
})
}) // end describe('User model')
