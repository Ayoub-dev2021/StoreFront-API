import { ManageUsers, userData, country } from '../user_info'
import client from '../../database'
import bCrypt from 'bcrypt'

const manageUser = new ManageUsers()

describe('User model CRUD functions should be defined', () => {
  it('Show User method should be defined', () => {
    expect(manageUser.showUser).toBeDefined()
  })

  it('Show All Users method should be defined', () => {
    expect(manageUser.showUsersList).toBeDefined()
  })

  it('Create New User method should be defined', () => {
    expect(manageUser.createUser).toBeDefined()
  })

  it('Update User method should be defined', () => {
    expect(manageUser.updateUser).toBeDefined()
  })

  it('Delete a User method should be defined', () => {
    expect(manageUser.deleteUser).toBeDefined()
  })
  it('Authenticate method should be defined', () => {
    expect(manageUser.authenticate).toBeDefined()
  })
})

describe('Users Model - Test All CRUD actions', async () => {
  //Delete Records and reset table ids to 1
  afterAll(async () => {
    const table = await client.connect()
    const sql1 = 'ALTER SEQUENCE users_id_seq RESTART WITH 1'

    await table.query(sql1)
  })

  //Test the "createUser" function
  it('Create New User test method', async () => {
    await manageUser
      .createUser({
        first_name: 'Mohamed',
        last_name: 'Ali',
        user_email: 'mohamed@mail.com',
        user_password: 'pass123',
        user_country: 'eg' as unknown as country,
        user_phone: 2020202020
      })
      .then((userData) => {
        expect((userData as userData).first_name).toEqual('Mohamed')
      })
  })

  //Test the "showUser" function
  it('Show One User test method', async () => {
    await manageUser.showUser(1).then((userData) => {
      expect((userData as userData).user_email).toEqual('mohamed@mail.com')
    })
  })

  //Test the "showUsersList" function
  it('Show All Users test method', async () => {
    await manageUser.showUsersList().then((usersData) => {
      expect(usersData.length).toEqual(1)
    })
  })

  //Test the "updateUser" function
  it('Update User method test', async () => {
    await manageUser
      .updateUser(1, {
        first_name: 'Mohamed',
        last_name: 'Ali',
        user_email: 'mohamed@mail.com',
        user_address: 'Moahmed Main Address'
      })
      .then((updatedUser) => {
        expect((updatedUser as userData).user_address).toEqual('Moahmed Main Address')
      })
  })

  //Test user "authenticate" function
  it('Authenticate User test method', async () => {
    const pepper = process.env.BYCRYPT_ADDSTRNG
    await manageUser.authenticate('mohamed@mail.com', 'pass123').then((result) => {
      expect(bCrypt.compareSync('pass123' + pepper, (result as userData).user_password)).toEqual(
        true
      )
    })
  })

  //Test the "deleteUser" function
  it('Delete User test method', async () => {
    await manageUser.deleteUser(1).then((result) => {
      expect(result).toEqual('The user with id:1 is deleted successfully')
    })
  })
})
