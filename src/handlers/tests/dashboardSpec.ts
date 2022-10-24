import supertest from 'supertest'
import { app } from '../../app'
import { ManageUsers, country } from '../../models/user_info'
import { manageProducts } from '../../models/product'
import { manageOrders } from '../../models/order'
import { service } from '../../services/dashboard'
import client from '../../database'

// create a request object
const request = supertest(app)

const manageUser = new ManageUsers()
const manageProduct = new manageProducts()
const manageOrder = new manageOrders()
const services = new service()

describe('Dashboard Enpoints Response Test', ()=>{

    //Creat "user", "product" and "order" before tests
    beforeAll(async () => {

        //Create a user
        await manageUser.createUser({
          first_name: 'John',
          last_name: 'Stewart',
          user_email: 'ayoub@email.com',
          user_password: 'pass123',
          user_country: 'ae' as unknown as country,
          user_phone: 101010101010
        })
    
        //Create a product
        await manageProduct.createProduct({
                product_name:"item 1",
                product_code:"A00-11",
                product_price: 120,
                product_desc: "item 1 desc",
                stock_level:15
          })

          //Create an order
          await manageOrder.createOrder({
                user_id:1,
                order_status:"active",
                order_total:1500
         })

        //Add product in the order
         await manageOrder.addOrderProduct(1,{
          product_id: 1,
          product_quantity: 5
        })
    })


    it('Get all orders in details - each product',async ()=>{
        const response = await request.get('/api/order_details/list')
        expect(response.status).toBe(200)
    })

    it('Get single order in details -  each product',async ()=>{
        const response = await request.get('/api/order_details/1')
        expect(response.status).toBe(200)
    })

        //Delete Records and reset table ids to 1
        afterAll(async () => {
            await manageOrder.removeOrderProduct(1)
            await manageOrder.deleteOrder(1)
            await manageProduct.deleteProduct(1)
            await manageUser.deleteUser(1)

            const table = await client.connect()
            const sql1 = 'ALTER SEQUENCE orders_id_seq RESTART WITH 1'
            const sql2 = 'ALTER SEQUENCE users_id_seq RESTART WITH 1'
            const sql3 = 'ALTER SEQUENCE products_id_seq RESTART WITH 1'
            const sql4 = 'ALTER SEQUENCE order_products_id_seq RESTART WITH 1'
        
            await table.query(sql1)
            await table.query(sql2)
            await table.query(sql3)
            await table.query(sql4)
          })
    
})

