const db = require('../db')
const User = require('./user')
const Product = require('./product')
const Cart = require('./cart')
const Order = require('./order')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
Product.belongsToMany(Order, {
  through: Cart,
  foreignKey: 'productId',
  otherKey: 'orderId'
})

Order.belongsToMany(Product, {
  through: Cart,
  foreignKey: 'orderId',
  otherKey: 'productId'
})

User.hasMany(Order)

Order.belongsTo(User)

module.exports = {
  User,
  Product,
  db,
  Cart,
  Order
}
