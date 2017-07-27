// let chai = require('chai')
// let Promise = require('bluebird')
// let expect = chai.expect
// let { Review } = require('../db/models/review.js')
// let supertest = require('supertest-as-promised')
// let app = require('../index.js')
// let agent = supertest.agent(app)

// describe('Reviews Requests', function () {

//     before(function beforeFn () {
//         return Review.sync({force: true})
//     })

//     beforeEach(function (done) {
//         Review.truncate().then(function(){
//             done()
//         })
//     })

//     describe('GET /api', function () {

//         it('responds with 200', function () {
//             return agent.get('/api').expect(200)
//         })

//     })

//     describe('GET /api/reviews', function () {

//         it('responds with 200', function () {
//             return agent.get('/api/reviews').expect(200)
//         })

//     })

//     describe('GET /api/reviews/:reviewId', function () {

//         it('responds with 404 on review that do not exist', function () {
//             return agent.get('/api/reviews/there_is_not_something_in_the_db_with_this_title').expect(404)
//         })

//         it('responds with 200 on Review that does exist', function () {
//             return Review.create({
//                 title: 'Example Review',
//                 content: 'This text does not really matter',
//                 rating: 4
//             })
//                 .then(function () {
//                     return agent.get('/api/reviews/Example_Review').expect(200)
//                 })
//         })

//     })

//     describe('POST /api/reviews', function () {

//         it('responds with 302', function (done) {
//             agent
//                 .post('/api/reviews/')
//                 .send({
//                     title: 'Test Review 3',
//                     content: 'Review Content 3',
//                     rating: 6
//                 })
//                 .expect(302, done)
//         })

//         it('creates a Review in the database', function () {
//             agent
//                 .post('/api/reviews/')
//                 .send({
//                     title: 'Test Review 4',
//                     content: 'Review Content 4',
//                     rating: 8
//                 })
//                 .then(function () {
//                     return Review.findAll()
//                 })
//                 .then(function (review) {
//                     expect(review).to.have.length(1)
//                     expect(review[0].title).to.equal('The Review')
//                 })
//         })

//     })

// })
