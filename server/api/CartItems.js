const router = require('express').Router()
const {CartItem} = require('../db/models/cart')

router.get('/', async (req, res, next) => {
  try {
    const cartItems = await CartItem.findAll()
    res.json(cartItems)
  } catch (error) {
    next(error)
  }
})

module.exports = router
