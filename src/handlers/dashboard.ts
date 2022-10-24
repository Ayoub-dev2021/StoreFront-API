import express, { Request, Response } from 'express'
import { service } from '../services/dashboard'

const services = new service()

const ordersWithProducts = async (req: Request, res: Response) => {
  try {
    const result = await services.allOrdersWithDetails()
    res.json(result)
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}

const orderWithProducts = async (req: Request, res: Response) => {
  try {
    const result = await services.singleOrderWithDetails(req.params.id as unknown as number)
    res.json(result)
  } catch (err) {
    res.status(400)
    res.json('Bad request' + err)
  }
}

const servicesRouts = (app: express.Application) => {
  app.get('/api/order_details/list', ordersWithProducts)
  app.get('/api/order_details/:id', orderWithProducts)
}

export default servicesRouts
