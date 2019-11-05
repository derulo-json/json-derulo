const Sequelize = require('sequelize')
const db = require('../db')
const Cart = db.define('cart', {
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
})
module.exports = Cart
