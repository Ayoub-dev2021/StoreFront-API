/* Replace with your SQL commands */

CREATE TABLE order_products (id SERIAL PRIMARY KEY NOT NULL, product_quantity INTEGER NOT NULL, product_id bigint REFERENCES products(id) NOT NULL, order_id bigint REFERENCES orders(id) NOT NULL);