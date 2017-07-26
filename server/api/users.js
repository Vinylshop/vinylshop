const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

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

router.get('/', (req, res, next) => {
  User.findAll({
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
    attributes: ['id', 'email', 'isAdmin']
  })
    .then(users => res.json(users))
    .catch(next)
})

router.get('/:userId', (req, res, next) => {
  req.user.reload(User.options.scopes.populated())
  .then(function(popUser) {
    res.json(popUser)
  })
  .catch(next)
})

router.put('/:userId', (req, res, next) => {
  req.user.update(req.body)
  .then(user => user.reload(User.options.scopes.populated())
  .then(user => res.status(201).json(user))
  .catch(next)
})

router.post('/', function(req, res, next) => {
  User.create(req.body)
  .then(user => res.status(201).json(user))
  .catch(next)
})

router.delete('/:userId', function(req, res, next) {
  req.user.destroy()
  .then(() => res.status(204).end())
  .catch(next)
})
