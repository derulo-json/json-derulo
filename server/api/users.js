const router = require('express').Router()
const {User, Order, Cart} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (error) {
    next(error)
  }
})

router.post('/:userId/cart', async (req, res, next) => {
  try {
    console.log(req.body)
    const [orderRow, orderRowCreated] = await Order.findOrCreate({
      where: {
        userId: req.params.userId
      }
    })
    const prodId = req.body.productId
    const [cartRow, cartRowCreated] = await Cart.findOrCreate({
      where: {
        orderId: orderRow.id,
        productId: prodId
      },
      defaults: {
        currentPrice: req.body.price,
        quantity: 1
      }
    })
    if (!cartRowCreated) {
      await cartRow.update({
        quantity: ++cartRow.quantity
      })
    }
    res.json('Added to cart!')
  } catch (error) {
    next(error)
  }
})
