import { manageOrders } from '../models/order'
import express, { Request, Response } from 'express'
import { OrderIsExist } from '../middleware/validations'

const manageOrder = new manageOrders()

const showOrder = async (req: Request, res: Response) => {
  try {
    const order = await manageOrder.showOrder(req.params.id as unknown as number)
    res.json(order)
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}

const showOrdersList = async (req: Request, res: Response) => {
  try {
    const orders = await manageOrder.showAllOrders()
    res.json(orders)
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}

const showOrderstByUserID = async (req: Request, res: Response) => {
  try {
    const orders = await manageOrder.showOrdersByUser(req.params.id as unknown as number)
    res.json(orders)
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}

const addNewOrder = async (req: Request, res: Response) => {
  try {
    const order = await manageOrder.createOrder(req.body)
    res.json(order)
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}

const updateOrder = async (req: Request, res: Response) => {
  try {
    const order = await manageOrder.updateOrder(req.params.id as unknown as number, req.body)
    res.json(order)
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}

const deleteOrder = async (req: Request, res: Response) => {
  try {
    const order = await manageOrder.deleteOrder(req.params.id as unknown as number)
    res.json(order)
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}

const closeOrder = async (req: Request, res: Response) => {
  try {
    const order = await manageOrder.submitTheOrder(req.params.id as unknown as number)
    res.json({
      message: 'The order is complete',
      order: order
    })
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}
const reOpenOrder = async (req: Request, res: Response) => {
  try {
    const order = await manageOrder.reOpenTheOrder(req.params.id as unknown as number)
    res.json({
      message: 'The order is active',
      order: order
    })
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}

const cancelTheOrder = async (req: Request, res: Response) => {
  try {
    const order = await manageOrder.cancelTheOrder(req.params.id as unknown as number)
    res.json({
      message: 'The order is cancelled',
      order: order
    })
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}

const addProductToOrder = async (req: Request, res: Response) => {
  try {
    const order = await manageOrder.addOrderProduct(req.params.id as unknown as number, req.body)
    res.json(order)
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}

const removeProductFromOrder = async (req: Request, res: Response) => {
  try {
    const order = await manageOrder.removeOrderProduct(req.params.id as unknown as number)
    res.json(order)
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}

const showOrderProductsList = async (req: Request, res: Response) => {
  try {
    const order = await manageOrder.showAllOrderProducts()
    res.json(order)
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}

const showProductAddedToOrders = async (req: Request, res: Response) => {
  try {
    const order = await manageOrder.showProductInOrders(req.params.id as unknown as number)
    res.json(order)
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}

const ordersRouts = (app: express.Application) => {
  app.get('/api/orders/list', showOrdersList)
  app.get('/api/orders/:id', OrderIsExist, showOrder) //order id
  app.get('/api/orders/user/:id', showOrderstByUserID) //user id
  app.post('/api/orders', addNewOrder)
  app.put('/api/orders/:id', OrderIsExist, updateOrder) //order id
  app.delete('/api/orders/:id', OrderIsExist, deleteOrder) //order id
  app.put('/api/orders/:id/submit', OrderIsExist, closeOrder) //order id then '/submit'
  app.put('/api/orders/:id/cancel', OrderIsExist, cancelTheOrder) //order id then '/cancel'
  app.put('/api/orders/:id/active', OrderIsExist, reOpenOrder) //order id then '/active'
  app.post('/api/orders/:id/product', OrderIsExist, addProductToOrder) //order id then '/product' (send product data in the request body)
  app.get('/api/order_products/list', showOrderProductsList)
  app.get('/api/order_products/:id', showProductAddedToOrders) //ordered product id
  app.delete('/api/order_products/:id', removeProductFromOrder) //ordered product id
}

export default ordersRouts
