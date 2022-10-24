import express, { Application, Request, Response } from 'express'
import userRouts from './handlers/users_info'
import productRouts from './handlers/products'
import orderRouts from './handlers/orders'
import servicesRouts from './handlers/dashboard'
import bodyParser from 'body-parser'
import cors from 'cors'

// create an instance server
const app: Application = express()
// HTTP request logger middleware

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

// add routing for / path
app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Hellow Worl 🌍'
  })
})

userRouts(app)
productRouts(app)
orderRouts(app)
servicesRouts(app)

export { app }
