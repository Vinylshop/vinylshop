const db = require('./db')

// register models
require('./models')

// db.sync({force: true})
db.sync()

module.exports = db
