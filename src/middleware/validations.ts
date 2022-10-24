import express, { Application, Request, Response } from 'express'
import { manageOrders } from '../models/order'
import { manageProducts } from '../models/product'
import jwt from 'jsonwebtoken'

const manageOrder = new manageOrders()
const manageProduct = new manageProducts()
export const verifyToken = (req: Request, res: Response, next: () => void) => {
  try {
    const auth = req.headers.authorization
    const token = auth?.split(' ')[1]
    const check = jwt.verify(token as string, process.env.JWT_SECRET as unknown as string)
    next()
  } catch (err) {
    res.status(401)
    res.send('unauthorized')
  }
}

export const OrderIsExist = async (req: Request, res: Response, next: () => void) => {
  try {
    const getOrder = await manageOrder.checkOrder(req.params.id as unknown as number)
    if (getOrder == undefined) {
      res.json('The order is not exist')
      return
    } else {
      next()
    }
  } catch (err) {
    res.status(401)
    res.send('Error: Wrong request ')
  }
}

export const productIsExist = async (req: Request, res: Response, next: () => void) => {
  try {
    const getProduct = await manageProduct.showProduct(req.params.id as unknown as number)
    if (getProduct == undefined) {
      res.json('The product is not exist')
      return
    } else {
      next()
    }
  } catch (err) {
    res.status(401)
    res.send('Error: Wrong request ')
  }
}

export const notInOrder = async (req: Request, res: Response, next: () => void) => {
  try {
    const product = await manageOrder.showProductInOrders(req.params.id as unknown as number)

    if (product.length) {
      res.json(
        `Product with id: ${req.params.id} is already in order, remove the products from related orders first`
      )
      return
    } else {
      next()
    }
  } catch (err) {
    res.status(401)
    res.send('Error: Wrong request ')
  }
}
