import { manageProducts, product } from '../product'
import client from '../../database'

const manageProduct = new manageProducts()

describe('Product model CRUD functions should be defined', () => {
  it('Show Product method should be defined', () => {
    expect(manageProduct.showProduct).toBeDefined()
  })

  it('Show All Product method should be defined', () => {
    expect(manageProduct.showAllProducts).toBeDefined()
  })

  it('Create New Product method should be defined', () => {
    expect(manageProduct.createProduct).toBeDefined()
  })

  it('Update Product method should be defined', () => {
    expect(manageProduct.updateProduct).toBeDefined()
  })

  it('Delete a Product method should be defined', () => {
    expect(manageProduct.deleteProduct).toBeDefined()
  })
})

describe('Product Model - Test All CRUD actions', async () => {
  //Delete Records and reset table ids to 1
  afterAll(async () => {
    const table = await client.connect()
    const sql1 = 'ALTER SEQUENCE products_id_seq RESTART WITH 1'

    await table.query(sql1)
  })

  //Test the "createProduct" function
  it('Create New Prodduct test method', async () => {
    await manageProduct
      .createProduct({
        id: 1,
        product_name: 'item 1',
        product_code: 'A01-12',
        product_price: 200,
        product_desc: 'item 1 description',
        stock_level: 15
      })
      .then((productData) => {
        expect(productData).toEqual({
          id: 1,
          product_name: 'item 1',
          product_code: 'A01-12',
          product_price: 200,
          product_desc: 'item 1 description',
          stock_level: 15
        })
      })
  })

  //Test the "showProduct" function
  it('Show One Product test method', async () => {
    await manageProduct.showProduct(1).then((productData) => {
      expect(productData).toEqual({
        id: 1,
        product_name: 'item 1',
        product_code: 'A01-12',
        product_price: 200,
        product_desc: 'item 1 description',
        stock_level: 15
      })
    })
  })

  //Test the "showAllProducts" function
  it('Show All Products test method', async () => {
    await manageProduct.showAllProducts().then((productData) => {
      expect(productData).toEqual([
        {
          id: 1,
          product_name: 'item 1',
          product_code: 'A01-12',
          product_price: 200,
          product_desc: 'item 1 description',
          stock_level: 15
        }
      ])
    })
  })

  //Test the "updateProduct" function
  it('Update Product method test', async () => {
    await manageProduct
      .updateProduct(1, {
        product_name: 'item 1',
        product_code: 'A00-12',
        product_price: 250,
        product_desc: 'item 1 description',
        stock_level: 20
      })
      .then((updatedProduct) => {
        expect(updatedProduct).toEqual({
          id: 1,
          product_name: 'item 1',
          product_code: 'A00-12',
          product_price: 250,
          product_desc: 'item 1 description',
          stock_level: 20
        })
      })
  })

  //Test the "deleteProduct" function
  it('Delete Product test method', async () => {
    await manageProduct.deleteProduct(1).then((result) => {
      expect(result).toEqual('The product with id:1 is deleted successfully')
    })
  })
})
