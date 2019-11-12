const router = require('express').Router()
const {Product} = require('../db/models')

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll({
      attributes: ['id', 'name', 'imageUrl', 'price', 'category', 'description']
    })
    res.json(products)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findByPk(+req.params.id, {
      attributes: ['id', 'name', 'imageUrl', 'price', 'category', 'description']
    })
    if (product) {
      res.json(product)
    } else {
      res.send('No product found')
    }
  } catch (err) {
    next(err)
  }
})

module.exports = router
