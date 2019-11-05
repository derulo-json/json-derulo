const router = require('express').Router()
const {Cart} = require('../db/models/cart')

router.get('/', async (req, res, next) => {
  try {
    const cart = await Cart.findAll()
    res.json(cart)
  } catch (error) {
    next(error)
  }
})

module.exports = router
