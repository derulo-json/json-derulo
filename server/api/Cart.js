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

router.get('/:id', async (req, res, next) => {
  try {
    const cart = await Cart.findAll({where: {id: req.params.id}})
    res.json(cart)
  } catch (error) {
    next(error)
  }
})

module.exports = router
