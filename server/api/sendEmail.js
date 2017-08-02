const nodemailer = require('nodemailer')
const router = require('express').Router()
module.exports = router

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
router.post('/sendUpdate', sendEmail)
router.get('/dummy', sendDummy)

function sendEmail (req, res, next) {
  const order = req.body
  let message = `Congratulations ${order.user.username} Order ${order.id} has been ${order.status}.\n`
  message += `Order details:\n`
  order.orderItems.map(item => {
    message += `Item:\t\t${item.product.title}\nQuantity:\t${item.quantity}\nPrice:\t\t${item.price}`
  })
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
function sendDummy (req, res, next) {
  const message = `Order 4 has been created.`
  const mailOptions = {
    from: 'vinylrocksgs@gmail.com',
    to: 'vinylrocksgs@gmail.com',
    subject: `Order 4 Update`,
    text: message

  }
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error)
      res.json({yo: error})
    } else {
      console.log('Message sent' + info.response)
      res.json({yo: info.response})
    }
  })
}
