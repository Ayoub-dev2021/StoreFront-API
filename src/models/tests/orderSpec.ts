import { manageOrders, order } from '../order'
import { ManageUsers, userData, country } from '../user_info'
import { manageProducts, product } from '../product'
import client from '../../database'

const manageOrder = new manageOrders()
const manageUser = new ManageUsers()
const manageProduct = new manageProducts()

describe('Order CRUD functions should be defined', () => {
  it('Show Order method should be defined', () => {
    expect(manageOrder.showOrder).toBeDefined()
  })

  it('Show All Orders method should be defined', () => {
    expect(manageOrder.showAllOrders).toBeDefined()
  })

  it('Show All Orders by User id method should be defined', () => {
    expect(manageOrder.showOrdersByUser).toBeDefined()
  })

  it('Create New Order method should be defined', () => {
    expect(manageOrder.createOrder).toBeDefined()
  })

  it('Update Order method should be defined', () => {
    expect(manageOrder.updateOrder).toBeDefined()
  })

  it('Delete an Order method should be defined', () => {
    expect(manageOrder.deleteOrder).toBeDefined()
  })

  it('Add Product to the Order method should be defined', () => {
    expect(manageOrder.addOrderProduct).toBeDefined()
  })

  it('Remove Product from the Order method should be defined', () => {
    expect(manageOrder.removeOrderProduct).toBeDefined()
  })

  it('Cancel the Order method should be defined', () => {
    expect(manageOrder.cancelTheOrder).toBeDefined()
  })

  it('Complete the Order method should be defined', () => {
    expect(manageOrder.submitTheOrder).toBeDefined()
  })

  it('ReOpen the Order method should be defined', () => {
    expect(manageOrder.reOpenTheOrder).toBeDefined()
  })
})

describe('Order Model - Test All CRUD actions', async () => {
  //Create a "user" for and "product" test 
  beforeAll(async () => {
    await manageUser.createUser({
      first_name: 'John',
      last_name: 'Stewart',
      user_email: 'ayoub@email.com',
      user_password: 'pass123',
      user_country: 'ae' as unknown as country,
      user_phone: 101010101010
    })
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

  //Test the "createOrder" function
  it('Create New Order test method', async () => {
    await manageOrder
      .createOrder({
        order_status: 'active',
        order_total: 260,
        user_id: 1
      })
      .then((orderData) => {
        expect(orderData).toEqual({
          order_status: 'active',
          order_total: 260,
          user_id: '1' as unknown as number,
          id: 1
        })
      })
  })

  //Test the "showOrder" function
  it('Show One Order test method', async () => {
    await manageOrder.showOrder(1).then((orderData) => {
      expect(orderData).toEqual({
        id: 1,
        order_status: 'active',
        order_total: 260,
        user_id: '1' as unknown as number
      })
    })
  })

  //Test the "showAllOrders" function
  it('Show All Orders test method', async () => {
    await manageOrder.showAllOrders().then((ordersData) => {
      expect(ordersData).toEqual([
        {
          id: 1,
          order_status: 'active',
          order_total: 260,
          user_id: '1' as unknown as number
        }
      ])
    })
  })


    //Test the "showOrdersByUser" function
    it('Show All Orders by user id method', async () => {
      await manageOrder.showOrdersByUser(1).then((ordersData) => {
        expect(ordersData).toEqual([
          {
            id: 1,
            order_status: 'active',
            order_total: 260,
            user_id: '1' as unknown as number
          }
        ])
      })
    })

  //Test the "updateOrder" function
  it('Update Order method test', async () => {
    await manageOrder
      .updateOrder(1, {
        order_status: 'active',
        order_total: 300,
        user_id: '1' as unknown as number
      })
      .then((updatedOrder) => {
        expect(updatedOrder).toEqual({
          order_status: 'active',
          order_total: 300,
          user_id: '1' as unknown as number,
          id: 1
        })
      })
  })

  //Test the "sbmitOrder" function
  it('Submit Order method test', async () => {
    await manageOrder.submitTheOrder(1).then((submittedOrder) => {
      expect(submittedOrder).toEqual({
        order_status: 'complete',
        order_total: 300,
        user_id: '1' as unknown as number,
        id: 1
      })
    })
  })

  //Test the "cancelTheOrder" function
  it('Cancel Order method test', async () => {
    await manageOrder.cancelTheOrder(1).then((cancelledOrder) => {
      expect(cancelledOrder).toEqual({
        order_status: 'cancelled',
        order_total: 300,
        user_id: '1' as unknown as number,
        id: 1
      })
    })
  })

  //Test the "reOpenOrder" function
  it('ReOpen Order method test', async () => {
    await manageOrder.reOpenTheOrder(1).then((reOpenOrder) => {
      expect(reOpenOrder).toEqual({
        order_status: 'active',
        order_total: 300,
        user_id: '1' as unknown as number,
        id: 1
      })
    })
  })

  //Test the "addOrderProduct" function
  it('Add Product to the Order method test', async () => {
    await manageProduct.createProduct({
      product_name: 'item 1',
      product_code: 'A00-12',
      product_price: 150,
      product_desc: 'item 1 description',
      stock_level: 10
    })
    await manageOrder
      .addOrderProduct(1, {
        product_id: 1,
        product_quantity: 10,
        order_id: 1
      })
      .then((result) => {
        expect(result).toEqual({
          id: 1,
          product_id: '1' as unknown as number,
          product_quantity: 10,
          order_id: '1' as unknown as number
        })
      })
  })

  //Test the "removeOrderProduct" function
  it('Remove Product to the Order method test', async () => {
    await manageOrder.removeOrderProduct(1).then((result) => {
      expect(result).toEqual('The item has been removed from the order successfully')
    })
  })

  //Test the "deleteOrder" function
  it('Delete Order test method', async () => {
    await manageOrder.deleteOrder(1).then((result) => {
      expect(result).toEqual(undefined)
    })
  })
})
