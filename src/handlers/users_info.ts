import express, { Application, Request, Response } from 'express'
import { ManageUsers, userData } from '../models/user_info'
import jwt from 'jsonwebtoken'
import { verifyToken } from '../middleware/validations'

const manageUser = new ManageUsers()

const showAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await manageUser.showUsersList()
    res.json(users)
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}

const showUserInfo = async (req: Request, res: Response) => {
  try {
    const user = await manageUser.showUser(req.params.id as unknown as number)
    res.json(user)
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}

export class auth {
  getToken = (userInfo: { name: string; pass: string }) => {
    const token = jwt.sign({ user: userInfo }, process.env.JWT_SECRET as unknown as string)
    return token
  }
}

const addNewUser = async (req: Request, res: Response) => {
  try {
    const user = await manageUser.createUser(req.body)
    const jwtToken = jwt.sign({ user: user }, process.env.JWT_SECRET as unknown as string)
    res.json({
      user: user,
      token: jwtToken
    })
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}

const updateUserInfo = async (req: Request, res: Response) => {
  try {
    const user = await manageUser.updateUser(req.params.id as unknown as number, req.body)
    res.json(user)
  } catch (err) {
    res.status(400)
    res.json(`Bad request ${err}`)
  }
}

const deleteUser = async (req: Request, res: Response) => {
  try {
    const user = await manageUser.deleteUser(req.params.id as unknown as number)
    res.json(user)
  } catch (err) {
    res.status(400)
    res.json('Could not delete the user,please check if the user has orders')
  }
}

const login = async (req: Request, res: Response) => {
  try {
    const user = await manageUser.authenticate(req.body.user_email, req.body.user_password)
    res.json(user)
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}

const userRouts = (app: express.Application) => {
  app.get('/api/users/list', verifyToken, showAllUsers)
  app.get('/api/users/:id', verifyToken, showUserInfo)
  app.post('/api/users', addNewUser)
  app.put('/api/users/:id', verifyToken, updateUserInfo)
  app.delete('/api/users/:id', verifyToken, deleteUser)
  app.post('/users/login', verifyToken, login)
}

export default userRouts
