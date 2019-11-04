'use strict'

const db = require('../server/db')
const {User} = require('../server/db/models')
const Product = require('../server/db/models/product')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'})
  ])

  const products = await Promise.all([
    Product.create({
      name: 'Bag of Air from his Dressing Room',
      imageUrl:
        'https://di2ponv0v5otw.cloudfront.net/posts/2018/06/27/5b344747baebf6877a728f74/m_5b3447b63c98447789f180c9.jpg',
      price: '$99.99',
      quantity: 5,
      category: 'misc',
      description: 'Basically like you were in his dressing room'
    }),
    Product.create({
      name: 'Used Tissue',
      imageUrl:
        'https://media.istockphoto.com/photos/crumpled-tissue-paper-on-white-background-picture-id595754786?k=6&m=595754786&s=612x612&w=0&h=3XJd7ZtcISKsqybC5ldSIB8Cs_EMYxgOm1JHaM9N0Fs=',
      price: '$49.99',
      quantity: 1,
      category: 'misc',
      description: 'Catch the scent, not the germs'
    }),
    Product.create({
      name: 'Worn Socks',
      imageUrl:
        'https://previews.123rf.com/images/eric1513/eric15131601/eric1513160100017/51981643-detail-of-white-socks-poor-person-hole-holey-worn-out.jpg',
      price: '$499.99',
      quantity: 1,
      category: 'misc',
      description: "Limited edition socks socks he didn't want anymore!"
    }),
    Product.create({
      name: 'Stuffed Bunny in his Trailer',
      imageUrl:
        'https://kawaii.kawaii.at/img/white-bunny-rabbit-purple-bow-Poteusa-Loppy-plush-toy-from-Japan-212275-2.JPG',
      price: '$599.99',
      quantity: 1,
      category: 'misc',
      description: 'Rumour has it that these just MIGHT be his...'
    }),

    Product.create({
      name: 'Platinum Hits Digital Album',
      imageUrl:
        'https://img.secure.cdn2.wmgecom.com/media/catalog/product/cache/864/image/600x/9df78eab33525d08d6e5fb8d27136e95/0/9/093624918370.jpg',
      price: '$7.99',
      quantity: 100,
      category: 'music',
      description: ''
    }),
    Product.create({
      name: 'Tattoos EP Digital Album',
      imageUrl:
        'https://img.secure.cdn2.wmgecom.com/media/catalog/product/cache/864/image/600x/9df78eab33525d08d6e5fb8d27136e95/0/9/093624941101.jpg',
      price: '$4.95',
      quantity: 100,
      category: 'music',
      description: ''
    }),
    Product.create({
      name: 'Jason Derulo CD',
      imageUrl:
        'https://img.secure.cdn2.wmgecom.com/media/catalog/product/cache/864/image/1200x/9df78eab33525d08d6e5fb8d27136e95/0/9/093624975915_1.jpg',
      price: '$9.94',
      quantity: 100,
      category: 'music',
      description: ''
    }),
    Product.create({
      name: 'Future History CD',
      imageUrl:
        'https://img.secure.cdn2.wmgecom.com/media/catalog/product/cache/864/image/600x/9df78eab33525d08d6e5fb8d27136e95/j/a/jason_derulo_future_history_553018.jpg',
      price: '$12.98',
      quantity: 100,
      category: 'music',
      description: ''
    }),

    Product.create({
      name: 'Crewneck Sweatshirt',
      imageUrl:
        'https://img.secure.cdn2.wmgecom.com/media/catalog/product/cache/864/image/1200x/9df78eab33525d08d6e5fb8d27136e95/j/d/jd_profilecrewneck_flat_a.jpg',
      price: '$34.99',
      quantity: 100,
      category: 'apparel',
      description: ''
    }),
    Product.create({
      name: 'Inversion T-Shirt',
      imageUrl:
        'https://img.secure.cdn2.wmgecom.com/media/catalog/product/cache/864/image/1200x/9df78eab33525d08d6e5fb8d27136e95/j/d/jd_inversion_flat_a.jpg',
      price: '$22.99',
      quantity: 100,
      category: 'apparel',
      description: ''
    }),
    Product.create({
      name: 'Temporary Tattoo',
      imageUrl:
        'https://img.secure.cdn2.wmgecom.com/media/catalog/product/cache/864/image/1200x/9df78eab33525d08d6e5fb8d27136e95/j/d/jd_tattoo_sheet_02_2_1.jpg',
      price: '$4.99',
      quantity: 100,
      category: 'apparel',
      description: ''
    }),
    Product.create({
      name: 'In My Head Juniors T-Shirt',
      imageUrl:
        'https://img.secure.cdn2.wmgecom.com/media/catalog/product/cache/864/image/1200x/9df78eab33525d08d6e5fb8d27136e95/i/m/image_7066.png',
      price: '$18.99',
      quantity: 100,
      category: 'apparel',
      description: ''
    })
  ])

  console.log(`seeded ${users.length} users and ${products.length} products`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
