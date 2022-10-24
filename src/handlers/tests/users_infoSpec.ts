import supertest from 'supertest'
import { app } from '../../app'
import { auth } from '../users_info'
import client from '../../database'

const authinticat = new auth()

// create a request object
const request = supertest(app)

describe('Users Endpoints response test', () => {
  let token: string
  beforeAll(async () => {
    //Get token
    token = authinticat.getToken({ name: 'mohamed', pass: 'pass123' })
  })

  //Delete Records and reset table ids to 1
  afterAll(async () => {
    const table = await client.connect()
    const sql1 = 'ALTER SEQUENCE users_id_seq RESTART WITH 1'

    await table.query(sql1)
  })

  it('create users', async () => {
    const response = await request.post('/api/users').send({
      user_name: 'Ali',
      user_email: 'mohamed@gmail.com',
      user_password: 'pass456',
      user_country: 'eg',
      user_phone: 2020202020
    })
    expect(response.status).toBe(200)
  })

  it('users list', async () => {
    const response = await request.get('/api/users/list').set('Authorization', 'bearer ' + token)
    expect(response.status).toBe(200)
  })

  it('show one user', async () => {
    const response = await request.get('/api/users/1').set('Authorization', 'bearer ' + token)
    expect(response.status).toBe(200)
  })

  it('update user', async () => {
    const response = await request
      .put('/api/users/3')
      .set('Authorization', 'bearer ' + token)
      .send({
        user_name: 'Ali',
        user_email: 'ali@mail.com',
        user_address: 'Ali Main Address'
      })
    expect(response.status).toBe(200)
  })

  it('delete user', async () => {
    const response = await request.delete('/api/users/1').set('Authorization', 'bearer ' + token)
    expect(response.status).toBe(200)
  })
})
