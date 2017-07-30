'use strict'
const router = require('express').Router()
const {List, User, Product, OrderItem} = require('../db/models')
module.exports = router

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

router.param('listId', (req, res, next, id) => {
  List.findOne({
    where: {id: id},
    include: [
      {model: OrderItem, include: [{model: Product, attributes: ['title', 'price']}]},
      {model: User, attributes: ['username']}
    ]
  })
    .then(list => {
      if (!list) {
        const err = Error('User not found')
        err.status = 400
        throw err
      }
      req.list = list
      next()
      return null
    })
    .catch(next)
})

//router.get('/',isLoggedIn ,(req, res, next) => {
router.get('/', (req, res, next) => {
  List.findAll({
    include: [
      {model: User, attributes: ['username']}
    ]
  })
    .then(lists => res.json(lists))
    .catch(next)
})

router.post('/', (req, res, next) => {
  List.create(req.body)
    .then(list => {
      res.status(201).json(list)
    })
    .catch(next)
})

//router.get('/:listId', isLoggedIn ,(req, res, next) => {
router.get('/:listId', (req, res, next) => {
  req.list.reload()
    .then(list => res.json(list))
    .catch(next)
})

//router.put('/:listId', isAdmin ,(req, res, next) => {
router.put('/:listId', (req, res, next) => {
  req.list.update(req.body)
    .then(list => res.status(200).json(list))
    .catch(next)
})

//router.delete('/:listId', isAdmin ,(req, res, next) => {
router.delete('/:listId', (req, res, next) => {
  req.list.destroy()
    .then(() => res.status(204).end())
    .catch(next)
})