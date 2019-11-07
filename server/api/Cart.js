const router = require('express').Router()
const {Cart, Order, Product} = require('../db/models')

router.get('/', async (req, res, next) => {
  try {
    const cart = await Order.findOne({
      where: {userId: req.session.passport.user},
      include: [{model: Product}]
    })
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
