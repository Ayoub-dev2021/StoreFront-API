import supertest from 'supertest'
import { app } from '../../app'
import { userTokenoken } from './01-users_infoSpec'

// create a request object
const request = supertest(app)

describe('Products Endpoints response test', () => {
  it('create product ', async () => {
    const response = await request
      .post('/api/products')
      .set('Authorization', 'bearer ' + userTokenoken)
      .send({
        product_name: 'item 1',
        product_code: 'A01-12',
        product_price: 200,
        product_desc: 'item 1 description',
        stock_level: 15
      })
    expect(response.status).toBe(200)
    expect(response.body.product_name).toEqual('item 1')
  })

  it('product list', async () => {
    const response = await request.get('/api/products/list')
    expect(response.status).toBe(200)
    expect(Array.isArray(response.body)).toBeTrue
    expect(response.body[0].product_desc).toEqual('item 1 description')
  })

  it('show one product', async () => {
    //bad request
    const response = await request.get('/api/products/1d')
    expect(response.status).toBe(400)
    expect(response.text.includes('Bad request Error: Could not show the product info')).toBeTrue
  })

  it('show one product', async () => {
    //ok request
    const response = await request.get('/api/products/1')
    expect(response.status).toBe(200)
    expect(response.body.product_name).toEqual('item 1')
  })

  it('update product', async () => {
    const response = await request.put('/api/products/1').send({
      product_name: 'item 1',
      product_code: 'A01-12',
      product_price: 300,
      product_desc: 'item 1 description',
      stock_level: 15
    })

    expect(response.status).toBe(200)
    expect(response.body.product_price).toEqual(300)
  })

  it('delete product', async () => {
    const response = await request.delete('/api/products/1')
    expect(response.status).toBe(200)
    expect(response.text).toEqual('"The product with id:1 is deleted successfully"')
  })
})
