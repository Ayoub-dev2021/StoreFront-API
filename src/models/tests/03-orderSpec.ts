import { manageOrders } from '../order'
import { ManageUsers, country } from '../user_info'
import { manageProducts } from '../product'

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
  //Test the "createOrder" function
  it('Create New Order test method', async () => {
    await manageUser.createUser({
      first_name: 'Sara',
      last_name: 'Adam',
      user_email: 'Sara@email.com',
      user_password: 'pass123',
      user_country: 'ae' as unknown as country,
      user_phone: 101010101010
    })
    await manageOrder
      .createOrder({
        order_status: 'active',
        order_total: 260,
        user_id: 2
      })
      .then((orderData) => {
        expect(orderData).toEqual({
          order_status: 'active',
          order_total: 260,
          user_id: '2' as unknown as number,
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
        user_id: '2' as unknown as number
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
          user_id: '2' as unknown as number
        }
      ])
    })
  })

  //Test the "showOrdersByUser" function
  it('Show All Orders by user id method', async () => {
    await manageOrder.showOrdersByUser(2).then((ordersData) => {
      expect(ordersData).toEqual([
        {
          id: 1,
          order_status: 'active',
          order_total: 260,
          user_id: '2' as unknown as number
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
        user_id: '2' as unknown as number
      })
      .then((updatedOrder) => {
        expect(updatedOrder).toEqual({
          order_status: 'active',
          order_total: 300,
          user_id: '2' as unknown as number,
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
        user_id: '2' as unknown as number,
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
        user_id: '2' as unknown as number,
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
        user_id: '2' as unknown as number,
        id: 1
      })
    })
  })

  //Test the "addOrderProduct" function
  it('Add Product to the Order method test', async () => {
    await manageProduct.createProduct({
      product_name: 'item 2',
      product_code: 'B00-12',
      product_price: 150,
      product_desc: 'item 2 description',
      stock_level: 10
    })
    await manageOrder
      .addOrderProduct(1, {
        product_id: 2,
        product_quantity: 10,
        order_id: 1
      })
      .then((result) => {
        expect(result).toEqual({
          id: 1,
          product_id: '2' as unknown as number,
          product_quantity: 10,
          order_id: '1' as unknown as number
        })
      })
  })

  //Test the "removeOrderProduct" function
  it('Remove Product from the Order method test', async () => {
    await manageOrder.removeOrderProduct(1).then((result) => {
      expect(result).toEqual('The item has been removed from the order successfully')
    })
  })

  //Test the "deleteOrder" function
  it('Delete Order test method', async () => {
    await manageOrder.deleteOrder(1).then((result) => {
      expect(result).toEqual('The order with id:1 is deleted successfully')
    })
  })
})
