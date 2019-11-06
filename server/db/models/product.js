const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('products', {
  // define your model here!
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: '' // some default image
    // isUrl validation
  },
  price: {
    type: Sequelize.DECIMAL(10, 2),
    // negatives - make sure that you have a min, also have a max
    // counting in pennies -> integer
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  quantity: {
    // negative quantity
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  category: {
    // ? limit this => separate table to store the category
    // enum
    // more than one category ? -> another join table
    type: Sequelize.STRING,
    allowNull: false, // maybe they don't have a category?
    validate: {
      notEmpty: true
    }
  },
  description: {
    type: Sequelize.TEXT
  }
})

module.exports = Product
