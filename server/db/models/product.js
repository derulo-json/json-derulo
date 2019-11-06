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
    defaultValue:
      'https://cdngeneral.rentcafe.com/images/no-image-available-400.png',
    validate: {
      isUrl: true
    }
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
      min: 0,
      max: 100000000000000
    }
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
      min: 0
    }
  },
  category: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: 'treasures',
    validate: {
      notEmpty: true
    },
    values: ['treasures', 'music', 'apparel']
  },
  description: {
    type: Sequelize.TEXT
  }
})

module.exports = Product
