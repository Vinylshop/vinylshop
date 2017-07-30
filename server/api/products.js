/**
 * Product Routes API Module
 * Product Module: id, title, description, price, image
 */
'use strict'
const router = require('express').Router()
const {Product} = require('../db/models')
module.exports = router

/**
 * Default columns to return for ALL products and Product by ID
 */
const attributesToReturn = {attributes: ['id', 'title', 'description', 'price', 'images', 'quantity']}

function isLoggedIn (req, res, next) {
  if (req.user) {
    next()
  } else {
    const error = new Error('Not allowed!!')
    error.status = 401
    next(error)
  }
}

function isAdmin (req, res, next) {
  if (req.user.isAdmin) {
    next()
  } else {
    const error = new Error('Must have admin privileges')
    error.status = 401
    next(error)
  }
}
/**
 * ProductID Param
 * returns
 */
router.param('productId', (req, res, next, id) => {
  Product.findById(id)
    .then(product => {
      if (!product) {
        const err = Error('Product not found')
        err.status = 400
        throw err
      }
      req.product = product
      next()
      return null
    })
    .catch(next)
})

/**
 * route /api/products
 * GET
 * returns all products
 */
router.get('/', (req, res, next) => {
  Product.findAll(attributesToReturn)
    .then(products => res.json(products))
    .catch(next)
})

/**
 * route /api/products/productId     i.e. /api/products/1
 * GET
 * returns a specific product by productId
 */
router.get('/:productId', (req, res, next) => {
  Product.findById(req.product.id, attributesToReturn)
    .then(product => res.json(product))
    .catch(next)
})

/**
 * route /api/products
 * POST
 * creates and returns new Product
 */
//router.post('/', isAdmin, (req, res, next) => {
router.post('/', (req, res, next) => {
  Product.create(req.body)
    .then(product => res.status(201).json(product))
    .catch(next)
})

/**
 * route /api/products/productId
 * PUT
 * updates and existing product by its productId
 */
//router.put('/:productId', isAdmin ,(req, res, next) => {
router.put('/:productId', (req, res, next) => {
  Product.update(req.body, {where: {id: req.product.id}})
    .then(product => res.status(200).json(product))
    .catch(next)
})

/**
 * route /api/products/productId
 * DEL
 * deletes an existing product by its productId
 */
//router.delete('/:productId', isAdmin,(req, res, next) => {
router.delete('/:productId', (req, res, next) => {
  req.product.destroy()
    .then(() => res.status(204).end())
    .catch(next)
})
