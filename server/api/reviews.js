'use strict'

/**
 * Reviews Routes API Module
 * Reviews Module: title, content, rating
 */

const router = require('express').Router()
const {Review} = require('../db/models')
module.exports = router

/**
 * Default columns to return for ALL Reviews
 */

 function isLoggedIn(req, res,next){
   if(req.user){
     next()
   }else{
     const error = new Error('Not allowed!!')
     error.status = 401
     next(error)
   }
 }

 function isAdmin(req, res, next){
   if(req.user.isAdmin){
     next()
   }else{
     const error = new Error('Must have admin privileges')
     error.status = 401
     next(error)
   }
 }


const attributesToReturn = {attributes: ['id', 'title', 'content', 'rating', 'createdAt', 'updatedAt']}
/**
 * ReviewID Param
 * returns
 */
router.param('reviewId', (req, res, next, id) => {
  Review.findById(id)
    .then(review => {
      if (!review) {
        const err = Error('Review not found')
        err.status = 400
        throw err
      }
      req.review = review
      next()
      return null
    })
    .catch(next)
})

/**
 * route /api/reviews
 * GET
 * returns all reviews
 */

router.get('/', (req, res, next) => {
  Review.findAll(attributesToReturn)
    .then(reviews => res.json(reviews))
    .catch(next)
})

/**
 * route /api/reviews/reviewId     i.e. /api/reviews/1
 * GET
 * returns a specific review by reviewId
 */

 //
router.get('/:reviewId', (req, res, next) => {
  Review.findById(req.review.id, attributesToReturn)
    .then(review => res.json(review))
    .catch(next)
})

/**
 * route /api/reviews
 * POST
 * creates and returns new review
 */

 //router.post('/', isLoggedIn,(req, res, next) => {
router.post('/', (req, res, next) => {
  Review.create(req.body)
    .then(review => res.status(201).json(review))
    .catch(next)
})

/**
 * route /api/reviews/reviewId
 * PUT
 * updates a review by its reviewId
 */
 //router.put('/:reviewId', isLoggedIn, (req, res, next) => {
router.put('/:reviewId', (req, res, next) => {
  Review.update(req.body, {where: {id: req.review.id}})
    .then(review => res.status(200).json(review))
    .catch(next)
})

/**
 * route /api/reviews/reviewId
 * DELETE
 * deletes a review by its reviewId
 */
//router.delete('/:reviewId', isAdmin,(req, res, next) => {
router.delete('/:reviewId', (req, res, next) => {
  req.review.destroy()
    .then(() => res.status(204).end())
    .catch(next)
})
