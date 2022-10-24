import supertest from 'supertest'
import { app } from '../../app'
import { auth } from '../../handlers/users_info'
import { ManageUsers, country } from '../../models/user_info'
import { manageProducts } from '../../models/product'
import client from '../../database'

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
            product_name:"item 1",
            product_code:"A00-11",
            product_price: 120,
            product_desc: "item 1 desc",
            stock_level:15
      })
  })



  it('order list', async () => {
    const response = await request.get('/api/orders/list')
    expect(response.status).toBe(200)
  })

  it('show one order', async () => {
    const response = await request.get('/api/orders/1')
    expect(response.status).toBe(200)
  })
  it('show all orders by user id', async () => {
    const response = await request.get('/api/orders/user/1')
    expect(response.status).toBe(200)
  })


  it('create order ', async () => {
    const response = await request.post('/api/orders')
    .send({
        user_id: 1,
        order_status:"active",
        order_total: 1500
    })
    expect(response.status).toBe(200)
  })

  it('update order', async () => {
    const response = await request.put('/api/orders/1')
    .send({
        user_id: 1,
        order_status:"active",
        order_total: 1100
    })
    expect(response.status).toBe(200)
  })

  it('add product to order', async () => {
    const response = await request.post('/api/orders/1/product')
    .send({
        product_id: 1,
        product_qauntity:5
    })
    expect(response.status).toBe(400)
  })

it('submit the order and change the status to complete',async ()=>{
    const response = await request.post('/api/orders/1/submit')
    expect(response.status).toBe(200)
})


it('cancel the order and change the status to cancelled',async ()=>{
    const response = await request.post('/api/orders/1/cancel')
    expect(response.status).toBe(200)
})



it('reopen the order and change the status to active',async ()=>{
    const response = await request.post('/api/orders/1/active')
    expect(response.status).toBe(200)
})



  it('delete order', async () => {
    const response = await request.delete('/api/orders/1')
    expect(response.status).toBe(200)
  })


    //Delete Records and reset table ids to 1
    afterAll(async () => {
        await manageUser.deleteUser(1)
        await manageProduct.deleteProduct(1)
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
