const router = require('express').Router()
module.exports = router

router.use('/users', require('./users')) // /users/:userId/cart
// security measures -> only the user is allowed to see their own cart
router.use('/products', require('./products'))
// not a thing atm
router.use('/cart', require('./cart'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
