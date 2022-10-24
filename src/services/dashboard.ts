import client from '../database'

export type orderedProducts = {
  id?: number
  order_status: string
  order_total: number
}

export type orderHaveProducst = {
  id?: number
  user_id: number
  product_id: number
  product_quantity: number
  order_status: string
  order_total: number
}

export class service {
  //join tables "orders" and "order_products" and return specifec ordered product instance
  //This method just to check the order stauts before removing the product from the order
  productInOrder = async (order_products_id: number): Promise<orderedProducts> => {
    try {
      const table = await client.connect()
      const joinSQL =
        'SELECT orders.id, order_status, order_total FROM orders INNER JOIN order_products ON orders.id = order_products.order_id WHERE order_products.id=($1)'
      const joinedTable = await table.query(joinSQL, [order_products_id])
      table.release()
      return joinedTable.rows[0]
    } catch (err) {
      throw new Error('Could not join tables ' + err)
    }
  }

  //join tables "orders" and "order_products" and return all orders with products inside
  allOrdersWithDetails = async (): Promise<orderHaveProducst[] | string> => {
    try {
      const table = await client.connect()
      const joinSQL =
        'SELECT orders.id, orders.user_id, product_id, product_quantity, order_status, order_total FROM orders INNER JOIN order_products ON orders.id = order_products.order_id'
      const joinedTable = await table.query(joinSQL)
      if (joinedTable.rows.length) {
        table.release()
        return joinedTable.rows
      } else {
        table.release()
        return `No orders`
      }
    } catch (err) {
      throw new Error('Could not join tables ' + err)
    }
  }

  //join tables "orders" and "order_products" and return single order with each product inside it
  singleOrderWithDetails = async (id: number): Promise<orderHaveProducst[] | string> => {
    try {
      const table = await client.connect()
      const joinSQL =
        'SELECT orders.id,orders.user_id, product_id, product_quantity, order_status, order_total FROM orders INNER JOIN order_products ON orders.id = order_products.order_id WHERE orders.id=$1'
      const joinedTable = await table.query(joinSQL, [id])

      if (joinedTable.rows.length) {
        table.release()
        return joinedTable.rows
      } else {
        table.release()
        return `order with id number ${id} is not exist`
      }
    } catch (err) {
      throw new Error('Could not join tables ' + err)
    }
  }
}
