import supertest from 'supertest'
import { app } from '../../app'
import { auth } from '../users_info'

const authinticat = new auth()
export let userTokenoken: string
// create a request object
const request = supertest(app)

describe('Users Endpoints response test', () => {
  it('create users', async () => {
    const response = await request.post('/api/users').send({
      first_name: 'Ali',
      last_name: 'Hassan',
      user_email: 'mohamed@gmail.com',
      user_password: 'pass456',
      user_country: 'eg',
      user_phone: 2020202020
    })
    userTokenoken = response.body.token
    expect(response.status).toBe(200)
    expect(response.body.user.first_name).toEqual('Ali')
  })

  it('users list', async () => {
    const response = await request
      .get('/api/users/list')
      .set('Authorization', 'bearer ' + userTokenoken)
    expect(response.status).toBe(200)
    expect(Array.isArray(response.body)).toBeTrue
    expect(response.body[0].first_name).toEqual('Ali')
  })

  it('show one user', async () => {
    const response = await request
      .get('/api/users/1')
      .set('Authorization', 'bearer ' + userTokenoken)
    expect(response.status).toBe(200)
    expect(response.body.id).toEqual(1)
  })

  it('update user', async () => {
    const response = await request
      .put('/api/users/1')
      .set('Authorization', 'bearer ' + userTokenoken)
      .send({
        first_name: 'Ali',
        last_name: 'Hassan',
        user_email: 'ali@mail.com',
        user_address: 'Ali Main Address'
      })
    expect(response.status).toBe(200)
    expect(response.body.user_email).toBe('ali@mail.com')
  })

  it('update user', async () => {
    //bad request
    const response = await request
      .put('/api/users/1')
      .set('Authorization', 'bearer ' + userTokenoken)
      .send({
        first_name: 'Ali',
        last_name: 'Hassan',
        user_emai: 'ali@mail.com',
        user_address: 'Ali Main Address'
      })
    console.log(response.text)
    expect(response.status).toBe(400)
    expect(response.text.includes('Bad request Error: Could not update the user info')).toBeTrue
  })

  it('authenticate user for login', async () => {
    const response = await request.post('/users/login').set('Authorization', 'bearer ' + ' ')
    expect(response.status).toBe(401)
    expect(response.text).toEqual('unauthorized')
  })

  it('delete user', async () => {
    const response = await request
      .delete('/api/users/1')
      .set('Authorization', 'bearer ' + userTokenoken)
    expect(response.status).toBe(200)
    expect(response.body).toEqual('The user with id:1 is deleted successfully')
  })
})
