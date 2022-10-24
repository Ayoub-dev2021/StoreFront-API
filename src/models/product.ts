import client from '../database'

export type product = {
  id?: number
  product_name: string
  product_code: string
  product_price: number
  product_desc?: string
  stock_level?: number
}

export class manageProducts {
  showProduct = async (id: number): Promise<product> => {
    try {
      const table = await client.connect()
      const sql = 'SELECT * FROM products WHERE id=($1)'
      const product = await table.query(sql, [id])
      table.release()

      return product.rows[0]
    } catch (err) {
      throw new Error(`Could not show the product info - ${err}`)
    }
  }

  showAllProducts = async (): Promise<product[]> => {
    try {
      const table = await client.connect()
      const sql = 'SELECT * FROM products'
      const product = await table.query(sql)
      table.release()
      return product.rows
    } catch (err) {
      throw new Error(`Could not show the products info - ${err}`)
    }
  }

  createProduct = async (data: product): Promise<product> => {
    try {
      const table = await client.connect()
      const sql =
        'INSERT INTO products (product_name, product_code, product_price, product_desc, stock_level) VALUES ($1, $2, $3, $4, $5) RETURNING *'
      const product = await table.query(sql, [
        data.product_name,
        data.product_code,
        data.product_price,
        data.product_desc,
        data.stock_level
      ])
      table.release()
      return product.rows[0]
    } catch (err) {
      throw new Error(`Could not add the new product - ${err}`)
    }
  }

  updateProduct = async (id: number, data: product): Promise<product> => {
    try {
      const table = await client.connect()
      const sql =
        'UPDATE products SET product_name=$1, product_code=$2, product_price=$3, product_desc=$4, stock_level=$5 WHERE id=($6) RETURNING *'
      const product = await table.query(sql, [
        data.product_name,
        data.product_code,
        data.product_price,
        data.product_desc,
        data.stock_level,
        id
      ])
      table.release()
      return product.rows[0]
    } catch (err) {
      throw new Error(`Could not update the product - ${err}`)
    }
  }

  deleteProduct = async (id: number): Promise<product | string> => {
    try {
      const table = await client.connect()
      const sql = 'DELETE FROM products WHERE id=($1)'
      const product = await table.query(sql, [id])
      table.release()
      return `The product with id:${id} is deleted successfully`
    } catch (err) {
      throw new Error(`Could not delete the product - ${err}`)
    }
  }
}
