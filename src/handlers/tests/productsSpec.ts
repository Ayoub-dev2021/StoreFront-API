import supertest from 'supertest'
import { app } from '../../app'
import { auth } from '../../handlers/users_info'
import client from '../../database'

const authinticat = new auth()

// create a request object
const request = supertest(app)

describe('Products Endpoints response test', () => {
  let token: string
  beforeAll(async () => {
    //Get token
    token = authinticat.getToken({ name: 'mohamed', pass: 'pass123' })
  })

  //Delete Records and reset table ids to 1
  afterAll(async () => {
    const table = await client.connect()
    const sql1 = 'ALTER SEQUENCE products_id_seq RESTART WITH 1'

    await table.query(sql1)
  })

  it('create product ', async () => {
    const response = await request
      .post('/api/products')
      .set('Authorization', 'bearer ' + token)
      .send({
        product_name: 'item 1',
        product_code: 'A01-12',
        product_price: 200,
        product_desc: 'item 1 description',
        stock_level: 15
      })
    expect(response.status).toBe(200)
  })

  it('product list', async () => {
    const response = await request.get('/api/products/list')
    expect(response.status).toBe(200)
  })

  it('show one product', async () => {
    const response = await request.get('/api/products/1')
    expect(response.status).toBe(200)
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
  })

  it('delete product', async () => {
    const response = await request.delete('/api/products/1')
    expect(response.status).toBe(200)
  })
})
