import supertest from 'supertest'
import { app } from '../../app'
import { ManageUsers, country } from '../../models/user_info'
import { manageProducts } from '../../models/product'

const manageUser = new ManageUsers()
const manageProduct = new manageProducts()

// create a request object
const request = supertest(app)

describe('Orders Endpoints response test', () => {
  //Create a "user" and "product" for tests
  beforeAll(async () => {
    //Create a user
    await manageUser.createUser({
      first_name: 'John',
      last_name: 'Stewart',
      user_email: 'ayoub@email.com',
      user_password: 'pass123',
      user_country: 'ae' as unknown as country,
      user_phone: 101010101010
    })

    //Create a product
    await manageProduct.createProduct({
      product_name: 'item 2',
      product_code: 'A00-11',
      product_price: 120,
      product_desc: 'item 1 desc',
      stock_level: 15
    })
  })

  it('create order ', async () => {
    const response = await request.post('/api/orders').send({
      user_id: 2,
      order_status: 'active',
      order_total: 1500
    })

    expect(response.status).toBe(200)
    expect(response.body.id).toEqual(1)
    expect(response.body.user_id).toEqual('2')
  })

  it('order list', async () => {
    const response = await request.get('/api/orders/list')
    expect(response.status).toBe(200)
    expect(Array.isArray(response.body)).toBeTrue
    expect(response.body.length).toEqual(1)
  })

  it('show one order', async () => {
    const response = await request.get('/api/orders/1')
    expect(response.status).toBe(200)
  })

  it('show all orders by user id', async () => {
    const response = await request.get('/api/orders/user/2')
    expect(response.status).toBe(200)
    expect(Array.isArray(response.body)).toBeTrue
    expect(response.body).toEqual([
      {
        id: 1,
        order_status: 'active',
        order_total: 1500,
        user_id: '2'
      }
    ])
  })

  it('update order', async () => {
    const response = await request.put('/api/orders/1').send({
      user_id: 2,
      order_status: 'active',
      order_total: 1100
    })
    expect(response.status).toBe(200)
    expect(response.body).toEqual({
      id: 1,
      user_id: '2',
      order_status: 'active',
      order_total: 1100
    })
  })

  it('add product to order', async () => {
    const response = await request.post('/api/orders/1/product').send({
      product_id: 2,
      product_quantity: 5
    })
    expect(response.status).toBe(200)
    expect(response.body).toEqual({
      id: 1,
      product_id: '2',
      product_quantity: 5,
      order_id: '1'
    })
  })

  it('submit the order and change the status to complete', async () => {
    const response = await request.put('/api/orders/1/submit')
    expect(response.status).toBe(200)
    expect(response.body.order.order_status).toEqual('complete')
  })

  it('cancel the order and change the status to cancelled', async () => {
    const response = await request.put('/api/orders/1/cancel')
    expect(response.status).toBe(200)
    expect(response.body.order.order_status).toEqual('cancelled')
  })

  it('reopen the order and change the status to active', async () => {
    //bad request
    const response = await request.put('/api/orders/1d/active')
    expect(response.status).toBe(401)
    expect(response.text).toEqual('Error: Wrong request ')
  })

  it('reopen the order and change the status to active', async () => {
    //ok request
    const response = await request.put('/api/orders/1/active')
    expect(response.status).toBe(200)
    expect(response.body.order.order_status).toEqual('active')
  })

  it('remove product from the order', async () => {
    const response = await request.delete('/api/order_products/1')
    expect(response.status).toBe(200)
    expect(response.text).toEqual('"The item has been removed from the order successfully"')
  })

  it('delete order', async () => {
    const response = await request.delete('/api/orders/1')
    expect(response.status).toBe(200)
    expect(response.text).toEqual('"The order with id:1 is deleted successfully"')
  })
})
