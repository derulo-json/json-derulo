const router = require('express').Router()
const {User, Order, Cart} = require('../db/models')
module.exports = router

// router.get('/', async (req, res, next) => {
//   try {
//     const users = await User.findAll({
//       // explicitly select only the id and email fields - even though
//       // users' passwords are encrypted, it won't help if we just
//       // send everything to anyone who asks!
//       attributes: ['id', 'email']
//     })
//     res.json(users)
//   } catch (error) {
//     next(error)
//   }
// })

const loggedIn = (req, res, next) => {
  if (req.user) next()
  else next('Forbidden')
}

router.post('/:userId/cart', loggedIn, async (req, res, next) => {
  try {
    const [orderRow, orderRowCreated] = await Order.findOrCreate({
      where: {
        userId: req.params.userId,
        purchased: false
      }
    })
    const prodId = req.body.id
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
    const entireCart = await Cart.findAll({raw: true})
    res.json(entireCart)
  } catch (error) {
    next(error)
  }
})
