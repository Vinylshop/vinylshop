/**
 * Product Routes API Module
 * Product Module: id, title, description, price, image
 */
'use strict'
const router = require('express').Router()
const {Product} = require('../db/models')
module.exports = router

/**
 * Default columns to return for ALL Products and Product by ID
 */
const attributesToReturn = {attributes: ['id', 'title', 'description', 'price', 'images']}

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
 * route /api/Product
 * GET
 * returns all Product
 */
router.get('/', (req, res, next) => {
  Product.findAll(attributesToReturn)
    .then(products => res.json(products))
    .catch(next)
})

/**
 * route /api/Product/productId     i.e. /api/Product/1
 * GET
 * returns a specific Product by productId
 */
router.get('/:productId', (req, res, next) => {
  Product.findById(req.product.id, attributesToReturn)
    .then(product => res.json(product))
    .catch(next)
})

/**
 * route /api/Product
 * POST
 * creates and returns new Product
 */
router.post('/', (req, res, next) => {
  Product.create(req.body)
    .then(product => res.status(201).json(product))
    .catch(next)
})

/**
 * route /api/Product/productId
 * PUT
 * updates and existing Product by its productId
 */
router.put('/:productId', (req, res, next) => {
  Product.update(req.body, {where: {id: req.product.id}})
    .then(product => res.status(200).json(product))
    .catch(next)
})

/**
 * route /api/Product/productId
 * DEL
 * deletes an existing Product by its productId
 */
router.delete('/:productId', (req, res, next) => {
  req.product.destroy()
    .then(() => res.status(204).end())
    .catch(next)
})
