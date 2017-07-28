const {expect} = require('chai')
const db = require('../index')
const User = db.model('user')

describe('User model', () => {

  beforeEach(() => {
    return db.sync({force: true})
  });

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
}) // end describe('User model')
