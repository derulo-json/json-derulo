const Sequelize = require('sequelize')
const db = require('../db')

const Cart = db.define('cart', {
  // accurately reflects products - orders
  // don't need the individual foreign keys in here
  // define your model here!
  currentPrice: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 0
    }
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 0
      // max: limit the quantity to inventory max
    }
  }
  // current price as of meow
})
module.exports = Cart
