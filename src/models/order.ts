import client from '../database'
import { service } from '../services/dashboard'

const services = new service()

export type order = {
  id?: number
  order_status: string
  order_total: number
  user_id: number
}

export type productInOrder = {
  id?: number
  order_id?: number
  product_id: number
  product_quantity: number
}

export class manageOrders {
  //Create new order
  createOrder = async (data: order): Promise<order> => {
    try {
      const table = await client.connect()
      const sql =
        'INSERT INTO orders (order_status, order_total, user_id) VALUES ($1, $2, $3) RETURNING *'

      const order = await table.query(sql, [data.order_status, data.order_total, data.user_id])

      table.release()
      return order.rows[0]
    } catch (err) {
      throw new Error(`Could not add the new order - ${err}`)
    }
  }

  //Show Specifc order info using order's id
  showOrder = async (id: number): Promise<order> => {
    try {
      const table = await client.connect()
      const sql = 'SELECT * FROM orders WHERE id=($1)'
      const order = await table.query(sql, [id])
      table.release()
      return order.rows[0]
    } catch (err) {
      throw new Error(`Could not show the order info - ${err}`)
    }
  }

  //Show Specifc order info using order's id
  showOrdersByUser = async (user_id: number): Promise<order[]> => {
    try {
      const table = await client.connect()
      const sql = 'SELECT * FROM orders WHERE user_id=($1) '
      const order = await table.query(sql, [user_id])
      table.release()
      return order.rows
    } catch (err) {
      throw new Error(`Could not show the orders - ${err}`)
    }
  }

  //Show all orders list
  showAllOrders = async (): Promise<order[]> => {
    try {
      const table = await client.connect()
      const sql = 'SELECT * FROM orders'
      const order = await table.query(sql)
      table.release()
      return order.rows
    } catch (err) {
      throw new Error(`Could not show the orders info - ${err}`)
    }
  }

  //Edit specific order using order's id
  updateOrder = async (id: number, data: order): Promise<order> => {
    try {
      const table = await client.connect()
      const sql =
        'UPDATE orders SET order_status=$1, order_total=$2, user_id=$3 WHERE id=($4) RETURNING *'
      const order = await table.query(sql, [data.order_status, data.order_total, data.user_id, id])
      table.release()
      return order.rows[0]
    } catch (err) {
      throw new Error(`Could not update the order - ${err}`)
    }
  }

  //Add product to specific order using order's id
  addOrderProduct = async (id: number, data: productInOrder): Promise<productInOrder | string> => {
    try {
      const table = await client.connect()
      const getProduct = 'SELECT * FROM products WHERE id=($1)'
      const result = await table.query(getProduct, [data.product_id])
      if (result.rows.length) {
        const order = await this.showOrder(id)
        if (order.order_status != 'active') {
          return `The order's current status is ${order.order_status}, you have to "Active" the order first`
        }
        const sql =
          'INSERT INTO order_products (product_id, product_quantity, order_id) VALUES ($1, $2, $3) RETURNING *'
        const productInOrder = await table.query(sql, [data.product_id, data.product_quantity, id])
        table.release()
        return productInOrder.rows[0]
      } else {
        table.release()
        return 'The product is not exist'
      }
    } catch (err) {
      throw new Error(`Could not add product to the order- ${err}`)
    }
  }

  //Show product registerd in orders
  showProductInOrders = async (id: number): Promise<productInOrder[]> => {
    try {
      const table = await client.connect()
      const sql = 'SELECT * FROM order_products WHERE product_id=($1)'
      const order = await table.query(sql, [id])
      table.release()
      return order.rows
    } catch (err) {
      throw new Error(`Could not show the orderd product  info - ${err}`)
    }
  }

  showAllOrderProducts = async (): Promise<productInOrder[]> => {
    try {
      const table = await client.connect()
      const sql = 'SELECT * FROM order_products'
      const order = await table.query(sql)
      table.release()
      return order.rows
    } catch (err) {
      throw new Error(`Could not show the orderd product  info - ${err}`)
    }
  }

  //Remove the product from the order using order_products id
  removeOrderProduct = async (id: number): Promise<productInOrder | undefined | string> => {
    try {
      const table = await client.connect()
      const orderProduct = await services.productInOrder(id)

      if (orderProduct.order_status != 'active') {
        table.release()
        return `The order's current status is ${orderProduct.order_status}, you have to "Active" the order first`
      }

      const sql = 'DELETE FROM order_products WHERE id=($1)'
      const order = await table.query(sql, [id])
      table.release()
      return `The item has been removed from the order successfully`
    } catch (err) {
      throw new Error(`Could not remove the product from the order - ${err}`)
    }
  }

  //Submit the order and change the Order_Status to "complete"
  submitTheOrder = async (id: number): Promise<order> => {
    try {
      const table = await client.connect()
      const sql = "UPDATE orders SET order_status='complete' WHERE id=($1) RETURNING *"
      const order = await table.query(sql, [id])
      table.release()
      return order.rows[0]
    } catch (err) {
      throw new Error(`Could not delete the order - ${err}`)
    }
  }

  //Cancel the order and change the Order_Status to "cancelled"
  cancelTheOrder = async (id: number): Promise<order> => {
    try {
      const table = await client.connect()
      const sql = "UPDATE orders SET order_status='cancelled' WHERE id=($1) RETURNING *"
      const order = await table.query(sql, [id])
      table.release()
      return order.rows[0]
    } catch (err) {
      throw new Error(`Could not delete the order - ${err}`)
    }
  }

  //Chnage order status to "active"
  reOpenTheOrder = async (id: number): Promise<order> => {
    try {
      const table = await client.connect()
      const sql = "UPDATE orders SET order_status='active' WHERE id=($1) RETURNING *"
      const order = await table.query(sql, [id])
      table.release()
      return order.rows[0]
    } catch (err) {
      throw new Error(`Could not delete the order - ${err}`)
    }
  }

  //Get specific order using order's id, but using it as a validation
  checkOrder = async (id: number): Promise<order> => {
    try {
      const table = await client.connect()
      const checkOrder = 'SELECT * FROM orders WHERE id=($1)'
      const result = await table.query(checkOrder, [id])
      table.release()
      return result.rows[0]
    } catch (err) {
      throw new Error(`Could not check the order - ${err}`)
    }
  }

  //Delete specific order using order's id
  deleteOrder = async (id: number): Promise<order | undefined | string> => {
    try {
      const table = await client.connect()
      const sql = 'DELETE FROM orders WHERE id=($1)'
      const order = await table.query(sql, [id])

      table.release()
      return `The order with id:${id} is deleted successfully`
    } catch (err) {
      throw new Error(`Could not delete the order - ${err}`)
    }
  }
}
