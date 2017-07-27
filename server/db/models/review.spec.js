const Promise = require('bluebird')
const chai = require('chai')
chai.use(require('chai-things'))
const expect = chai.expect
const { Review } = require('./review')

describe('Review model', function () {

  beforeEach(function (done) {
    //sync Review models. Drop and recreate tables
    Review.sync({ force: true })
      .then(function () {
        done()
      })
      .catch(done)
  })

  describe('review validations', function () {

    beforeEach(function () {
      // Returning a promise instead of using done
      return Promise.all([
        Review.create({
          title: 'Test Review 1',
          content: 'This is content 1',
          rating: 5
        }),
        Review.create({
          title: 'Test Review 2',
          content: 'This is content 2',
          rating: 7
        })
      ])
    })

    it('gets all reviews', function (done) {
      // try searching by tag in db
      // get back stuff with that tag
      Review.findAll()
        .then(function (reviews) {
          expect(reviews).to.have.lengthOf(2)
          expect(reviews[0].title).to.equal('Test Review 1')
          expect(reviews[0].rating).to.equal(2.5)
          done()
        })
        .catch(done)
    })
  })

  describe('virtuals', function () {

    let review
    beforeEach(function () {

      review = Review.build({
        title: 'Review 3',
        content: 'This is review 3',
        rating: 7
      })
    })

    describe('get', function () {

      it('gets review rating based on getter function', function () {
        // Returning a promise instead of using done
        expect(review.rating).to.equal(3.5)
        expect(review.title).to.equal('Review 3')
      })

    })
    describe('Validations', function () {

      it('errors without title', function () {
        let review = Review.build({})
        return review
          .validate()
          .then(function (err) {
            expect(err).to.exist
            expect(err.errors).to.contain.a.thing.with.property('path', 'title')
          })
      })

      it('errors without content', function () {
        let review = Review.build({})
        return review
          .validate()
          .then(function (err) {
            expect(err).to.exist
            expect(err.errors).to.contain.a.thing.with.property('path', 'content')
          })
      })

      it('errors given an invalid rating', function () {
        let review = Review.build({
          title: 'Test Review 4',
          content: 'Review 4 Content',
          status: 20
        })
        return review
          .save()
          .then(function () {
            throw Error('Promise should have rejected')
          }, function (err) {
            expect(err).to.exist
            expect(err.message).to.contain('status')
          })
      })

      it('will be valid with the above stuff', function () {
        let review = Review.build({
          title: 'Review 5',
          content: 'Review 5 Content',
          rating: 8
        })
        return review.save()
      })
    })
  })
})


