import client from '../database'
import bcrypt from 'bcrypt'

const pepper = process.env.BYCRYPT_ADDSTRNG
const saltRounds = process.env.SALT_ROUNDS
export enum country {
  'eg',
  'sa',
  'ae',
  'us',
  'kw',
  'uk',
  'fr',
  'trk'
}

export type userData = {
  id?: number
  first_name: string
  last_name: string
  user_email: string
  user_password: string
  user_phone: number | null
  user_address?: string | null
  user_country?: country | null
}

export type updateUserData = {
  id?: number
  first_name: string
  last_name: string
  user_email: string
  user_password?: string
  user_phone?: number | null
  user_address?: string | null
  user_country?: country | null
}

export class ManageUsers {
  showUser = async (id: number): Promise<userData | string> => {
    try {
      const table = await client.connect()
      const sql = 'SELECT * FROM users WHERE id=($1)'
      const sqlResult = await table.query(sql, [id])
      if (sqlResult.rows.length) {
        table.release()
        return sqlResult.rows[0]
      } else {
        table.release()
        return `The user with id:${id} is not exist`
      }
    } catch (err) {
      throw new Error(`Can't show the user info - ${err}`)
    }
  }

  showUsersList = async (): Promise<userData[]> => {
    try {
      const table = await client.connect()
      const sql = 'SELECT * FROM users'
      const sqlResult = await table.query(sql)
      table.release()
      return sqlResult.rows
    } catch (err) {
      throw new Error(`Can't show the list of users info - ${err}`)
    }
  }

  createUser = async (data: userData): Promise<userData | string> => {
    try {
      const table = await client.connect()
      const getEmail = 'SELECT * FROM users WHERE user_email=($1)'
      const checkEmail = await table.query(getEmail, [data.user_email])
      if (checkEmail.rows.length) {
        table.release()
        return 'This email is already registered, please try onther email or try to login'
      } else {
        const sql =
          'INSERT INTO users ( first_name,last_name, user_email, user_password, user_address, user_phone, user_country) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *'
        const hash = bcrypt.hashSync(data.user_password + pepper, parseInt(saltRounds as string))
        const sqlResult = await table.query(sql, [
          data.first_name,
          data.last_name,
          data.user_email,
          hash,
          data.user_address,
          data.user_phone,
          data.user_country
        ])
        table.release()
        return sqlResult.rows[0]
      }
    } catch (err) {
      throw new Error(`Could not add the new user - ${err}`)
    }
  }

  updateUser = async (id: number, data: updateUserData): Promise<userData | string> => {
    try {
      const table = await client.connect()
      const getUser = 'SELECT * FROM users WHERE id=($1)'
      const userInfo = await table.query(getUser, [id])
      if (userInfo.rows.length) {
        let savedPassword = userInfo.rows[0].user_password
        if (data.user_password != null) {
          const hash = bcrypt.hashSync(data.user_password + pepper, parseInt(saltRounds as string))
          savedPassword = hash
        }
        const sql =
          'UPDATE users SET first_name= $1, last_name= $2, user_email=$3, user_password=$4, user_address=$5, user_phone = $6, user_country=$7 WHERE id= ($8) RETURNING *'
        const sqlResult = await table.query(sql, [
          data.first_name,
          data.last_name,
          data.user_email,
          savedPassword,
          data.user_address,
          data.user_phone,
          data.user_country,
          id
        ])
        table.release()
        return sqlResult.rows[0]
      } else {
        table.release()
        return `The user with id:${id} is not exist`
      }
    } catch (err) {
      throw new Error(`Could not update the user info - ${err}`)
    }
  }

  deleteUser = async (id: number): Promise<string> => {
    try {
      const table = await client.connect()
      const getUser = 'SELECT * FROM users WHERE id=($1)'
      const userInfo = await table.query(getUser, [id])
      if (userInfo.rows.length) {
        const sql = 'DELETE FROM users WHERE id=($1)'
        await table.query(sql, [id])
        table.release()
        return `The user with id:${id} is deleted successfully`
      } else {
        table.release()
        return `The user with id:${id} is not exist`
      }
    } catch (err) {
      throw new Error(`Could not delete the user - ${err}`)
    }
  }

  authenticate = async (email: string, password: string): Promise<userData | string> => {
    try {
      const table = await client.connect()
      const sql = 'SELECT user_password FROM users WHERE user_email=($1)'
      const currentPassword = await table.query(sql, [email])

      if (currentPassword.rows.length) {
        const userPassword = currentPassword.rows[0]

        if (bcrypt.compareSync(password + pepper, userPassword.user_password)) {
          return userPassword
        } else {
          return 'Wrong password'
        }
      } else {
        return 'Wrong email'
      }
    } catch (err) {
      throw new Error('Could not authenticate the user')
    }
  }
}
