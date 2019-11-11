/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const Product = db.model('product')

//FIX THIS LATER------------------------------------------------

describe('Product model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('Product model', () => {
    // describe('Validations', () => {
    //   it('name needs to be string', async () => {
    //     try {
    //       await Product.create({
    //         name: 234,
    //         price: 1,
    //         quantity: 1,
    //         category: 'music'
    //       })
    //       // await product.validate()
    //       throw Error('validation worked but should not have worked')
    //     } catch (err) {
    //       expect(err.message).to.contain('name must be of type string')
    //     }
    //   })
    // it("requires `name` to not be an empty string", async () => {
    //   const campus = Campus.build({
    //     name: ""
    //   });
    //   try {
    //     await campus.validate();
    //     throw Error(
    //       "validation was successful but should have failed if name is an empty string"
    //     );
    //   } catch (err) {
    //     expect(err.message).to.contain("Validation error");
    //     /* handle error */
    //   }
    // });
  })
}) // end describe('Cart model')
