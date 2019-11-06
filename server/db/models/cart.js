const Sequelize = require('sequelize')
const db = require('../db')
const Cart = db.define('cart', {
  // accurately reflects products - orders
  // don't need the individual foreign keys in here
  // define your model here!
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  productId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
  // current price as of meow
})
module.exports = Cart
