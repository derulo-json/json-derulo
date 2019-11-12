const router = require('express').Router()
const {Cart, Order, Product} = require('../db/models')

const loggedIn = (req, res, next) => {
  if (req.user) next()
  else next('Forbidden')
}

const getOrderId = async (req, res, next) => {
  const orderRow = await Order.findOne({
    where: {userId: req.session.passport.user, purchased: false}
  })
  req.body.orderRowId = orderRow.id
  next()
}

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

// router.get('/:id', loggedIn, async (req, res, next) => {
//   try {
//     const cart = await Cart.findOne({
//       where: {productId: req.params.id}
//     })
//     res.json(cart)
//   } catch (error) {
//     next(error)
//   }
// })
// router.get('/plus/:id', loggedIn, async (req, res, next) => {
//   try {
//     const cart = await Cart.findOne({
//       where: {productId: req.params.id}
//     })
//     res.json(cart)
//   } catch (error) {
//     next(error)
//   }
// })

// router.get('/minus/:id', loggedIn, async (req, res, next) => {
//   try {
//     const cart = await Cart.findOne({
//       where: {productId: req.params.id}
//     })
//     res.json(cart)
//   } catch (error) {
//     next(error)
//   }
// })

router.delete('/:id', loggedIn, getOrderId, async (req, res, next) => {
  try {
    await Cart.destroy({
      where: {productId: req.params.id, orderId: req.body.orderRowId}
    })
  } catch (error) {
    next(error)
  }
})

router.put('/plus/:id', loggedIn, getOrderId, async (req, res, next) => {
  try {
    const cart = await Cart.findOne({
      where: {productId: req.params.id, orderId: req.body.orderRowId}
    })
    await cart.update({
      quantity: cart.quantity + 1
    })
    res.send(cart.findAll())
  } catch (error) {
    next(error)
  }
})

router.put('/minus/:id', loggedIn, getOrderId, async (req, res, next) => {
  try {
    const cart = await Cart.findOne({
      where: {productId: req.params.id, orderId: req.body.orderRowId}
    })
    await cart.update({
      quantity: cart.quantity - 1
    })
    res.send(cart.findAll())
  } catch (error) {
    next(error)
  }
})

module.exports = router
