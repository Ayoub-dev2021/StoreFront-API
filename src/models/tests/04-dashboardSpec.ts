import { service } from '../../services/dashboard'
import { ManageUsers } from '../user_info'
import { manageOrders } from '../order'
import { manageProducts } from '../product'

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
  //Test the "Show All Orders details with products" function
  it('Show All Orders details with products - test method', async () => {
    await manageOrder.createOrder({
      order_status: 'active',
      order_total: 260,
      user_id: 2
    })

    await manageOrder.addOrderProduct(2, {
      product_id: 2,
      product_quantity: 10
    })
    await services.allOrdersWithDetails().then((data) => {
      expect(data).toEqual([
        {
          id: 2,
          user_id: '2' as unknown as number,
          product_id: '2' as unknown as number,
          product_quantity: 10,
          order_status: 'active',
          order_total: 260
        }
      ])
    })
  })

  //Show one Order in details with products
  it('Show order details with products - test method', async () => {
    await services.singleOrderWithDetails(2).then((data) => {
      expect(data).toEqual([
        {
          id: 2,
          user_id: '2' as unknown as number,
          product_id: '2' as unknown as number,
          product_quantity: 10,
          order_status: 'active',
          order_total: 260
        }
      ])
    })
  })
})
