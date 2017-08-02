const nodemailer = require('nodemailer')
const router = require('express').Router()
module.exports = router

function isAdmin (req, res, next) {
  if (req.user && req.user.isAdmin) {
    next()
  } else {
    const error = new Error('Must have admin privileges')
    error.status = 401
    next(error)
  }
}

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  secure: false,
  port: 25,
  auth: {
    user: 'vinylrocksgs',
    pass: 'vinylRocks!'
  },
  tls: {
    rejectUnauthorized: false
  }
})

router.post('/sendInitial', sendInitial)
router.post('/sendUpdate', isAdmin , sendEmail)

function sendEmail (req, res, next) {
  const order = req.body
  const name = (order.userId ? order.user.username : '') + `<${order.email}>`
  let message = `Congratulations ${name} Order ${order.id} has been updated to status: ${order.status}.\n`
  message += `Order details:\n`
  order.orderItems.map(item => {
    message += `Item:\t\t${item.product.title}\nQuantity:\t${item.quantity}\nPrice:\t\t${item.price}\n\n`
  })
  const mailOptions = {
    from: 'vinylrocksgs@gmail.com',
    to: req.body.email,
    subject: `Order ${req.body.id} made`,
    text: message
  }
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error)
    } else {
      console.log('Message sent' + info.response)
    }
  })
}

function sendInitial (req, res, next) {
  const order = req.body
  let message = `Congratulations\nOrder ${order.id} has been created.\n`
  message += `Order detail will be emailed in subsequent emails\nThanks for buying!The most hydrated team appreciates you`
  const mailOptions = {
    from: 'vinylrocksgs@gmail.com',
    to: req.body.email,
    subject: `Order ${req.body.id} Update`,
    text: message
  }
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error)
    } else {
      console.log('Message sent' + info.response)
    }
  })
}
