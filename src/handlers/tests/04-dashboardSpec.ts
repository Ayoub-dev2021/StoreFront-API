import supertest from 'supertest'
import { app } from '../../app'
import { ManageUsers } from '../../models/user_info'
import { manageProducts } from '../../models/product'
import { manageOrders } from '../../models/order'
import { service } from '../../services/dashboard'
import client from '../../database'

// create a request object
const request = supertest(app)

const manageUser = new ManageUsers()
const manageProduct = new manageProducts()
const manageOrder = new manageOrders()
const services = new service()

describe('Dashboard Enpoints Response Test', () => {
  it('Get all orders in details - each product', async () => {
    //Create an order
    await manageOrder.createOrder({
      order_status: 'active',
      order_total: 260,
      user_id: 2
    })

    //Add product in the order
    await manageOrder.addOrderProduct(2, {
      product_id: 2,
      product_quantity: 5
    })
    const response = await request.get('/api/order_details/list')
    expect(response.status).toBe(200)
    expect(Array.isArray(response.body)).toBeTrue
    expect(response.body[0]).toEqual({
      id: 2,
      user_id: '2',
      product_id: '2',
      product_quantity: 5,
      order_status: 'active',
      order_total: 260
    })
  })

  it('Get single order in details -  each product', async () => {
    //bad request
    const response = await request.get('/api/order_details/2d')
    expect(response.status).toBe(400)
    expect(response.text.includes('invalid input syntax')).toBeTrue
  })

  it('Get single order in details -  each product', async () => {
    //ok request
    const response = await request.get('/api/order_details/2')
    expect(response.status).toBe(200)
    expect(Array.isArray(response.body)).toBeTrue
    expect(response.body[0]).toEqual({
      id: 2,
      user_id: '2',
      product_id: '2',
      product_quantity: 5,
      order_status: 'active',
      order_total: 260
    })
  })

  //Delete Records and reset table ids to 1
  afterAll(async () => {
    await manageOrder.removeOrderProduct(2)
    await manageOrder.deleteOrder(2)
    await manageProduct.deleteProduct(2)
    await manageUser.deleteUser(2)

    const table = await client.connect()
    const sql1 = 'ALTER SEQUENCE orders_id_seq RESTART WITH 1'
    const sql2 = 'ALTER SEQUENCE users_id_seq RESTART WITH 1'
    const sql3 = 'ALTER SEQUENCE products_id_seq RESTART WITH 1'
    const sql4 = 'ALTER SEQUENCE order_products_id_seq RESTART WITH 1'

    await table.query(sql1)
    await table.query(sql2)
    await table.query(sql3)
    await table.query(sql4)
  })
})
