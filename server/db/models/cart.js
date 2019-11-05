const Sequelize = require('sequelize')
const db = require('../db')

const Cart = db.define('cart', {
  // define your model here!
})

const CartItem = db.define('cartItem', {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

module.exports = {Cart, CartItem}
