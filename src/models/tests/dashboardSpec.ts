import { service } from '../../services/dashboard'
import { ManageUsers, country } from '../user_info'
import { manageOrders } from '../order'
import { manageProducts } from '../product'
import client from '../../database'
import bCrypt from 'bcrypt'

const services = new service()
const manageUser = new ManageUsers()
const manageProduct = new manageProducts()
const manageOrder = new manageOrders()

describe('Services functions should be defined', () => {

  it('Show orderd product method should be defined', () => {
    expect(services.productInOrder).toBeDefined()
  })

  it('Show all orders with products', () => {
    expect(services.allOrdersWithDetails).toBeDefined()
  })

  it('Show order details with products method should be defined', () => {
    expect(services.singleOrderWithDetails).toBeDefined()
  })
})

describe('Services - Test All Functions', async () => {
  //Create 'User', 'Product', 'Order' and 'Add product into order'
  beforeAll(async () => {
    await manageUser.createUser({
      first_name: 'Mohamed',
      last_name: 'Ali',
      user_email: 'mohamed@mail.com',
      user_password: 'pass123',
      user_country: 'eg' as unknown as country,
      user_phone: 2020202020
    })

    await manageProduct.createProduct({
      id: 1,
      product_name: 'item 1',
      product_code: 'A01-12',
      product_price: 200,
      product_desc: 'item 1 description',
      stock_level: 15
    })

    await manageOrder.createOrder({
      order_status: 'active',
      order_total: 260,
      user_id: 1
    })

    await manageOrder.addOrderProduct(1, {
      product_id: 1,
      product_quantity: 10,
      order_id: 1
    })
  })

  //Delete Records and reset table ids to 1
  afterAll(async () => {
    await manageOrder.removeOrderProduct(1)
    await manageOrder.deleteOrder(1)
    await manageProduct.deleteProduct(1)
    await manageUser.deleteUser(1)

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



  //Test the "productInOrder" function
  it('Show One product info in an order - test method', async () => {
    await services.productInOrder(1).then((data) => {
      expect(data).toEqual({
        id: 1,
        order_status: 'active',
        order_total: 260
      })
    })
  })

  //Test the "showUsersList" function
  it('Show All Orders details with products - test method', async () => {
    await services.allOrdersWithDetails().then((data) => {
      expect(data).toEqual([
        {
          id: 1,
          user_id: '1' as unknown as number,
          product_id: '1' as unknown as number,
          product_quantity: 10,
          order_status: 'active',
          order_total: 260
        }
      ])
    })
  })

  //Test the "updateUser" function
  it('Show order details with products - test method', async () => {
    await services.singleOrderWithDetails(1).then((data) => {
      expect(data).toEqual([
        {
          id: 1,
          user_id: '1' as unknown as number,
          product_id: '1' as unknown as number,
          product_quantity: 10,
          order_status: 'active',
          order_total: 260
        }
      ])
    })
  })
})
