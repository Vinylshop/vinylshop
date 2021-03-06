const router = require('express').Router()
const {OrderItem} = require('../db/models')
module.exports = router

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

router.param('orderItemId', (req, res, next, id) => {
  OrderItem.findById(id)
  .then(item => {
    if (!item) {
      const err = Error('Item not found')
      err.status = 400
      throw err
    }
    req.item = item
    next()
    return null
  })
  .catch(next)
})
//router.get('/', isLoggedIn ,(req, res, next) => {
router.get('/', (req, res, next) => {
  OrderItem.findAll({})
  .then(items => res.json(items))
  .catch(next)
})

router.get('/:orderItemId', (req, res, next) => {
  res.json(req.item)
})

router.post('/', (req, res, next) => {
  OrderItem.create(req.body)
  .then(item => res.status(201).json(item))
  .catch(next)
})

router.put('/:orderItemId', (req, res, next) => {
  req.item.update(req.body)
  .then(item => res.status(200).json(item))
  .catch(next)
})

router.delete('/:orderItemId', (req, res, next) => {
  req.item.destroy()
  .then(() => res.status(204).end())
  .catch(next)
})
