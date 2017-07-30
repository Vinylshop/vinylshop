const router = require('express').Router()
const {User} = require('../db/models')
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

const attributesToReturn = { attributes: [ 'username', 'email', 'isAdmin', 'id']}

router.param('userId', (req, res, next, id) => {
  User.findById(id)
    .then(user => {
      if (!user) {
        const err = Error('User not found')
        err.status = 400
        throw err
      }
      req.user = user
      next()
      return null
    })
    .catch(next)
})

// router.get('/', isAdmin, (req, res, next) => {
router.get('/', (req, res, next) => {
  User.findAll(attributesToReturn)
    .then(users => res.json(users))
    .catch(next)
})

// router.get('/:userId', isLoggedIn, (req, res, next) =>
router.get('/:userId', (req, res, next) => {
  req.user.reload(User.scope('populated'))
    .then(function (popUser) {
      res.json(popUser)
    })
    .catch(next)
})

// router.put('/:userId', isAdmin, (req, res, next) =>
router.put('/:userId', (req, res, next) => {
  req.user.update(req.body)
    .then(user => user.reload(User.scope('populated')))
    .then(user => res.status(200).json(user))
    .catch(next)
})

router.post('/', (req, res, next) => {
  User.create(req.body)
    .then(user => res.status(201).json(user))
    .catch(next)
})

// router.delete(/:userId, isAdmin, (req, res, next) =>
router.delete('/:userId', (req, res, next) => {
  req.user.destroy()
    .then(() => res.status(204).end())
    .catch(next)
})
