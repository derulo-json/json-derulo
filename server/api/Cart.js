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
    const cart = await Cart.findOne({
      where: {productId: req.params.id}
    })
    res.json(cart)
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    await Cart.destroy({where: {productId: req.params.id}})
  } catch (error) {
    next(error)
  }
})

module.exports = router
