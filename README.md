# StoreFront RESTFull API Project

## Table of Contents
- Packages Used
- Scripts
- Enviroment Variables
- Instructions To Start the Server
- Testing
- Database Schema
- API Docs


## Packages Used in This Project:
  - express [`npm i express`]  [`npm i --save-dev @types/express`]
  - typescript [`npm i typescript`]
  - ts-node [`npm i ts-node`]
  - prettier  [`npm i --save-dev prettier`]
  - eslint  [`npm i eslint --save-dev`] [`npm i --save-dev eslint-config-prettier`] [`npm i --save-dev eslint-plugin-jasmine`] [`npm i --save-dev eslint-plugin-prettier`]
  - pg  [`npm i pg`] [`npm i --save-dev @types/pg`]
  - db-migrate [`npm i db-migrate`]
  - db-migrate-pg  [`npm i db-migrate-pg`]
  - postgres [`npm i postgres`]
  - jasmine [`npm i --save-dev jasmine`] [`npm i --save-dev @types/jasmine`] 
  - jasmine-spec-reporter [`npm i --save-dev jasmine-spec-reporter`]
  - supertest [`npm i --save-dev supertest`] [`npm i --save-dev @types/supertest`]
  - nodemon [`npm i --save-dev nodemon`]
  - cors [`npm i cors`]
  - bcrypt [`npm i bcrypt`] [`npm i --save-dev @types/bcrypt`]
  - jsonwebtoken [`npm i jsonwebtoken`] [`npm i --save-dev @types/jsonwebtoken`]
  - dotenv [`npm i dotenv`]

## Scripts
  - npm start : to start the server
  - npm format: to format code using prettier
  - npm lint  : to check syntax error usin eslint
  - npm test  : to build and run tests
  - db-migrate up: create the schema
  - db-migrate down -c 4: delete the schema


## Enviroment Variables

  - POSTGRES_DB=store_front
  - POSTGRES_DB_TEST= store_front_test
  - PORT=5432
  - HOST= 127.0.0.1
  - POSTGRES_USER=ayoub
  - POSTGRES_PASSWORD=123456
  - ENV=dev
  - BYCRYPT_ADDSTRNG=welcome-user
  - SALT_ROUNDS=10
  - JWT_SECRET=auth_secert

## Instructions To Start:

  ### Create Databse
      You have to create two new database using PostgresSQL:

       store_front
         -- CREATE DATABASE store_front;

       store_front_test (for testing)
         -- CREATE DATABASE store_front_test;

  ### Create New User and Grant All Privileges
    You have to create a new user to match the '.env' and 'database.json' configurations, also give him all the preivileges on both 'store_front' and 'store_front_test'.

     --  CREATE USER ayoub WITH PASSWORD '123456';

     --  GRANT ALL PRIVILEGES ON DATABASE store_front TO ayoub;
     --  GRANT ALL PRIVILEGES ON DATABASE store_front_test TO ayoub;

  ### Run the Migration
    
    -- db-migrate up

  ### Run the Server
    -- npm start

  ## (Ports):
  > - DATABASE port: 5432
  >- Server port: 4040



## Database Schema
### Users Table
        - User id (SERIAL) (PK)
        - User First Name (VARCHAR)
        - User Last Name (VARCHAR)
        - User Email (VARCHAR)
        - User Password (VARCHAR)
        - User Address (TEXT)
        - User Phone (INTEGER)
        - User Country (TYPE country ['eg', 'sa', 'ae', 'us','kw','uk','fr','trk'])

### Product Table
        - Product id (SERIAL) (PK)
        - Product Name (VARCHAR)
        - Product Code (VARCHAR)
        - Product Price (INTEGER)
        - Stock Level (INTEGER)
    
### Orders Table
        - Order id (PK) (SERIAL)
        - Order Status (TYPE check_status ['active', 'complete', 'pending', 'cancelled','shipped'])
        - Order Total  (INTEGER)
        - User id (FK: Users Table) (INTEGER)


### Ordered Products Table (Junction Table: Many to Many relation)
        - Ordered Products id (PK) (SERIAL)
        - Order id (FK: Orders Table) (INTEGER)
        - Product id (FK: Products Table) (INTEGER)
        - Product Quantity (INTEGER)



>- # API Docs:
   - ## Authentication
     -- 'headers':{
        "Authorization": -BEARER_TOKEN 
          }
    
    *replace BEARER_TOKEN with your TOKEN
    *Creat 'New User' to get your TOKEN

 >- ## Users API http Requsts
  - #### Show Single User
      ```
      Method: GET
      Route: '/api/users/{id}'  (user id)
      Response Samples: 
      
        {
           "id": 1,
           "first_name": "John",
           "last_name": "Stewart",
           "user_email": "John@mail.com",
           "user_password": "$2b$10$x6/qToQ0qE03z8j1T47rX.nE7b9V6EkSVrOaojrvEbeR16MhCUz5e",
           "user_address": null,
           "user_phone": "2020202020",
           "user_country": "uk"
           }
     ```


  - #### Show ALL Users
      ```
      Method: GET
      Route: '/api/users/list'
      Response Samples: 
      
        [
           {
           "id": 1,
           "first_name": "John",
           "last_name": "Stewart",
           "user_email": "John@mail.com",
           "user_password": "$2b$10$x6/qToQ0qE03z8j1T47rX.nE7b9V6EkSVrOaojrvEbeR16MhCUz5e",
           "user_address": 'John Address',
           "user_phone": "2020202020",
           "user_country": "uk"
           },
                   {
           "id": 2,
           "first_name": "Sara",
           "last_name": "Aadam",
           "user_email": "sara@mail.com",
           "user_password": "$2b$10$wzhaajUAZarrcvUZFMpoRuGFLDtCjOH4KcBHdwM7lXVJ44xAq89R6",
           "user_address": 'Sara Address',
           "user_phone": "303030303",
           "user_country": "us"
           }
        ]

        ```


  - #### Add New User
       ```
       Method: POST
       Route: '/api/users'
       Request Samples: 
       
        {
           "first_name": "Sara",
           "last_name": "Aadam",
           "user_email": "sara@mail.com",
           "user_password": "pass123456",
           "user_address": "Sara Address",
           "user_phone": 303030303,
           "user_country": "us"
           }

        ```

  - #### Update User
      ```
      Method: PUT
      Route: '/api/users/{id}'  (user id)
      Request Samples: 
      
         {
           "first_name": "Sara",
           "last_name": "Aadam",
           "user_email": "sara@mail.com",
           "user_password": "$2b$10$wzhaajUAZarrcvUZFMpoRuGFLDtCjOH4KcBHdwM7lXVJ44xAq89R6",
           "user_address": 'Sara Address',
           "user_phone": 4040404040,
           "user_country": "us"
           }

       ```


  - #### Delete User
       ```
      Method: DELETE
      Route: '/api/users/{id}'  (user id)
      Response Samples: 
        
           "The user with id:{id} is deleted successfully"
        ```


  - #### Login as a User
       ```
       Method: POST
       Route: '/api/users/login'
       Request Samples: 

        {
           "user_email": "sara@mail.com",
           "user_password":"pass123456"
         }

       ```

 >- ## Products API http Requsts
    
  - #### Show Single Product
      ```
      Method: GET
      Route: '/api/products/{id}'  (product id)
      Response Samples: 
      
          {
            "id": 1,
            "product_name": "item 1",
            "product_code": "A20-19",
            "product_price": 250,
            "product_desc": "item 1 description",
            "stock_level": 5
             }
        


 - #### Show ALL Products
      ```
      Method: GET
      Route: '/api/products/list'
      Response Samples: 
      
        [
           {
            "id": 2,
            "product_name": "item 2",
            "product_code": "B01-32",
            "product_price": 35,
            "product_desc": "item 2 description",
            "stock_level": 5
          },
          {
             "id": 3,
             "product_name": "item 3",
             "product_code": "B11-00",
             "product_price": 50,
             "product_desc": "item 3 description",
             "stock_level": 9
          },
        ]
      ```

  - #### Add New Product
      ```
       Method: POST
       Route: '/api/products'
       Request Samples: 
       
         {
          "product_name": "item 4",
          "product_code": "C01-99",
          "product_price": 60,
          "product_desc": "item 4 description",
          "stock_level": 11
         }
      ```

  - #### Update Product
     ```
      Method: PUT
      Route: '/api/product/{id}'  (product id)
      Request Samples: 
      
       {
        "product_name": "item 4",
        "product_code": "C01-99",
        "product_price": 70,
        "product_desc": "item 4 new description",
        "stock_level": 15
       }
     ```

 - #### Delete Product
      ```
      Method: DELETE
      Route: '/api/products/{id}'  (product id)
      Response Samples: 

        'The product with id:{id} is deleted successfully'
      ```

 >- ## Orders API HTTP Requests
    
  - #### Show Single Order
      ```
      Method: GET
      Route: '/api/orders/{id}'  (order id)
      Response Samples: 
      
        {
          "id": 1,
          "order_status": "active",
          "order_total": 600,
          "user_id": "1"
         }
      ```


  - #### Show ALL Orders
      ```
      Method: GET
      Route: '/api/orders/list'
      Response Samples: 
      
       [
          {
          "id": 1,
          "order_status": "active",
          "order_total": 600,
          "user_id": "1"
         },
         {
          "id": 2,
          "order_status": "active",
          "order_total": 600,
          "user_id": "2"
          }
      ]
      ```

  - #### Show ALL Orders By User 
      ```
      Method: GET
      Route: '/api/orders/user/:id'  (user id)
      Response Samples: 
      
       [
          {
          "id": 1,
          "order_status": "active",
          "order_total": 600,
          "user_id": "1"
         },
         {
          "id": 2,
          "order_status": "complete",
          "order_total": 750,
          "user_id": "1"
          }
      ]
      ```

  - #### Add New Order
      ```
       Method: POST
       Route: '/api/orders'
       Request Samples: 
        {
        "order_status":"complete",
        "order_total":750,
        "user_id":1
        }
      ```


  - #### Update Order
      ```
      Method: PUT
      Route: '/api/orders/{id}'  (order id)
      Request Samples: 
      
        {
         "order_status":"active",
         "order_total":800,
         "user_id":1
         }
      ```


  - #### Submit Order (Status Complete)
      ```
      Method: PUT
      Route: '/api/orders/{id}/submit'  (order id)
      ```


  - #### Cancel Order (Status Cancelled)
      ```
      Method: PUT
      Route: '/api/orders/{id}/cancel'  (order id)
      ```

  - #### ReOpen Order (Status Active)
      ```
      Method: PUT
      Route: '/api/orders/{id}/active' (order id)
      ```


  - #### Delete Order
      ```
      Method: DELETE
      Route: '/api/orders/{id}' (order id)
      Response Samples: 
      
            'order {id} is deleted'
      ```


 >- ### Ordered Products API HTTP Requests
    
   - #### Show Single Ordered Product
      ```
      Method: GET
      Route: '/api/order_produtcs/{id}'   (order produtcs id)
      Response Samples: 
      
        {
          "id": 1,
          "product_quantity": 10,
          "product_id": "1",
          "order_id": "1"
         }
      ```


  - #### Show ALL Ordered Product
      ```
      Method: GET
      Route: '/api/order_products/list'
      Response Samples: 
      
         [
          {
            "id": 2,
            "product_quantity": 5,
            "product_id": "2",
            "order_id": "1"
           },
            {
          "id": 1,
          "product_quantity": 10,
          "product_id": "1",
          "order_id": "1"
           }
         ]
      ```

  - #### Add Product to Order
      ```
       Method: POST
       Route: '/api/order/{id}/product'
       Request Samples: 
       
        {
          "product_id":"2",
          "product_quantity":5
         }
      ```

  - #### Update Ordered Product
      ```
      Method: PUT
      Route: '/api/order_products/{id}' (order products id)
      Request Samples: 
      
      ```
        


  - #### Remove Ordered Product
      ```
      Method: DELETE
      Route: '/api/order_products/{id}'
      Request Samples: 
      
      ```

 >- ### Detailed Orders API HTTP Requests 
  - **(Join Between 'ordered_products' and 'products' tables)

  - #### Show Single Order In Detail 
      ```
      Method: GET
      Route: '/api/order_details/{id}' (order id)
      Response Samples: 
        [
          {
           "id": 1,
           "user_id": "1",
           "product_id": "1",
           "product_quantity": 10,
           "order_status": "active",
           "order_total": 1000
        },
        {
           "id": 1,
           "user_id": "1",
           "product_id": "2",
           "product_quantity": 5,
           "order_status": "active",
           "order_total": 1000
         }
       ]
      ```

      
 - #### Show All Orders In Detail
      ```
      Method: GET
      Route: '/api/order_details/list'
      Response Samples: 
        [
          {
            "id": 1,
            "user_id": "1",
            "product_id": "2",
            "product_quantity": 5,
            "order_status": "active",
            "order_total": 1000
            },
            {
            "id": 2,
            "user_id": "1",
            "product_id": "2",
            "product_quantity": 3,
            "order_status": "active",
            "order_total": 1500
           }
        ]
      ```