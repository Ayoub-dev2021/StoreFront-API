# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index 
- Show (args: product id)
- Create (args: Product)[token required]
- [OPTIONAL] Top 5 most popular products 
- [OPTIONAL] Products by category (args: product category)

#### Users
- Index [token required]
- Show (args: id)[token required]
- Create (args: User)[token required]


#### Orders
- Current Order by user (args: user id)[token required]
- [OPTIONAL] Completed Orders by user (args: user id)[token required]

## Data Shapes
#### Product
-  id
- name
- price
- [OPTIONAL] category

    SELECT


#### User
- id
- firstName
- lastName
- password

#### Orders
- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)

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

## API Rotes

### Users
  > - GET:    http://localhost:4040/api/users/list          [Show all users]
  > - GET:    http://localhost:4040/api/users/:id           [Show single user by user id]
  > - POST:   http://localhost:4040/api/users               [Add new user]
  > - PUT:    http://localhost:4040/api/users/:id           [Update one user by user id]
  > - POST:   http://localhost:4040/users/login             [Authenticate user]
  > - DELETE: http://localhost:4040/api/users/:id           [Delete user by user id]

### Products
  > - GET:    http://localhost:4040/api/products/list       [Show all products]
  > - GET:    http://localhost:4040/api/products/:id        [Show single product by product id]
  > - POST:   http://localhost:4040/api/products            [Add new product]
  > - PUT:    http://localhost:4040/api/products/:id        [Update single product by product id]
  > - DELETE: http://localhost:4040/api/products/:id        [Delete single product by product id]

### Orders
  > - GET:    http://localhost:4040/api/orders/list         [Show all orders]
  > - GET:    http://localhost:4040/api/orders/:id          [Show single order by order id]
  > - GET:    http://localhost:4040/api/orders/user/:id     [Show list of orders by user id]
  > - POST:   http://localhost:4040/api/orders              [Add new order]
  > - PUT:    http://localhost:4040/api/orders/:id          [Update single order by order id]
  > - DELETE: http://localhost:4040/api/orders/:id          [Delete single order by order id]
  > - PUT:    http://localhost:4040/api/orders/:id/submit   [Change order status to 'Compelete']
  > - PUT:    http://localhost:4040/api/orders/:id/cancel   [Change order status to 'Cancelled']
  > - PUT:    http://localhost:4040/api/orders/:id/active   [Change order status to 'Active']
  > - POST:   http://localhost:4040/api/orders/:id/product  [Add product into single order by order id]
  > - GET:    http://localhost:4040/api/order_products/list [Show all ordered products]
  > - GET:    http://localhost:4040/api/order_products/:id  [Show single ordered product by order products id]
  > - GET:    
  > - 
  > - DELETE: http://localhost:4040/api/order_products/:id  [Delete single ordered products by order_products)id]

