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

router.get('/:id', async (req, res, next) => {
  try {
    const cartItem = await CartItem.findAll({where: {id: req.params.id}})
    res.json(cartItem)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const cartItems = await CartItem.create(req.body)
    res.json(cartItems)
  } catch (error) {
    next(error)
  }
})

module.exports = router
