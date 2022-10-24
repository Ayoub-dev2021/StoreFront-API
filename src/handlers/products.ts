import express, { Application, Request, Response } from 'express'
import { manageProducts } from '../models/product'
import { productIsExist, notInOrder } from '../middleware/validations'
import { verifyToken } from '../middleware/validations'

const manageProduct = new manageProducts()

const showProduct = async (req: Request, res: Response) => {
  try {
    const product = await manageProduct.showProduct(req.params.id as unknown as number)

    res.json(product)
  } catch (err) {
    res.status(400)
    res.json('Bad request ' + err)
  }
}

const showProductsList = async (req: Request, res: Response) => {
  try {
    const product = await manageProduct.showAllProducts()
    res.json(product)
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}

const addNewProduct = async (req: Request, res: Response) => {
  try {
    const product = await manageProduct.createProduct(req.body)
    res.json(product)
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}

const editProduct = async (req: Request, res: Response) => {
  try {
    const product = await manageProduct.updateProduct(req.params.id as unknown as number, req.body)
    res.json(product)
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const product = await manageProduct.deleteProduct(req.params.id as unknown as number)
    res.json(product)
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}

const productRouts = (app: express.Application) => {
  app.get('/api/products/list', showProductsList)
  app.get('/api/products/:id', showProduct)
  app.post('/api/products', verifyToken, addNewProduct)
  app.put('/api/products/:id', editProduct)
  app.delete('/api/products/:id', productIsExist, notInOrder, deleteProduct)
}

export default productRouts
